import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../../components/Form/IssueForm';
import IssuesContext from '../../context/IssuesContext';

const CreateIssuePage = () => {
    const { createIssue } = useContext(IssuesContext);
    const navigate = useNavigate();

    const handleCreateIssue = async (data) => {
        try {
            await createIssue(data);
            navigate('/issues');
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };

    return (
        <div className="create-issue-page">
            <h1>Create a New Issue</h1>
            <IssueForm onSubmit={handleCreateIssue} submitText="Create Issue" />
        </div>
    );
};

export default CreateIssuePage;