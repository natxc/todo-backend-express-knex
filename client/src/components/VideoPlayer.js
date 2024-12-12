import React from 'react';
import videoFile from '../assets/Locking_In.mp4';

const VideoPlayer = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <video width="600" controls>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    );
};

export default VideoPlayer;
