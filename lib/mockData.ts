export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  artStyle: string;
  distance: string;
  location: string;
  // Sensitive — only shown to the profile owner
  email: string;
  phone: string;
  // Social graph
  following: string[];
  followers: string[];
  bookmarkedPosts: string[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  caption: string;
  distance: string;
}

export interface Event {
  id: string;
  title: string;
  type: "cafe" | "outdoor" | "museum" | "game" | "store" | "other";
  date: string;
  time: string;
  location: string;
  distance: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Mike Rivera",
    username: "mike_studios",
    bio: "Character designer and illustrator",
    artStyle: "Digital",
    distance: "0.8 miles away",
    location: "Boston, MA",
    email: "mike@example.com",
    phone: "+1 (617) 555-0101",
    following: ["2", "3", "4", "7"],
    followers: ["2", "5", "6", "8"],
    bookmarkedPosts: ["3", "5", "8"],
  },
  {
    id: "2",
    name: "Emma Wilson",
    username: "emma_draws",
    bio: "Watercolor and mixed media artist",
    artStyle: "Painting",
    distance: "1.2 miles away",
    location: "Boston, MA",
    email: "emma@example.com",
    phone: "+1 (617) 555-0102",
    following: ["1", "3", "7"],
    followers: ["1", "3", "4"],
    bookmarkedPosts: ["2", "6"],
  },
  {
    id: "3",
    name: "Alex Kim",
    username: "alex_art",
    bio: "Urban sketcher and coffee enthusiast",
    artStyle: "Sketch",
    distance: "2.3 miles away",
    location: "Boston, MA",
    email: "alex@example.com",
    phone: "+1 (617) 555-0103",
    following: ["1", "2"],
    followers: ["1", "2", "5"],
    bookmarkedPosts: ["1"],
  },
  {
    id: "4",
    name: "Lily Chen",
    username: "lily_paints",
    bio: "Abstract painter, nature lover",
    artStyle: "Painting",
    distance: "3.1 miles away",
    location: "Cambridge, MA",
    email: "lily@example.com",
    phone: "+1 (617) 555-0104",
    following: ["1", "2", "8"],
    followers: ["1", "7"],
    bookmarkedPosts: ["7"],
  },
  {
    id: "5",
    name: "Tom Anderson",
    username: "tom_digital",
    bio: "3D artist and motion designer",
    artStyle: "Digital",
    distance: "4.5 miles away",
    location: "Somerville, MA",
    email: "tom@example.com",
    phone: "+1 (617) 555-0105",
    following: ["3", "6"],
    followers: ["2"],
    bookmarkedPosts: [],
  },
  {
    id: "6",
    name: "Mia Rodriguez",
    username: "mia_sketch",
    bio: "Portrait artist, always sketching",
    artStyle: "Sketch",
    distance: "5.7 miles away",
    location: "Brookline, MA",
    email: "mia@example.com",
    phone: "+1 (617) 555-0106",
    following: ["1", "4"],
    followers: ["5"],
    bookmarkedPosts: ["4"],
  },
  {
    id: "7",
    name: "James Lee",
    username: "james_illustrates",
    bio: "Editorial illustrator and educator",
    artStyle: "Illustration",
    distance: "6.2 miles away",
    location: "Cambridge, MA",
    email: "james@example.com",
    phone: "+1 (617) 555-0107",
    following: ["2", "4"],
    followers: ["1", "2"],
    bookmarkedPosts: ["1", "5"],
  },
  {
    id: "8",
    name: "Nina Patel",
    username: "nina_art",
    bio: "Children's book illustrator",
    artStyle: "Illustration",
    distance: "7.9 miles away",
    location: "Newton, MA",
    email: "nina@example.com",
    phone: "+1 (617) 555-0108",
    following: ["1", "7"],
    followers: ["4"],
    bookmarkedPosts: [],
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    username: "mike_studios",
    caption: "Character design exploration",
    distance: "0.8 miles away",
  },
  {
    id: "2",
    userId: "1",
    username: "mike_studios",
    caption: "New concept sketches",
    distance: "0.8 miles away",
  },
  {
    id: "3",
    userId: "2",
    username: "emma_draws",
    caption: "Floral watercolor series",
    distance: "1.2 miles away",
  },
  {
    id: "4",
    userId: "2",
    username: "emma_draws",
    caption: "Portrait study",
    distance: "1.2 miles away",
  },
  {
    id: "5",
    userId: "4",
    username: "lily_paints",
    caption: "Abstract in progress",
    distance: "3.1 miles away",
  },
  {
    id: "6",
    userId: "5",
    username: "tom_digital",
    caption: "Landscape study",
    distance: "4.5 miles away",
  },
  {
    id: "7",
    userId: "6",
    username: "mia_sketch",
    caption: "Quick city sketch",
    distance: "5.7 miles away",
  },
  {
    id: "8",
    userId: "7",
    username: "james_illustrates",
    caption: "New editorial piece",
    distance: "6.2 miles away",
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Coffee & Sketching at Blue Bottle",
    type: "cafe",
    date: "April 24, 2026",
    time: "2:00 PM",
    location: "Blue Bottle Coffee, Downtown",
    distance: "0.8 miles away",
    organizer: "Emma Wilson",
    attendees: 2,
    maxAttendees: 6,
  },
  {
    id: "2",
    title: "Outdoor Drawing Session",
    type: "outdoor",
    date: "April 25, 2026",
    time: "11:00 AM",
    location: "Boston Common Park",
    distance: "1.2 miles away",
    organizer: "Mike Rivera",
    attendees: 3,
    maxAttendees: 6,
  },
  {
    id: "3",
    title: "Museum of Fine Arts Visit",
    type: "museum",
    date: "April 27, 2026",
    time: "1:00 PM",
    location: "Museum of Fine Arts Boston",
    distance: "2.3 miles away",
    organizer: "James Lee",
    attendees: 4,
    maxAttendees: 6,
  },
  {
    id: "4",
    title: "Art Game Night",
    type: "game",
    date: "April 26, 2026",
    time: "6:30 PM",
    location: "Sarah's Studio, Cambridge",
    distance: "3.1 miles away",
    organizer: "Sarah Chen",
    attendees: 5,
    maxAttendees: 6,
  },
  {
    id: "5",
    title: "Art Supply Store Haul",
    type: "store",
    date: "April 28, 2026",
    time: "3:00 PM",
    location: "Blick Art Materials, Boston",
    distance: "1.5 miles away",
    organizer: "Lily Chen",
    attendees: 1,
    maxAttendees: 6,
  },
];
