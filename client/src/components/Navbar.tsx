import { AppBar, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

    return (
        <AppBar>
            <Link to="/boka">Boka</Link>
            <Link to="/konto">Konto</Link>
            <Link to="/kontakt">Kontakt</Link>
            <Link to="/familj">Familj</Link>
        </AppBar>
    );
}