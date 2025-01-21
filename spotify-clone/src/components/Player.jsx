import React from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { useContext } from 'react';
import { FaPlay } from "react-icons/fa";
import { FaPause } from 'react-icons/fa';

const Player = () => {

    const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong} = useContext(PlayerContext);

    return track ? (
        <div className='h-[10%] flex bg-black justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image} alt=""/>
                <div>
                    <p>{track.name}</p>
                    <p className='text-gray-400 text-sm'>{track.desc.slice(0,12)}</p>
                </div>
            </div>

            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-5 items-center'>
                    <img className='w-4 h-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className='w-4 h-4 cursor-pointer' src={assets.prev_icon} alt="" />
                    <div className='bg-white rounded-full grid h-8 w-8 place-items-center'>
                        {
                            
                            playStatus ? <FaPause onClick={pause} className='w-4 cursor-pointer text-black'/> :
                            <FaPlay onClick={play} className='w-4 cursor-pointer text-black' />
                        } 
                    </div>   
                    <img onClick={next} className='w-4 h-4 cursor-pointer' src={assets.next_icon} alt="" />
                    <img className='w-4 h-4 cursor-pointer' src={assets.loop_icon} alt="" />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second<=9 ? `0`:``}{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] h-1 max-w-[500px] bg-gray-700 rounded-full cursor-pointer group'>
                        <div className='flex items-center -translate-y-1'>
                            <hr ref={seekBar} className='h-1 border-none w-10 group-hover:bg-green-500 bg-white rounded-full'/>
                            <div className={`bg-white rounded-full size-3 group-hover:visible invisible -translate-x-1`}/>
                        </div>                     
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img className="w-4" src={assets.plays_icon} alt=""/>
                <img className="w-4" src={assets.mic_icon} alt=""/>
                <img className="w-4" src={assets.queue_icon} alt=""/>
                <img className="w-4" src={assets.speaker_icon} alt=""/>
                <img className="w-4" src={assets.volume_icon} alt=""/>
                <div className='w-20 bg-slate-50 h-1 rounded'></div>
                <img className="w-4" src={assets.mini_player_icon} alt=""/>
                <img className="w-4" src={assets.zoom_icon} alt=""/>
            </div>
        </div>
    ) : null
}

export default Player;