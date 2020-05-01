import typeStudent from '../../typeDefs/types/student';
import { STUDENT } from '../../../database/tables';
import loaderImage from '../../../loaders/loaderImage';
import loaderStudentValidatedEmail from '../../../loaders/loaderStudentValidatedEmail';

const findImage = async (imageId) => {
    if (imageId) {
        try {
            let image = await loaderImage.load(imageId);
            if(image){
                return image;
            }
        } catch (error) { }
    }
    return null;
}

const findValidatedEmail = async (studentId) => {
    if (studentId) {
        try {
            let validated = await loaderStudentValidatedEmail.load(studentId);
            if(validated){
                return validated;
            }
        } catch (error) { }
    }
    return false;
}

export const StudentGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeStudent.COLUMNS.ID]: (student) => student[STUDENT.ID],
    [typeStudent.COLUMNS.NAME]: (student) => student[STUDENT.NAME],
    [typeStudent.COLUMNS.LASTNAME]: (student) => student[STUDENT.LASTNAME],
    [typeStudent.COLUMNS.FULL_NAME]: (student) => `${student[STUDENT.NAME]} ${student[STUDENT.LASTNAME]}`,
    [typeStudent.COLUMNS.EMAIL]: (student) => student[STUDENT.EMAIL],
    [typeStudent.COLUMNS.IS_ACTIVE]: (student) => student[STUDENT.IS_ACTIVE],
    [typeStudent.COLUMNS.CREATED_AT]: (student) => student[STUDENT.CREATED_AT],
    [typeStudent.COLUMNS.IS_VALIDATED_EMAIL]: (student) => findValidatedEmail(student[STUDENT.ID]),
    [typeStudent.COLUMNS.PROFILE_IMAGE]: (student) => findImage(student[STUDENT.PROFILE_IMAGE]),
});

export default StudentGraphql;