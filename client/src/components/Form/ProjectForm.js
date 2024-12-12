import React, { useState, useEffect, useContext } from 'react';
import TeamsContext from '../../context/TeamsContext';

const ProjectForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
    const { fetchTeams } = useContext(TeamsContext);

    const [formData, setFormData] = useState({
        name: initialData.name || '',
        team_id: initialData.team_id || ''
    });

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const teamData = await fetchTeams();
                setTeams(teamData || []);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
                setTeams([]);
            }
        };
        loadTeams();
    }, [fetchTeams]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
                <label htmlFor="name">Project Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="team_id">Select Team:</label>
                <select
                    id="team_id"
                    name="team_id"
                    value={formData.team_id}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select a team</option>
                    {teams.map((team) => (
                        <option key={team.team_id} value={team.team_id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="submit-btn">
                {submitText}
            </button>
        </form>
    );
};

export default ProjectForm;
