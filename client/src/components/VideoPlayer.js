import React from 'react';
import videoFile from '../assets/Locking_In.MP4';

const VideoPlayer = () => {
    return (
        <video width="600" controls>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
