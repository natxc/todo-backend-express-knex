import { useContext, useEffect } from 'react';
import IssuesContext from '../context/IssuesContext';

const useIssues = () => {
    const { issues, fetchIssues } = useContext(IssuesContext);

    useEffect(() => {
        if (issues.length === 0) {
            fetchIssues();
        }
    }, [issues, fetchIssues]);

    return { issues };
};

export default useIssues;