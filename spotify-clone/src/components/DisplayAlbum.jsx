import React, {useContext, useState, useEffect} from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from '../context/PlayerContext';
import Lottie from 'lottie-react';
import soundPlay from "../assets/SoundPlaying.json";

const DisplayAlbum = ({album}) => {
    const {id} = useParams();
    const [albumData, setAlbumData] = useState("");
    const {playWithId, track, playStatus, albumsData, songsData} = useContext(PlayerContext);

    useEffect(() => {
        albumsData.map((item) => {
            if(item._id === id) {
                setAlbumData(item);
            }
        })
    }, []);

    return albumData ?  (
        <>
            <Navbar/>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className="mt-1 gap-1">
                        <img className="inline-block w-5 mr-1.5" src={assets.spotify_logo} alt="" />
                        <b className="mr-4">Spotify</b>
                        • 1,323,154 likes <b className="mr-4"></b>
                        • <b>50 songs, </b>
                        about 2 hr 30 min
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className="mr-7">#</b>Title</p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr/>
            {
                songsData.filter((item) => item.album === album.name).map((item, index) => (
                    <div onClick={() => playWithId(item._id)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded-md">
                        <p className="text-white flex items-center">
                            <div className="flex items-center">
                                <b className={`${ track.id==index ? !playStatus ? "mr-7 text-green-500" : "mr-[18.5px]" : "mr-7 text-[#a7a7a7]"}`}>
                                {
                                    track.id==index ? !playStatus ? index +1 :
                                    <Lottie animationData={soundPlay} loop={true} className="size-5"/> : index+1
                                }
                                </b>
                            <img className="inline w-10 mr-5" src={item.image} alt=""/>
                            </div>
                            <div className={`${track.id==index ? "text-green-500" : ""}`}>{item.name}</div>
                        </p>

                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] hidden sm:block">5 days ago</p>
                        <p className="text-[15px] text-center">{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null
}

export default DisplayAlbum;