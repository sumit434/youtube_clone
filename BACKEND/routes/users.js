import express from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.route("/")
  .get(protect, getUsers);

router.route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
