type BackendEvent = {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizerId: { _id: string; username: string } | null;
};

export default function EventCard({ event }: { event: BackendEvent }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <ul className="list-unstyled small text-secondary mb-3">
          <li>{formattedDate}</li>
          {event.location && <li>{event.location}</li>}
        </ul>
        {event.description && (
          <p className="small text-muted mb-0">{event.description}</p>
        )}
      </div>
      {event.organizerId && (
        <div className="card-footer text-muted small bg-white">
          Organized by {event.organizerId.username}
        </div>
      )}
    </div>
  );
}
