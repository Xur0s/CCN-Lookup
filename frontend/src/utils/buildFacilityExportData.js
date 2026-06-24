import findApiData from "./findApiData";

function buildExportData(fieldMap, apiData, form) {
  return fieldMap.map((field) => {
    const formData = form[field.key] ?? { value: "", mode: "api" };

    const apiValue = field.api_key ? findApiData(field.api_key, apiData) : null;

    const value =
      field.source?.includes("manual") && formData.mode === "manual"
        ? (formData.value ?? "")
        : (apiValue ?? "");

    return {
      key: field.key,
      value: value,
    };
  });
}

export default buildExportData;
