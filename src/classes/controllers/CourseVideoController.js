import VideoModel from "../models/VideoModel";
import ImageModel from "../models/ImageModel";
import CourseVideoModel from "../models/CourseVideoModel";
import Upload from "../models/Upload";
import { COURSE_VIDEO, VIDEO } from "../../database/tables";
//import Pagination from "../models/Pagination";
import loaderCourseVideo from "../../loaders/loaderCourseVideo";
import validations from "../../utils/validations";
import loaderVideo from "../../loaders/loaderVideo";
import { getSignedUrl } from "../../config/vimeo";

export const CourseVideoController = () => {
  const classVideoModel = VideoModel();
  const classImageModel = ImageModel();
  const classCourseVideoModel = CourseVideoModel();
  const classUpload = Upload();
  //const classPagination = Pagination();

  const getIdFromLink = async (link = "") => {
    if (link) {
      try {
        const POSITION_ID = 3;
        const list = link.split("/");
        if (list.length > POSITION_ID && list[POSITION_ID]) {
          const id = list[POSITION_ID];
          const validatedId = await getSignedUrl({
            videoId: id,
            isPrivate: true,
          });
          if (validatedId) {
            return id;
          }
        }
      } catch (error) {}
    }
    return null;
  };

  const removeVideo = async (courseId, videoId) => {
    try {
      courseId = validations.cleanValue(courseId);
      videoId = validations.cleanValue(videoId);

      const courseVideo = await classCourseVideoModel.findOne({
        where: {
          [COURSE_VIDEO.COURSE]: courseId,
          [COURSE_VIDEO.VIDEO]: videoId,
        },
      });
      if (courseVideo) {
        const courseVideoId = courseVideo[COURSE_VIDEO.ID];
        const removed = await classCourseVideoModel.remove({
          id: courseVideoId,
        });
        if (removed) {
          await loaderCourseVideo.clear(courseVideoId);
          return courseVideo;
        }
      }
    } catch (error) {}
    return null;
  };

  return {
    add: async (
      {
        courseId = null,
        name = null,
        description = null,
        link = null,
        video = null,
        thumbnail = null,
      } = {},
      { tokenUser: { adminId: instructorId = null } = {} } = {}
    ) => {
      if (courseId && name && instructorId) {
        try {
          instructorId = validations.cleanValue(instructorId);
          courseId = validations.cleanValue(courseId);
          name = validations.cleanValue(name);
          link = validations.cleanValue(link);
          const descriptionClean = validations.cleanValue(description);

          let thumbnailId = null;

          if (thumbnail) {
            const thumbnailUploaded = await classUpload.uploadImage(thumbnail);
            if (thumbnailUploaded?.url) {
              thumbnailId = await classImageModel.add({
                name: thumbnailUploaded.filename,
              });
            }
          }
          const isVimeo = !!link?.match(/https\:\/\/vimeo.com/);
          let filenameVideo = isVimeo && (await getIdFromLink(link));
          if (isVimeo) {
            if (!filenameVideo) {
              const videoUploaded = await classUpload.uploadVideo(
                video,
                name,
                description
              );
              if (videoUploaded && videoUploaded.url) {
                filenameVideo = videoUploaded.filename;
              }
            }
          }

          const videoAddedId = await classVideoModel.add({
            url: link,
            name: isVimeo ? filenameVideo : new Date(Date.now()).toISOString(),
          });
          if (videoAddedId) {
            const courseVideoId = await classCourseVideoModel.add({
              courseId,
              name,
              description: descriptionClean,
              videoId: videoAddedId,
              thumbnailId,
            });
            if (courseVideoId) {
              let courseVideo = await loaderCourseVideo.load(courseVideoId);
              if (courseVideo) {
                return courseVideo;
              }
            }
          }
        } catch (error) {}
      }
      return null;
    },
    get: async (
      { courseId = null, videoId = null } = {},
      { tokenUser: { adminId = null, studentId = null } = {} } = {}
    ) => {
      if (courseId && videoId && (adminId || studentId)) {
        try {
          courseId = validations.cleanValue(courseId);
          videoId = validations.cleanValue(videoId);

          return classCourseVideoModel.findOne({
            where: {
              [COURSE_VIDEO.COURSE]: courseId,
              [COURSE_VIDEO.VIDEO]: videoId,
            },
          });
        } catch (error) {}
      }
      return null;
    },
    remove: async (
      { courseId = null, videoId = null } = {},
      { tokenUser: { adminId = null } = {} } = {}
    ) => {
      if (courseId && videoId && adminId) {
        try {
          return removeVideo(courseId, videoId);
        } catch (error) {}
      }
      return null;
    },
    update: async (
      {
        courseId = null,
        videoId = null,
        link = null,
        name = null,
        description = null,
        thumbnail = null,
      } = {},
      { tokenUser: { adminId = null } = {} } = {}
    ) => {
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
            },
          });
          if (courseVideo) {
            let thumbnailId = null;

            if (thumbnail) {
              const thumbnailUploaded = await classUpload.uploadImage(
                thumbnail
              );

              if (thumbnailUploaded && thumbnailUploaded.url) {
                thumbnailId = await classImageModel.add({
                  name: thumbnailUploaded.filename,
                });
              }
            }

            const courseVideoId = courseVideo[COURSE_VIDEO.ID];
            const updated = await classCourseVideoModel.update({
              id: courseVideoId,
              data: {
                name,
                description,
                thumbnailId,
              },
            });
            if (updated) {
              const filenameVideo = await getIdFromLink(link);
              if (filenameVideo) {
                await classVideoModel.update({
                  id: videoId,
                  data: { name: filenameVideo },
                });
              }

              await loaderCourseVideo.clear(courseVideoId);
              const response = await loaderCourseVideo.load(courseVideoId);
              if (response) {
                return response;
              }
            }
          }
        } catch (error) {}
      }
      return null;
    },
  };
};

export default CourseVideoController;
