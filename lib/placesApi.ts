const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  website?: string;
  hours?: string;
  lat?: number;
  lon?: number;
}

export type PlaceDetail = Place;

export async function searchPlaces(q: string, near: string): Promise<Place[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/places/search?q=${encodeURIComponent(q)}&near=${encodeURIComponent(near)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPlace(id: string): Promise<PlaceDetail | null> {
  try {
    const res = await fetch(`${API_URL}/api/places/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
