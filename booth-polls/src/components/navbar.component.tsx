import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { LogoImage } from "../assets";
import { useNavigate } from "react-router-dom"


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;


const Navbar = () => {

    const navigate = useNavigate();
    return (
        <Nav>
            <Logo src={LogoImage} alt="Logo" onClick={() => navigate("/")} />
            <Button variant="outlined" color="success">
                Register
            </Button>
        </Nav>
    );
};

export default Navbar;
