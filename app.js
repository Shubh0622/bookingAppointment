const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const appointmentRoute = require('./routes/appointment');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.use(appointmentRoute);

sequelize.sync()
    .then(result =>{
        app.listen(3000);
    })
    .catch(err => console.log(err))