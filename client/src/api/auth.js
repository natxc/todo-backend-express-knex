export const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};

export const logout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (!response.ok) throw new Error('Logout failed');
};
