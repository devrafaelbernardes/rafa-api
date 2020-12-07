import transporter from "../../config/email";

export const KEY = "SendModelingMail";

export default {
    key: KEY,
    options: {
        attempts: 3,
    },
    async handle({ data }) {
        await transporter.sendMail(data);
    }
};