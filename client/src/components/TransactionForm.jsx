import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, toInputDate } from "../utils/format.js";

const emptyForm = () => ({ type: "expense", amount: "", category: "", date: toInputDate(), notes: "" });

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // When the type changes, reset the category (income & expense have different lists)
    if (name === "type") return setForm({ ...form, type: value, category: "" });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return toast.error("Enter an amount greater than 0");
    if (!form.category) return toast.error("Please choose a category");
    if (!form.date) return toast.error("Please choose a date");

    setSaving(true);
    const ok = await onAdd({ ...form, amount });
    setSaving(false);
    if (ok) setForm({ ...emptyForm(), type: form.type });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-lg font-semibold">Add transaction</h2>

      {/* Income / Expense switch */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        {["expense", "income"].map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => handleChange({ target: { name: "type", value: t } })}
            className={`rounded-md py-2 text-sm font-semibold capitalize transition ${
              form.type === t
                ? t === "income"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-rose-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        <label className="label" htmlFor="amount">Amount</label>
        <input id="amount" name="amount" type="number" min="0" step="0.01" className="input"
          placeholder="0.00" value={form.amount} onChange={handleChange} />
      </div>

      <div>
        <label className="label" htmlFor="category">Category</label>
        <select id="category" name="category" className="input" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {CATEGORIES[form.type].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="date">Date</label>
        <input id="date" name="date" type="date" className="input" value={form.date} onChange={handleChange} />
      </div>

      <div>
        <label className="label" htmlFor="notes">Notes (optional)</label>
        <input id="notes" name="notes" className="input" maxLength={200} placeholder="e.g. Dinner with friends"
          value={form.notes} onChange={handleChange} />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={saving}>
        {saving ? "Saving..." : `Add ${form.type}`}
      </button>
    </form>
  );
}
