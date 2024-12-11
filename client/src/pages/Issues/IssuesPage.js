import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IssuesContext from '../../context/IssuesContext';

const IssuesPage = () => {
    const { issues, fetchIssues } = useContext(IssuesContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIssues = async () => {
            await fetchIssues();
            setLoading(false);
        };
        loadIssues();
    }, [fetchIssues]);

    if (loading) {
        return <div className="loading">Loading issues...</div>;
    }

    return (
        <div className="issues-page">
            <header>
                <h1>All Issues</h1>
            </header>

            <section className="issues-list-section">
                {issues.length > 0 ? (
                    <ul className="issues-list">
                        {issues.map((issue) => (
                            <li key={issue.id} className="issue-item">
                                <Link to={`/issues/${issue.id}`} className="issue-link">
                                    <h2>{issue.title}</h2>
                                    <p>Status: <strong>{issue.status}</strong></p>
                                    <p>Priority: <strong>{issue.priority}</strong></p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No issues found.</p>
                )}
            </section>
        </div>
    );
};

export default IssuesPage;