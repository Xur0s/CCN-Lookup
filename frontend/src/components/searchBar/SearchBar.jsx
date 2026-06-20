import "./SearchBar.css";

function SearchBar({ ccn, setCcn }) {
  return (
    <div className="searchBox">
      <input
        className="searchInput"
        type="text"
        value={ccn}
        onChange={(c) => setCcn(c.target.value)}
        placeholder="CCN"
      />
    </div>
  );
}

export default SearchBar;
