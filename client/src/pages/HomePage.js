import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <div className="home-page">
            <header>
                <Navbar />
            </header>
            {/* embed link straight from Canva: TODO: redo this, I don't like it */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    paddingTop: '70.7071%',
                    paddingBottom: 0,
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                    marginTop: '1.6em',
                    marginBottom: '0',
                    marginLeft: '0',
                    marginRight: '0',
                    overflow: 'hidden',
                    borderRadius: '0px',
                    willChange: 'transform',
                }}
            >
                <iframe
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        botton: 0,
                    }}
                    src="https://www.canva.com/design/DAGZDGe3SZE/PNuz7q2iTLqggAxebs2sIA/view?embed"
                    title="Canva Welcome Poster"
                    allowFullScreen
                    allow="fullscreen"
                ></iframe>
            </div>

        </div>
    );
};

export default HomePage;
