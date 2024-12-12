import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Navbar from '../components/Navbar';

const Notes = () => {
    return (
        <section className="notes-section">            
        <header>
            <Navbar />
        </header>
            <h1>My Notes</h1>
            <p>It's been a whirlwind of a week and here's what I learned.</p>

            <h2>Knex</h2>
            <ul>
                <li>I've seen and used similar query builders, but I've never heard of knex</li>
                <li>Syntax in creating the tables</li>
                <li>Running migrations and seeds</li>
            </ul>

            <h2>General best practices</h2>
            <ul>
                <li>I learned why primary keys in a table shouldn't get a prefix :)</li>
            </ul>

            <h2>Middleware</h2>
            <p></p>

            <h2>bcrypt</h2>
            <p></p>

            <h2>Swagger</h2>
            <p>First time using Swagger or documenting an API in general</p>

            <h2>JWT Tokens</h2>

            <h2>Areas of improvement:</h2>
            <ul>
                <li></li>
            </ul>

            <h2>Random Specifics</h2>
            <ul>
                <li>The nuances between Patch and Put</li>
            </ul>

            <h2>Video Embedding</h2>
            <ul>
            <li>This was my first time embedding a video directly with the .mp4 and not using an externaly published source</li>
            <li>First time working with git lfs too. Probably not best practice. Maybe someone should invent a CDN or something..</li>
            <li>Please enjoy a 3-hour chunk of heads down work on the front-end and deployment of this web app</li>
            <li>Sponsored by Dr.Pepper</li>
                <li><VideoPlayer /></li>
            </ul>
            
        </section>
    );
};

export default Notes;
