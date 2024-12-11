import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamForm from '../../components/Form/TeamForm';

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

    const handleUpdateTeam = async (data) => {
        try {
            await fetch(`/teams/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            navigate(`/teams/${id}`);
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    if (!teamData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-team-page">
            <h1>Edit Team</h1>
            <TeamForm
                onSubmit={handleUpdateTeam}
                initialData={teamData}
                submitText="Update Team"
            />
        </div>
    );
};

export default EditTeamPage;
