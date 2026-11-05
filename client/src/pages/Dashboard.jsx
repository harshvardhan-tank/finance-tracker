import { useEffect, useMemo, useState, useCallback } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import StatsCards from "../components/StatsCards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import Filters, { emptyFilters } from "../components/Filters.jsx";
import { CategoryPieChart, MonthlyBarChart } from "../components/Charts.jsx";
import { calculateTotals } from "../utils/format.js";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(emptyFilters);

  // Load all of this user's transactions from the backend
  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Filters are applied in the browser so charts update instantly
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date);
      if (filters.type && t.type !== filters.type) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.startDate && d < new Date(filters.startDate + "T00:00:00")) return false;
      if (filters.endDate && d > new Date(filters.endDate + "T23:59:59")) return false;
      return true;
    });
  }, [transactions, filters]);

  const totals = useMemo(() => calculateTotals(filtered), [filtered]);

  const addTransaction = async (payload) => {
    try {
      const { data } = await api.post("/transactions", payload);
      setTransactions((prev) =>
        [data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      toast.success(`${payload.type === "income" ? "Income" : "Expense"} added`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  };

  // Optimistic delete: remove from the screen first, put it back if the server fails
  const deleteTransaction = async (id) => {
    const previous = transactions;
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Transaction deleted");
    } catch (error) {
      setTransactions(previous);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {greeting()}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Here's your money at a glance.</p>
        </div>

        <StatsCards totals={totals} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TransactionForm onAdd={addTransaction} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
            <CategoryPieChart transactions={filtered} />
            <MonthlyBarChart transactions={filtered} />
          </div>
        </div>

        <Filters filters={filters} setFilters={setFilters} />
        <TransactionList transactions={filtered} onDelete={deleteTransaction} loading={loading} />
      </main>
    </div>
  );
}
