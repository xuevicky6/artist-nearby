"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "artist",
    bio: "",
    location: "",
    artType: "",
  });
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/profile");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Could not connect to server");
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <div className="card">
            <div className="card-body p-4">
              <h1 className="h4 mb-1">Create an account</h1>
              <p className="text-muted small mb-4">Join Artist Nearby</p>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    className="form-select"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="artist">Artist</option>
                    <option value="organizer">Organizer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    className="form-control"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="A short bio"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Boston, MA"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Art Type</label>
                  <input
                    type="text"
                    name="artType"
                    className="form-control"
                    value={form.artType}
                    onChange={handleChange}
                    placeholder="e.g., Painting, Photography"
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Create Account
                </button>
              </form>

              <p className="small text-center text-muted mt-3 mb-0">
                Already have an account?{" "}
                <Link href="/login" className="text-dark">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
