import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import IssuesContext from '../../context/IssuesContext';
import ProjectsContext from '../../context/ProjectsContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

const IssueDetailsPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { issues, fetchIssues } = useContext(IssuesContext);
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [issue, setIssue] = useState(state?.updatedIssue || null);
    // const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadIssueDetails = async () => {
            if (!state?.updatedIssue && issues.length === 0) {
                await fetchIssues();
            }

            const currentIssue = state?.updatedIssue || issues.find((issue) => issue.issue_id === Number(id));
            setIssue(currentIssue);
            setLoading(false);
        };

        loadIssueDetails();
    }, [id, issues, state, fetchIssues, fetchProjects ]);

    if (loading) {
        return <div className="loading">Loading issue details...</div>;
    }

    if (!issue) {
        return <div className="error">Issue not found.</div>;
    }

    const relatedProjects = projects.filter((project) => project.issue_id === Number(id));

    return (
        <div className="issue-details-page">
            <header>
                <Navbar />
            </header>
            <main className="main-content" style={{
                backgroundImage: `url('/assets/hero.png')`
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>{issue.title}</h1>
                <Button onClick={() => navigate(`/issues/${id}/edit`)} >
                    Edit Issue
                </Button>
                <p>Status: <strong>{issue.status}</strong></p>
                <p>Priority: <strong>{issue.priority}</strong></p>
                <p>Assigned to: <strong>{issue.assignee || 'Unassigned'}</strong></p>

            <section className="issue-description">
                <h2>Description</h2>
                <p>{issue.description || 'No description provided.'}</p>
            </section>

            <section className="related-projects">
                <h2>Related Projects</h2>
                {relatedProjects.length > 0 ? (
                    <ul className="projects-list">
                        {relatedProjects.map((project) => (
                            <li key={project.project_id} className="project-item">
                                <Link to={`/projects/${project.project_id}`} className="project-link">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No related projects found.</p>
                )}
            </section>

            {/* <section className="comments-section">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <li key={comment.comment_id} className="comment">
                                <p>
                                    <strong>{comment.author}</strong>: {comment.content}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
            </section> */}
            </main>
        </div>
    );
};

export default IssueDetailsPage;
