import Link from "next/link";
import { User } from "@/lib/mockData";

export default function ArtistCard({ user }: { user: User }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title mb-1">{user.name}</h5>
        <p className="text-muted small mb-1">@{user.username}</p>
        <p className="small mb-2">{user.distance}</p>
        {user.bio && <p className="small text-secondary mb-2">{user.bio}</p>}
        <span className="badge bg-secondary">{user.artStyle}</span>
      </div>
      <div className="card-footer bg-white">
        <Link href={`/profile/${user.id}`} className="btn btn-outline-dark btn-sm w-100">
          View Profile
        </Link>
      </div>
    </div>
  );
}
