import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IssuesContext from '../../context/IssuesContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../../styles/PageAndDetail.css';

const IssuesPage = () => {
    const { issues, fetchIssues } = useContext(IssuesContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadIssues = async () => {
            await fetchIssues();
            setLoading(false);
        };
        loadIssues();
    }, [fetchIssues]);

    return (
        <div className="object-page">
            <header>
                <Navbar />
            </header>

            <main className="object-page-content">
                <h1 className="page-title">All Issues</h1>
                <div className="create-object-container">
                    <Button
                        onClick={() => navigate('/issues/new')}
                        className="create-object-btn"
                    >
                        Create Issue
                    </Button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <LoadingSpinner />
                        <p>Loading issues...</p>
                    </div>
                ) : (
                    <section className="object-list-section">
                        {issues.length > 0 ? (
                            <ul className="object-list">
                                {issues.map((issue) => (
                                    <li key={issue.issue_id} className="object-item">
                                        <Link to={`/issues/${issue.issue_id}`} className="object-link">
                                            <h2 className="object-name">{issue.title}</h2>
                                            <p>Status: <strong>{issue.status}</strong></p>
                                            <p>Priority: <strong>{issue.priority}</strong></p>
                                            <p>Description: <strong>{issue.description}</strong></p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No issues found.</p>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default IssuesPage;