const mongoose = require('mongoose');

const connectDB = async() =>{
  try{
    console.log('MONGO_URI', process.env.MONGO_URI);
     await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB connected success');
  }
    catch(error){
      console.log('MongoDB connection failed', error.messge);
      process.exit(1);
      
    }
}

module.exports = connectDB;
