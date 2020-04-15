import loader from "./loader";
import StudentAccessModel from "../classes/models/StudentAccessModel";

const batchStudentAccess = async(ids) => {
    const classStudentAccessModel = StudentAccessModel();
    return classStudentAccessModel.findIn({ ids });
}

export const loaderStudentAccess = loader(batchStudentAccess)

export default loaderStudentAccess;