import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginPage from './LoginPage';
import SignupPage from './Signup';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
    const { user, isLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setShowAuthModal(!user);
            setIsSignup(false);
        }
    }, [user, isLoading]);

    const toggleAuthMode = () => {
        setIsSignup((prev) => !prev);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-page">
            <header>
                <Navbar />
            </header>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    backgroundImage: "url('/assets/hero.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {!showAuthModal && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        padding: '2rem',
                        borderRadius: '1rem',
                        width: '100%',
                        gap: '2rem'
                    }}>
                        <div style={{ flex: 1, textAlign: 'left', paddingLeft: '5rem' }}>
                            <h1 style={{ fontSize: '4.7rem', fontWeight: 'bold', marginBottom: '0.1rem', fontFamily: 'SF Hello, sans-serif' }}>Kanban + Bonsai</h1>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '18rem', fontFamily: 'SF Hello, sans-serif' }}>Project Management, Cultivated with Simplicity.</h2>
                        </div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            <img
                                src="/assets/logo.png"
                                alt="KanBonsai Logo"
                                style={{ paddingTop: '100px', width: '100%', maxWidth: '800px' }}
                            />
                            <p style={{ maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5', marginTop: '4rem', textAlign: 'center', fontFamily: 'SF Hello, sans-serif' }}>
                                KanBonsai blends the efficiency of Kanban with the thoughtful precision of Bonsai. Our intuitive task management tools help you stay organized, foster team collaboration, and nurture projects from inception to success—without the clutter or complexity.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {showAuthModal && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal">
                        {isSignup ? (
                            <SignupPage toggleAuthMode={toggleAuthMode} />
                        ) : (
                            <LoginPage toggleAuthMode={toggleAuthMode} />
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .auth-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .auth-modal {
                    background: white;
                    width: 400px;
                    height: 500px;
                    padding: 2rem;
                    border-radius: 20px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
