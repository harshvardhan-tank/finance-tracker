// Change these two lines to use another currency (e.g. "en-US" and "USD")
const LOCALE = "en-IN";
const CURRENCY = "INR";

export const formatCurrency = (value) =>
  new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY, maximumFractionDigits: 2 }).format(
    value || 0
  );

export const formatDate = (date) =>
  new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));

// "2026-11-01" style string for <input type="date">
export const toInputDate = (date = new Date()) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
};

export const CATEGORIES = {
  income: ["Salary", "Freelance", "Business", "Investments", "Gift", "Other Income"],
  expense: [
    "Food",
    "Rent",
    "Transport",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other Expense",
  ],
};

export const ALL_CATEGORIES = [...CATEGORIES.income, ...CATEGORIES.expense];

// Totals for income, expense and balance
export const calculateTotals = (transactions) => {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
};

// Download transactions as a CSV file (opens in Excel / Google Sheets)
export const exportToCSV = (transactions) => {
  const header = ["Date", "Type", "Category", "Amount", "Notes"];
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = transactions.map((t) =>
    [toInputDate(t.date), t.type, t.category, t.amount, t.notes].map(escape).join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transactions-${toInputDate()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
