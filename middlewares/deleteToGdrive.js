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
    if(req.data.el_image_gdriveid){
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
        try {
            await drive.files.delete({
                fileId: req.data.el_image_gdriveid,// file id
            });
        } catch (error) {
            console.log(error.message);
        } 
    }

    next()
} 