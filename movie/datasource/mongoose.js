const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("mongodb successfully connected")
    }
});

module.export = mongoose;
