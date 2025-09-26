const sampleVideos = [
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5fa",
    title: "Learn React in 30 Minutes",
    description: "Quick React tutorial for beginners",
    url: "https://www.pexels.com/download/video/2516160/",
    thumbnail: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e6", // John's Channel (Code)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e6",
    status: "public",
    views: 1500,
    category: "Web Dev", // Updated category to match John's theme
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5fb",
    title: "Cooking Pasta in 10 Minutes",
    description: "Easy pasta recipe",
    url: "https://www.pexels.com/download/video/4253144/",
    thumbnail: "https://images.pexels.com/photos/4057692/pexels-photo-4057692.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e7", // Jane's Channel (Cooking)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e7",
    status: "public",
    views: 800,
    category: "Cooking",
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5fc",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into JS",
    url: "https://www.pexels.com/download/video/4709297/",
    thumbnail: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e6", // John's Channel (Code)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e6",
    status: "public",
    views: 2000,
    category: "Web Dev",
  },
  // --- 22 NEW VIDEOS BELOW ---

  // 1. All (General/Mix)
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5fd",
    title: "A Day in My Life as a Creator",
    description: "A fun look behind the scenes.",
    url: "https://www.pexels.com/download/video/6507467/",
    thumbnail: "https://images.pexels.com/photos/11664907/pexels-photo-11664907.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e7", // Jane's Channel
    channelId: "64f3c2b1f1a0d1a2b3c4d5e7",
    status: "public",
    views: 1100,
    category: "All",
  },
  // 2. Tech
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5fe",
    title: "Reviewing the Latest Smartphone",
    description: "In-depth review of the newest flagship phone.",
    url: "https://www.pexels.com/download/video/8028710/",
    thumbnail: "https://images.pexels.com/photos/4048091/pexels-photo-4048091.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ec", // Ethan's Channel (Mission Tech)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ec",
    status: "public",
    views: 5500,
    category: "Tech",
  },
  // 3. Gaming
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ff",
    title: "Top 10 RPG Games of All Time",
    description: "Counting down the best role-playing games.",
    url: "https://www.pexels.com/download/video/7667862/",
    thumbnail: "https://images.pexels.com/photos/7046717/pexels-photo-7046717.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e9", // Bob's Channel (Gaming Hub)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e9",
    status: "public",
    views: 1800,
    category: "Gaming",
  },
  // 4. Music
  {
    _id: "64f3c2b1f1a0d1a2b3c4d600",
    title: "Acoustic Guitar Cover: Perfect",
    description: "Relaxing acoustic rendition of a classic song.",
    url: "https://www.pexels.com/download/video/7148257/",
    thumbnail: "https://images.pexels.com/photos/7149156/pexels-photo-7149156.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e8", // Alice's Channel (Art/Creative)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e8",
    status: "public",
    views: 900,
    category: "Music",
  },
  // 5. Automotive
  {
    _id: "64f3c2b1f1a0d1a2b3c4d601",
    title: "How to Change Your Oil at Home",
    description: "Step-by-step guide to a simple car repair.",
    url: "https://www.pexels.com/download/video/8469665/",
    thumbnail: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5f1", // Jack's Channel (DIY/Repair)
    channelId: "64f3c2b1f1a0d1a2b3c4d5f1",
    status: "public",
    views: 750,
    category: "Automotive",
  },
  // 6. Web Dev (Already covered, using Learning as a secondary)
  {
    _id: "64f3c2b1f1a0d1a2b3c4d602",
    title: "Next.js for Beginners: Full Stack App",
    description: "Build a complete web app with Next.js.",
    url: "https://www.pexels.com/download/video/4974708/",
    thumbnail: "https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e6", // John's Channel (Code)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e6",
    status: "public",
    views: 3500,
    category: "Web Dev",
  },
  // 7. Sports
  {
    _id: "64f3c2b1f1a0d1a2b3c4d603",
    title: "Best Basketball Dunks of the Decade",
    description: "A compilation of incredible plays.",
    url: "https://www.pexels.com/download/video/30514807/",
    thumbnail: "https://images.pexels.com/photos/5586443/pexels-photo-5586443.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e9", // Bob's Channel (Gaming/Misc)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e9",
    status: "public",
    views: 1900,
    category: "Sports",
  },
  // 8. Design
  {
    _id: "64f3c2b1f1a0d1a2b3c4d604",
    title: "Intro to UI/UX Principles (Figma Tutorial)",
    description: "Learn the basics of user interface design.",
    url: "https://www.pexels.com/download/video/28320042/",
    thumbnail: "https://images.pexels.com/photos/2142424/pexels-photo-2142424.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e8", // Alice's Channel (Art/Creative)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e8",
    status: "public",
    views: 2200,
    category: "Design",
  },
  // 9. Comedy
  {
    _id: "64f3c2b1f1a0d1a2b3c4d605",
    title: "Trying to Assemble IKEA Furniture Blindfolded",
    description: "Hilarious challenge video.",
    url: "https://www.pexels.com/download/video/7311984/",
    thumbnail: "https://images.pexels.com/photos/6956657/pexels-photo-6956657.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ea", // Charlie's Channel (Comics/Misc)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ea",
    status: "public",
    views: 4000,
    category: "Comedy",
  },
  // 10. Learning
  {
    _id: "64f3c2b1f1a0d1a2b3c4d606",
    title: "Speed Reading Techniques: Read Faster Today",
    description: "Tips and exercises to boost your reading speed.",
    url: "https://www.pexels.com/download/video/6279818/",
    thumbnail: "https://images.pexels.com/photos/6344238/pexels-photo-6344238.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5f0", // Ivy's Channel (Inquiry/Science)
    channelId: "64f3c2b1f1a0d1a2b3c4d5f0",
    status: "public",
    views: 1300,
    category: "Learning",
  },
  // 11. Cooking
  {
    _id: "64f3c2b1f1a0d1a2b3c4d607",
    title: "Baking Sourdough from Scratch",
    description: "The complete guide to artisanal sourdough bread.",
    url: "https://www.pexels.com/download/video/6222187/",
    thumbnail: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e7", // Jane's Channel (Cooking)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e7",
    status: "public",
    views: 2800,
    category: "Cooking",
  },
  // 12. Beauty
  {
    _id: "64f3c2b1f1a0d1a2b3c4d608",
    title: "15-Minute Natural Makeup Look",
    description: "Simple, everyday makeup routine.",
    url: "https://www.pexels.com/download/video/3181792/",
    thumbnail: "https://images.pexels.com/photos/6724414/pexels-photo-6724414.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ef", // Hannah's Channel (Home Decor/Misc)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ef",
    status: "public",
    views: 1400,
    category: "Beauty",
  },
  // 13. Food (Similar to cooking, but focusing on reviews/tasting)
  {
    _id: "64f3c2b1f1a0d1a2b3c4d609",
    title: "Trying the World's Spiciest Chilies",
    description: "Food challenge - can we handle the heat?",
    url: "https://www.pexels.com/download/video/7601352/",
    thumbnail: "https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5e7", // Jane's Channel (Cooking/Food)
    channelId: "64f3c2b1f1a0d1a2b3c4d5e7",
    status: "public",
    views: 4500,
    category: "Food",
  },
  // 14. Travel
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60a",
    title: "Backpacking Iceland: 7-Day Itinerary",
    description: "Vlog of our incredible trip through Iceland.",
    url: "https://www.pexels.com/download/video/32548576/",
    thumbnail: "https://images.pexels.com/photos/1840404/pexels-photo-1840404.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ee", // George's Channel (Geo Adventures)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ee",
    status: "public",
    views: 6200,
    category: "Travel",
  },
  // 15. Vlogs
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60b",
    title: "Moving Into My New Apartment (Empty Tour)",
    description: "The stress and excitement of moving house.",
    url: "https://www.pexels.com/download/video/4553296/",
    thumbnail: "https://images.pexels.com/photos/4553183/pexels-photo-4553183.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ef", // Hannah's Channel (Vlogs/Decor)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ef",
    status: "public",
    views: 2100,
    category: "Vlogs",
  },
  // 16. DIY
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60c",
    title: "How to Build a Simple Bookshelf in 1 Day",
    description: "Easy woodworking project for beginners.",
    url: "https://www.pexels.com/download/video/855422/",
    thumbnail: "https://images.pexels.com/photos/8489661/pexels-photo-8489661.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5f1", // Jack's Channel (DIY/Woodworking)
    channelId: "64f3c2b1f1a0d1a2b3c4d5f1",
    status: "public",
    views: 3100,
    category: "DIY",
  },
  // 17. Finance
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60d",
    title: "Beginner's Guide to Stock Market Investing",
    description: "Understanding stocks, bonds, and mutual funds.",
    url: "https://www.pexels.com/download/video/6799666/",
    thumbnail: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ed", // Fiona's Channel (Finance)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ed",
    status: "public",
    views: 8500,
    category: "Finance",
  },
  // 18. Science
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60e",
    title: "What is Quantum Entanglement? Explained Simply",
    description: "Breaking down complex physics concepts.",
    url: "https://www.pexels.com/download/video/25744127/",
    thumbnail: "https://images.pexels.com/photos/25626446/pexels-photo-25626446.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5f0", // Ivy's Channel (Science Inquiry)
    channelId: "64f3c2b1f1a0d1a2b3c4d5f0",
    status: "public",
    views: 5000,
    category: "Science",
  },
  // 19. Fashion
  {
    _id: "64f3c2b1f1a0d1a2b3c4d60f",
    title: "Spring Lookbook: Casual Chic Outfits",
    description: "Ideas for refreshing your wardrobe.",
    url: "https://www.pexels.com/download/video/5125501/",
    thumbnail: "https://images.pexels.com/photos/33995877/pexels-photo-33995877.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5eb", // Diana's Channel (Fitness/Misc)
    channelId: "64f3c2b1f1a0d1a2b3c4d5eb",
    status: "public",
    views: 1600,
    category: "Fashion",
  },
  // 20. News
  {
    _id: "64f3c2b1f1a0d1a2b3c4d610",
    title: "Weekly Tech News Roundup - Sept 2025",
    description: "The biggest headlines in the world of technology this week.",
    url: "https://www.pexels.com/download/video/6963479/",
    thumbnail: "https://images.pexels.com/photos/13035751/pexels-photo-13035751.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5ec", // Ethan's Channel (Mission Tech)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ec",
    status: "public",
    views: 3800,
    category: "News",
  },
  // 21. Photography
  {
    _id: "64f3c2b1f1a0d1a2b3c4d611",
    title: "Landscape Photography: Composition Tips",
    description: "How to frame breathtaking outdoor shots.",
    url: "https://www.pexels.com/download/video/4205697/",
    thumbnail: "https://www.pexels.com/photo/islands-in-ocean-16671170/",
    channel: "64f3c2b1f1a0d1a2b3c4d5ee", // George's Channel (Travel/Geo)
    channelId: "64f3c2b1f1a0d1a2b3c4d5ee",
    status: "public",
    views: 2700,
    category: "Photography",
  },
  // 22. Fitness
  {
    _id: "64f3c2b1f1a0d1a2b3c4d612",
    title: "Full Body 30-Minute HIIT Workout",
    description: "No equipment necessary, high-intensity interval training.",
    url: "https://www.pexels.com/download/video/6785014/",
    thumbnail: "https://images.pexels.com/photos/6787407/pexels-photo-6787407.jpeg",
    channel: "64f3c2b1f1a0d1a2b3c4d5eb", // Diana's Channel (Wondrous Fitness)
    channelId: "64f3c2b1f1a0d1a2b3c4d5eb",
    status: "public",
    views: 7000,
    category: "Fitness",
  },
];

export default sampleVideos;