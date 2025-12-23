import { useEffect, useRef, useState } from "react";
import  useDebounce  from "../hooks/useDebounce";
import { searchCities } from "../api/geo";

export default function CityAutocomplete({ initialValue = "", onPick }) {
  const [input, setInput] = useState(initialValue);
  const debounced = useDebounce(input, 350);

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);

  const rootRef = useRef(null);

  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const q = debounced.trim();
    if (q.length < 2) {
      setItems([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    searchCities(q, { signal: controller.signal })
      .then((list) => {
        setItems(list);
        setOpen(list.length > 0);
        setActive(-1);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Geo error:", err);
        }
        setItems([]);
        setOpen(false);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debounced]);

  const pick = (loc) => {
    setInput(loc.label);
    setOpen(false);
    onPick?.(loc);
  };

  const onKeyDown = (e) => {
    if (!open) return;

    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(items[active]);
    }
  };

  return (
    <div ref={rootRef} className="flex justify-center relative w-full max-w-md">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Введите город..."
        autoComplete="off"
        className="flex  w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-white outline-none"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">
          ...
        </div>
      )}

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-[#0b0f1a] shadow">
          {items.map((loc, idx) => (
            <button
              key={`${loc.lat}-${loc.lon}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(loc)}
              className={`block w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 ${
                idx === active ? "bg-white/5" : ""
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
