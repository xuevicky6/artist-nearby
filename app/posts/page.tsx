import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { API_URL } from "@/lib/api";

type Post = {
  _id: string;
  title: string;
  caption: string;
  imageUrl: string;
  artistId: { _id: string; username: string } | null;
  createdAt: string;
};

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <PageContainer>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Artist Posts</h1>
        <Link href="/posts/create" className="btn btn-dark">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {posts.map((post) => (
            <div key={post._id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  {post.artistId && (
                    <p className="text-muted small mb-2">
                      by{" "}
                      <Link
                        href={`/profile/${post.artistId._id}`}
                        className="text-dark"
                      >
                        @{post.artistId.username}
                      </Link>
                    </p>
                  )}
                  {post.caption && (
                    <p className="card-text small text-secondary">
                      {post.caption.length > 120
                        ? post.caption.slice(0, 120) + "..."
                        : post.caption}
                    </p>
                  )}
                </div>
                <div className="card-footer bg-white">
                  <Link
                    href={`/posts/${post._id}`}
                    className="btn btn-outline-dark btn-sm w-100"
                  >
                    View Post
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
