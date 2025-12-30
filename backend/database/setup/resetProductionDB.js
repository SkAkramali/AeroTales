const fs = require('fs');
const { join } = require('path');
const resetDB = require('./resetDb');
const populateMockData = require('./populateMockData');

const mkDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const main = async () => {
  const dbDir = '../backend/database';
  const dbPath = join(dbDir, 'medium.db');
  mkDir(dbDir);
  try {
    await resetDB(dbPath);
    console.log('Database tables created successfully');
    await populateMockData(dbPath);
    console.log('Mock data populated successfully');
  } catch (err) {
    console.error('Error setting up database:', err);
    process.exit(1);
  }
};

main();
