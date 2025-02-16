import React, { useState } from 'react';
import './forms.css';
import Button from '../../components/Button';

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

    const handleDeleteIssue = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this issue?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/issues/${initialData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete issue: ${response.statusText}`);
            }

            console.log('Issue deleted successfully');
            alert('Issue deleted successfully!');
            window.location.href = '/issues';
        } catch (error) {
            console.error('Error deleting issue:', error);
            alert('Failed to delete issue. Please try again.');
        }
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
                <Button type="submit" className="submit-btn" variant="primary">
                    {submitText}
                </Button>
                <Button
                    onClick={handleDeleteIssue}
                    className="delete-btn"
                    variant="danger"
                >
                    Delete Issue
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
