export default function FiltersBar({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <div className="filters">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title..."
      />

      <select value={typeFilter} onChange={(e) => onTypeFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="dateDesc">Newest date</option>
        <option value="dateAsc">Oldest date</option>
        <option value="amountDesc">Highest amount</option>
        <option value="amountAsc">Lowest amount</option>
      </select>
    </div>
  );
}
