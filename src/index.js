const express = require("express");
const bodyParser = require("body-parser");

const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig.js");

const jobs = require("./utils/job.js");
const TicketController = require("./controller/ticket-controller.js");
const { createChannel, subsribeMessage } = require("./utils/messageQueue");
const EmailService = require("./services/email-service.js");

const setUpAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/api/v1/tickets", TicketController.create);

    const channel = await createChannel();
    subsribeMessage(channel, EmailService.subsribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);

        // jobs();
    })
}

setUpAndStartServer();