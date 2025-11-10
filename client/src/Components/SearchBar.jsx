const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or category..."
      className="w-full p-3 border rounded-lg mb-6 outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
