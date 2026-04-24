import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import EventCard from "@/components/EventCard";
import { API_URL } from "@/lib/api";

type BackendEvent = {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizerId: { _id: string; username: string } | null;
};

async function getEvents(): Promise<BackendEvent[]> {
  try {
    const res = await fetch(`${API_URL}/api/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageContainer>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Local Art Meetups</h1>
          <p className="text-muted small mb-0">Join or create meetups with artists in your area</p>
        </div>
        <Link href="/events/create" className="btn btn-dark">
          + Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-muted">No events yet. Be the first to create one!</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {events.map((event) => (
            <div key={event._id} className="col">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
