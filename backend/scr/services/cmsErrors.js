function isInvalidDistributionError(err) {
  return (
    err.response?.status === 400 &&
    err.response?.data?.message?.includes("distribution") &&
    err.response?.data?.message?.includes("not found")
  );
}

function isBadRequest(err) {
  return (
    err.response?.status === 400 &&
    !err.response?.data?.message?.includes("distribution") &&
    !err.response?.data?.message?.includes("not found")
  );
}

export { isInvalidDistributionError, isBadRequest };
