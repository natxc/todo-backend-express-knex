import React, { useState } from 'react';
import './forms.css';
import Button from '../../components/Button';

const TeamForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleDeleteTeam = async () => {
        if (!initialData.id) {
            alert('Team ID is missing!');
            return;
        }

        const confirmed = window.confirm('Are you sure you want to delete this team?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/teams/${initialData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete team: ${errorData.message}`);
            }

            console.log('Team deleted successfully');
            alert('Team deleted successfully!');
            window.location.href = '/teams';
        } catch (error) {
            console.error('Error deleting team:', error);
            alert(`Failed to delete team: ${error.message}`);
        }
    };


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="team-form">
                <div className="form-group">
                    <label htmlFor="name">Team Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter team name"
                        required
                    />
                </div>
                    <Button type="submit" className="submit-btn" variant="primary">
                        {submitText}
                    </Button>
                    <Button
                        onClick={handleDeleteTeam}
                        className="delete-btn"
                        variant="danger"
                    >
                        Delete Team
                    </Button>
            </form>
        </div>
    );
};

export default TeamForm;
