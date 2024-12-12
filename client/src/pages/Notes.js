import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Navbar from '../components/Navbar';
import '../styles/index.css';

const Notes = () => {
    return (
        <>        
        <header>
            <Navbar />
        </header>
            <main className="main-content">
            
            <h1>My Notes</h1>
            <p>It's been a whirlwind of a week and here's what I learned:</p>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Knex</h2>
            <ul>
                <li>I've seen and used similar query builders, but I've never heard of Knex (in this sense)</li>
                <li>Learned the make command and the syntax in creating, updating, dropping tables</li>
                <li>Gained experience running migrations and seeds to populate the database with initial data</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Middleware</h2>
            <ul>
                <li>Middleware provides modular and reusable functionality for processing requests in Express applications</li>
                <li>Learned how crutial and handy it is for logging and/or error handling</li>
                <li>I used body-parser for the first-time</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>bcrypt</h2>
            <ul>
                <li>Experience in integrating bcrypt for user authentication workflows</li>
                <li>Fun hashing/salting/encoding/decoding/matching passwords</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Swagger</h2>
            <ul>
                <li>Used Swagger for the first time to document an API</li>
                <li>I appreciate good API docs and now I understand they're fairly simple to build, at least on a small scale</li>
            </ul><div style={{ marginBottom: '2rem' }}></div>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>JWT Tokens</h2>
            <ul>
                <li>Learned about JSON Web Tokens for secure and stateless user authentication</li>
                <li>Creating, verifying, storing, and expiring tokens was a satisfying process to go through</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Areas of improvement for this project:</h2>
            <ul>
                <li>My code isn't as DRY as it could be - could definitely re-write to make aspects more re-usable</li>
                <li>I am not happy with my UI/UX yet</li>
                <li>Need to add in comments</li>
                <li>Have a PR out there to start working on user authentication for fetching their teams, projects, issues</li>
                <li>I'm pretty sure I have something blowing up the network console</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Random Specifics & General best practices</h2>
            <ul>
                <li>Gained clarity on the differences between PATCH and PUT</li>
                <li>Learned the importance of <b>not prefixing</b> primary keys in a table and why this improves design and readability :)</li>
            </ul>
                <div style={{ marginBottom: '2rem' }}></div>
            <h2>Video Embedding</h2>
            <ul>
            <li>This was my first time embedding a video directly with the .mp4 and not using an externaly published source</li>
            <li>First time working with git lfs too. Probably not best practice. Maybe someone should invent a CDN or something..</li>
            <li>Okay so it turns out git lfs and Heroku do not mix and that was a nightmare.</li>
            <li>Regardless, please enjoy a peek into a 3-hour chunk of heads down work on the front-end and deployment of this web app</li>
            <li>Sponsored by Dr.Pepper</li>
                <li><VideoPlayer /></li>
            </ul>
        </main >
        </>
    );
};

export default Notes;
