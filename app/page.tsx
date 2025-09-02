import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import { PopularCityList } from "./_components/PopularCityList";
import HeroSection from "./_components/Hero.";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection /> {/* Hero Section (name Hro changed to HeroSection) */}
      <PopularCityList />
    </div>
  );
}
