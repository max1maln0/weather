import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header.jsx";

import DailyForecastSection from "./sections/DailyForecastSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import SummaryCardSection from "./sections/SummaryCardSection.jsx";

export default function Weather() {
  const [apiWeather, setApiWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const cityFromUrl = searchParams.get("city");
  const CITY = (cityFromUrl || import.meta.env.VITE_OWM_CITY || "New York").trim();

  const mockWeather = {
    city: "New York",
    temperature: {
      current: -16,
      feelsLike: -22,
      min: -17,
      max: -13,
    },
    hourly: {
      summary: "Cloudy conditions from 1AM–9AM, with showers expected at 9AM.",
      items: [
        { time: "Now", temp: 21, icon: "01d" },
        { time: "10PM", temp: 21, icon: "10n" },
        { time: "11PM", temp: 19, icon: "10n" },
        { time: "12AM", temp: 19, icon: "10n" },
        { time: "1AM", temp: 19, icon: "02n" },
      ],
    },
    daily: {
      items: [
        { label: "Today", icon: "01d", min: 18, max: 29 },
        { label: "Thu", icon: "02d", min: 16, max: 28 },
        { label: "Fri", icon: "10d", min: 17, max: 25, precip: 75 },
        { label: "Sat", icon: "10d", min: 18, max: 24, precip: 60 },
        { label: "Sun", icon: "03d", min: 19, max: 27 },
        { label: "Mon", icon: "03d", min: 20, max: 28 },
        { label: "Tue", icon: "02d", min: 21, max: 30 },
        { label: "Wed", icon: "03d", min: 19, max: 26 },
      ],
    },
  };

  const mapCurrentWeather = (data) => {
    return {
      city: data?.name ?? "Unknown",
      temperature: {
        current: Math.round(data?.main?.temp ?? 0),
        feelsLike: Math.round(data?.main?.feels_like ?? 0),
        min: Math.round(data?.main?.temp_min ?? 0),
        max: Math.round(data?.main?.temp_max ?? 0),
      },
    };
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

      if (USE_MOCK) {
        setError(null);
        setLoading(false);
        setApiWeather({
          ...mockWeather,
          city: CITY,
          hourly: { summary: "Hourly forecast", items: mockWeather.hourly.items },
          daily: { items: mockWeather.daily.items },
        });
        return;
      }

      const API_KEY = import.meta.env.VITE_API_KEY;
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      if (!API_KEY || !BASE_URL) {
        setError(new Error("Missing env vars. Need VITE_API_KEY, VITE_BASE_URL"));
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const base = BASE_URL.replace(/\/+$/, "");

        const res = await axios.get(`${base}/weather`, {
          params: {
            q: CITY,
            appid: API_KEY,
            units: "metric",
          },
        });

        const forecast = await axios.get(`${base}/forecast`, {
          params: {
            q: CITY,
            appid: API_KEY,
            units: "metric",
            lang: "en",
          },
        });

        const hourlyItems = (forecast.data?.list || []).slice(0, 5).map((item, index) => {
          const date = new Date((item?.dt ?? 0) * 1000);

          return {
            time:
              index === 0
                ? "Now"
                : date.toLocaleTimeString([], { hour: "numeric", hour12: true }),
            temp: Math.round(item?.main?.temp ?? 0),
            icon: item?.weather?.[0]?.icon ?? "01d",
          };
        });

        const dailyItems = mockWeather.daily.items; // пока мок

        const formattedCurrent = mapCurrentWeather(res.data);

        setApiWeather({
          ...formattedCurrent,
          hourly: { summary: "Hourly forecast", items: hourlyItems },
          daily: { items: dailyItems },
        });
      } catch (err) {
        setError(err);
        console.error("OpenWeather error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [CITY]);

  const displayWeather = apiWeather ?? { ...mockWeather, city: CITY || mockWeather.city };

  return (
    <div className="px-6 mt-6">
      {error && (
        <p className="mb-4 text-sm text-red-300">
          API error: {String(error.message || error)}
        </p>
      )}
      {loading && <p className="mb-4 text-sm text-white/70">Loading weather...</p>}

      <Header />

      <div className="flex flex-col lg:flex-row items-start gap-10">
        <div className="w-[320px] shrink-0">
          <HeroSection weather={displayWeather} />
        </div>

        <div className="flex-1 lg:mt-10 w-full">
          <div className="w-full max-w-3xl mx-auto">
            <SummaryCardSection hourly={displayWeather.hourly} />
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-3xl mx-auto px-0">
        <DailyForecastSection daily={displayWeather.daily} />
      </div>
    </div>
  );
}
