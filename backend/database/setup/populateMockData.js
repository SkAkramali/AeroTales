const { Database, OPEN_CREATE, OPEN_READWRITE } = require('sqlite3');
const fs = require('fs');

const errorHandler = err => {
  if (err) {
    throw err;
  }
};

const csvParser = (path, hasHeader, delimeter) => {
  const rawData = fs.readFileSync(path, 'utf8');
  const parsedData = rawData.split('\n').map(line => line.split(delimeter));

  let header = '';
  let data = parsedData;

  if (hasHeader) {
    header = parsedData[0].join(',');
    data = parsedData.slice(1);
  }

  return { header, data };
};

const populateMockData = dbPath => {
  return new Promise((resolve, reject) => {
    const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, err => {
      if (err) {
        reject(err);
        return;
      }
    });

    const csvMetaData = JSON.parse(
      fs.readFileSync('./database/setup/csvMetaData.json', 'utf8')
    );

    let completed = 0;
    const total = csvMetaData.length;

    for (let index = 0; index < csvMetaData.length; index++) {
      const storyRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
      const { table, file, hasHeader } = csvMetaData[index];
      const delimeter = table === 'stories' ? storyRegex : ',';
      const { header, data } = csvParser(file, hasHeader, delimeter);
      const headerStr = header ? `(${header})` : '';
      console.log(`\nstarted populating data into ${table} table`);

      let rowsProcessed = 0;
      const totalRows = data.length;

      data.forEach(line => {
        const sql = `INSERT INTO ${table}${headerStr} VALUES (${line})`;
        console.log('.');
        db.serialize(() => {
          db.run(sql, err => {
            if (err) {
              console.error(`Error inserting into ${table}:`, err);
            }
            rowsProcessed++;
            if (rowsProcessed === totalRows) {
              console.log(`finished populating data into ${table} table\n`);
              completed++;
              if (completed === total) {
                db.close(err => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            }
          });
        });
      });
    }
  });
};

module.exports = populateMockData;
