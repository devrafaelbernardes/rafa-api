import Model from "./Model";
import TokenAccessModel from "./TokenAccessModel";
import { COURSE_ACCESS } from "../../database/tables";

export const CourseAccessModel = () => {
    const tableName = COURSE_ACCESS.TABLE_NAME;

    const classModel = Model();
    const classTokenAccessModel = TokenAccessModel();
    const columnIsActive = COURSE_ACCESS.IS_ACTIVE;
    const columnID = COURSE_ACCESS.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    const STATE = {
        PENDING: 1,
        SUCCESS: 2,
        CANCEL: 3,
    };

    const getState = (state) => Object.values(STATE).includes(state) ? state : null;

    return {
        STATE,
        getState,
        add: async ({ courseId = null, studentId = null, token = null, email = null } = {}) => {
            if (courseId && token) {
                try {
                    return crud.addOne({
                        data: {
                            [COURSE_ACCESS.COURSE]: courseId,
                            [COURSE_ACCESS.STUDENT]: studentId,
                            [COURSE_ACCESS.TOKEN]: token,
                            [COURSE_ACCESS.EMAIL]: email,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [COURSE_ACCESS.ID]: id,
            }
        }),
        findByToken: (token = null) => crud.findOne({
            where: {
                [COURSE_ACCESS.TOKEN]: token,
            }
        }),
        findAll: ({ where = {}, ...params } = {}) => crud.findAll({
            ...params,
            where,
        }),
        findIn: ({ ids = [], ...params } = {}) => crud.findIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        update: ({ id = null, data: { state = STATE.PENDING, studentId = null } = {} } = {}) => crud.update({
            id,
            data: {
                [COURSE_ACCESS.CURRENTY_STATE]: getState(state),
                [COURSE_ACCESS.STUDENT]: studentId,
            }
        }),
        confirmAccess: ({ id = null, studentId = null } = {}) => crud.update({
            id,
            data: {
                [COURSE_ACCESS.CURRENTY_STATE]: STATE.SUCCESS,
                [COURSE_ACCESS.STUDENT]: studentId,
            }
        }),
        cancelAccess: ({ id = null } = {}) => crud.update({
            id,
            data: {
                [COURSE_ACCESS.CURRENTY_STATE]: STATE.CANCEL,
            }
        }),
    };
};

export default CourseAccessModel;