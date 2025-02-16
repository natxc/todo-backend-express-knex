import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueForm from '../../components/Form/IssueForm';
import Navbar from '../../components/Navbar';

const EditIssuePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issueData, setIssueData] = useState(null);

    useEffect(() => {
        const fetchIssue = async () => {
            const response = await fetch(`/issues/${id}`);
            const data = await response.json();
            setIssueData(data);
        };
        fetchIssue();
    }, [id]);

    const handleUpdateIssue = async (updatedData) => {
        try {
            const response = await fetch(`/issues/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update issue: ${response.statusText}`);
            }

            const updatedIssue = await response.json();
            console.log('Issue updated successfully:', updatedIssue);

            navigate(`/issues/${id}`, { state: { updatedIssue } });
        } catch (error) {
            console.error('Error updating issue:', error);
        }
    };

    if (!issueData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-issue-page">
            <header>
                <Navbar />
            </header>
            <main className="main-content" style={{
                backgroundImage: `url('/assets/hero.png')`
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>Edit Issue</h1>
            <IssueForm
                onSubmit={handleUpdateIssue}
                initialData={{...issueData, id}}
                submitText="Update Issue"
            />
            </main>
        </div>
    );
};

export default EditIssuePage;
