import React, { useState } from 'react';
import '../../styles/Issue.css';

const IssueForm = ({ onSubmit, initialData = {}, submitText = 'Submit' }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || ''
    });

    const handleChange = (event) => {
        const { title, value } = event.target;
        setFormData({ ...formData, [title]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="issue-form">
            <div className="form-group">
                <label htmlFor="title">Issue Name:</label>
                <input
                    type="text"
                    id="title"
                    title="title"
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
    );
};

export default IssueForm;
