const mongoose=require("mongoose");
require("dotenv").config();


exports.connect=()=> {
    mongoose.connect(process.env.database_url)
      .then(()=> {
            console.log("connected to db")
      })
      .catch((error)=> {
        console.log("DB connection failed");
        process.exit(1);
      })
};

