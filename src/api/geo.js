import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const GEO_BASE_URL = import.meta.env.VITE_GEO_BASE_URL;

export async function searchCities(query, { signal } = {}) {
  const q = query.trim();
  if (q.length < 2) return [];

  const res = await axios.get(`${GEO_BASE_URL}/direct`, {
    params: {
      q,
      limit: 8,
      appid: API_KEY,
    },
    signal,
  });

  return (res.data || []).map((x) => ({
    name: x.name,
    country: x.country,
    state: x.state ?? "",
    lat: x.lat,
    lon: x.lon,
    label: [x.name, x.state, x.country].filter(Boolean).join(", "),
  }));
}
