import transporter from "../../config/email";

export const KEY = "CustomMail";

export default {
    key: KEY,
    options: {
        attempts: 3,
    },
    async handle({ data }) {
        await transporter.sendMail(data);
    }
};