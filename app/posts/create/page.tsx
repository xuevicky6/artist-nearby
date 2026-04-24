"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import { API_URL } from "@/lib/api";

export default function CreatePostPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", caption: "", imageUrl: "" });
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
    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const post = await res.json();
      router.push(`/posts/${post._id}`);
    } else {
      const data = await res.json();
      setError(data.message || "Could not create post");
    }
  }

  if (loading) {
    return <PageContainer><p className="text-muted">Loading...</p></PageContainer>;
  }

  if (!user) {
    return (
      <PageContainer>
        <p className="text-muted">
          Please <Link href="/login" className="text-dark">log in</Link> to create a post.
        </p>
      </PageContainer>
    );
  }

  if (user.role !== "artist") {
    return (
      <PageContainer>
        <p className="text-muted">Only artists can create posts.</p>
        <Link href="/posts" className="btn btn-outline-dark btn-sm">
          Back to Posts
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="h3 mb-4">New Post</h1>

      <div className="card">
        <div className="card-body">
          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows={4}
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Image URL (optional)</label>
              <input
                type="url"
                className="form-control"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="d-flex gap-2">
              <Link href="/posts" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-dark">
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
