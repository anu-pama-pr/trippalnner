import React from "react";

function ChatBox() {
  return (
    <div>
      {/* display msgs */}

      <section>
        <div className="flex justify-end mt-2">
          <div className="max-w-lg bg-primary text-white py-2 rounded-lg">
            user msg
          </div>
        </div>
         <div className="flex justify-start mt-2">
          <div className="max-w-lg bg-gray-100 text-black py-2 rounded-lg">
            AI agent  msg
          </div>
        </div>
      </section>

      {/* user inputs */}

      <section></section>
    </div>
  );
}

export default ChatBox;
