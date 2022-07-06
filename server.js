const app = require('./app')
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port} - ENV:${process.env.NODE_ENV}`);
});