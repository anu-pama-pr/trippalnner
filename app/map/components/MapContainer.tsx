"use client";

import React from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// ✅ Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapContainer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      
      {/* 🌍 Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-wide">
        🗺️  Explore Your Trip Map
      </h1>

      {/* 🗺️ Round Map Container */}
      <div className="relative group w-[600px] h-[600px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white hover:scale-105 transition-transform duration-500 ease-out hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
        {/* ✨ Subtle glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-300/5 blur-3xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

        {/* 🗺️ Map */}
        <LeafletMap
          center={[20.5937, 78.9629]}
          zoom={5}
          className="w-full h-full z-10 relative rounded-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[28.6139, 77.209]}>
            <Popup>📍 New Delhi - Example Marker</Popup>
          </Marker>
        </LeafletMap>
      </div>
    </div>
  );
}
