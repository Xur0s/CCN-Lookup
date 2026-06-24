import { useEffect, useState } from "react";

import "./FacilityData.css";
import fetchFacility from "../../api/nursing-facilities";
import { useParams } from "react-router-dom";
import TextBox from "../../components/textBox/TextBox";
import ExportButton from "../../components/exportButton/ExportButton";
import exportFacilityPdf from "../../services/exportFacilityPdf";
import buildExportData from "../../utils/buildFacilityExportData";
import findApiData from "../../utils/findApiData";
import { facilityFields } from "../../config/facilityFields";
import fetchClaims from "../../api/claims-quality";
import { claimFields } from "../../config/claimFields";

function ApiCell({ apiValue }) {
  return (
    <div>
      <label className="tableText">{apiValue ?? ""}</label>
    </div>
  );
}

function ManualCell({ inputType, patch, onChange }) {
  const value = patch?.value ?? "";

  return (
    <div>
      <TextBox
        type={inputType}
        value={value}
        onChange={(val) => onChange({ mode: "manual", value: val })}
        placeholder={""}
      />
    </div>
  );
}

function DropDownCell({ dropDownOptions, patch, onChange }) {
  const value = patch?.value ?? "";

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange({ mode: "manual", value: e.target.value })}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {dropDownOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ManualOverrideCell({
  fieldKey,
  inputType,
  apiValue,
  patch,
  onChange,
}) {
  const mode = patch?.mode || "api";
  const value = patch?.value ?? apiValue ?? "";

  return (
    <div>
      <label>
        <input
          type="radio"
          name={`${fieldKey}-radio`}
          checked={mode === "api"}
          onChange={() => {
            onChange({ mode: "api", value: apiValue ?? "" });
          }}
        />
        <span className="radioLabel">Default</span>
        <span className="radioValue">{apiValue ?? ""}</span>
      </label>

      <br />

      <label>
        <input
          type="radio"
          name={`${fieldKey}-radio`}
          checked={mode === "manual"}
          onChange={() => onChange({ mode: "manual", value: "" })}
        />
        <span className="radioLabel">Manual Input</span>
      </label>

      {mode === "manual" && (
        <div className="manualInput">
          <TextBox
            type={inputType}
            value={value}
            onChange={(val) => onChange({ mode: "manual", value: val })}
            placeholder={""}
          />
        </div>
      )}
    </div>
  );
}

function FieldCell({ field, apiData, patch, onChange }) {
  const apiValue = field.api_key ? findApiData(field.api_key, apiData) : null;

  if (field.source?.includes("api") && field.source?.includes("manual")) {
    return (
      <ManualOverrideCell
        fieldKey={field.key}
        inputType={field.input_type}
        apiValue={apiValue}
        patch={patch}
        onChange={onChange}
      />
    );
  } else if (field.source?.includes("api")) {
    return <ApiCell apiValue={apiValue} />;
  } else if (field.input_type === "dropdown" && field.drop_down) {
    return (
      <DropDownCell
        dropDownOptions={field.drop_down}
        patch={patch}
        onChange={onChange}
      />
    );
  } else {
    return (
      <ManualCell
        inputType={field.input_type}
        patch={patch}
        onChange={onChange}
      />
    );
  }
}

function FacilityDataPage() {
  const { ccn } = useParams();
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState(null);
  const [claims, setClaims] = useState(null);
  const [facilityForm, setFacilityForm] = useState({});

  const setFacilityFormField = (key, patch) =>
    setFacilityForm((prev) => {
      // If a key doesn't have a existing entry, create a default,
      // otherwise use the one they have
      const existing = prev[key] || {
        value: "",
        mode: "api",
      };

      return {
        ...prev,
        [key]: {
          ...existing,
          ...patch,
        },
      };
    });

  // Call API on mount or ccn changes
  useEffect(() => {
    async function loadFacilityData() {
      try {
        const data = await fetchFacility(ccn);
        setFacility(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function loadClaimData() {
      try {
        const data = await fetchClaims(ccn);
        setClaims(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    Promise.all([loadFacilityData(), loadClaimData()]).finally(() => {
      setLoading(false);
    });
  }, [ccn]);

  if (loading)
    return (
      <div>
        <label>loading...</label>
      </div>
    );

  // Handles formatting the data after export button is pressed and exports
  const handleExport = () => {
    const normalizedFacilityForm = buildExportData(
      facilityFields,
      facility,
      facilityForm,
    );

    const normalizedClaimsForms = claims.map((claim) =>
      buildExportData(claimFields, claim, {}),
    );

    const allForms = [normalizedFacilityForm, ...normalizedClaimsForms];

    exportFacilityPdf(allForms, ccn, facility?.state);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <label className="headerLeftText">INFINITE — Managed by MEDELITE</label>
        <label className="headerRightText">{`FACILITY ASSESSMENT SNAPSHOT - ${facility.state ?? ""}`}</label>
      </header>

      {/* Body */}
      <main>
        {/* Facility Table */}
        <table>
          {/* Top row of table */}
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* Body of Table */}
          <tbody>
            {facilityFields.map((field) => (
              <tr key={field.key}>
                <td className="leftColumn">{field.key}</td>
                <td className="rightColumn">
                  <FieldCell
                    field={field}
                    apiData={facility}
                    patch={facilityForm[field.key]}
                    onChange={(patch) => setFacilityFormField(field.key, patch)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {claims?.map((claim) => (
          <table key={claim.record_number}>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {claimFields.map((field) => (
                <tr key={`${field.key}-${claim.record_number}`}>
                  <td className="leftColumn">{field.key}</td>
                  <td className="rightColumn">
                    <FieldCell
                      field={field}
                      apiData={claim}
                      patch=""
                      onChange={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}

        {/* Export buttons */}
        <div className="exportButtons">
          <ExportButton buttonLabel={"Export as PDF"} onClick={handleExport} />
        </div>
      </main>
    </div>
  );
}

export default FacilityDataPage;
