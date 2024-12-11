import { useContext, useEffect } from 'react';
import TeamsContext from '../context/TeamsContext';

const useTeams = () => {
    const { teams, fetchTeams } = useContext(TeamsContext);

    useEffect(() => {
        if (teams.length === 0) {
            fetchTeams();
        }
    }, [teams, fetchTeams]);

    return { teams };
};

export default useTeams;