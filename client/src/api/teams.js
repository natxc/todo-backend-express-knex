export const fetchTeams = async () => {
    const response = await fetch('/api/teams');
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
};