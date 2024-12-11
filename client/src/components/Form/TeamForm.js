import React, { useState } from 'react';
import '../../styles/Team.css';

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

    return (
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
            <button type="submit" className="submit-btn">
                {submitText}
            </button>
        </form>
    );
};

export default TeamForm;
