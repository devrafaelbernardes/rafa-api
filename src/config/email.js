import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { PORT_EMAIL, USER_EMAIL, PASSWORD_EMAIL, HOST_EMAIL } from './server';
import { PATH_TEMPLATES_EMAILS, PATH_PARTIALS_EMAILS, PATH_LAYOUTS_EMAILS } from './paths';

const transporter = nodemailer.createTransport({
    host: HOST_EMAIL,
    port: PORT_EMAIL,
    secure: true,
    auth: {
        user: USER_EMAIL, // generated ethereal user
        pass: PASSWORD_EMAIL // generated ethereal password
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        partialsDir: PATH_PARTIALS_EMAILS,
        layoutsDir: PATH_LAYOUTS_EMAILS,
        defaultLayout:'default',
    },
    viewPath: PATH_TEMPLATES_EMAILS,
}));

export default transporter;