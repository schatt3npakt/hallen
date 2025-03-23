export default async function loadHtml(htmlString) {
  const response = await fetch(htmlString);

  if (!response.ok) {
    throw new Error("Routes: Failed loading html " + htmlString);
  }

  const text = await response.text();
  return text;
}
