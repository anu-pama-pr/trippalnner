import { suggestions } from "@/app/_components/Hero";
import React from "react";

function emptyBoxState({onSelectOpton}:any ){
  return (
    <div className="mt-7">
      <h2 className="font-bold text-4xl text-center ">
        Start Planning New <strong className="text-primary"> Trip </strong>using
        AI{" "}
      </h2>
      <p className="text-center text-gray-400 mt-2">
        ✈️ Welcome to your Personal AI Trip Planner! Here, you can discover
        customized travel itineraries tailored just for you. I will guide you
        step by step to plan the perfect trip based on your preferences, budget,
        and interests.
      </p>
      <div className="flex flex-col gap-5 mt-7">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectOpton(suggestion.title)}
            className="flex items-center gap-3 border
               rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary"
          >
            {suggestion.icon}
            <h2 className="text-lg">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default emptyBoxState;
