// utils/sampleChannels.js
const sampleChannels = [
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e6",
    channelName: "John's Channel",
    description: "All about coding",
    userId: "64f3c2b1f1a0d1a2b3c4d5e6",
    photoUrl: "https://images.pexels.com/photos/33769490/pexels-photo-33769490.jpeg",
    bannerUrl: "https://images.pexels.com/photos/33045172/pexels-photo-33045172.jpeg",
    subscribersCount: 100,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e7",
    channelName: "Jane's Channel",
    description: "Cooking tutorials",
    userId: "64f3c2b1f1a0d1a2b3c4d5e7",
    photoUrl: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg",
    bannerUrl: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg",
    subscribersCount: 120,
  },
  // --- 10 NEW CHANNELS BELOW (Linked to new user IDs) ---
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e8", // New unique Channel ID
    channelName: "Alice's Art Studio",
    description: "Digital painting and drawing streams.",
    userId: "64f3c2b1f1a0d1a2b3c4d5e8", // Linked to Alice Johnson
    photoUrl: "https://images.pexels.com/photos/4442008/pexels-photo-4442008.jpeg",
    bannerUrl: "https://images.pexels.com/photos/15867160/pexels-photo-15867160.jpeg",
    subscribersCount: 450,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e9",
    channelName: "Bob's Gaming Hub",
    description: "Let's plays and retro game reviews.",
    userId: "64f3c2b1f1a0d1a2b3c4d5e9", // Linked to Bob Williams
    photoUrl: "https://images.pexels.com/photos/19515939/pexels-photo-19515939.jpeg",
    bannerUrl: "https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg",
    subscribersCount: 880,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ea",
    channelName: "Charlie's Comics",
    description: "Comic book collecting and movie news.",
    userId: "64f3c2b1f1a0d1a2b3c4d5ea", // Linked to Charlie Brown
    photoUrl: "https://images.pexels.com/photos/17614488/pexels-photo-17614488.jpeg",
    bannerUrl: "https://images.pexels.com/photos/17614488/pexels-photo-17614488.jpeg",
    subscribersCount: 320,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5eb",
    channelName: "Wondrous Fitness",
    description: "Workout routines and healthy living tips.",
    userId: "64f3c2b1f1a0d1a2b3c4d5eb", // Linked to Diana Prince
    photoUrl: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    bannerUrl: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    subscribersCount: 1500,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ec",
    channelName: "Mission Tech",
    description: "Reviews of the latest gadgets and software.",
    userId: "64f3c2b1f1a0d1a2b3c4d5ec", // Linked to Ethan Hunt
    photoUrl: "https://images.pexels.com/photos/2007624/pexels-photo-2007624.jpeg",
    bannerUrl: "https://images.pexels.com/photos/2007624/pexels-photo-2007624.jpeg",
    subscribersCount: 950,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ed",
    channelName: "Fiona's Finance",
    description: "Personal finance and investment strategies.",
    userId: "64f3c2b1f1a0d1a2b3c4d5ed", // Linked to Fiona Glenn
    photoUrl: "https://images.pexels.com/photos/5412497/pexels-photo-5412497.jpeg",
    bannerUrl: "https://images.pexels.com/photos/5412497/pexels-photo-5412497.jpeg",
    subscribersCount: 2100,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ee",
    channelName: "Geo Adventures",
    description: "Travel vlogs and hidden gems worldwide.",
    userId: "64f3c2b1f1a0d1a2b3c4d5ee", // Linked to George Harris
    photoUrl: "https://images.pexels.com/photos/4014138/pexels-photo-4014138.jpeg",
    bannerUrl: "https://images.pexels.com/photos/4014138/pexels-photo-4014138.jpeg",
    subscribersCount: 610,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ef",
    channelName: "Hanna's Home Decor",
    description: "DIY and interior design projects.",
    userId: "64f3c2b1f1a0d1a2b3c4d5ef", // Linked to Hannah Lee
    photoUrl: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
    bannerUrl: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
    subscribersCount: 770,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5f0",
    channelName: "Ivy's Inquiry",
    description: "Science experiments and fun facts.",
    userId: "64f3c2b1f1a0d1a2b3c4d5f0", // Linked to Ivy Moran
    photoUrl: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg",
    bannerUrl: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg",
    subscribersCount: 1100,
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5f1",
    channelName: "Jack of All Trades",
    description: "Woodworking and general repair tutorials.",
    userId: "64f3c2b1f1a0d1a2b3c4d5f1", // Linked to Jack King
    photoUrl: "https://images.pexels.com/photos/2454564/pexels-photo-2454564.jpeg",
    bannerUrl: "https://images.pexels.com/photos/2454564/pexels-photo-2454564.jpeg",
    subscribersCount: 550,
  },
];

export default sampleChannels;