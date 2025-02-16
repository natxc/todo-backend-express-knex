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

    if (!teamData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-team-page">
            <header>
                <Navbar />
            </header>
            <main className="main-content" style={{
                backgroundImage: `url('/assets/hero.png')`
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>Edit Team</h1>
            <TeamForm
                onSubmit={handleUpdateTeam}
                initialData={{ ...teamData, id }}
                submitText="Update Team"
            />
            </main>
        </div>
    );
};

export default EditTeamPage;
