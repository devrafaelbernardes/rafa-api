import { CronJob } from 'cron';
import { COURSE_ACCESS, TOKEN_ACCESS, COURSE_STUDENT } from '../../database/tables';
import CourseStudentModel from '../models/CourseStudentModel';

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
//  TEST: 
//  */segungos * * * * *

export const Cron = () => {
    // FAZER CRON QUE REMOVE TOKEN DE ACESSO

    const removeCourseStudent = () => {
        const TIME = "59 23 0 * * *";
        //const TIME = "*/10 * * * * *"; // TEST
        return new CronJob(TIME, async () => {
            console.log("--------------------------------------------------------");
            console.log("Remoção de alunos vencidos do curso\n");
            console.log("INICIADO em ", new Date(Date.now()).toLocaleString());
            const classCourseStudentModel = CourseStudentModel();

            const courseStudents = await classCourseStudentModel.findAll({
                whereNot: {
                    [COURSE_STUDENT.EXPIRES_AT]: null,
                },
            });

            console.log("Alunos com validade:", courseStudents.length);
                
            if (courseStudents && courseStudents.length > 0) {
                await courseStudents.forEach(async (courseStudent) => {
                    try {
                        const allowedToRemove = await classCourseStudentModel.isExpired(courseStudent[COURSE_STUDENT.EXPIRES_AT]);
                        if (allowedToRemove) {
                            const courseStudentId = courseStudent[COURSE_STUDENT.ID];
                            
                            console.log("Aluno removido: #", courseStudentId);

                            await classCourseStudentModel.remove({ id: courseStudentId });
                        }
                    } catch (error) { }
                });
            }

            console.log("FINALIZADO em ", new Date(Date.now()).toLocaleString());
            console.log("--------------------------------------------------------");
        });
    }

    return ({
        start: () => {
            removeCourseStudent().start();
            //Queue.add(RemoveCourseStudent.KEY);
        },
        /*
        closeCourseTokensAccess: () => {
            // 02:00:00 EVERYDAY
            return new CronJob("0 0 2 * * *", async () => {
                // get all pending
                const tableCourseAccess = COURSE_ACCESS.TABLE_NAME;
                const tableTokenAccess = TOKEN_ACCESS.TABLE_NAME;

                const courseTokensAccess = await classCourseAccessModel.findAll({
                    columns: [
                        `${tableCourseAccess}.${COURSE_ACCESS.ID} as courseAccessID`,
                        //`${tableTokenAccess}.${TOKEN_ACCESS.TOKEN} as tokenAccessTOKEN`,
                    ],
                    leftJoin: {
                        table: tableTokenAccess,
                        param1: `${tableTokenAccess}.${TOKEN_ACCESS.ID}`,
                        param2: `${tableCourseAccess}.${COURSE_ACCESS.TOKEN}`,
                    },
                    where: {
                        [`${tableCourseAccess}.${COURSE_ACCESS.CURRENTY_STATE}`]: classCourseAccessModel.STATE.PENDING
                    }
                });

                if (courseTokensAccess && courseTokensAccess.length > 0) {
                    await courseTokensAccess.forEach(async ({ courseAccessID, tokenAccessTOKEN }) => {
                        try {
                            if (tokenAccessTOKEN) {
                                const validated = await classToken.verify(tokenAccessTOKEN);
                                if (!validated) {
                                    await classCourseAccessModel.cancelAccess({ id: courseAccessID });
                                }
                            }
                        } catch (error) { }
                    });
                }

                console.log("--------------------------------------------------------");
                console.log("COURSE ACCESS(PENDING):", courseTokensAccess.length);
                console.log("COURSE ACCESS - TIME:", (new Date()).toLocaleTimeString());
                console.log("--------------------------------------------------------");
            });
        },
        */
    });
};

export default Cron;