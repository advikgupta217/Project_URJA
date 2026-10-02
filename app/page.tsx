
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const CityMap = dynamic(() => import("./CityMap"), {
  ssr: false,
  loading: () => (
    <p className="p-6 text-slate-400">Loading city map...</p>
  ),
});


const lights = [
  { id: "URJ-001", area: "Main Road", power: 85, status: "Working" },
  { id: "URJ-002", area: "Civil Lines", power: 0, status: "Faulty" },
  { id: "URJ-003", area: "Station Road", power: 72, status: "Working" },
  { id: "URJ-004", area: "Market Square", power: 0, status: "Inactive" },
  { id: "URJ-005", area: "University Road", power: 91, status: "Working" },
];

const navigation = [
  "Overview",
  "Street Lights",
  "City Map",
  "Fault Alerts",
  "Service Tickets",
];

export default function Home() {
  const [active, setActive] = useState("Overview");

  const working = lights.filter((l) => l.status === "Working").length;
  const faulty = lights.filter((l) => l.status === "Faulty").length;

  const stats = [
    { label: "Total Street Lights", value: "1,250", icon: "💡" },
    { label: "Working Lights", value: "1,180", icon: "✅" },
    { label: "Faulty Lights", value: "35", icon: "⚠️" },
    { label: "Energy Today", value: "846 kWh", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <aside className="w-full border-b border-slate-800 bg-slate-900 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-yellow-400 p-3 text-xl">⚡</div>
          <div>
            <h1 className="text-2xl font-bold">URJA</h1>
            <p className="text-xs text-slate-400">Smart Street Lighting</p>
          </div>
        </div>

        <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="flex flex-wrap gap-2 md:flex-col">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-lg px-4 py-3 text-left text-sm transition ${
                active === item
                  ? "bg-yellow-400 font-semibold text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-xl border border-slate-700 p-4">
          <p className="text-sm font-semibold">System Status</p>
          <p className="mt-2 text-sm text-emerald-400">
            ● Demo mode active
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Showing sample readings
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">URJA / Dashboard</p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              {active}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Intelligent Energy-Saving Street Lights
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
            <span className="text-yellow-400">●</span> Admin Panel
          </div>
        </header>

        {active === "Overview" ? (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="text-lg font-semibold">City Overview</h3>
                  <span className="text-xs text-slate-400">
                    Map integration coming next
                  </span>
                </div>

                <div className="mt-5 flex min-h-64 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 p-6 text-center">
                  <div>
                    <div className="text-5xl">🗺️</div>
                    <p className="mt-4 font-semibold">Street Light Map</p>
                    <p className="mt-2 text-sm text-slate-400">
                      View light locations, faulty devices and inactive
                      lights on an interactive city map.
                    </p>
                    <button
                      onClick={() => setActive("City Map")}
                      className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950"
                    >
                      Explore City Map
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold">Light Status</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Sample device readings
                </p>

                <div className="mt-6 space-y-5">
                  {[
                    { label: "Working", count: 1180, color: "bg-emerald-400" },
                    { label: "Faulty", count: 35, color: "bg-red-400" },
                    { label: "Inactive", count: 35, color: "bg-amber-400" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="text-slate-400">
                          {item.count.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${(item.count / 1250) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Recent Street Lights</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Example device monitoring records
                  </p>
                </div>
                <button
                  onClick={() => setActive("Street Lights")}
                  className="text-sm text-yellow-400 hover:underline"
                >
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead className="text-slate-400">
                    <tr className="border-b border-slate-800">
                      <th className="py-3 pr-4">Light ID</th>
                      <th className="py-3 pr-4">Location</th>
                      <th className="py-3 pr-4">Power</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lights.slice(0, 4).map((light) => (
                      <tr
                        key={light.id}
                        className="border-b border-slate-800/70"
                      >
                        <td className="py-4 pr-4 font-medium">{light.id}</td>
                        <td className="py-4 pr-4 text-slate-300">{light.area}</td>
                        <td className="py-4 pr-4">{light.power} W</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              light.status === "Working"
                                ? "bg-emerald-400/10 text-emerald-400"
                                : light.status === "Faulty"
                                  ? "bg-red-400/10 text-red-400"
                                  : "bg-amber-400/10 text-amber-400"
                            }`}
                          >
                            {light.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>

) : active === "City Map" ? (
  <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <h3 className="mb-2 text-xl font-semibold">Street Light Locations</h3>
    <p className="mb-5 text-sm text-slate-400">
      Explore street-light locations and inspect their status.
    </p>
    <CityMap />
  </section>
) : (
  <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
    <h3 className="text-xl font-semibold">{active}</h3>
    <p className="mt-3 text-slate-400">
      This section will be implemented in the next step.
    </p>
    {active === "Street Lights" && (
      <p className="mt-2 text-sm text-slate-400">
        {lights.length} sample devices loaded. {working} working and{" "}
        {faulty} faulty in this sample list.
      </p>
    )}
    <button
      onClick={() => setActive("Overview")}
      className="mt-5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950"
    >
      Back to Overview
    </button>
  </section>
)}
      </main>
    </div>
  );
}