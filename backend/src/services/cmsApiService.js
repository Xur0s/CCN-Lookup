import axios from "axios";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UpstreamError } from "../errors/UpstreamError.js";
import {
  fetchClaimsUuid,
  fetchFacilityUuid,
  getClaimsUuid,
  getFacilityUuid,
} from "./cmsDataStores.js";
import { isInvalidDistributionError } from "./cmsErrors.js";
import uuidRetry from "./requestWithUuidRetry.js";
import requestWithUuidRetry from "./requestWithUuidRetry.js";

const CMS_PROVIDER_URL =
  "https://data.cms.gov/provider-data/api/1/datastore/sql?query=";

async function fetchRows(ccn, uuid) {
  const SQL_QUERY =
    `[SELECT * FROM ${uuid}]` +
    `[WHERE cms_certification_number_ccn = "${ccn}"]`;

  const response = await axios.get(
    `${CMS_PROVIDER_URL}${SQL_QUERY};&show_db_columns`,
  );

  return Array.isArray(response.data) ? response.data : [];
}

// Facility Data
async function getFacilityData(ccn) {
  try {
    const data = await requestWithUuidRetry({
      getUuid: getFacilityUuid,
      fetchUuid: fetchFacilityUuid,
      request: async (uuid) => fetchRows(ccn, uuid),
    });

    if (data.length === 0) {
      throw new NotFoundError(`No facility data found for CCN: ${ccn}`);
    }

    const facility = data[0];

    const REQUIRED_FIELDS = [
      "cms_certification_number_ccn",
      "provider_name",
      "provider_address",
      "citytown",
      "state",
      "zip_code",
      "number_of_certified_beds",
      "overall_rating",
      "health_inspection_rating",
      "qm_rating",
      "longstay_qm_rating",
      "shortstay_qm_rating",
      "staffing_rating",
      "location",
    ];

    // Checks if any fields is missing for the data
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => facility[field] === undefined || facility[field] === null,
    );

    if (missingFields.length > 0) {
      console.warn(
        `Facility CCN ${facility.cms_certification_number_ccn} is missing fields: ${missingFields.join(", ")}`,
      );
    }

    return {
      ccn: facility.cms_certification_number_ccn,
      provider_name: facility.provider_name,
      address: facility.provider_address,
      city: facility.citytown,
      state: facility.state,
      zip_code: facility.zip_code,
      census_capacity: facility.number_of_certified_beds,
      ratings: {
        overall: facility.overall_rating,
        health_inspection: facility.health_inspection_rating,
        qm: facility.qm_rating,
        longstay_qm: facility.longstay_qm_rating,
        shortstay_qm: facility.shortstay_qm_rating,
        staffing: facility.staffing_rating,
      },
      location: facility.location,
    };
  } catch (err) {
    throw new UpstreamError(
      `Unable to retrieve facility data for CCN: ${ccn}`,
      err,
    );
  }
}

// Claims Data
async function getClaimsData(ccn) {
  try {
    const data = await requestWithUuidRetry({
      getUuid: getClaimsUuid,
      fetchUuid: fetchClaimsUuid,
      request: async (uuid) => fetchRows(ccn, uuid),
    });

    if (data.length === 0) {
      throw new NotFoundError(`No claims data found for CCN: ${ccn}`);
    }

    const REQUIRED_FIELDS = [
      "record_number",
      "measure_code",
      "measure_description",
      "resident_type",
      "adjusted_score",
      "observed_score",
      "expected_score",
      "processing_date",
    ];

    // Checks if any fields is missing for each row of data
    for (const row of data) {
      const missingFields = REQUIRED_FIELDS.filter(
        (field) => row[field] === undefined || row[field] === null,
      );

      if (missingFields.length > 0) {
        console.warn(
          `Record ${row.record_number} is missing fields: ${missingFields.join(", ")}`,
        );
      }
    }

    const claims = data.map((result) => ({
      record_number: result.record_number,
      measure_code: result.measure_code,
      measure_description: result.measure_description,
      resident_type: result.resident_type,
      adjusted_score: result.adjusted_score,
      observed_score: result.observed_score,
      expected_score: result.expected_score,
      processing_date: result.processing_date,
    }));

    return claims;
  } catch (err) {
    throw new UpstreamError(
      `Unable to retrieve claims data for CCN: ${ccn}`,
      err,
    );
  }
}

export { getFacilityData, getClaimsData };
