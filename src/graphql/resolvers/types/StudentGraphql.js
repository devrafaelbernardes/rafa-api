import typeStudent from '../../typeDefs/types/student';
import { STUDENT, COURSE_STUDENT, VALIDATE_STUDENT_EMAIL } from '../../../database/tables';
import loaderImage from '../../../loaders/loaderImage';
import loaderStudentValidatedEmail from '../../../loaders/loaderStudentValidatedEmail';
import CourseStudentModel from '../../../classes/models/CourseStudentModel';
import ValidateStudentEmailModel from '../../../classes/models/ValidateStudentEmailModel';
import System from '../../../classes/models/System';

const findImage = async (imageId) => {
    if (imageId) {
        try {
            let image = await loaderImage.load(imageId);
            if (image) {
                return image;
            }
        } catch (error) { }
    }
    return null;
}

const findValidatedEmail = async (studentId) => {
    if (studentId) {
        try {
            const classValidateStudentEmailModel = ValidateStudentEmailModel();
            let validated = await classValidateStudentEmailModel.findOne({
                where: {
                    [VALIDATE_STUDENT_EMAIL.STUDENT]: studentId,
                }
            });
            if (validated && System().getBoolean(validated[VALIDATE_STUDENT_EMAIL.IS_OKEY])) {
                return true;
            }
        } catch (error) { }
    }
    return false;
}

const countCourses = async (studentId) => {
    if (studentId) {
        try {
            const total = await CourseStudentModel().count({ where: { [COURSE_STUDENT.STUDENT]: studentId } });
            if (total) {
                return total;
            }
        } catch (error) { }
    }
    return 0;
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
    [typeStudent.COLUMNS.COUNT_COURSES]: (student) => countCourses(student[STUDENT.ID]),
});

export default StudentGraphql;