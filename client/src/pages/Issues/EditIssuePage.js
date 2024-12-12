import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueForm from '../../components/Form/IssueForm';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

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

    const handleDeleteIssue = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this issue?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/issues/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete issue: ${response.statusText}`);
            }

            console.log('Issue deleted successfully');
            alert('Issue deleted successfully!');
            navigate('/issues');
        } catch (error) {
            console.error('Error deleting issue:', error);
            alert('Failed to delete issue. Please try again.');
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
            <h1>Edit Issue</h1>
            <IssueForm
                onSubmit={handleUpdateIssue}
                initialData={issueData}
                submitText="Update Issue"
            />
            <Button
                onClick={handleDeleteIssue}
                className="delete-btn"
                variant="danger"
            >
                Delete Issue
            </Button>
        </div>
    );
};

export default EditIssuePage;
