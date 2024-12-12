import React, { useState, useEffect, useContext } from 'react';
import TeamsContext from '../../context/TeamsContext';
import './forms.css';

const ProjectForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
    const { teams, fetchTeams } = useContext(TeamsContext);
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        team_id: initialData.team_id || '',
    });

    useEffect(() => {
        const loadTeams = async () => {
            if (teams.length === 0) {
                console.log('Fetching teams for dropdown...');
                await fetchTeams();
            }
        };
        loadTeams();
    }, [fetchTeams, teams]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
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
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <option key={team.team_id} value={team.team_id}>
                                    {team.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No teams available</option>
                        )}
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;

