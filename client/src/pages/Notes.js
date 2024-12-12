import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

const Notes = () => {
    return (
        <section className="notes-section">
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
                <li>Patch and Put</li>
            </ul>

            <h2>Video Embedding</h2>
            <p>This was my first time embedding a video directly with the .mp4 and not using an externaly published source</p>
            <p>Please enjoy a 3-hour chunk of heads down work on the front-end and deployment of this web app</p>
            <p>Sponsored by Dr.Pepper</p>
            <VideoPlayer />
        </section>
    );
};

export default Notes;
