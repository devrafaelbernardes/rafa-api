import { LINK_COURSE_ACCESS, LINK_FORGET_PASSWORD, LINK_MODELING, LINK_VALIDATE_EMAIL, USER_EMAIL } from "../../config/server";
import * as SendModelingMail from "../jobs/SendModelingMail";
import * as CourseAccessMail from "../jobs/CourseAccessMail";
import * as CustomMail from "../jobs/CustomMail";
import * as ForgotPasswordMail from "../jobs/ForgotPasswordMail";
import * as RegistrationMail from "../jobs/RegistrationMail";
import * as ValidateEmailMail from "../jobs/ValidateEmailMail";
import Queue from "./Queue";
import Token from "./Token";


export const Email = () => {
    const classToken = Token();

    const sendEmail = (key, { to, template, subject, data = {} } = {}) => {
        if (to && template) {
            return Queue.add(key, {
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
                sendEmail(RegistrationMail.KEY, {
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
                    const token = classToken.create({ idForgetPassword, email: to });
                    sendEmail(ForgotPasswordMail.KEY, {
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
                    sendEmail(CourseAccessMail.KEY, {
                        to,
                        subject: `Acesso ao curso ${courseName}`,
                        template: 'auth/courseAccess',
                        data: { name: name || "Aluno(a)", courseName, link: `${LINK_COURSE_ACCESS}${token}` },
                    });
                    return true;
                } catch (error) { }
            }
            return false;
        },
        async sendModelingEmail({ to, modelingName, modelingFileName = "" }) {
            if (to) {
                try {
                    await sendEmail(SendModelingMail.KEY, {
                        to,
                        subject: `MODELAGENS RAFAEL BERNARDES`,
                        template: 'auth/sendModeling',
                        data: { name: modelingName, link: `${LINK_MODELING}${modelingFileName}` },
                    });
                    return true;
                } catch (error) {}
            }
            return false;
        },
        async sendValidateEmail({ to, name = "", idValidateStudentEmail = "" }) {
            if (idValidateStudentEmail) {
                try {
                    const code = await classToken.create({ idValidateStudentEmail });
                    sendEmail(ValidateEmailMail.KEY, {
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
        async sendCustom({ to, subject = "", message = "" }) {
            if (subject && message) {
                try {
                    await sendEmail(CustomMail.KEY, {
                        to,
                        subject,
                        template: 'auth/custom',
                        data: { body: message },
                    });
                    return true;
                } catch (error) { }
            }
            return false;
        },
    }
};

export default Email;