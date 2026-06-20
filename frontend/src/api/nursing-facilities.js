async function fetchFacility(ccn) {
  const URL = import.meta.env.API_URL;

  const res = await fetch(`${URL}/${ccn}`);

  // If no 200-299 res status
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ??
      body?.message ??
      `Request failed with (${res.status})`;

    throw new Error(message);
  }

  return res.json();
}

export default fetchFacility;
