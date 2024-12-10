import React, { useState } from 'react';

const Users = () => {
    const [method, setMethod] = useState('GET');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const request = {
                method,
                headers: { 'Content-Type': 'application/json' },
                ...(method !== 'GET' && {
                    body: JSON.stringify({
                        ...(name && { name }),
                        ...(email && { email }),
                        ...(password && { password }),
                    }),
                }),
            };

            const res = await fetch(`/api/users${id ? `/${id}` : ''}`, request);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Method:
                    <select value={method} onChange={e => setMethod(e.target.value)}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </label>
                <br />
                <label>
                    ID:
                    <input type="text" value={id} onChange={e => setId(e.target.value)} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <pre>{response}</pre>
        </div>
    );
};

export default Users;
