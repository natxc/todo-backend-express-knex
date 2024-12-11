export const fetchTeams = async () => {
    const response = await fetch('/teams');
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
};

export const createTeam = async (teamData) => {
    const response = await fetch('/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
    });
    return response.json();
};

export const updateTeam = async (id, teamData) => {
    const response = await fetch(`/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
    });
    return response.json();
};

export const deleteTeam = async (id) => {
    await fetch(`/teams/${id}`, { method: 'DELETE' });
};