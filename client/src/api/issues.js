export const fetchIssues = async () => {
    const response = await fetch('/api/issues');
    if (!response.ok) throw new Error('Failed to fetch issues');
    return response.json();
};