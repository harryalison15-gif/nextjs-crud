import mongoose from 'mongoose';


async function dbConnect() {
  await mongoose.connect(process.env.MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
 


export default dbConnect;