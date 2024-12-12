import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamForm from '../../components/Form/TeamForm';
import Navbar from '../../components/Navbar';

const EditTeamPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(`/teams/${id}`);
            const data = await response.json();
            setTeamData(data);
        };
        fetchTeam();
    }, [id]);

    const handleUpdateTeam = async (updatedData) => {
        try {
            const response = await fetch(`/teams/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update team: ${response.statusText}`);
            }

            const updatedTeam = await response.json();
            console.log('Team updated successfully:', updatedTeam);

            navigate(`/teams/${id}`, { state: { updatedTeam } });
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    const handleDeleteTeam = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this team?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/teams/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete team: ${response.statusText}`);
            }

            console.log('Team deleted successfully');
            alert('Team deleted successfully!');
            navigate('/teams'); // Redirect to the teams list page
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Failed to delete team. Please try again.');
        }
    };

    if (!teamData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-team-page">
            <header>
                <Navbar />
            </header>
            <h1>Edit Team</h1>
            <TeamForm
                onSubmit={handleUpdateTeam}
                initialData={teamData}
                submitText="Update Team"
            />
            <button onClick={handleDeleteTeam} className="delete-btn">
                Delete Team
            </button>
        </div>
    );
};

export default EditTeamPage;
