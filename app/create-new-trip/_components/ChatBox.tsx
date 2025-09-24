"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { Assistant } from "next/font/google";
import { Content } from "openai/resources/containers/files/content.mjs";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./emptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import FinalUi from "./FinalUi";
import SelectDays from "./SelectDays";
import { useMutation } from "convex/react";
import { useUserDetails } from "@/app/provider";
import { api } from "@/convex/_generated/api"; // 👈 add this
import { v4 as uuidv4 } from "uuid";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TypeInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: any;
  itinerary: any;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TypeInfo>();
  const saveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetails, setUserDetails } = useUserDetails();

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
    console.log("trip data ",result?.data)
    if (result.data.error) {
      console.error("API Error:", result.data);
      // Handle error appropriately
      return;
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
      const tripId = uuidv4();
      await saveTripDetail({
        tripDetail: result?.data?.trip_plan ?? {}, // always send something
        tripId: tripId, // use the generated UUID
        uid: userDetails?._id,
      });
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      //Budget UI
      return (
        <BudgetUi
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      // group size UI
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
      //onSend();
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[85vh] flex flex-col ">
      {messages?.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      {/* display msgs */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className=" flex  justify-end mt-2" key={index}>
              <div className=" max-w-lg bg-primary text-white py-2  px-3 rounded-lg">
                {msg.content}
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

      {/* user inputs */}

      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // prevent new line
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
