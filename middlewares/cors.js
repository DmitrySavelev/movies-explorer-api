const corsOptions = {
  origin: [
    // 'http://mesto.savelev.nomoredomains.monster',
    // 'https://mesto.savelev.nomoredomains.monster',
    // 'http://api.mesto.savelev.nomoredomains.monster',
    // 'https://api.mesto.savelev.nomoredomains.monster',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3000',
    'https://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  // preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  // credentials: true,
};

module.exports = corsOptions;
