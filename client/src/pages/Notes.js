import React from 'react';

const Notes = () => {
    return (
        <section className="notes-section">
            <h1>Developer Notes</h1>
            <p>Here’s where you can document anything about your project, processes, or APIs.</p>

            <h2>Project Overview</h2>
            <p>This is a brief overview of the project...</p>

            <h2>API Details</h2>
            <p>Include any specific notes about your APIs...</p>

            <h2>Other Notes</h2>
            <ul>
                <li>Remember to run database migrations after deployment.</li>
                <li>Use <code>npx knex seed:run</code> for initial data seeding.</li>
                <li>Follow the project's folder structure for better maintainability.</li>
            </ul>
        </section>
    );
};

export default Notes;
