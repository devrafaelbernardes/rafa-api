const AWS = require('aws-sdk');

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'ACCESS_KEY',
    secretAccessKey: 'SECRET_KEY'
});

// Add a file to a Space
var params = {
    Body: "The contents of the file",
    Bucket: "my-new-space-with-a-unique-name",
    Key: "file.ext",
    ACL: 'public-read'
};

s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});