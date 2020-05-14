import loader from "./loader";
import lodash from "lodash";
import ValidateStudentEmailModel from "../classes/models/ValidateStudentEmailModel";
import { VALIDATE_STUDENT_EMAIL } from "../database/tables";
import System from "../classes/models/System";

const batchStudentValidatedEmail = async (studentIds, params) => {
    const classValidateStudentEmailModel = ValidateStudentEmailModel();
    let response = await classValidateStudentEmailModel.findIn({
        ids: studentIds,
        column : VALIDATE_STUDENT_EMAIL.STUDENT,
        ...params,
    });
    if (response && response.length > 0) {
        const a = await response.map(async (validatedEmail) => System().getBoolean(validatedEmail[VALIDATE_STUDENT_EMAIL.IS_OKEY]));
        console.log(a);
        
        return a;
    }
    return [];
}

export const loaderStudentValidatedEmail = loader(batchStudentValidatedEmail);

export default loaderStudentValidatedEmail;