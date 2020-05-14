import { CronJob } from 'cron';
import CourseAccessModel from '../models/CourseAccessModel';
import Token from '../models/Token';
import { COURSE_ACCESS, TOKEN_ACCESS } from '../../database/tables';

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
    const classCourseAccessModel = CourseAccessModel();
    const classToken = Token();

    return ({
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
                            /* if (tokenAccessTOKEN) {
                                const validated = await classToken.verify(tokenAccessTOKEN);
                                if (!validated) {
                                    await classCourseAccessModel.cancelAccess({ id: courseAccessID });
                                }
                            } */
                        } catch (error) { }
                    });
                }

                console.log("--------------------------------------------------------");
                console.log("COURSE ACCESS(PENDING):", courseTokensAccess.length);
                console.log("COURSE ACCESS - TIME:", (new Date()).toLocaleTimeString());
                console.log("--------------------------------------------------------");
            });
        },
    });
};

export default Cron;