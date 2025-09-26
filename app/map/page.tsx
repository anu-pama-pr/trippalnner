"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import React from "react";

// ✅ Dynamically import the map to avoid SSR issues
const MapContainer = dynamic(() => import("./components/MapContainer"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="w-full h-screen p-6 flex items-center justify-center">
      <MapContainer />
    </div>
  );
}
