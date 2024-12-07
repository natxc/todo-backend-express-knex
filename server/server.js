const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const app = require("./config/serverConfig.js");
const todosRoutes = require("./routes/todosRoutes.js");

const port = process.env.PORT || 5000;

app.use('/', todosRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
