import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header.jsx";
import DailyForecastSection from "./sections/DailyForecastSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import SummaryCardSection from "./sections/SummaryCardSection.jsx";

export default function Weather() {
  const [apiWeather, setApiWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        { time: "Now", temp: 21, icon: "cloud" },
        { time: "10PM", temp: 21, icon: "rain" },
        { time: "11PM", temp: 19, icon: "rain" },
        { time: "12AM", temp: 19, icon: "rain" },
        { time: "1AM", temp: 19, icon: "cloud-sun" },
      ],
    },
    daily: {
      items: [
        { label: "Today", icon: "cloud", min: 18, max: 29 },
        { label: "Thu", icon: "cloud-sun", min: 16, max: 28 },
        { label: "Fri", icon: "rain", min: 17, max: 25, precip: 75 },
        { label: "Sat", icon: "rain", min: 18, max: 24, precip: 60 },
        { label: "Sun", icon: "cloud", min: 19, max: 27 },
        { label: "Mon", icon: "cloud", min: 20, max: 28 },
        { label: "Tue", icon: "cloud-sun", min: 21, max: 30 },
        { label: "Wed", icon: "cloud", min: 19, max: 26 },
        { label: "Thu", icon: "rain", min: 18, max: 23, precip: 40 },
        { label: "Fri", icon: "cloud", min: 17, max: 22 },
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

      hourly: mockWeather.hourly,
      daily: mockWeather.daily,
    };
  };

  useEffect(() => {
  const fetchWeather = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const CITY = import.meta.env.VITE_OWM_CITY || "New York";

    if (!API_KEY || !BASE_URL) {
      setError(new Error("Missing VITE_API_KEY or VITE_BASE_URL in .env"));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: CITY,
          appid: API_KEY,
          units: "metric",
        },
      });

      const forecast = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: CITY,
          appid: API_KEY,
          units: "metric",
          lang: "en",
        },
      });

      const hourlyItems = forecast.data.list.slice(0, 5).map((item, index) => {
        const date = new Date(item.dt * 1000);

        return {
          time:
            index === 0
              ? "Now"
              : date.toLocaleTimeString([], { hour: "numeric", hour12: true }),
          temp: Math.round(item.main.temp),
          icon: item.weather?.[0]?.icon ?? "13d",
        };
      });

      const formattedCurrent = mapCurrentWeather(res.data);
      const formatted = {
        ...formattedCurrent,
        hourly: {
          summary: "Cloudy conditions from 1AM–9AM, with showers expected at 9AM.",
          items: hourlyItems,
        },
  
        daily: mockWeather.daily,
      };

      setApiWeather(formatted);
    } catch (err) {
      setError(err);
      console.error("OpenWeather error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, []);

const displayWeather = apiWeather ?? mockWeather;


  return (
    <>
      <Header />

      <div className="px-6 mt-6">
        {error && (
          <p className="mb-4 text-sm text-red-300">
            API error: {String(error.message || error)}
          </p>
        )}
        {loading && (
          <p className="mb-4 text-sm text-white/70">
            Loading weather...
          </p>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="w-[320px] shrink-0">
            <HeroSection weather={displayWeather} />
          </div>

          <div className="flex-1 lg:mt-10">
            <SummaryCardSection hourly={displayWeather.hourly} />
          </div>
        </div>

        <div className="mt-6 w-full max-w-3xl mx-auto px-6">
          <DailyForecastSection daily={displayWeather.daily} />
        </div>
      </div>
    </>
  );
}
