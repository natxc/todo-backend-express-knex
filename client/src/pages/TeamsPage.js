import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeamsContext from '../context/TeamsContext';

const TeamsPage = () => {
    const { teams, fetchTeams } = useContext(TeamsContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeams = async () => {
            await fetchTeams();
            setLoading(false);
        };
        loadTeams();
    }, [fetchTeams]);

    if (loading) {
        return <div className="loading">Loading teams...</div>;
    }

    return (
        <div className="teams-page">
            <header>
                <h1>All Teams</h1>
            </header>

            <section className="teams-list-section">
                {teams.length > 0 ? (
                    <ul className="teams-list">
                        {teams.map((team) => (
                            <li key={team.id} className="team-item">
                                <Link to={`/teams/${team.id}`} className="team-link">
                                    <h2>{team.name}</h2>
                                    <p>{team.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No teams found.</p>
                )}
            </section>
        </div>
    );
};

export default TeamsPage;
