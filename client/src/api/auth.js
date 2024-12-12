export const login = async (credentials) => {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Login error:', errorDetails);
        throw new Error('Login failed');
    }
    return response.json();
};

export const register = async (credentials) => {
    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Registration error:', errorDetails);
        throw new Error('Registration failed');
    }
    return response.json();
};
