import {v2 as cloudinary} from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, 
            {folder : "SpotifyAssets", resource_type : "image"});

        const albumData = {
            name,
            desc,
            bgColor,
            image : imageUpload.secure_url
        }
        const album = albumModel(albumData);
        await album.save();

        res.status(200).json({
            success : 'true',
            imageUrl : imageUpload.secure_url,
            message : 'Album uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in uploading album',
            error : error
        });
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.status(200).json({
            success : 'true',
            albums : allAlbums,
            message : 'All albums fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in fetching all albums',
            error : error
        });
    }
}

const removeAlbum = async (req, res) => {
    try {
        const album = await albumModel.findByIdAndDelete(req.body.id);
        await cloudinary.uploader.destroy("SpotifyAssets/"+album.image.split("/").at(-1).split(".").at(0), 
        {folder : "SpotifyAssets", resource_type : "image"});

        res.status(200).json({
            success : 'true',
            message : 'Album deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in deleting the album',
            error : error
        });
    }  
}

export {addAlbum, listAlbum, removeAlbum};