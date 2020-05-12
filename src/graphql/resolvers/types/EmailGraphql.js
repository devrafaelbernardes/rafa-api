import typeEmail from '../../typeDefs/types/email';
import { EMAIL } from '../../../database/tables';
import loaderStudent from '../../../loaders/loaderStudent';

const findStudent = async (studentId) => {
    if (studentId) {
        try {
            let student = await loaderStudent.load(studentId);
            if(student){
                return student;
            }
        } catch (error) { }
    }
    return null;
}

export const EmailGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeEmail.COLUMNS.ID]: (email) => email[EMAIL.ID],
    [typeEmail.COLUMNS.TO]: (email) => email[EMAIL.TO],
    [typeEmail.COLUMNS.SUBJECT]: (email) => email[EMAIL.SUBJECT],
    [typeEmail.COLUMNS.MESSAGE]: (email) => email[EMAIL.MESSAGE],
    [typeEmail.COLUMNS.IS_ACTIVE]: (email) => email[EMAIL.IS_ACTIVE],
    [typeEmail.COLUMNS.CREATED_AT]: (email) => email[EMAIL.CREATED_AT],
    [typeEmail.COLUMNS.STUDENT]: (email) => findStudent(email[EMAIL.STUDENT]),
});

export default EmailGraphql;