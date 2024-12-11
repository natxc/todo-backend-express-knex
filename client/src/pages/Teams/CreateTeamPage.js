import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamForm from '../../components/Form/TeamForm';
import TeamsContext from '../../context/TeamsContext';

const CreateTeamPage = () => {
    const { createTeam } = useContext(TeamsContext);
    const navigate = useNavigate();

    const handleCreateTeam = async (data) => {
        try {
            await createTeam(data);
            navigate('/teams');
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    return (
        <div className="create-team-page">
            <h1>Create a New Team</h1>
            <TeamForm onSubmit={handleCreateTeam} submitText="Create Team" />
        </div>
    );
};

export default CreateTeamPage;