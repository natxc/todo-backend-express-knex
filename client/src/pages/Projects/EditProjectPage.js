import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectForm from '../../components/Form/ProjectForm';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

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

    const handleDeleteProject = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this project?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/projects/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete project: ${response.statusText}`);
            }

            console.log('Project deleted successfully');
            alert('Project deleted successfully!');
            navigate('/projects');
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project. Please try again.');
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
            <h1>Edit Project</h1>
            <ProjectForm
                onSubmit={handleUpdateProject}
                initialData={projectData}
                submitText="Update Project"
            />
            <Button
                onClick={handleDeleteProject}
                className="delete-btn"
                variant="danger"
            >
                Delete Issue
            </Button>
        </div>
    );
};

export default EditProjectPage;
