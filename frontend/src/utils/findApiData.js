function findApiData(apiKey, apiData) {
  return apiKey.reduce((acc, key) => acc?.[key], apiData);
}

export default findApiData;
