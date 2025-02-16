import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/Form/ProjectForm';
import ProjectsContext from '../../context/ProjectsContext';
import Navbar from '../../components/Navbar';

const CreateProjectPage = () => {
    const { createProject } = useContext(ProjectsContext);
    const navigate = useNavigate();

    const handleCreateProject = async (data) => {
        try {
            await createProject(data);
            navigate('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className="create-project-page" style={{
            backgroundImage: `url('/assets/hero.png')` }} >
            <header>
                <Navbar />
            </header>
                <main className="main-content">
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>Create a New Project</h1>
            <ProjectForm onSubmit={handleCreateProject} submitText="Create Project" />
            </main>
        </div>
    );
};

export default CreateProjectPage;