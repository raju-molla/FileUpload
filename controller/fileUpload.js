const fs = require('fs');
const img= require('../models/images');
const singleFileUpload = async(req,res)=>{
    try{
        if(req.file){
            return res.json({
                mgs: "file uploaded properly",
                fileDetails: req.file
            })
        }
        else {
            return res.json({
                mgs: "upload a invalid image!"
            })
        }

    }
    catch(err){
        return res.json({
            err
        })
    }
}

const multiFileUploader = async(req,res)=>{
    try{
        if(req.files){
            return res.json({
                mgs: "multi file is uploaded!",
                fileDetails: req.files
            })
        }
        else{
            return res.json({
                mgs: "upload an invalid image"
            })
        }
    }
    catch(err){
        return res.json({
            err
        })
    }
}

const uploadBase64 = async (req, res) => {

    try {

        const path = './images/'+Date.now()+'.jpg'
        
        const user = new img({
            image:path
        });
        await user.save();

        const imgdata = req.body.image;
        
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
        

        return res.send(path);

    } catch (e) {
        console.log(e);
    }
}
module.exports ={
    singleFileUpload,
    multiFileUploader,
    uploadBase64
}