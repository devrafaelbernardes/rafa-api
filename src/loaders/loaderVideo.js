import loader from "./loader";
import VideoModel from "../classes/models/VideoModel";

const batchVideo = async(ids) => {
    const classVideoModel = VideoModel();
    return classVideoModel.findIn({ ids });
}

export const loaderVideo = loader(batchVideo)

export default loaderVideo;