"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Post } from "@/lib/mockData";
import PostCard from "@/components/PostCard";

type Tab = "posts" | "following" | "followers" | "bookmarks";

interface Props {
  user: User;
  isOwn: boolean;
  posts: Post[];
  followingUsers: User[];
  followerUsers: User[];
  bookmarkedPosts: Post[];
}

function UserRow({ user }: { user: User }) {
  return (
    <div className="d-flex align-items-start gap-3 py-3 border-bottom">
      <div className="flex-grow-1">
        <div className="fw-medium">{user.name}</div>
        <div className="text-muted small">@{user.username}</div>
        {user.bio && <div className="text-secondary small">{user.bio}</div>}
        <span className="badge bg-secondary mt-1">{user.artStyle}</span>
        <div className="text-muted small">{user.location}</div>
      </div>
      <Link href={`/profile/${user.id}`} className="btn btn-outline-dark btn-sm flex-shrink-0">
        View Profile
      </Link>
    </div>
  );
}

export default function ProfileClient({
  user,
  isOwn,
  posts,
  followingUsers,
  followerUsers,
  bookmarkedPosts,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    location: user.location,
    artStyle: user.artStyle,
    email: user.email,
    phone: user.phone,
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "posts", label: "Posts", count: posts.length },
    { key: "following", label: "Following", count: followingUsers.length },
    { key: "followers", label: "Followers", count: followerUsers.length },
    ...(isOwn
      ? [{ key: "bookmarks" as Tab, label: "Bookmarks", count: bookmarkedPosts.length }]
      : []),
  ];

  return (
    <div className="container py-5">
      {saved && (
        <div className="alert alert-success alert-dismissible mb-4">
          Profile saved.
          <button type="button" className="btn-close" onClick={() => setSaved(false)} />
        </div>
      )}

      {/* Profile header card */}
      <div className="card mb-4">
        <div className="card-body">
          {isEditing ? (
            <form onSubmit={handleSave}>
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Art Style</label>
                  <select
                    className="form-select"
                    value={form.artStyle}
                    onChange={(e) => setForm({ ...form, artStyle: e.target.value })}
                  >
                    <option>Digital</option>
                    <option>Painting</option>
                    <option>Sketch</option>
                    <option>Illustration</option>
                    <option>Photography</option>
                    <option>Sculpture</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <hr />
              <p className="small text-muted mb-2">Private — only visible to you</p>
              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark btn-sm">Save Changes</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                <div>
                  <h2 className="h4 mb-0">{form.name}</h2>
                  <p className="text-muted small mb-0">@{form.username}</p>
                </div>
                {isOwn ? (
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button className="btn btn-dark btn-sm">Follow</button>
                )}
              </div>

              {form.bio && <p className="text-secondary mb-2">{form.bio}</p>}

              <div className="d-flex flex-wrap gap-2 mb-2">
                <span className="badge bg-secondary">{form.artStyle}</span>
                <span className="small text-muted">{form.location}</span>
                {!isOwn && <span className="small text-muted">{user.distance}</span>}
              </div>

              {isOwn && (
                <div className="mt-3 p-3 bg-light border rounded">
                  <p className="small fw-medium text-muted mb-2">
                    Private — only visible to you
                  </p>
                  <div className="row g-1">
                    <div className="col-12 col-sm-6">
                      <span className="small text-muted">Email: </span>
                      <span className="small">{form.email}</span>
                    </div>
                    <div className="col-12 col-sm-6">
                      <span className="small text-muted">Phone: </span>
                      <span className="small">{form.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {tabs.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : "text-secondary"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}{" "}
              <span className="badge bg-secondary fw-normal">{tab.count}</span>
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "posts" && (
        posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {posts.map((post) => (
              <div key={post.id} className="col">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === "following" && (
        followingUsers.length === 0 ? (
          <p className="text-muted">Not following anyone yet.</p>
        ) : (
          <div className="card">
            <div className="card-body py-0">
              {followingUsers.map((u) => <UserRow key={u.id} user={u} />)}
            </div>
          </div>
        )
      )}

      {activeTab === "followers" && (
        followerUsers.length === 0 ? (
          <p className="text-muted">No followers yet.</p>
        ) : (
          <div className="card">
            <div className="card-body py-0">
              {followerUsers.map((u) => <UserRow key={u.id} user={u} />)}
            </div>
          </div>
        )
      )}

      {activeTab === "bookmarks" && isOwn && (
        bookmarkedPosts.length === 0 ? (
          <p className="text-muted">No bookmarks yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {bookmarkedPosts.map((post) => (
              <div key={post.id} className="col">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
