"use strict";

var _app = require("./app");

var _seed = require("../../utils/seed");

const port = process.env.SERVER_PORT || 3333;
console.info("\n\n🚀 Shopify Fall 2022 - OKAAAAAAAY LET'S GO!");

_app.httpServer.listen(port, async () => {
  console.info(` - Listening on port: ${port}`);
  (0, _seed.seedWarehouses)();
  (0, _seed.seedProducts)();
});