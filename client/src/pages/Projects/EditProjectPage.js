import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectForm from '../../components/Form/ProjectForm';
import Navbar from '../../components/Navbar';

const EditProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            const response = await fetch(`/projects/${id}`);
            const data = await response.json();
            setProjectData(data);
        };
        fetchProject();
    }, [id]);

    const handleUpdateProject = async (updatedData) => {
        try {
            const response = await fetch(`/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update project: ${response.statusText}`);
            }

            const updatedProject = await response.json();
            console.log('Project updated successfully:', updatedProject);

            navigate(`/projects/${id}`, { state: { updatedProject } });
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    if (!projectData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-project-page">
            <header>
                <Navbar />
            </header>
            <main className="main-content" style={{
                backgroundImage: `url('/assets/hero.png')`
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>Edit Project</h1>
            <ProjectForm
                onSubmit={handleUpdateProject}
                initialData={{...projectData, id}}
                submitText="Update Project"
            />
            </main>
        </div>
    );
};

export default EditProjectPage;
