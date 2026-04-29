import mongoose from 'mongoose';

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
  cachedConnection = global.mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cachedConnection.conn) {
      return cachedConnection.conn;
    }

    if (!cachedConnection.promise) {
      cachedConnection.promise = mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017/tasknest'
      );
    }

    cachedConnection.conn = await cachedConnection.promise;
    console.log(`MongoDB Connected: ${cachedConnection.conn.connection.host}`);
    return cachedConnection.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;
