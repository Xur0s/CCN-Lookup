export const facilityFields = [
  {
    key: "Name of Facility",
    input_type: "text",
    source: ["api", "manual"],
    api_key: ["provider_name"],
  },
  {
    key: "Location",
    input_type: "",
    source: ["api"],
    api_key: ["location"],
  },
  { key: "EMR", input_type: "text", source: ["manual"] },
  {
    key: "Census Capacity",
    input_type: "",
    source: ["api"],
    api_key: ["census_capacity"],
  },
  { key: "Current Census", input_type: "number", source: ["manual"] },
  { key: "Type of Patient", input_type: "text", source: ["manual"] },
  {
    key: "Previous Coverage from Medelite",
    input_type: "dropdown",
    source: ["manual"],
    drop_down: ["Yes", "No"],
  },
  {
    key: "Previous Provider Performance from Medelite",
    input_type: "text",
    source: ["manual"],
  },
  { key: "Medical Coverage", input_type: "text", source: ["manual"] },
  {
    key: "Overall Rating",
    input_type: "",
    source: ["api"],
    api_key: ["ratings", "overall"],
  },
  {
    key: "Health Inspection Rating",
    input_type: "",
    source: ["api"],
    api_key: ["ratings", "health_inspection"],
  },
  {
    key: "Staffing Rating",
    input_type: "",
    source: ["api"],
    api_key: ["ratings", "staffing"],
  },
  {
    key: "Quality Care Rating",
    input_type: "",
    source: ["api"],
    api_key: ["ratings", "qm"],
  },
];
