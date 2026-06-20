import "./SearchButton.css";

function SearchButton({ onSearch }) {
  return (
    <div>
      <button className="searchButton" type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchButton;
