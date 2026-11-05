import express from "express";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Every transaction route needs a logged-in user
router.use(protect);

router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router;
