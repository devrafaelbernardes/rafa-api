import VideoModel from "../models/VideoModel";
import CourseVideoModel from "../models/CourseVideoModel";
import Upload from "../models/Upload";
import { COURSE_VIDEO, VIDEO } from "../../database/tables";
//import Pagination from "../models/Pagination";
import loaderCourseVideo from "../../loaders/loaderCourseVideo";
import validations from "../../utils/validations";

export const CourseVideoController = () => {
    const classVideoModel = VideoModel();
    const classCourseVideoModel = CourseVideoModel();
    const classUpload = Upload();
    //const classPagination = Pagination();

    const removeVideo = async (courseId, videoId) => {
        try {
            courseId = validations.cleanValue(courseId);
            videoId = validations.cleanValue(videoId);

            const courseVideo = await classCourseVideoModel.findOne({
                where: {
                    [COURSE_VIDEO.COURSE]: courseId,
                    [COURSE_VIDEO.VIDEO]: videoId,
                }
            });
            if (courseVideo) {
                const courseVideoId = courseVideo[COURSE_VIDEO.ID];
                const removed = await classCourseVideoModel.remove({ id: courseVideoId });
                if (removed) {
                    await loaderCourseVideo.clear(courseVideoId);
                    return courseVideo;
                }
            }
        } catch (error) { }
        return null;
    }

    return {
        add: async ({ courseId = null, name = null, description = null, video = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && name && instructorId) {
                try {
                    instructorId = validations.cleanValue(instructorId);
                    courseId = validations.cleanValue(courseId);
                    name = validations.cleanValue(name);
                    description = validations.cleanValue(description);

                    const videoUploaded = await classUpload.upload(video, true);

                    if (videoUploaded && videoUploaded.url) {
                        const videoAddedId = await classVideoModel.add({ name: videoUploaded.filename });
                        if (videoAddedId) {
                            const courseVideoId = await classCourseVideoModel.add({
                                courseId,
                                name,
                                description,
                                videoId: videoAddedId
                            });
                            if (courseVideoId) {
                                let courseVideo = await loaderCourseVideo.load(courseVideoId);
                                if (courseVideo) {
                                    return courseVideo;
                                }
                            }
                        }
                    }

                } catch (error) { }
            }
            return null;
        },
        get: async ({ courseId = null, videoId = null } = {}, { tokenUser: { adminId = null, studentId = null } = {} } = {}) => {
            if (courseId && videoId && (adminId || studentId)) {
                try {
                    courseId = validations.cleanValue(courseId);
                    videoId = validations.cleanValue(videoId);
                    
                    return classCourseVideoModel.findOne({
                        where: {
                            [COURSE_VIDEO.COURSE]: courseId,
                            [COURSE_VIDEO.VIDEO]: videoId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        remove: async ({ courseId = null, videoId = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (courseId && videoId && adminId) {
                try {
                    return removeVideo(courseId, videoId);
                } catch (error) { }
            }
            return null;
        },
        update: async ({ courseId = null, videoId = null, name = null, description = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (courseId && videoId && adminId) {
                try {
                    courseId = validations.cleanValue(courseId);
                    videoId = validations.cleanValue(videoId);
                    name = validations.cleanValue(name);
                    description = validations.cleanValue(description);

                    const courseVideo = await classCourseVideoModel.findOne({
                        where: {
                            [COURSE_VIDEO.COURSE]: courseId,
                            [COURSE_VIDEO.VIDEO]: videoId,
                        }
                    });
                    if (courseVideo) {
                        const courseVideoId = courseVideo[COURSE_VIDEO.ID];
                        const updated = await classCourseVideoModel.update({
                            id: courseVideoId,
                            data: {
                                name,
                                description
                            }
                        });
                        if (updated) {
                            await loaderCourseVideo.clear(courseVideoId);
                            const response = await loaderCourseVideo.load(courseVideoId);
                            if (response) {
                                return response;
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default CourseVideoController;