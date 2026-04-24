"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import { API_URL } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", location: "", date: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/events");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to create event");
      }
    } catch {
      setError("Could not connect to server");
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <p className="text-muted">Loading...</p>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <p className="text-muted">
          Please{" "}
          <Link href="/login" className="text-dark">
            log in
          </Link>{" "}
          to create events.
        </p>
      </PageContainer>
    );
  }

  if (user.role !== "organizer") {
    return (
      <PageContainer>
        <p className="text-muted">Only organizers can create events.</p>
        <Link href="/events" className="btn btn-outline-dark btn-sm">
          Back to Events
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="h3 mb-1">Create a Meetup</h1>
          <p className="text-muted small mb-4">Organize an art meetup and connect with local artists</p>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Event Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Sunday Sketching at Central Cafe"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Blue Bottle Coffee, Downtown Boston"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Tell people what to expect..."
                  />
                </div>
                <div className="d-flex gap-2">
                  <Link href="/events" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-dark">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
