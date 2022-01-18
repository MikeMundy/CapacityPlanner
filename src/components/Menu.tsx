import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";

export interface IProps {
    page: string;
    userRole: string;
    onSelectPage: (page: string) => void;
    onLogOut: () => void;
}

const Menu: React.FC<IProps> = (props: IProps) => {

    const pages = [
        { name: "HOME", title: "Home", ManagerOnly: false },
        { name: "TEAMS", title: "Teams", ManagerOnly: true },
        { name: "LOCATIONS", title: "Locations & Holidays", ManagerOnly: true },
        { name: "PEOPLE", title: "People", ManagerOnly: true },
        { name: "VACATIONS", title: "Vacations", ManagerOnly: false },
        { name: "PROGRAM_INCREMENTS", title: "Program Increments", ManagerOnly: true },
        { name: "CAPACITY", title: "P.I. Capacity", ManagerOnly: false },
    ];

    const GetAllowedPage = (p: any): boolean => {
        if (props.userRole === "MANAGER") { return true; }
        if (props.userRole === "USER") {
            return !p.ManagerOnly;
        }
        return false;
    }

    const buttonElements = pages.map((p, index) =>
        <span key={p.name}>
            {GetAllowedPage(p) &&
                <>
                    <Button onClick={(e) => props.onSelectPage(p.name)}>{p.title}</Button>
                </>
            }
        </span>
    )

    return (
        <Box sx={{ mb: 2 }}>
            <ButtonGroup aria-label="main menu">
                {buttonElements}
                <Button onClick={props.onLogOut}>Log Out</Button>
            </ButtonGroup>
        </Box>
    )

}

export default Menu