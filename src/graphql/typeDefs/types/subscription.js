import admin from './admin';
import course from './course';
import courseStudent from './courseStudent';
import student from './student';

const NAME = "Subscription";

export const TYPE = {
    NAME,
    CONTENT: `
        type ${NAME}{
            adminAdded : ${admin.NAME}
            adminUpdated(adminId : ID!) : ${admin.NAME}

            courseAdded : ${course.NAME}
            courseUpdated(courseId : ID!) : ${course.NAME}

            courseStudentAdded(courseId : ID!) : ${courseStudent.NAME}

            studentAdded : ${student.NAME}
            studentUpdated(studentId : ID!) : ${student.NAME}
        }
    `,
};
export default TYPE;