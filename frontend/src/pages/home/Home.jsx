import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import SearchBar from "../../components/SearchBar/SearchBar";
import SearchButton from "../../components/searchButton/SearchButton";

function HomePage() {
  const [ccn, setCcn] = useState("");
  const [invalidCcn, setInvalidCcn] = useState(false);
  const navigate = useNavigate();

  const isDigitsOnly = (str) => /^\d+$/.test(str);

  const handleSearch = async () => {
    const isCcnValid = (ccn) => ccn.length == 6 && isDigitsOnly(ccn);

    if (!isCcnValid(ccn)) {
      setInvalidCcn(true);
      return;
    }

    setInvalidCcn(false);
    navigate(`facility/${ccn}`);
  };

  return (
    <div>
      <header>
        <label className="headerLeftText">Search Nursing Facilities</label>
        <label className="headerRightText">MEDELITE</label>
      </header>
      <main>
        <label className="searchTitle">Input CMS Certification Number</label>
        <search>
          <SearchBar cnn={ccn} setCcn={setCcn} />

          <label
            className="invalidInput"
            style={{ visibility: invalidCcn ? "visible" : "hidden" }}
          >
            Invalid CMS Certification Number
          </label>

          <SearchButton onSearch={handleSearch} />
        </search>
      </main>
    </div>
  );
}

export default HomePage;
