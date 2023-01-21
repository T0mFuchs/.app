import mongoose from "mongoose";

const MONGO_URL = process.env.DB_URL as string;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */ // @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongooseConnect() {
  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default mongooseConnect;
