"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const lights = [
  {
    id: "URJ-001",
    area: "Main Road",
    position: [21.2514, 81.6296] as [number, number],
    power: 85,
    status: "Working",
  },
  {
    id: "URJ-002",
    area: "Civil Lines",
    position: [21.2408, 81.6387] as [number, number],
    power: 0,
    status: "Faulty",
  },
  {
    id: "URJ-003",
    area: "Station Road",
    position: [21.2621, 81.6331] as [number, number],
    power: 72,
    status: "Working",
  },
  {
    id: "URJ-004",
    area: "Market Square",
    position: [21.2562, 81.6179] as [number, number],
    power: 0,
    status: "Inactive",
  },
  {
    id: "URJ-005",
    area: "University Road",
    position: [21.2256, 81.6025] as [number, number],
    power: 91,
    status: "Working",
  },
];

const statusColors: Record<string, string> = {
  Working: "#22c55e",
  Faulty: "#ef4444",
  Inactive: "#f59e0b",
};

export default function CityMap() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            {status}
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700">
        <MapContainer
          center={[21.2514, 81.6296]}
          zoom={14}
          scrollWheelZoom
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {lights.map((light) => (
            <CircleMarker
              key={light.id}
              center={light.position}
              radius={9}
              pathOptions={{
                color: statusColors[light.status],
                fillColor: statusColors[light.status],
                fillOpacity: 0.9,
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: "150px", color: "#111827" }}>
                  <strong>{light.id}</strong>
                  <p>Location: {light.area}</p>
                  <p>Power: {light.power} W</p>
                  <p>
                    Status:{" "}
                    <strong style={{ color: statusColors[light.status] }}>
                      {light.status}
                    </strong>
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <p className="text-xs text-slate-400">
        Demo map: locations and readings are sample data, not live device
        telemetry.
      </p>
    </div>
  );
}