import axios from "axios";

const dataStores = {
  facility: null,
  claims: null,
};

async function initializeDataStores() {
  dataStores.facility = await fetchFacilityUuid();
  dataStores.claims = await fetchClaimsUuid();
}

function getFacilityUuid() {
  return dataStores.facility;
}

function getClaimsUuid() {
  return dataStores.claims;
}

async function fetchFacilityUuid() {
  const URL =
    "https://data.cms.gov/provider-data/api/1/metastore/schemas/dataset/items/4pq5-n9py?show-reference-ids=false";

  try {
    const response = await axios.get(`${URL}`);

    const uuid = response.data?.distribution?.[0]?.identifier;
    if (!uuid) {
      throw new NotFoundError(
        `Response did not contain a facilty datastore UUID`,
      );
    }

    return uuid;
  } catch (err) {
    throw new UpstreamError(`Unable to retrieve facility datastore UUID`, err);
  }
}

async function fetchClaimsUuid() {
  const URL =
    "https://data.cms.gov/provider-data/api/1/metastore/schemas/dataset/items/ijh5-nb2v?show-reference-ids=false";

  try {
    const response = await axios.get(`${URL}`);

    const uuid = response.data?.distribution?.[0]?.identifier;
    if (!uuid) {
      throw new NotFoundError(
        `Response did not contain a claims datastore UUID`,
      );
    }

    return uuid;
  } catch (err) {
    throw new UpstreamError(`Unable to retrieve claims datastore UUID`, err);
  }
}

export {
  initializeDataStores,
  fetchFacilityUuid,
  fetchClaimsUuid,
  getFacilityUuid,
  getClaimsUuid,
};
