"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import EventCard from "@/components/EventCard";
import { API_URL } from "@/lib/api";

type User = { _id: string; username: string; role: string; location?: string };
type BackendEvent = {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizerId: { _id: string; username: string } | null;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<BackendEvent[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => null);

    fetch(`${API_URL}/api/events`, { cache: "no-store" } as RequestInit)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setEvents(data.slice(0, 4)))
      .catch(() => []);
  }, []);

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="h2 mb-1">Artist Nearby</h1>
        <p className="text-muted mb-0">Discover and connect with artists in your area.</p>
      </div>

      <div className="card mb-5">
        <div className="card-header">
          {user ? `Welcome back, ${user.username}` : "Welcome to Artist Nearby"}
        </div>
        <div className="card-body">
          {user ? (
            <>
              <p className="small text-muted mb-3 text-capitalize">
                Signed in as {user.role}
                {user.location ? ` · ${user.location}` : ""}
              </p>
              <div className="d-flex gap-2">
                <Link href="/profile" className="btn btn-outline-dark btn-sm">
                  View My Profile
                </Link>
                {user.role === "organizer" && (
                  <Link href="/events/create" className="btn btn-dark btn-sm">
                    + Create Event
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="small text-muted mb-3">
                Find coffee shops, meetups, and artists near you.
              </p>
              <div className="d-flex gap-2">
                <Link href="/login" className="btn btn-dark btn-sm">
                  Log In
                </Link>
                <Link href="/register" className="btn btn-outline-dark btn-sm">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <h2 className="h5 mb-3">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-muted small mb-5">No events yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3 mb-5">
          {events.map((event) => (
            <div key={event._id} className="col">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex gap-3 align-items-center">
        <Link href="/search" className="btn btn-dark">
          Find a Spot
        </Link>
        <Link href="/events" className="btn btn-outline-dark">
          All Events
        </Link>
        <Link href="/project" className="text-muted small text-decoration-none">
          About this project
        </Link>
      </div>
    </PageContainer>
  );
}
