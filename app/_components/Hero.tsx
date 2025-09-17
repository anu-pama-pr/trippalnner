"use client";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Globe2, Plane, Landmark, Send, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import CLoader from "./CLoader";

const suggestions = [
  {
    title: "Create a new trip ",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Inspire me where to go ",
    icon: <Plane className="text-green-500 h-5 w-5" />,
  },
  {
    title: "Develop Hidden Gems ",
    icon: <Landmark className="text-orange-500 h-5 w-5" />,
  },
  {
    title: "Create a new trip ",
    icon: <Globe2 className="text-yellow-600 h-5 w-5" />,
  },
];

const HeroSection = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <CLoader />; // Wait for Clerk to load
  const router = useRouter();
  const onSent = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    //navigate to trip planner  web page
    router.push("/create-new-trip");
  };
  
  return (
    <div className=" mt-24 w-full flex  justify-center ">
      {/*  content */}
      <div className=" max-w-3xl w-full text-center  space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, i'm your personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="capitalize text-lg ">
          tell me what you want, and i'll handle the rest: Flights, Hotel, trip
          Planner - all in seconds{" "}
        </p>
        {/*  input */}
        <div>
          <div className=" border rounded-2xl p-4  relative">
            <Textarea placeholder=" Create a trip from New York"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            ></Textarea>
            <Button size={"icon"}  className=" absolute bottom-6 right-6"  onClick={onSent} >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/*  session box */}

        <div className="flex gap-5">
          {suggestions.map((suggestion, index) => (
            <div
              className="flex items-center gap-3 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white transition"
              key={index}
            >
              {suggestion.icon}
              <h2 className="text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        {/*  video section */}
        <div className="flex item-center flex-col">
          <h2 className="capitalize my-7 mt-14 flex gap-3 text-center ">
            Not sure where to start? <strong>see how it works</strong>
            <ArrowDown />
          </h2>
          <HeroVideoDialog
            className="block dark:hidden scale-100"
            animationStyle="from-center"
            videoSrc="https://cdn.pixabay.com/video/2025/06/01/282995_tiny.mp4"
            thumbnailSrc="./thumb.png"
            //   thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
