export default () => ({
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nest-chat-app',
    },
  });
  