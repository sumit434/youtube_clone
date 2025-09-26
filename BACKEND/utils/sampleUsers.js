import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const sampleUsers = [
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e6",
    name: "John Doe",
    username: "john123",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e7",
    name: "Jane Smith",
    username: "jane456",
    email: "jane@example.com",
    password: bcrypt.hashSync("password123", salt),
  },
  // --- 10 NEW USERS BELOW ---
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e8",
    name: "Alice Johnson",
    username: "alice_j",
    email: "alice@example.com",
    password: bcrypt.hashSync("securepass", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e9",
    name: "Bob Williams",
    username: "bobbyw",
    email: "bob@example.com",
    password: bcrypt.hashSync("mysecret", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ea",
    name: "Charlie Brown",
    username: "charlieb",
    email: "charlie@example.com",
    password: bcrypt.hashSync("cbandco", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5eb",
    name: "Diana Prince",
    username: "wondergal",
    email: "diana@example.com",
    password: bcrypt.hashSync("lassoftime", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ec",
    name: "Ethan Hunt",
    username: "etanhunt",
    email: "ethan@example.com",
    password: bcrypt.hashSync("impossibl3", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ed",
    name: "Fiona Glenn",
    username: "fionag",
    email: "fiona@example.com",
    password: bcrypt.hashSync("fglennpass", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ee",
    name: "George Harris",
    username: "george_h",
    email: "george@example.com",
    password: bcrypt.hashSync("gpass789", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5ef",
    name: "Hannah Lee",
    username: "hannah_l",
    email: "hannah@example.com",
    password: bcrypt.hashSync("hannahsec", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5f0",
    name: "Ivy Moran",
    username: "ivym",
    email: "ivy@example.com",
    password: bcrypt.hashSync("ivysecret", salt),
  },
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5f1",
    name: "Jack King",
    username: "jack_k",
    email: "jack@example.com",
    password: bcrypt.hashSync("jkingpass", salt),
  },
];

export default sampleUsers;