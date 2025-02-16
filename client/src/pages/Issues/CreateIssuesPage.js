import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../../components/Form/IssueForm';
import IssuesContext from '../../context/IssuesContext';
import Navbar from '../../components/Navbar';
import '../../styles/index.css'

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
        <div className="create-issue-page" style={{ backgroundImage: `url('/assets/hero.png')` }} >
            <header>
                <Navbar />
            </header>
            <main className="main-content">
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>Create a New Issue</h1>
            <IssueForm onSubmit={handleCreateIssue} submitText="Create Issue" />
            </main>
        </div>
    );
};

export default CreateIssuePage;