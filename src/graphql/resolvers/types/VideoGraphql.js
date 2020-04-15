import typeVideo from '../../typeDefs/types/video';
import { VIDEO } from '../../../database/tables';
import { isDevelopment, LINK_VIDEOS } from '../../../config/server';
import { getSignedUrl } from '../../../config/awsS3';

const getURL = (name) => !isDevelopment ? getSignedUrl(name) : `${LINK_VIDEOS}${name}`;

export const VideoGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeVideo.COLUMNS.ID]: (video) => video[VIDEO.ID],
    [typeVideo.COLUMNS.URL]: (video) => getURL(video[VIDEO.NAME]),
    [typeVideo.COLUMNS.IS_ACTIVE]: (video) => video[VIDEO.IS_ACTIVE],
    [typeVideo.COLUMNS.CREATED_AT]: (video) => video[VIDEO.CREATED_AT],
});

export default VideoGraphql;