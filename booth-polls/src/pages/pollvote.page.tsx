import React, { useEffect } from 'react'
import { useStateContext } from '../context/stateContextAPI'
import LoadingButton from '@mui/lab/LoadingButton';
// Styled Components
import styled, { keyframes } from 'styled-components';
import io from 'socket.io-client';
import { LogoImage, LogoCompact } from '../assets';
import { Button, TextField, Typography } from '@mui/material';
import { SwapVerticalCircleOutlined } from '@mui/icons-material';
const socket = io('http://localhost:3001');

const PollComponent = styled.div`
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LogoImg = styled.div`
    padding: 10px;
    text-align: center;
`
const FlexBox = styled.div`
    // padding: 10px;
    display: flex;
    flex-direction: column;
`

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const CompactLogo = styled.img`
  width: 300px;
  border-radius: 10px;
  animation: ${bounce} 5s infinite;
`;

const VotingContainer = styled.div`
  border: 1px solid #e2e2e2;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 10px 0 0 0;
`

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
  }, [setNewVoter]);

  return (
    <PollComponent>
      {newVoter.isActive ?
        <FlexBox>
          <LogoImg>
            <img src={LogoImage} style={{ height: '50px', margin: '10px 0' }} alt="election commission logo" />
          </LogoImg>
          <VotingContainer>
            <Typography color="primary" style={{ fontWeight: 700, fontSize: '20px' }}>New Voter Detected</Typography>
            <Typography color="secondary" >Verify your details</Typography>
            <Typography color="green" >ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ</Typography>
            <Wrapper>
              <TextField
                id="standard-basic"
                label="First Name"
                variant="filled"
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
                value={newVoter.fName} disabled />

              <TextField
                id="standard-basic"
                label="Last Name"
                variant="filled"
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
                value={newVoter.lName} disabled />
            </Wrapper>

            <TextField
              fullWidth
              label="Aadhaar Number"
              id="fullWidth"
              variant="filled"
              margin='normal'
              color="success"
              InputLabelProps={{
                shrink: true,
              }}
              value={newVoter.aadhaar} disabled />

            <TextField
              fullWidth
              label="Voter ID Number"
              id="fullWidth"
              variant="filled"
              margin='dense'
              color="success"
              InputLabelProps={{
                shrink: true,
              }}
              value={newVoter.voterid} disabled />

            <Button variant="outlined" style={{ width: '100%', height: '50px', margin: '10px 0' }}>Next/आगे बढ़े</Button>
          </VotingContainer>
        </FlexBox>
        :
        <LogoImg>
          <CompactLogo src={LogoCompact} />
          {/* <Image src={ElecthonImage} /> */}
          <br />
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SwapVerticalCircleOutlined />}
            variant="outlined"
          >Waiting for Voter</LoadingButton>
        </LogoImg>
      }
    </PollComponent>

  )
}

export default PollVotePage