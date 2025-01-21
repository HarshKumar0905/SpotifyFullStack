import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, 
            {folder : "SpotifyAssets", resource_type : "video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, 
            {folder : "SpotifyAssets", resource_type : "image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

        const songData = {
            name,
            desc,
            album,
            image : imageUpload.secure_url,
            file : audioUpload.secure_url,
            duration : duration
        }

        const song = songModel(songData);
        await song.save();

        res.status(200).json({
            success : 'true',
            imageUrl : imageUpload.secure_url,
            audioUrl : audioUpload.secure_url,
            message : 'Song uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in uploading song',
            error : error
        });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.status(200).json({
            success : 'true',
            songs : allSongs,
            message : 'All songs fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in fetching all songs',
            error : error
        });
    }
}

const removeSong = async (req, res) => {
    try {
        const song = await songModel.findByIdAndDelete(req.body.id);
        await cloudinary.uploader.destroy("SpotifyAssets/"+song.image.split("/").at(-1).split(".").at(0), 
        {folder : "SpotifyAssets", resource_type : "image"});
        await cloudinary.uploader.destroy("SpotifyAssets/"+song.file.split("/").at(-1).split(".").at(0), 
        {folder : "SpotifyAssets", resource_type : "video"});

        res.status(200).json({
            success : 'true',
            message : 'Song deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error encountered in deleting the song',
            error : error
        });
    }
}

export {addSong, listSong, removeSong};