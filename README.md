# Artist Nearby

A location-based platform for artists to discover other creatives nearby, share work, and arrange local meetups.

## Stack

- **Frontend:** Next.js App Router, TypeScript, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas + Mongoose
- **External API:** Metropolitan Museum of Art Open API

## Running Locally

### Frontend

```bash
cd artist-nearby
npm install
npm run dev
```

Opens on http://localhost:3000

### Backend

```bash
cd artist-nearby-server
npm install
cp .env.example .env
npm run dev
```

Opens on http://localhost:4000

## Routes

| Route            | Description                     |
| ---------------- | ------------------------------- |
| `/`              | Home                            |
| `/search`        | Search Met Museum artworks      |
| `/details/[id]`  | Artwork detail + local comments |
| `/profile`       | Own profile                     |
| `/profile/[uid]` | Public profile                  |
| `/events`        | Local meetups                   |
| `/login`         | Login                           |
| `/register`      | Register                        |
| `/project`       | Project information             |
