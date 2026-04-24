import PageContainer from "@/components/PageContainer";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <PageContainer>
      <h1 className="h3 mb-4">Project Information</h1>

      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-sm mb-0">
            <tbody>
              <tr>
                <th scope="row" className="w-25">
                  Project Name
                </th>
                <td>Artist Nearby</td>
              </tr>
              <tr>
                <th scope="row">Team Member</th>
                <td>Vicky Xue — CS4550</td>
              </tr>
              <tr>
                <th scope="row">Frontend Repo</th>
                <td>
                  <a
                    href="[FRONTEND GITHUB LINK HERE]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/xuevicky6/artist-nearby.git
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Server Repo</th>
                <td>
                  <a
                    href="[PUT SERVER GITHUB LINK HERE]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [PUT SERVER GITHUB LINK HERE]
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">About</div>
        <div className="card-body">
          <p className="mb-0">
            Artist Nearby is a location-based social platform for artists to
            discover other creatives in their area, share posts, and organize
            local art meetups. Users can register as artists or organizers,
            browse nearby locations for meetups, and connect with other artists
            nearby.
          </p>
        </div>
      </div>

      <Link href="/" className="btn btn-outline-dark btn-sm">
        Back to Home
      </Link>
    </PageContainer>
  );
}
