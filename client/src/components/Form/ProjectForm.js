import React, { useState } from 'react';
import '../../styles/Project.css';

const ProjectForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
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
            <button type="submit" className="submit-btn">
                {submitText}
            </button>
        </form>
    );
};

export default ProjectForm;
