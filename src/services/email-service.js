const sender = require("../config/emailConfig.js");
const TicketRepository = require("../repository/ticket-repository.js");

const repo = new TicketRepository();

const sendBasicEmail = async (mailTo, mailFrom, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({ status: "PENDING" });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotifications = async (data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const subsribeEvents = async (payload) => {
    try {
        let service = payload.service;
        let data = payload.data;
        switch (service) {
            case "CREATE_TICKET":
                await createNotifications(data);
                break;
            case "SEND_BASIC_EMAIL":
                await sendBasicEmail(data);
                break;
            default: console.log("No valid event recieved");
                break;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotifications,
    updateTicket,
    subsribeEvents
}