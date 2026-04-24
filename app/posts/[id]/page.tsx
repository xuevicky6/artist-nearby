import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import PostCommentsSection from "@/components/PostCommentsSection";
import { API_URL } from "@/lib/api";

type Post = {
  _id: string;
  title: string;
  caption: string;
  imageUrl: string;
  artistId: { _id: string; username: string } | null;
  createdAt: string;
};

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/api/posts/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <PageContainer>
        <p className="text-muted">Post not found.</p>
        <Link href="/posts" className="btn btn-outline-dark btn-sm mt-2">
          Back to Posts
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link href="/posts" className="text-muted small text-decoration-none d-block mb-4">
        &larr; Back to Posts
      </Link>

      <div className="card mb-5">
        {post.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt={post.title}
            className="card-img-top"
            style={{ objectFit: "cover", maxHeight: 300 }}
          />
        )}
        <div className="card-body">
          <h1 className="h3 mb-1">{post.title}</h1>
          {post.artistId && (
            <p className="text-muted small mb-3">
              by{" "}
              <Link href={`/profile/${post.artistId._id}`} className="text-dark">
                @{post.artistId.username}
              </Link>
              {" · "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          )}
          {post.caption && <p className="mb-0">{post.caption}</p>}
        </div>
      </div>

      <PostCommentsSection postId={id} />
    </PageContainer>
  );
}
