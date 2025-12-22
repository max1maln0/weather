import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Input from "../../components/Input";

export default function HomePage() {
  const [city, setCity] = useState(import.meta.env.VITE_OWM_CITY || "");

  const cityTrimmed = city.trim();
  const toWeather = cityTrimmed
    ? `/weather?city=${encodeURIComponent(cityTrimmed)}`
    : "/weather";

  return (
    <>
      <Header />

      <div className="flex flex-col items-center p-4 mt-5">
        <h2 className="text-3xl font-bold mb-3">Узнай погоду</h2>
        <p className="text-lg text-gray-400">
          Введите название города чтобы узнать{" "}
          <span className="flex justify-center">текущую погоду</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город..."
        />

        <Link
          to={toWeather}
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm"
          style={{ pointerEvents: cityTrimmed ? "auto" : "none", opacity: cityTrimmed ? 1 : 0.5 }}
        >
          Перейти к погоде →
        </Link>
      </div>
    </>
  );
}
