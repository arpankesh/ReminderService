const sender = require("../config/emailConfig.js");

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

module.exports = {
    sendBasicEmail
}