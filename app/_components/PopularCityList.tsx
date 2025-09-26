    "use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  )); 

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destination To Visit 
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "India",
    title: "Cultural Wonders – Taj Mahal, Palaces & Backwaters",
    src: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=664&auto=format&fit=crop",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Explore the magnificent Taj Mahal in Agra, the royal palaces of Jaipur, the serene backwaters of Kerala, and exciting wildlife safaris across India. Experience the rich culture, vibrant festivals, and breathtaking landscapes that make India a diverse and unforgettable destination.
        </p>
        <img
          src="https://images.unsplash.com/photo-1710822334460-32dbfd4d5d5f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="India"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },

  {
    category: "Paris, France",
    title: "City of Lights – Eiffel Tower, Louvre & Montmartre",
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=687&auto=format&fit=crop",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Discover the romantic charm of Paris with the iconic Eiffel Tower, the world-renowned Louvre Museum, the artsy Montmartre district, and picturesque walks along the Seine River. Savor French cuisine and enjoy the timeless elegance of the City of Lights.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1747073970318-ae7c4aa1592c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Paris"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },

  {
    category: "New York, USA",
    title: "Statue of Liberty –  Central Park & Broadway",
    src: "https://images.unsplash.com/photo-1476837754190-8036496cea40?q=80&w=687&auto=format&fit=crop",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Experience the vibrant energy of New York City with dazzling Times Square, relaxing strolls in Central Park, world-class Broadway shows, and iconic landmarks like the Statue of Liberty. Enjoy diverse cuisine, bustling streets, and an unforgettable urban adventure.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1694475315972-75b665d25368?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="New York"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },

  {
    category: "Tokyo, Japan",
    title:  "Tokyo & Mount Fuji – City Lights to Majestic Peaks",
    src: "https://images.unsplash.com/photo-1717226263667-7ce6f7f35d9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Discover Tokyo’s perfect balance of modern innovation and traditional culture. Visit the bustling Shibuya Crossing, historic Senso-ji Temple, beautiful cherry blossom parks, and the iconic Tokyo Tower. Enjoy authentic Japanese cuisine and immerse yourself in vibrant city life.        </p>
        <img
          src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=687&auto=format&fit=crop"
          alt="Tokyo"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },

  {
    category: "Rome, Italy",
    title: "Ancient History – Colosseum, Vatican & Roman Forum",
    src: "https://images.unsplash.com/photo-1569759276108-31b8e7e43e7b?q=80&w=687&auto=format&fit=crop",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Step back in time with Rome’s ancient landmarks including the Colosseum, Vatican City, Roman Forum, and the Pantheon. Wander through cobblestone streets, enjoy Italian cuisine, and soak in the history and culture of the Eternal City.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1661963989923-17181d237cef?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29sb3NzZXVtJTJDJTIwVmF0aWNhbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Rome"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },

  {
    category: "Dubai, UAE",
    title: "Luxury & Innovation – Burj Khalifa, Desert Safari & Palm Jumeirah",
    src: "https://images.unsplash.com/photo-1692221383412-ab761e52ffe8?q=80&w=764&auto=format&fit=crop",
    content: (
      <div>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          Experience the futuristic city of Dubai with the towering Burj Khalifa, thrilling desert safaris, luxurious Palm Jumeirah, and world-class shopping at Dubai Mall. Discover the blend of modern architecture, culture, and unforgettable experiences.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1694475634077-e6e4b623b574?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnVyaiUyMEtoYWxpZmF8ZW58MHx8MHx8fDA%3D"
          alt="Dubai"
          className="w-full rounded-xl mt-4"
        />
      </div>
    ),
  },
];
