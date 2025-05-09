import { Article, Badge, Pothole, Task, User } from "./types";

export const dummyBadges: Badge[] = [
  {
    id: "b1",
    name: "First Report",
    icon: "🔎",
    description: "Reported your first pothole",
    earnedDate: "2023-03-15",
  },
  {
    id: "b2",
    name: "Verification Pro",
    icon: "✅",
    description: "Verified 10 reports",
    earnedDate: "2023-04-02",
  },
  {
    id: "b3",
    name: "Streak Master",
    icon: "🔥",
    description: "Maintained a 7-day streak",
    earnedDate: "2023-04-10",
  },
  {
    id: "b4",
    name: "Community Hero",
    icon: "🦸",
    description: "Helped get 5 potholes fixed",
  },
  {
    id: "b5",
    name: "Photographer",
    icon: "📸",
    description: "Submit high quality photos",
    earnedDate: "2023-03-20",
  },
];

export const dummyTasks: Task[] = [
  {
    id: "t1",
    title: "Report a Pothole",
    description: "Submit a new pothole report with a photo",
    xpReward: 50,
    completed: false,
    type: "daily",
    icon: "🔎",
  },
  {
    id: "t2",
    title: "Verify 3 Reports",
    description: "Help validate community reports",
    xpReward: 30,
    completed: true,
    type: "daily",
    icon: "✅",
  },
  {
    id: "t3",
    title: "Complete Your Profile",
    description: "Add a profile picture and bio",
    xpReward: 20,
    completed: false,
    type: "achievement",
    icon: "👤",
  },
  {
    id: "t4",
    title: "Share on Social Media",
    description: "Spread the word about PatchItUp",
    xpReward: 40,
    completed: false,
    type: "weekly",
    icon: "🔗",
  },
];

export const dummyUser: User = {
  id: "u1",
  name: "Jane Cooper",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  xp: 560,
  level: 4,
  badges: dummyBadges.slice(0, 3),
  reportsCount: 12,
  verificationsCount: 46,
  fixesCount: 7,
  joinedDate: "2023-02-28",
};

export const dummyUsers: User[] = [
  dummyUser,
  {
    id: "u2",
    name: "Alex Morgan",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    xp: 890,
    level: 7,
    badges: dummyBadges.slice(0, 4),
    reportsCount: 23,
    verificationsCount: 78,
    fixesCount: 12,
    joinedDate: "2023-01-15",
  },
  {
    id: "u3",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    xp: 720,
    level: 5,
    badges: dummyBadges.slice(0, 3),
    reportsCount: 17,
    verificationsCount: 64,
    fixesCount: 9,
    joinedDate: "2023-02-10",
  },
  {
    id: "u4",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    xp: 1250,
    level: 10,
    badges: dummyBadges,
    reportsCount: 34,
    verificationsCount: 112,
    fixesCount: 21,
    joinedDate: "2022-12-05",
  },
  {
    id: "u5",
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    xp: 430,
    level: 3,
    badges: dummyBadges.slice(0, 2),
    reportsCount: 8,
    verificationsCount: 27,
    fixesCount: 4,
    joinedDate: "2023-03-20",
  },
];

