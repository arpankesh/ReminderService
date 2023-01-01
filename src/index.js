const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig.js");

// const { sendBasicEmail } = require("./services/email-service.js");
const cron = require("node-cron");

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);

        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
          });
        // sendBasicEmail(
        //     "airlinemanagementsanket@gmail.com",
        //     "support@admin.com",
        //     "This is a testing email",
        //     "I hope you like the support"
        // )

    })
}

setUpAndStartServer();