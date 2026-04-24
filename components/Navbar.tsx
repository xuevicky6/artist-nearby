"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

type AuthUser = { _id: string; username: string; role: string };

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [pathname]);

  function handleLogout() {
    fetch(`${API_URL}/api/users/logout`, { method: "POST", credentials: "include" }).then(() => {
      setUser(null);
      router.push("/");
    });
  }

  const active = (href: string) =>
    pathname === href ? "fw-semibold text-dark" : "text-secondary";

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          Artist Nearby
        </Link>
        <div className="d-flex gap-3 align-items-center flex-wrap">
          <Link href="/" className={`nav-link ${active("/")}`}>Home</Link>
          <Link href="/search" className={`nav-link ${active("/search")}`}>Search</Link>
          <Link href="/events" className={`nav-link ${active("/events")}`}>Events</Link>
          <Link href="/posts" className={`nav-link ${active("/posts")}`}>Posts</Link>

          {user ? (
            <>
              <span className="text-muted small">|</span>
              <Link href="/profile" className={`nav-link ${active("/profile")}`}>Profile</Link>
              <Link href="/settings" className={`nav-link ${active("/settings")}`}>Settings</Link>
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link text-secondary p-0 border-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="text-muted small">|</span>
              <Link href="/login" className={`nav-link ${active("/login")}`}>Login</Link>
              <Link href="/register" className={`nav-link ${active("/register")}`}>Register</Link>
            </>
          )}

          <span className="text-muted small">|</span>
          <Link href="/project" className={`nav-link ${active("/project")}`}>Project Info</Link>
        </div>
      </div>
    </nav>
  );
}
