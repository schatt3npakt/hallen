export async function loadHtml(htmlString) {
  const response = await fetch(htmlString)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to load scene: " + htmlString);
      }

      const text = await res.text();
      return text;
    })
    .catch((error) => {
      console.error("Error loading HTML:", error);
      return `
        <div>The scene could not be loaded.</div>
      `;
    });

  return response;
}
