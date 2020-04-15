import typeStudentAccess from '../../typeDefs/types/studentAccess';
import { STUDENT_ACCESS } from '../../../database/tables';
import loaderStudent from '../../../loaders/loaderStudent';
import loaderTokenAccess from '../../../loaders/loaderTokenAccess';

const findStudent = async (studentId) => {
    if (studentId) {
        try {
            let student = await loaderStudent.load(studentId);
            if (student) {
                return student;
            }
        } catch (error) { }
    }
    return null;
}

const findTokenAccess = async (tokenId) => {
    if (tokenId) {
        try {
            let token = await loaderTokenAccess.load(tokenId);
            if (token) {
                return token;
            }
        } catch (error) { }
    }
    return null;
}

export const StudentAccessGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeStudentAccess.COLUMNS.ID]: (studentAccess) => studentAccess[STUDENT_ACCESS.ID],
    [typeStudentAccess.COLUMNS.IS_ACTIVE]: (studentAccess) => studentAccess[STUDENT_ACCESS.IS_ACTIVE],
    [typeStudentAccess.COLUMNS.CREATED_AT]: (studentAccess) => studentAccess[STUDENT_ACCESS.CREATED_AT],
    [typeStudentAccess.COLUMNS.STUDENT]: (studentAccess) => findStudent(studentAccess[STUDENT_ACCESS.STUDENT]),
    [typeStudentAccess.COLUMNS.TOKEN]: (studentAccess) => findTokenAccess(studentAccess[STUDENT_ACCESS.TOKEN]),
});

export default StudentAccessGraphql;