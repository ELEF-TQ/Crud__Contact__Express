const  express = require('express')
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnectiom');
const app = express()
const port = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.listen(port, console.log(`listening on port :${port}` ));
    }).catch((e) => {
        console.log(e);
    })


app.use(express.json())
app.use(errorHandler);


app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))


