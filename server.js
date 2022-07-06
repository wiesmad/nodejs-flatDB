const app = require('./app')
const dotenv = require("dotenv");


// synchronious error handler
// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port} - ENV:${process.env.NODE_ENV}`);
});

// promise error handler
// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });