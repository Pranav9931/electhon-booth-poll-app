import React, { useEffect } from 'react'
import { useStateContext } from '../context/stateContextAPI'

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const PollVotePage = () => {
    const { newVoter, setNewVoter } = useStateContext();
    useEffect(() => {
        // listen for updates to newVoter data from the server
        socket.on('newVoterData', (data) => {
            setNewVoter(data);
        });

        return () => {
            socket.off('newVoterData');
        };
    }, []);

    return (
        <div>
            {newVoter.isActive ? `Hello ${newVoter.fName} ${newVoter.lName}` : "No User"}
        </div>

    )
}

export default PollVotePage