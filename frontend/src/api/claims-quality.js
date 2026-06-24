async function fetchClaims(ccn) {
  const URL = import.meta.env.VITE_API_URL;
  const route = "claims-quality";

  const res = await fetch(`${URL}/${route}/${ccn}`);

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

export default fetchClaims;
