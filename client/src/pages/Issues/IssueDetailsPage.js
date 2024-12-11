import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../api/comments';
import IssuesContext from '../../context/IssuesContext';

const IssueDetailsPage = () => {
    const { id } = useParams();
    const { issues } = useContext(IssuesContext);
    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIssueDetails = async () => {
            const currentIssue = issues.find((issue) => issue.id === id);
            setIssue(currentIssue);
            if (currentIssue) {
                const fetchedComments = await fetchComments(id);
                setComments(fetchedComments);
            }
            setLoading(false);
        };

        loadIssueDetails();
    }, [id, issues]);

    if (loading) {
        return <div className="loading">Loading issue details...</div>;
    }

    if (!issue) {
        return <div className="error">Issue not found.</div>;
    }

    return (
        <div className="issue-details-page">
            <header className="issue-header">
                <h1>{issue.title}</h1>
                <p>Status: <strong>{issue.status}</strong></p>
                <p>Priority: <strong>{issue.priority}</strong></p>
                <p>Assigned to: <strong>{issue.assignee || 'Unassigned'}</strong></p>
            </header>

            <section className="issue-description">
                <h2>Description</h2>
                <p>{issue.description}</p>
            </section>

            <section className="comments-section">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <li key={comment.id} className="comment">
                                <p><strong>{comment.author}</strong>: {comment.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
            </section>
        </div>
    );
};

export default IssueDetailsPage;
