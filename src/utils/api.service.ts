export async function executeThirdPartyApi(
  url: string,
  body: BodyInit,
  method = "POST",
  headers: HeadersInit = { "Content-Type": "application/json" }
) {
  const requestConfig: RequestInit = { method, body, headers };
  let res = await fetch(url, requestConfig);
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }
  return data;
}
