"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

type Comment = {
  _id: string;
  text: string;
  userId: { _id: string; username: string };
  createdAt: string;
};

export default function CommentsSection({ placeId }: { placeId: string }) {
  const [user, setUser] = useState<{ _id: string; username: string } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => null);

    fetch(`${API_URL}/api/comments/artwork/${placeId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setComments)
      .catch(() => []);
  }, [placeId]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text, apiArtworkId: placeId }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setText("");
    } else {
      const data = await res.json();
      setError(data.message || "Could not post comment");
    }
  }

  return (
    <div>
      <h2 className="h5 mb-3">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <textarea
              className="form-control"
              rows={2}
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-1 small">{error}</div>}
          <button type="submit" className="btn btn-dark btn-sm">
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-muted small mb-4">
          <Link href="/login" className="text-dark">
            Log in
          </Link>{" "}
          to leave a comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p className="text-muted small">No comments yet.</p>
      ) : (
        <div className="list-group">
          {comments.map((comment) => (
            <div key={comment._id} className="list-group-item">
              <div className="d-flex justify-content-between mb-1">
                <Link
                  href={`/profile/${comment.userId._id}`}
                  className="fw-medium text-dark text-decoration-none small"
                >
                  @{comment.userId.username}
                </Link>
                <span className="text-muted small">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mb-0 small">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
