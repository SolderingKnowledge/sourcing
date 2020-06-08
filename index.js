const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
// MIDDLEWARE 
// app.use()

//custom routes
const index = require("./routes/index");

const PORT = process.env.PORT || 5000;
//Midlleware for sending data in the body
app.use(express.json({extended: false}));

// Error handling
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error || 500).json({ msg: error.message || "Server error"});
})

// CORS-issues handling
app.use((req, res, next)=> {
    // postman has it's own rules: don't care about cors, allows all to arrive
    res.setHeader("Access-Control-Allow-Origin", "*");// opening up to all domains

    res.setHeader("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");

    next();
});


// using routes that I imported and filtering routes
app.use("/", index);

// serve static assets in production
if(process.env.NODE_ENV === "production"){
    // Set static folder
    app.use(express.static("client/build"));// serve build folder the result of: npm run build
    app.get("*", (req, res)=> {// get anything
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));// current directory and go client/build/index.html to serve
    })
}

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));