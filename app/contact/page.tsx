import React from "react";
import Header from "@/app/_components/Header"; // your existing header
import Hero from "@/app/_components/Hero";     // your existing hero (optional)
import ContactUs from "@/app/_components/ContactUs/ContactUs";

export default function ContactPage() {
  return (
    <>
      <Header />
      <Hero />
      <main className="mt-16">
        <ContactUs />
      </main>
    </>
  );
}
