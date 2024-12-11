export const fetchIssues = async () => {
    const response = await fetch('/issues');
    if (!response.ok) throw new Error('Failed to fetch issues');
    return response.json();
};

export const createIssue = async (issueData) => {
    const response = await fetch('/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData),
    });
    return response.json();
};

export const updateIssue = async (id, issueData) => {
    const response = await fetch(`/issues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData),
    });
    return response.json();
};

export const deleteIssue = async (id) => {
    await fetch(`/issues/${id}`, { method: 'DELETE' });
};