const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function copy(source, target) {
  fs.cpSync(path.join(root, source), path.join(dist, target || source), {
    recursive: true,
    force: true
  });
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

copy("index.html");
copy("src");
copy("vendor");
copy("docs");

fs.writeFileSync(path.join(dist, "_redirects"), "/* /index.html 200\n", "utf8");

console.log(`Built static site in ${path.relative(root, dist)}`);
