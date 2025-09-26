"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Activity, Hotel, Loader, Send } from "lucide-react";
import { Assistant } from "next/font/google";
import { Content } from "openai/resources/containers/files/content.mjs";
import React, { act, useEffect, useState } from "react";
import EmptyBoxState from "./emptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import FinalUi from "./FinalUi";
import SelectDays from "./SelectDays";
import { useMutation } from "convex/react";
import { useTripDetails, useUserDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api"; // 👈 add this
import { v4 as uuidv4 } from "uuid";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
  walletAmount?: number;      // optional if you have wallet info
  mapUrl?: string;            // URL to Google Maps
  bookingUrl?: string;        // URL to hotel booking
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

type Itinerary = {
  day: number;
  day_plan: string;
  places_to_visit: Activity[];
  activities: Activity[];
};

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  const saveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail, setUserDetail, isLoading } = useUserDetail();
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetails();

  if (isLoading) {
    // optional: you can add a loading skeleton
    return (
      <>
        <div className="w-screen h-screen item-center justify-center">
          <Loader className="size-5" />
        </div>
      </>
    );
  }

  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);

    const newMsg: Message = {
      role: "user",
      content: userInput ?? "",
    };
    setUserInput("");

    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });

    console.log("API raw result:", result?.data);
    if (result.data.error) {
      console.error(
        "API returned error:",
        result?.data?.error,
        result?.data?.details,
        result
      );
    } else {
      console.log("Trip Plan:", result?.data);
      console.log(result)
    }

    !isFinal &&
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

    console.log(result);

    if (isFinal) {
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      const tripId = uuidv4();
      await saveTripDetail({
        tripDetail: result?.data?.trip_plan ?? {}, // always send something
        tripId: tripId, // use the generated UUID
        uid: userDetail?._id,
      });
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      return (
        <BudgetUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      return (
        <GroupSizeUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "tripDuration") {
      return (
        <SelectDays
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "final") {
      return <FinalUi viewTrip={() => console.log()} disable={!tripDetail} />;
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final") {
      setIsFinal(true);
      setUserInput("Ok Great!");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[85vh] flex flex-col border shadow rounded-2xl p-5">
      {messages?.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className=" flex  justify-end mt-2" key={index}>
              <div className=" max-w-lg bg-primary text-white py-2  px-3 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className=" max-w-lg bg-gray-100 text-black py-2 px-3 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className=" max-w-lg bg-gray-100 text-black py-2 rounded-lg">
              <Loader className="animate-spin text-primary" />
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          ></Textarea>

          <Button
            size="icon"
            className="absolute bottom-6 right-6"
            onClick={() => onSend()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
