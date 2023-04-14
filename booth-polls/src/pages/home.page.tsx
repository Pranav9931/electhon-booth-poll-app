import { Button, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

import "./index.css"
import { useStateContext } from '../context/stateContextAPI'

// Connection to the server..
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const Home = styled.div`
    flex: 1;
    padding: 10px;
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 10px 0 0 0;
`

const HomePage = () => {

    const { newVoter, setNewVoter } = useStateContext();

    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [aadhaar, setAadhaar] = useState("");
    const [lastName, setLastName] = useState("");
    const [voterid, setVoterID] = useState("");

    const handleFormSubmit = () => {
        if (firstName.length >= 3 && lastName.length >= 3 && aadhaar.length === 12 && voterid.length >= 5) {
            setNewVoter(
                () => (
                    {
                        isActive: true,
                        fName: firstName,
                        lName: lastName,
                        aadhaar,
                        voterid,
                        phone: phoneNumber
                    }
                )
            )
        }
        // send newVoter data to the server
        socket.emit('newVoterData', newVoter);
    }



    return (
        <Home>
            <Typography color="primary" className="h1">Register</Typography>
            <Typography color="primary">Register yourself to vote.</Typography>
            <Typography color="secondary">वोट करने के लिए खुद को रजिस्टर करें।</Typography>
            <Typography color="green">ಮತ ಚಲಾಯಿಸಲು ನಿಮ್ಮನ್ನು ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ</Typography>
            <br />

            <Typography color="primary">Select your desired method.</Typography>
            <Typography color="secondary">अपनी इच्छित विधि का चयन करें।</Typography>
            <Typography color="green">ನೀವು ಬಯಸಿದ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ</Typography>
            <br />
            <Button variant="contained" color="primary">SQAN YOUR QR</Button>

            <Divider variant="middle" style={{ margin: '15px 0' }} />

            <Typography color="primary">Fill the form given below.</Typography>
            <Typography color="secondary">नीचे दिया गया फॉर्म भरें।</Typography>
            <Typography color="green">ಕೆಳಗೆ ನೀಡಿರುವ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ</Typography>

            <Wrapper>
                <TextField id="standard-basic" label="First Name" variant="standard" color="success" onChange={(e) => setFirstName(e.target.value)} />
                <TextField id="standard-basic" label="Last Name" variant="standard" color="success" onChange={(e) => setLastName(e.target.value)} />
            </Wrapper>
            <TextField fullWidth label="Aadhaar Number" id="fullWidth" variant="filled" margin='normal' color="success" onChange={(e) => setAadhaar(e.target.value)} />
            <TextField fullWidth label="Voter ID Number" id="fullWidth" variant="filled" margin='dense' color="success" onChange={(e) => setVoterID(e.target.value)} />

            <TextField id="outlined-basic" label="Phone Number (Optional)" variant="outlined" style={{ width: "100%" }} margin="normal" color="success" onChange={(e) => setPhoneNumber(e.target.value)} />

            <Button variant='contained' onClick={() => handleFormSubmit()}>Next/आगे बढ़े</Button>
        </Home>
    )
}

export default HomePage