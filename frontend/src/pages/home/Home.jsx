import { useState } from "react";
import "./Home.css";

import SearchBar from "../../components/SearchBar/SearchBar";
import SearchButton from "../../components/searchButton/SearchButton";
import fetchFacility from "../../api/nursing-facilities";

function HomePage() {
  const [ccn, setCcn] = useState("");
  const [facility, setFacility] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchFacility(ccn);
      setFacility(data);
      console.log(facility);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header>
        <text className="headerLeftText">Search Nursing Facilities</text>
        <text className="headerRightText">MEDELITE</text>
      </header>
      <main>
        <text className="title">Input CCN:</text>
        <search>
          <SearchBar cnn={ccn} setCcn={setCcn} />
          <SearchButton onSearch={handleSearch} />
        </search>
      </main>
    </div>
  );
}

export default HomePage;
