const app = require('./server.js')
const db = require("../db");
const port = 3030;
app.use((error, req, res, next) => {
  if (error.statusCode) {
    console.log('HERE')
    return res.status(error.statusCode).json({ message: error.message });
  }
  res
    .status(500)
    .json({
      message:
        "Oops, sorry! this is on us. Don't worry, a develevoper will be punish for this :)",
    });
});
app.listen(port, () => {
  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
