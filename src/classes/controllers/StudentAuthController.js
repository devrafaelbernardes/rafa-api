import StudentModel from "../models/StudentModel";
import Token from "../models/Token";
import TokenAccessModel from "../models/TokenAccessModel";
import StudentAccessModel from "../models/StudentAccessModel";
import Cryptography from "../models/Cryptography";
import { STUDENT } from "../../database/tables";
import validations from "../../utils/validations";
import StudentSubscription from "../subscriptions/StudentSubscription";
import loaderStudent from "../../loaders/loaderStudent";

export const StudentAuthController = () => {
    const classCryptography = Cryptography();
    const classToken = Token();
    const classStudentModel = StudentModel();
    const classTokenAccessModel = TokenAccessModel();
    const classStudentAccessModel = StudentAccessModel();
    const classStudentSubscription = StudentSubscription();

    const generateToken = async (studentId) => classToken.create({ studentId });

    return {
        login: async ({ email = null, password = null } = {}) => {
            if (email && password) {
                try {
                    email = validations.cleanValue(email);

                    const student = await classStudentModel.findByEmail(email);
                    if (student) {
                        const salt = student[STUDENT.SALT_PASSWORD];
                        password = await classCryptography.encryptPassword(password, salt);

                        if (password === student[STUDENT.PASSWORD]) {
                            const studentId = student[STUDENT.ID];
                            const token = await generateToken(studentId);
                            const accessId = await classStudentAccessModel.add({ studentId, token });
                            if (accessId) {
                                return classStudentAccessModel.findById(accessId);
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        signUp: async ({ name = null, lastname = null, email = null, password = null } = {}) => {
            if (name && lastname && email && password) {
                try {
                    name = validations.cleanValue(name);
                    lastname = validations.cleanValue(lastname);
                    email = validations.cleanValue(email);
                    password = validations.cleanValue(password);

                    const studentId = await classStudentModel.add({
                        name,
                        lastname,
                        email,
                        password
                    });
                    if (studentId) {
                        const token = await generateToken(studentId);
                        const accessId = await classStudentAccessModel.add({ studentId, token });
                        if (accessId) {
                            let studentAccess = await classStudentAccessModel.findById(accessId);
                            const student = await loaderStudent.load(studentId);
                            if(student){
                                await classStudentSubscription.added.publish(student);
                            }
                            return studentAccess;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default StudentAuthController;