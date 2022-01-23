import React, { useState } from "react";

import EnterVacations from "./EnterVacations";
import ReviewVacations from "./ReviewVacations";

import { ILocationHoliday, IPersonBasic, IPersonVacation, ITeam, IPersonTeam } from "../../interfaces/Interfaces";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

export interface IProps {
    selectedPersonId: number;
    personsBasic: IPersonBasic[];
    personVacations: IPersonVacation[];
    locationHolidays: ILocationHoliday[];
    teams: ITeam[];
    personTeams: IPersonTeam[];
    addVacation: (personVacation: IPersonVacation) => void;
    editVacation: (personVacation: IPersonVacation) => void;
    deleteVacation: (personVacationId: number) => void;
    updateSelectedPersonId: (personId: number) => void;
}

const Vacations: React.FC<IProps> = (props: IProps) => {

    const [screen, setScreen] = useState("ENTER_VACATIONS");

    const hilightLinkStyle = { fontWeight: "bold", backgroundColor: "rgba(25, 118, 210, 0.04)" }

    const enterScreenLinkStyle = screen === "ENTER_VACATIONS" ? hilightLinkStyle : {};
    const reviewScreenLinkStyle = screen === "REVIEW_VACATIONS" ? hilightLinkStyle : {};

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Vacations
            </Typography>

            <Box sx={{ mb: 2 }}>
                <ButtonGroup variant="text" size="small" aria-label="main menu">
                    <Button sx={enterScreenLinkStyle} onClick={(e) => setScreen("ENTER_VACATIONS")}>Enter Vacations</Button>
                    <Button sx={reviewScreenLinkStyle} onClick={(e) => setScreen("REVIEW_VACATIONS")}>Review Vacations</Button>
                </ButtonGroup>
            </Box>

            {screen === "ENTER_VACATIONS" &&
                <EnterVacations
                    selectedPersonId={props.selectedPersonId}
                    personsBasic={props.personsBasic}
                    personVacations={props.personVacations}
                    locationHolidays={props.locationHolidays}
                    addVacation={props.addVacation}
                    editVacation={props.editVacation}
                    deleteVacation={props.deleteVacation}
                    updateSelectedPersonId={props.updateSelectedPersonId}
                />
            }

            {screen === "REVIEW_VACATIONS" &&
                <ReviewVacations
                    selectedPersonId={props.selectedPersonId}
                    personsBasic={props.personsBasic}
                    personVacations={props.personVacations}
                    teams={props.teams}
                    personTeams={props.personTeams}
                    updateSelectedPersonId={props.updateSelectedPersonId}
                />
            }

        </div >
    )


}

export default Vacations;