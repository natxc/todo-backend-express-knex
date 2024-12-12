import React from 'react';
// import videoFile from '../assets/Locking_In.mp4';

const VideoPlayer = () => {
    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        // <video width="600" controls>
        //     {/* <source src={videoFile} type="video/mp4" /> */}
        //     Your browser does not support the video tag.
        // </video>
        // </div>
        <div style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%',
            paddingBottom: 0,
            boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            marginTop: '1.6em',
            marginBottom: '0.9em',
            overflow: 'hidden',
            borderRadius: '8px',
            willChange: 'transform'
        }}>
            <iframe
                title="Canva Video Player"
                loading="lazy"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0
                }}
                src="https://www.canva.com/design/DAGZHl291Bk/lrWT09rMi-dFsWnOvgiijw/watch?embed"
                allowFullScreen
                allow="fullscreen">
            </iframe>
        </div>
    );
};

export default VideoPlayer;
