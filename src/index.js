const app = require('./server.js');
const db = require('../db');
const port = process.env.PORT || 3030;

app.listen(port, () => {
  db.connect(error => {
    if (error) {
      console.error('[ERROR] Connection error: ', error.stack);
    } else {
      console.log('\n[DB] Connected...\n');
    }
  });

  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
