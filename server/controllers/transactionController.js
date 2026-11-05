import Transaction from "../models/Transaction.js";

// GET /api/transactions
// Optional filters: ?type=income|expense&category=Food&startDate=2026-01-01&endDate=2026-01-31
export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const filter = { user: req.user._id };

    if (type && ["income", "expense"].includes(type)) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // include the whole end day
        filter.date.$lte = end;
      }
    }

    const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// POST /api/transactions
export const addTransaction = async (req, res, next) => {
  try {
    const { type, amount, category, date, notes } = req.body;
    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      date,
      notes,
    });
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req, res, next) => {
  try {
    const { type, amount, category, date, notes } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // only the owner can edit
      { type, amount, category, date, notes },
      { new: true, runValidators: true }
    );
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // only the owner can delete
    });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
