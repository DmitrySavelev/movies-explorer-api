const corsOptions = {
  origin: [
    'http://movies.savelev.nomoredomains.rocks/',
    'https://movies.savelev.nomoredomains.rocks/',
    'http://movies.savelev.nomoredomains.monster/',
    'https://movies.savelev.nomoredomains.monster/',
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
