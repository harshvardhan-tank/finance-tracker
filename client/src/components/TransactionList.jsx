import { useState } from "react";
import { formatCurrency, formatDate, exportToCSV } from "../utils/format.js";

const PAGE_SIZE = 10;

export default function TransactionList({ transactions, onDelete, loading }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <div className="card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">
          Transactions <span className="text-sm font-normal text-slate-500">({transactions.length})</span>
        </h2>
        <button className="btn-ghost" onClick={() => exportToCSV(transactions)} disabled={!transactions.length}>
          ⬇ Export CSV
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          <p className="text-3xl">🧾</p>
          <p className="mt-2">No transactions yet. Add your first one!</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.slice(0, visible).map((t) => (
              <li key={t._id} className="flex items-center gap-3 py-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    t.type === "income"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.category}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(t.date)}
                    {t.notes ? ` · ${t.notes}` : ""}
                  </p>
                </div>
                <p
                  className={`whitespace-nowrap font-semibold ${
                    t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}
                  {formatCurrency(t.amount)}
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this transaction?")) onDelete(t._id);
                  }}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30"
                  aria-label="Delete transaction"
                  title="Delete"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
          {visible < transactions.length && (
            <button className="btn-ghost mt-4 w-full" onClick={() => setVisible(visible + PAGE_SIZE)}>
              Show more
            </button>
          )}
        </>
      )}
    </div>
  );
}
