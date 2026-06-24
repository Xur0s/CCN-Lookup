import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/Home";
import FacilityDataPage from "../pages/facilityData/FacilityData";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/facility/:ccn" element={<FacilityDataPage />} />
    </Routes>
  );
}

export default AppRoutes;
