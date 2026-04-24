const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export interface MetObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  objectDate: string;
  medium: string;
  department: string;
  culture: string;
  period: string;
  dimensions: string;
  objectURL: string;
  tags: { term: string }[] | null;
}

export async function searchArtworks(query: string, limit = 9): Promise<number[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&hasImages=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.objectIDs ?? []).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getArtwork(id: number): Promise<MetObject | null> {
  try {
    const res = await fetch(`${BASE_URL}/objects/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
