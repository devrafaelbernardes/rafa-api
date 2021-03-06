import AWS from 'aws-sdk';

import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    BUCKET_AWS_S3,
    ENDPOINT_SPACE,
} from './server';

// Configure client for use with Spaces
//const spacesEndpoint = new AWS.Endpoint(/* ENDPOINT_SPACE ||  */`nyc3.digitaloceanspaces.com`);
export const awsS3 = new AWS.S3({
    //endpoint: spacesEndpoint,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

export const Bucket = BUCKET_AWS_S3;

export const options = {
    //partSize: 10 * 1024 * 1024,
    //queueSize: 1
};

export const getSignedUrl = ({ url, name, isPrivate = false }) => {
    if(url || name){
        try {
            if(!isPrivate){
                return `${url}${name}`;
            }
            return awsS3.getSignedUrl('getObject', {
                Bucket,
                Key: name,
                Expires: 3600 // 1 day expires
            });
        } catch (error) {}
    }
    return null;
}

export default {
    awsS3,
    Bucket,
    options,
    getSignedUrl,
};