const fs = require('fs')
const readline = require('readline')
const { promisify } = require('util')
const path = require('path')
const unlinkAsync = promisify(fs.unlink)
const {google} = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const FOLDERID = process.env.FOLDERID

module.exports = async (req, res, next) => {
    if(req.file){
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });
        const filePath = path.join(__dirname, '../public', req.FILELOCALPATH);
        try{
            if(req.fileid){ 
                await drive.files.delete({
                    fileId: req.fileid,// file id
                }); 
            }

            const response = await drive.files.create({
                    requestBody: {
                        name: req.FILEID + path.extname(req.file.originalname), //file name
                        mimeType: req.file.mimetype,
                        parents: [FOLDERID]
                    },
                    media: {
                        mimeType: req.file.mimetype,
                        body: fs.createReadStream(filePath),
                    },
                });  
                
                const fileId = response.data.id; 
                await drive.permissions.create({
                    fileId: fileId,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone',
                    },
                });
 
                const result = await drive.files.get({
                    fileId: fileId,
                    fields: 'webViewLink',
                });

                req.additional_info = {
                    fileid: fileId,
                    link: result.data.webViewLink
                }

                

        } catch (error) { 
            console.log(error.message);
        }
    
        await unlinkAsync(req.file.path) 
    }

    next()
} 