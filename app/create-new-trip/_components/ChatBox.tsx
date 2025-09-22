
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { Assistant } from "next/font/google";
import { Content } from "openai/resources/containers/files/content.mjs";
import React, { useState } from "react";
import EmptyBoxState from "./emptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";

type Message = {
  role: string,
  content: string,
  ui?: string
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onSent = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput,
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
    });
    setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: result?.data?.resp,
        ui: result?.data?.ui ,
      },
    ]);
    console.log(result.data);
    setLoading(false);
  };

const RenderGenerativeUi=(ui:string  )=>{
  if (ui=='budget')
  {
    //Budget UI
       return< BudgetUi onSelectOption={(v:string)=>{setUserInput(v);onSent}}/>
 
  }else if (ui=='groupSize') 
  { 
   // group size UI
   return< GroupSizeUi onSelectOption={(v:string)=>{setUserInput(v);onSent}}/>
  }
  return null;
  }



  return (
    <div className="h-[85vh] flex flex-col ">
      {messages?.length == 0 && 
        <EmptyBoxState 
         onSelectOption={(v: string) => { setUserInput(v); onSent();}}/>
          }

      {/* display msgs */}

      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className=" flex justify-end mt-2" key={index}>
              <div className=" max-w-lg bg-primary text-white py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className=" max-w-lg bg-gray-100 text-black py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui??'')}
              </div>
            </div>
          )
        )}

        {loading && 
          <div className="flex justify-start mt-2">
            <div className=" max-w-lg bg-gray-100 text-black py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>}


      </section>

      {/* user inputs */}

      <section>
        <div className=" border rounded-2xl p-4  relative">
          <Textarea
            placeholder=" Start typing here...  "
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          ></Textarea>
          <Button
            size="icon"
            className=" absolute bottom-6 right-6"
            onClick={() => onSent()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>  

  );
}

export default ChatBox;
