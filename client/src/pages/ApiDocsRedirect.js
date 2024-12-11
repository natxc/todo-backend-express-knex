import { useEffect } from 'react';

const ApiDocsRedirect = () => {
    useEffect(() => {
        window.location.href = 'https://nc-todo-app-1c0a22c0be57.herokuapp.com/api-docs';
    }, []);

    return null;
};

export default ApiDocsRedirect;
