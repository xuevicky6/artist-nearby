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

type Post = {
  _id: string;
  title: string;
  caption: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
        if (data) {
          fetch(`${API_URL}/api/posts/user/${data._id}`)
            .then((res) => (res.ok ? res.json() : []))
            .then(setPosts)
            .catch(() => []);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageContainer><p className="text-muted">Loading...</p></PageContainer>;
  }

  if (!user) {
    return (
      <PageContainer>
        <p className="text-muted">
          Please{" "}
          <Link href="/login" className="text-dark">log in</Link>{" "}
          to view your profile.
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="h3 mb-4">My Profile</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-1">{user.username}</h2>
          <p className="text-muted small mb-3 text-capitalize">
            {user.role} &middot; {user.location || "No location set"}
          </p>
          {user.artType && (
            <p className="small mb-2">
              <strong>Art Type:</strong> {user.artType}
            </p>
          )}
          {user.bio && <p className="small mb-2">{user.bio}</p>}
          <Link href="/settings" className="btn btn-outline-dark btn-sm">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">My Posts</h2>
        {user.role === "artist" && (
          <Link href="/posts/create" className="btn btn-dark btn-sm">
            + New Post
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-muted small mb-4">No posts yet.</p>
      ) : (
        <div className="list-group mb-4">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/posts/${post._id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex justify-content-between">
                <span className="fw-medium">{post.title}</span>
                <span className="text-muted small">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              {post.caption && (
                <p className="mb-0 small text-secondary">
                  {post.caption.length > 80
                    ? post.caption.slice(0, 80) + "..."
                    : post.caption}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
