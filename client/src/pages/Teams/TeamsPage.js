import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TeamsContext from '../../context/TeamsContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../../styles/PageAndDetail.css';

const TeamsPage = () => {
    const { teams, fetchTeams } = useContext(TeamsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTeams = async () => {
            await fetchTeams();
        };
        loadTeams();
    }, [fetchTeams]);

    return (
        <div className="object-page">
            <header>
                <Navbar />
            </header>

            <main className="object-page-content">
                <h1 className="page-title">All Teams</h1>

                <div className="create-object-container">
                    <Button
                        onClick={() => navigate('/teams/new')}
                        variant="primary"
                        className="create-object-btn"
                    >
                        Create Team
                    </Button>
                </div>

                {!teams.length ? (
                    <div className="loading-container">
                        <LoadingSpinner />
                        <p>Loading teams...</p>
                    </div>
                ) : (
                    <section className="object-list-section">
                        <ul className="object-list">
                            {teams.map((team) => (
                                <li key={team.team_id} className="object-item">
                                    <Link to={`/teams/${team.team_id}`} className="object-link">
                                        <h2 className="object-name">{team.name}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TeamsPage;