export const fetchProjects = async () => {
    const response = await fetch('/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};

export const createProject = async (projectData) => {
    const response = await fetch('/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return response.json();
};

export const updateProject = async (id, projectData) => {
    const response = await fetch(`/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });
    return response.json();
};

export const deleteProject = async (id) => {
    await fetch(`/projects/${id}`, { method: 'DELETE' });
};