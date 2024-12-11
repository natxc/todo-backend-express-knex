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
                {/* <button className='submit-btn' onClick={() => navigate('/issues/new')}>Create Issue</button> */}
            </header>

            <section className="issues-list-section">
                {issues.length > 0 ? (
                    <ul className="issues-list">
                        <ul>
                        {issues.map((issue) => (
                            <li key={issue.issue_id} className="issue-item">
                                <Link to={`/issues/${issue.issue_id}`} className="issue-link">
                                    <h2>{issue.title}</h2></Link>
                                    <p>Status: <strong>{issue.status}</strong></p>
                                    <p>Priority: <strong>{issue.priority}</strong></p>
                                    <p>Description: <strong>{issue.description}</strong></p>
                            </li>
                        ))}
                        </ul>
                    </ul>
                ) : (
                    <p>No issues found.</p>
                )}
            </section>
        </div>
    );
};

export default IssuesPage;