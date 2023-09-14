import AWS from "aws-sdk"

export const s3cofing ={
    bucketName:process.env.REACT_APP_AWS_BUCKET as string,
    region:process.env.REACT_APP_AWS_REGION , 
    accesskeyId:process.env.REACT_APP_AWS_ACCESSKEYID,
    secretAccessKey:process.env.REACT_APP_AWS_SECRETKEY
};

const S3_BUCKET = s3cofing.bucketName
const REGION = s3cofing.region
AWS.config.update({
    accessKeyId: s3cofing.accesskeyId,
    secretAccessKey: s3cofing.secretAccessKey,
  });

  export const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  export const s3URL = `https://s3.amazonaws.com/${S3_BUCKET}`;