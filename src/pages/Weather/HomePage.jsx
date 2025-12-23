import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import CityAutocomplete from "../../components/CityAutocomplete.jsx";

export default function HomePage() {
  const defaultCity = useMemo(() => import.meta.env.VITE_OWM_CITY || "", []);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const toWeather = selectedLoc
    ? `/weather?city=${encodeURIComponent(selectedLoc.name)}`
    : "/weather";

  const canGo = Boolean(selectedLoc);

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
        <CityAutocomplete
          initialValue={defaultCity}
          onPick={(loc) => {
            setSelectedLoc(loc);
          }}
        />

        <Link
          to={toWeather}
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm"
          style={{
            pointerEvents: canGo ? "auto" : "none",
            opacity: canGo ? 1 : 0.5,
          }}
        >
          Перейти к погоде →
        </Link>
      </div>
    </>
  );
}
