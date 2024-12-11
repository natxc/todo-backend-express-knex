export const fetchProjects = async () => {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};