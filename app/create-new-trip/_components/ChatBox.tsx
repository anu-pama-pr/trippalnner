
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React from "react";

function ChatBox() {


  const onSent = () => {  

  }
    
  return (
    <div className='h-[85vh] flex flex-col round' >
      {/* display msgs */}

      <section className='flex-1 overflow-y-auto p-4'>
        <div className=" flex justify-end mt-2">
          <div className=" max-w-lg bg-primary text-white py-2 rounded-lg">
            user msg
          </div>
        </div>
         <div className="flex justify-start mt-2">
          <div className=" max-w-lg bg-gray-100 text-black py-2 rounded-lg">
            AI Agent Msg
          </div>
        </div>
      </section>

      {/* user inputs */}

      <section> 
        <div className=" border rounded-2xl p-4  relative">
            <Textarea placeholder=" Create a trip from New York"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            ></Textarea>
            <Button size= "icon"  className=" absolute bottom-6 right-6"  onClick={() => onSent ()} >
              <Send className="h-5 w-5" />
            </Button>
          </div>


      </section>
    </div>
  );
}

export default ChatBox;
