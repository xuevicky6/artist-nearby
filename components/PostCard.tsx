import Link from "next/link";
import { Post } from "@/lib/mockData";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <p className="card-text mb-2">{post.caption}</p>
        <Link
          href={`/profile/${post.userId}`}
          className="small fw-medium text-dark text-decoration-none"
        >
          @{post.username}
        </Link>
        <p className="text-muted small mb-0">{post.distance}</p>
      </div>
    </div>
  );
}
