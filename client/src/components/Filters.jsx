import { ALL_CATEGORIES, CATEGORIES } from "../utils/format.js";

export const emptyFilters = { type: "", category: "", startDate: "", endDate: "" };

export default function Filters({ filters, setFilters }) {
  const categories = filters.type ? CATEGORIES[filters.type] : ALL_CATEGORIES;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") return setFilters({ ...filters, type: value, category: "" });
    setFilters({ ...filters, [name]: value });
  };

  const isActive = Object.values(filters).some(Boolean);

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {isActive && (
          <button onClick={() => setFilters(emptyFilters)} className="text-sm font-medium text-emerald-600 hover:underline">
            Clear all
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div>
          <label className="label" htmlFor="f-type">Type</label>
          <select id="f-type" name="type" className="input" value={filters.type} onChange={handleChange}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-category">Category</label>
          <select id="f-category" name="category" className="input" value={filters.category} onChange={handleChange}>
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-start">From</label>
          <input id="f-start" name="startDate" type="date" className="input" value={filters.startDate} onChange={handleChange} />
        </div>
        <div>
          <label className="label" htmlFor="f-end">To</label>
          <input id="f-end" name="endDate" type="date" className="input" value={filters.endDate} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
