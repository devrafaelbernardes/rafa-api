import loader from "./loader";
import StudentModel from "../classes/models/StudentModel";

const batchStudent = async(ids) => {
    const classStudentModel = StudentModel();
    return classStudentModel.findIn({ ids });
}

export const loaderStudent = loader(batchStudent)

export default loaderStudent;