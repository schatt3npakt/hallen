// eslint-disable-next-line no-undef
const http = require("http");
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
 const SRC_DIR = path.join(__dirname, "src");

const PORT = 8080;

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

let clients = [];

const server = http.createServer((req, res) => {
  if (req.url === "/__reload") {
    // SSE endpoint for hot reload
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    res.write("\n");
    clients.push(res);
    req.on("close", () => {
      clients = clients.filter((c) => c !== res);
    });
    return;
  }

  let filePath = path.join(SRC_DIR, req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      // Inject reload script into HTML
      if (ext === ".html") {
        const reloadScript = `
        <script>
          const es = new EventSource('/__reload');
          es.onmessage = () => location.reload();
        </script>
        `;
        content = content.toString().replace("</body>", reloadScript + "</body>");
        content = content.replace("</body>", "<hg-debugger-overlay /></body>");
      }
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
      });
      res.end(content);
    }
  });
});

// Watch src directory for changes
// eslint-disable-next-line no-unused-vars
fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
  clients.forEach((res) => {
    res.write("data: reload\n\n");
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
