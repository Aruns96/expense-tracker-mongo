const AWS = require("aws-sdk");



const uploadToS3 = (fileName,data)=>{
    const BUCKET_NAME = process.env.AWS_BUCKET;
    const IAM_USER_KEY = process.env.AWS_ACESS_KEY;
    const IAM_USER_SECRET=process.env.AWS_SECRET_KEY;


    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        
    });

   
        var params = {
            Bucket:BUCKET_NAME,
            Key:fileName,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    
                    reject(err);
                    console.log(err);
                }else{
                    //console.log(s3response)
                    resolve(s3response.Location); 
                }
            })   
        })
       
   
}

module.exports ={
    uploadToS3
}