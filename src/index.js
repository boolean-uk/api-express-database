const app = require('./server.js');
const db = require('../db');
const port = process.env.PORT || 3030;

app.listen(port, () => {
  //Connect to the database
  db.connect(error => {
    //If there is an error connecting to the database,
    //log it out to the console
    if (error) {
      console.error('[ERROR] Connection error: ', error.stack);
    } else {
      console.log('\n[DB] Connected...\n');
    }
  });

  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
