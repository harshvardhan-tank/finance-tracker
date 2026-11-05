import { formatCurrency } from "../utils/format.js";

// Reusable single stat card
function StatCard({ label, value, icon, color }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${color}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="truncate text-xl font-bold sm:text-2xl">{formatCurrency(value)}</p>
      </div>
    </div>
  );
}

export default function StatsCards({ totals }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total Income" value={totals.income} icon="⬆️" color="bg-emerald-100 dark:bg-emerald-900/40" />
      <StatCard label="Total Expense" value={totals.expense} icon="⬇️" color="bg-rose-100 dark:bg-rose-900/40" />
      <StatCard
        label="Balance"
        value={totals.balance}
        icon="🏦"
        color={totals.balance >= 0 ? "bg-sky-100 dark:bg-sky-900/40" : "bg-amber-100 dark:bg-amber-900/40"}
      />
    </div>
  );
}
