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
  {
    _id: "64f3c2b1f1a0d1a2b3c4d5e9",
    name: "Bob Williams",
    username: "bobbyw",
    email: "bob@example.com",
    password: bcrypt.hashSync("mysecret", salt),
  },
];

export default sampleUsers;