"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { API_URL } from "@/lib/api";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  artType: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", bio: "", location: "", artType: "" });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          setForm({
            email: data.email || "",
            bio: data.bio || "",
            location: data.location || "",
            artType: data.artType || "",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave(e: React.SyntheticEvent) {
    e.preventDefault();
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json();
        setError(data.message || "Save failed");
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
          to access settings.
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="h3 mb-4">Settings</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h6 mb-1">Signed in as</h2>
          <p className="text-muted small mb-3 text-capitalize">
            {user.username} &middot; {user.role}
          </p>

          <h2 className="h6 mb-3">Edit Profile</h2>
          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          {saved && <div className="alert alert-success py-2 small">Changes saved.</div>}

          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <input
                type="text"
                className="form-control"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="A short bio"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g., Boston, MA"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Art Type</label>
              <input
                type="text"
                className="form-control"
                value={form.artType}
                onChange={(e) => setForm({ ...form, artType: e.target.value })}
                placeholder="e.g., Painting, Photography"
              />
            </div>
            <button type="submit" className="btn btn-dark btn-sm">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
