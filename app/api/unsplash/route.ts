// app/api/unsplash/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    if (!UNSPLASH_ACCESS_KEY) {
      return NextResponse.json({ error: "Unsplash access key not set" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Unsplash API error:", err);
    return NextResponse.json({ error: "Failed to fetch from Unsplash" }, { status: 500 });
  }
}
