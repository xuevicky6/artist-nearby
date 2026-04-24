import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import CommentsSection from "@/components/CommentsSection";
import { getPlace } from "@/lib/placesApi";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = await getPlace(id);

  if (!place) {
    return (
      <PageContainer>
        <p className="text-muted">Place not found.</p>
        <Link href="/search" className="btn btn-outline-dark btn-sm mt-2">
          Back to Search
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link
        href="/search"
        className="text-muted small text-decoration-none d-block mb-4"
      >
        &larr; Back to Search
      </Link>

      <div className="card mb-5">
        <div className="card-body">
          <h1 className="h3 mb-1">{place.name}</h1>
          <p className="text-muted small mb-3 text-capitalize">{place.category}</p>

          <table className="table table-sm table-bordered mb-3">
            <tbody>
              {place.address && (
                <tr>
                  <th scope="row" className="w-25">Address</th>
                  <td>{place.address}</td>
                </tr>
              )}
              {place.hours && (
                <tr>
                  <th scope="row">Hours</th>
                  <td>{place.hours}</td>
                </tr>
              )}
              {place.phone && (
                <tr>
                  <th scope="row">Phone</th>
                  <td>{place.phone}</td>
                </tr>
              )}
              {place.lat != null && (
                <tr>
                  <th scope="row">Location</th>
                  <td>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}&zoom=17`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark"
                    >
                      View on map
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark btn-sm"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>

      <CommentsSection placeId={id} />
    </PageContainer>
  );
}
