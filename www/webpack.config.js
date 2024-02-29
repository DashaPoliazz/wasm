const path = require("node:path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  mode: "development",
};
