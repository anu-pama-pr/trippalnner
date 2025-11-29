import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "@/lib/arcjet";
import { auth, currentUser } from "@clerk/nextjs/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:

1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final', where Final means AI generating complete final output

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
{
  "resp": "Text resp",
  "ui": "budget/groupSize/tripDuration/final"
}`;

const FINAL_PROMPT = `Generate a CONCISE Travel Plan with given details. Keep descriptions SHORT (max 50 words each). Generate EXACTLY 3 hotels and maximum 2-3 places per day.

CRITICAL: You MUST return ONLY valid, complete JSON. No explanations, no extra text, no truncated responses.

Output Schema (STRICT JSON ONLY):
{
  "trip_plan": {
    "destination": "string",
    "duration": "string", 
    "budget": "string",
    "group_size": "string",
    "origin": "string",

    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": "string",
        "rating": "number",
        "description": "string (max 50 words)"
      }
    ],
    "itinerary": [
      {
        "day": "string",
        "places_to_visit": [
          {
            "place_name": "string",
            "place_details": "string (max 30 words)",
            "place_image_url": "string",
            "geo_coordinates": "string",
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user=await currentUser(); 
  const {has}=await auth();
  const hasPremiumAccess = has({ plan: 'monthly' })
  // console.log("hasPremiumAccess",hasPremiumAccess)
  const decision = await aj.protect(req, { 
      userId: user?.primaryEmailAddress?.emailAddress ??'', 
      requested: isFinal?5:0
    }); // Deduct 5 tokens from the bucket

    //console.log(decision);
    //@ts-ignore
    if (decision?.reason?.remaining==0 && !hasPremiumAccess) {
      return NextResponse.json({
        resp:'your free trial is ended.',
        ui:'limit'
      })
    }



     
  

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      response_format: { type: 'json_object' },
      messages: [
        {
          role: "system",
          content: isFinal ? FINAL_PROMPT : PROMPT,
        },
        ...messages,
      ],
max_tokens: isFinal ? 4000 : 2000
 });

    console.log("from api", completion.choices[0].message);
    const message = completion.choices[0].message;
    const rawContent = message?.content ?? "";


    // Check if content exists and is valid JSON
    if (!message.content) {
      throw new Error("No content in response");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw content:", rawContent);
      
      // Try to fix truncated JSON with improved logic
      let fixedContent = message.content.trim();
      
      // Remove any trailing incomplete content after the last complete field
      // Look for the last complete key-value pair
      const lastCompletePattern = /,\s*"[^"]+"\s*:\s*"[^"]*$/;
      const match = fixedContent.match(lastCompletePattern);
      
      if (match) {
        // Remove the incomplete trailing field
        fixedContent = fixedContent.substring(0, match.index);
      }
      
      // Remove any trailing comma
      fixedContent = fixedContent.replace(/,\s*$/, '');
      
      // Count and balance braces and brackets
      const openBraces = (fixedContent.match(/\{/g) || []).length;
      const closeBraces = (fixedContent.match(/\}/g) || []).length;
      const openBrackets = (fixedContent.match(/\[/g) || []).length;
      const closeBrackets = (fixedContent.match(/\]/g) || []).length;
      
      // Add missing closing brackets and braces
      const missingBrackets = openBrackets - closeBrackets;
      const missingBraces = openBraces - closeBraces;
      
      if (missingBrackets > 0) {
        fixedContent += ']'.repeat(missingBrackets);
      }
      if (missingBraces > 0) {
        fixedContent += '}'.repeat(missingBraces);
      }
      
      try {
        parsedResponse = JSON.parse(fixedContent);
        // console.log("Fixed JSON successfully!");
      } catch (fixError) {
        console.error("Could not fix JSON:", fixError);
        
        // Last resort: Try to extract the valid part
        try {
          // Look for the trip_plan object and try to close it properly
          const tripPlanStart = fixedContent.indexOf('"trip_plan"');
          if (tripPlanStart !== -1) {
            const beforeTripPlan = fixedContent.substring(0, tripPlanStart);
            const afterTripPlan = fixedContent.substring(tripPlanStart);
            
            // Find the opening brace after trip_plan
            const openBraceIndex = afterTripPlan.indexOf('{');
            if (openBraceIndex !== -1) {
              let braceCount = 1;
              let endIndex = openBraceIndex + 1;
              
              // Find the matching closing brace
              for (let i = endIndex; i < afterTripPlan.length && braceCount > 0; i++) {
                if (afterTripPlan[i] === '{') braceCount++;
                if (afterTripPlan[i] === '}') braceCount--;
                if (braceCount === 0) {
                  endIndex = i + 1;
                  break;
                }
              }
              
              // If we couldn't find the end, add closing braces
              if (braceCount > 0) {
                const partialTripPlan = afterTripPlan.substring(0, endIndex);
                const finalContent = beforeTripPlan + '"trip_plan": {}' + '}';
                parsedResponse = JSON.parse(finalContent);
                // console.log("Used fallback empty trip_plan");
              }
            }
          }
        } catch (lastResortError) {
          // Return a fallback response with empty trip_plan
          return NextResponse.json({
            trip_plan: {
              destination: "Error generating plan",
              duration: "N/A",
              budget: "N/A", 
              group_size: "N/A",
              hotels: [],
              itinerary: []
            }
          });
        }
      }
    }

    return NextResponse.json(parsedResponse);
    
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ 
      error: "API request failed", 
      details: e instanceof Error ? e.message : String(e) 
    });
  }
}