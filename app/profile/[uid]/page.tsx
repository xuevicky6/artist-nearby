import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { API_URL } from "@/lib/api";

type PublicUser = {
  _id: string;
  username: string;
  role: string;
  bio: string;
  location: string;
  artType: string;
};

async function getUser(uid: string): Promise<PublicUser | null> {
  try {
    const res = await fetch(`${API_URL}/api/users/${uid}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const user = await getUser(uid);

  if (!user) {
    return (
      <PageContainer>
        <p className="text-muted">User not found.</p>
        <Link href="/" className="small text-dark">
          Back to Home
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="h3 mb-4">@{user.username}</h1>

      <div className="card mb-4">
        <div className="card-body">
          <p className="text-muted small mb-2 text-capitalize">{user.role}</p>
          {user.location && (
            <p className="small mb-2">
              <strong>Location:</strong> {user.location}
            </p>
          )}
          {user.artType && (
            <p className="small mb-2">
              <strong>Art Type:</strong> {user.artType}
            </p>
          )}
          {user.bio && <p className="small mb-0">{user.bio}</p>}
        </div>
      </div>

      <Link href="/" className="btn btn-outline-dark btn-sm">
        Back to Home
      </Link>
    </PageContainer>
  );
}