export const dummyPotholes: Pothole[] = [
  {
    id: "p1",
    image: "https://images.unsplash.com/photo-1603811434402-31e7687e2761?q=80&w=1000",
    location: {
      address: "123 Main St, Cityville",
      lat: 40.7128,
      lng: -74.006,
    },
    description: "Large pothole in the middle of the street, about 2 feet wide and 6 inches deep. Very dangerous for cyclists.",
    severity: "high",
    status: "verified",
    reportedBy: {
      userId: "u1",
      name: "Jane Cooper",
    },
    reportedDate: "2023-04-05",
    verifiedCount: 5,
    rejectedCount: 0,
    comments: [
      {
        id: "c1",
        userId: "u2",
        userName: "Alex Morgan",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "I almost had an accident because of this pothole last week!",
        date: "2023-04-06",
        likes: 3,
      },
    ],
  },
  {
    id: "p2",
    image: "https://images.unsplash.com/photo-1605077031042-28369ec65449?q=80&w=1000",
    location: {
      address: "456 Oak Avenue, Downtown",
      lat: 40.7135,
      lng: -74.009,
    },
    description: "Small but deep pothole near the curb. Has been there for months and getting worse.",
    severity: "medium",
    status: "in-progress",
    reportedBy: {
      userId: "u3",
      name: "Sarah Johnson",
    },
    reportedDate: "2023-03-28",
    verifiedCount: 3,
    rejectedCount: 1,
    comments: [
      {
        id: "c2",
        userId: "u5",
        userName: "Priya Sharma",
        userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "I called the city about this and they said they're working on it.",
        date: "2023-04-02",
        likes: 5,
      },
    ],
  },
  {
    id: "p3",
    image: "https://images.unsplash.com/photo-1605077030899-45173936bf31?q=80&w=1000",
    location: {
      address: "789 Pine Road, Westside",
      lat: 40.7140,
      lng: -74.012,
    },
    description: "Cluster of small potholes creating a bumpy section about 10 feet long.",
    severity: "low",
    status: "reported",
    reportedBy: {
      userId: "u4",
      name: "Michael Chen",
    },
    reportedDate: "2023-04-10",
    verifiedCount: 1,
    rejectedCount: 0,
    comments: [],
  },
  {
    id: "p4",
    image: "https://images.unsplash.com/photo-1605077216296-766a3b667dee?q=80&w=1000",
    location: {
      address: "234 Maple Street, Eastside",
      lat: 40.7120,
      lng: -74.002,
    },
    description: "Very large pothole at the intersection, causing traffic to slow down significantly.",
    severity: "high",
    status: "fixed",
    reportedBy: {
      userId: "u2",
      name: "Alex Morgan",
    },
    reportedDate: "2023-03-15",
    verifiedCount: 8,
    rejectedCount: 0,
    fixedDate: "2023-04-08",
    fixedImage: "https://images.unsplash.com/photo-1604009336158-2cbdea40ef97?q=80&w=1000",
    comments: [
      {
        id: "c3",
        userId: "u1",
        userName: "Jane Cooper",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "So glad this is finally fixed! Great job everyone for reporting it.",
        date: "2023-04-09",
        likes: 7,
      },
    ],
  },
  {
    id: "p5",
    image: "https://images.unsplash.com/photo-1605077135910-0801d63e2f5c?q=80&w=1000", 
    location: {
      address: "567 Elm Boulevard, Northside",
      lat: 40.7145,
      lng: -74.015,
    },
    description: "Multiple potholes on both sides of the street. Been growing larger with recent rains.",
    severity: "medium",
    status: "verified",
    reportedBy: {
      userId: "u5",
      name: "Priya Sharma",
    },
    reportedDate: "2023-04-02",
    verifiedCount: 4,
    rejectedCount: 1,
    comments: [
      {
        id: "c4",
        userId: "u3",
        userName: "Sarah Johnson",
        userAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
        text: "This section is terrible for driving. Hope it gets fixed soon!",
        date: "2023-04-04",
        likes: 2,
      },
    ],
  },
  {
    id: "p6",
    image: "https://images.unsplash.com/photo-1605077193734-866ed2b2b494?q=80&w=1000",
    location: {
      address: "123 Railway Road, Southside",
      lat: 40.7125,
      lng: -74.010,
    },
    description: "Deep pothole near the bus stop, causing problems for elderly pedestrians.",
    severity: "high",
    status: "reported",
    reportedBy: {
      userId: "u3",
      name: "Sarah Johnson",
    },
    reportedDate: "2023-04-12",
    verifiedCount: 0,
    rejectedCount: 0,
    comments: [],
  },
  {
    id: "p7",
    image: "https://images.unsplash.com/photo-1604009677692-1f96daa1f3c8?q=80&w=1000",
    location: {
      address: "456 College Street, University Area",
      lat: 40.7130,
      lng: -74.018,
    },
    description: "Small pothole growing rapidly after recent rains. Located right at the pedestrian crossing.",
    severity: "medium",
    status: "reported",
    reportedBy: {
      userId: "u2",
      name: "Alex Morgan",
    },
    reportedDate: "2023-04-11",
    verifiedCount: 0,
    rejectedCount: 0,
    comments: [],
  },
  {
    id: "p8",
    image: "https://images.unsplash.com/photo-1555685812-4b8f286284ad?q=80&w=1000",
    location: {
      address: "789 Market Street, Shopping District",
      lat: 40.7126,
      lng: -74.014,
    },
    description: "Several small potholes clustered in the parking area, causing difficulty for shoppers.",
    severity: "low",
    status: "reported",
    reportedBy: {
      userId: "u1",
      name: "Jane Cooper",
    },
    reportedDate: "2023-04-09",
    verifiedCount: 0,
    rejectedCount: 0,
    comments: [],
  },
  {
    id: "p9",
    image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=1000",
    location: {
      address: "321 Industrial Parkway, Factory Zone",
      lat: 40.7150,
      lng: -74.020,
    },
    description: "Large pothole blocking drainage, causing water buildup during rains. Hazardous for trucks.",
    severity: "high",
    status: "reported",
    reportedBy: {
      userId: "u4",
      name: "Michael Chen",
    },
    reportedDate: "2023-04-08",
    verifiedCount: 0,
    rejectedCount: 0,
    comments: [],
  },
  {
    id: "p10",
    image: "https://images.unsplash.com/photo-1596645661337-1e643877df0e?q=80&w=1000",
    location: {
      address: "987 Hillside Drive, Residential Area",
      lat: 40.7118,
      lng: -74.011,
    },
    description: "Medium-sized pothole causing noise when vehicles pass over it, disrupting residents.",
    severity: "medium",
    status: "reported",
    reportedBy: {
      userId: "u5",
      name: "Priya Sharma",
    },
    reportedDate: "2023-04-07",
    verifiedCount: 0,
    rejectedCount: 0,
    comments: [],
  }
];

