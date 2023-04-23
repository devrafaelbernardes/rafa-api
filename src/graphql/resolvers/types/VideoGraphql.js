import typeVideo from "../../typeDefs/types/video";
import { VIDEO } from "../../../database/tables";
import Upload from "../../../classes/models/Upload";

export const VideoGraphql = {
  // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
  [typeVideo.COLUMNS.ID]: (video) => video[VIDEO.ID],
  [typeVideo.COLUMNS.NAME]: (video) => video[VIDEO.NAME],
  [typeVideo.COLUMNS.URL]: (video) =>
    video[VIDEO.URL] || Upload().getVideoUrl(video[VIDEO.NAME]),
  [typeVideo.COLUMNS.IS_ACTIVE]: (video) => video[VIDEO.IS_ACTIVE],
  [typeVideo.COLUMNS.CREATED_AT]: (video) => video[VIDEO.CREATED_AT],
};

export default VideoGraphql;
