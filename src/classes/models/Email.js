import transporter from "../../config/email";
import { USER_EMAIL, LINK_VALIDATE_EMAIL, LINK_FORGET_PASSWORD, LINK_COURSE_ACCESS } from "../../config/server";
import validations from "../../utils/validations";
import Token from "./Token";

export const Email = () => {
    const classToken = Token();

    const sendEmail = ({ to, template, subject, data = {} } = {}) => {
        if (to && template) {
            return transporter.sendMail({
                to,
                subject: `Rafael Bernardes | ${subject}`,
                from: `"Rafael Bernardes" <${USER_EMAIL}>`,
                replyTo: USER_EMAIL,
                template,
                context: data,
            });
        }
        return null;
    }

    return {
        async sendWelcome({ to, name = "" }) {
            try {
                sendEmail({
                    to,
                    subject: 'Bem-vindo',
                    template: 'auth/welcome',
                    data: { name },
                });
                return true;
            } catch (error) { }
            return false;
        },
        async sendForgotPassword({ to, name = "", idForgetPassword = "" }) {
            if (idForgetPassword) {
                try {
                    const token = classToken.create({ idForgetPassword, email : to });
                    sendEmail({
                        to,
                        subject: 'Esqueci minha senha',
                        template: 'auth/forgotPassword',
                        data: { name, link: `${LINK_FORGET_PASSWORD}${token}` },
                    });
                    return true;
                } catch (error) { }
            }
            return false;
        },
        async sendCourseAccess({ to, name = "", courseName = "", token = "" }) {
            if (token) {
                try {
                    sendEmail({
                        to,
                        subject: `Acesso ao curso ${courseName}`,
                        template: 'auth/courseAccess',
                        data: { name : name || "Aluno(a)", courseName, link: `${LINK_COURSE_ACCESS}${token}` },
                    });
                    return true;
                } catch (error) { }
            }
            return false;
        },
        async sendValidateEmail({ to, name = "", idValidateStudentEmail = "" }) {
            if (idValidateStudentEmail) {
                try {
                    const code = validations.dirtyId(idValidateStudentEmail);
                    sendEmail({
                        to,
                        subject: `E-mail de verificação`,
                        template: 'auth/validateEmail',
                        data: { name, link: `${LINK_VALIDATE_EMAIL}${code}` },
                    });
                    return true;
                } catch (error) { }
            }
            return false;
        },
    }
};

export default Email;