export const dummyArticles: Article[] = [
  {
    id: "a1",
    title: "The Growing Pothole Crisis: How Citizens Are Fighting Back",
    excerpt: "With infrastructure funding at historic lows, communities are taking matters into their own hands.",
    imageUrl: "https://images.unsplash.com/photo-1625224153297-741c97ae5685?q=80&w=1000",
    date: "2023-04-01",
    author: {
      name: "Rakesh Sharma",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    category: "Community Action",
    readTime: 5,
  },
  {
    id: "a2",
    title: "Using RTI to Demand Better Roads: A Step-by-Step Guide",
    excerpt: "Learn how the Right to Information Act can be a powerful tool for holding authorities accountable.",
    imageUrl: "https://images.unsplash.com/photo-1517330225264-d354cc0bc5a4?q=80&w=1000",
    date: "2023-03-20",
    author: {
      name: "Anita Desai",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    category: "Legal Resources",
    readTime: 8,
  },
  {
    id: "a3",
    title: "The Real Cost of Bad Roads: Accidents, Vehicle Damage, and Economic Impact",
    excerpt: "Studies show that poor road conditions cost the average driver over ₹10,000 annually in vehicle repairs.",
    imageUrl: "https://images.unsplash.com/photo-1527669538811-88bd89cb2774?q=80&w=1000",
    date: "2023-03-15",
    author: {
      name: "Dr. Vikram Patel",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    category: "Research",
    readTime: 6,
  },
  {
    id: "a4",
    title: "Success Story: How One Neighborhood Got All Their Potholes Fixed in a Month",
    excerpt: "The residents of Green Park show how organized community action can produce remarkable results.",
    imageUrl: "https://images.unsplash.com/photo-1531218614303-d8fdc5d10288?q=80&w=1000",
    date: "2023-02-28",
    author: {
      name: "Maya Singh",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    category: "Success Stories",
    readTime: 4,
  },
];
