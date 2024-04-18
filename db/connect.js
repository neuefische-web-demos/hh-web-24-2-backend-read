import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

// linking cached variable to global space named mongoose
let cached = global.mongoose;

// inspect if cached variable has values
if(!cached){
    // if it's null, it gets default object values {connection: null, connectionPromise: null}
    cached = global.mongoose = {connection: null, connectionPromise: null};
}


async function dbConnect() {
    // on the first run this is null
    if (cached.connection) {
        return cached.connection;
    }

    // on the first run this is null, 
    // after successful connection(step 2) it holds a promise
    // after a connection failure it becomes null
    if(!cached.connectionPromise){
        const options = {
            bufferCommands: false,
        };
    
        // gets a promise for a mongoose connection
        cached.connectionPromise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            return mongoose;
        });
    }
    
    try {
        // if connection is successful it is stored in cached.connection
        cached.connection = await cached.connectionPromise;
    } catch(error) {
        // connection failed, connectionPromise becomes null
        cached.connectionPromise = null;
        throw error;
    }

    return cached.connection;
}

export default dbConnect;