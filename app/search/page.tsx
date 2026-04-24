import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { searchPlaces } from "@/lib/placesApi";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; near?: string }>;
}) {
  const { q, near } = await searchParams;
  const query = q?.trim() ?? "";
  const location = near?.trim() ?? "";

  let results: Awaited<ReturnType<typeof searchPlaces>> = [];

  if (query) {
    results = await searchPlaces(query, location);
  }

  return (
    <PageContainer>
      <h1 className="h3 mb-4">Find a Spot</h1>

      <form action="/search" method="GET" className="mb-4">
        <div className="row g-2">
          <div className="col-12 col-sm-5">
            <input
              type="text"
              name="q"
              className="form-control"
              placeholder="What? (e.g. cafe, restaurant)"
              defaultValue={query}
            />
          </div>
          <div className="col-12 col-sm-5">
            <input
              type="text"
              name="near"
              className="form-control"
              placeholder="Where? (e.g. Boston, MA)"
              defaultValue={location}
            />
          </div>
          <div className="col-12 col-sm-2">
            <button type="submit" className="btn btn-dark w-100">
              Search
            </button>
          </div>
        </div>
      </form>

      {!query && (
        <p className="text-muted small">
          Search for cafes and restaurants near you. Powered by OpenStreetMap.
        </p>
      )}

      {query && results.length === 0 && (
        <p className="text-muted">
          No results found for &ldquo;{query}&rdquo;{location ? ` near ${location}` : ""}.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-muted small mb-3">
            {results.length} results for &ldquo;{query}&rdquo; near {location}
          </p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {results.map((place) => (
              <div key={place.id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{place.name}</h5>
                    <p className="card-text small text-muted mb-1 text-capitalize">
                      {place.category}
                    </p>
                    {place.address && (
                      <p className="card-text small text-secondary">
                        {place.address}
                      </p>
                    )}
                  </div>
                  <div className="card-footer bg-white">
                    <Link
                      href={`/details/${place.id}`}
                      className="btn btn-outline-dark btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
