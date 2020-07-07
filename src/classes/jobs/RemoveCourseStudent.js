import { COURSE_STUDENT } from "../../database/tables";
import CourseStudentModel from "../models/CourseStudentModel";

export const KEY = "RemoveCourseStudent";

/*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second ( optional )
*/

export default {
    key: KEY,
    options: {
        //repeat: {
            //cron: '59 59 23 * * *',
        //}
    },
    async handle(data) {
        const classCourseStudentModel = CourseStudentModel();
        console.log("Nova fila");
        /* const courseStudents = await classCourseStudentModel.findAll();
        
        if (courseStudents && courseStudents.length > 0) {
            await courseStudents.forEach(async (courseStudent) => {
                try {
                    if (courseStudent) {
                        await classCourseStudentModel.remove({ id: courseStudent[COURSE_STUDENT.ID] });
                    }
                } catch (error) { }
            });
        } */
    }
};