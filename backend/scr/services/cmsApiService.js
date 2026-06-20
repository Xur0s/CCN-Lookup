import axios from "axios";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UpstreamError } from "../errors/UpStreamError.js";

const CMS_PROVIDER_URL =
  "https://data.cms.gov/provider-data/api/1/datastore/sql?query=";
const DATA_STORE_UUID = "588f22e8-145d-5db5-baff-f59ce253316c";

async function getFacilityData(ccn) {
  try {
    const SQL_QUERY =
      `[SELECT * FROM ${DATA_STORE_UUID}]` +
      `[WHERE cms_certification_number_ccn = "${ccn}"]`;

    const response = await axios.get(
      `${CMS_PROVIDER_URL}${SQL_QUERY};&show_db_columns`,
    );

    const data = response.data ?? [];
    if (data.length === 0) {
      throw new NotFoundError(`No data found for CCN: ${ccn}`);
    }

    const facility = data[0];

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
    };
  } catch (err) {
    throw new UpstreamError(
      `Unable to retrieve facility data for CCN: ${ccn}`,
      err,
    );
  }
}

export default getFacilityData;
