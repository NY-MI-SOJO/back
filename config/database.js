module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: process.env.DATABASE_URI || env('DATABASE_URI'),
      },
      options: {
        ssl: true,
      },
    },
  },
});