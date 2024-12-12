import React, { useState } from 'react';
import './forms.css';

const IssueForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || ''
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
        <div className="form-container">
            <form onSubmit={handleSubmit} className="issue-form">
                <div className="form-group">
                    <label htmlFor="title">Issue Name:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter issue title"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default IssueForm;
