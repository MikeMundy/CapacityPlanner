import React, { useState } from "react";
import PICapacityTable from "./PICapacityTable";
import { IIteration, ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "../interfaces/Interfaces";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export interface IProps {
    selectedProgramIncrement: number;
    programIncrements: IProgramIncrement[];
    programIterations: IIteration[];
    persons: IPersonBasic[];
    personTeams: IPersonTeam[];
    teams: ITeam[];
    locations: ILocation[];
    locationHolidays: ILocationHoliday[];
    personVacations: IPersonVacation[];
    updateSelectedProgramIncrement: (id: number) => void;
}

const PICapacity: React.FC<IProps> = (props: IProps) => {

    const [minimise, setMinimise] = useState(false);

    const nullPI: IProgramIncrement = { id: -1, name: "" };

    const getCurrentPIDetails = () => {
        const currentPI = props.programIncrements.find((p) => p.id === props.selectedProgramIncrement);
        if (currentPI) {
            return currentPI;
        }
        return nullPI;
    }

    const [currentPI, setCurrentPI] = useState(getCurrentPIDetails());
    const [selectedFilterPersonId, setSelectedFilterPersonId] = useState(-1);
    const [selectedFilterTeamId, setSelectedFilterTeamId] = useState(-1);

    const selectProgramIncrement = (id: string) => {
        props.updateSelectedProgramIncrement(parseInt(id));
        const currentPI = props.programIncrements.find((p) => p.id === parseInt(id));
        if (currentPI) {
            setCurrentPI(currentPI);
        }
    }

    const piNameSorter = (p1: IProgramIncrement, p2: IProgramIncrement): number => {
        return p1.name > p2.name ? 1 : -1;
    };

    const teamSorter = (p1: ITeam, p2: ITeam): number => {
        if (p1.name === p2.name) {
            return p1.name < p2.name ? -1 : 1
        }
        return p1.name < p2.name ? -1 : 1;
    };

    const setSelectedTeam = (teamId: string) => {
        setSelectedFilterTeamId(parseInt(teamId));
        setSelectedFilterPersonId(-1);
    }

    const getTeamSelect = () => {
        const options: any[] = [];
        options.push(<MenuItem value={-1}>&nbsp;</MenuItem>);
        props.teams.sort(teamSorter).forEach((team) => {
            options.push(<MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>)
        })
        return <FormControl sx={{ marginBottom: 2, width: 200 }}>
            <InputLabel id="team">Team</InputLabel>
            <Select size="small" onChange={(e) => setSelectedTeam(e.target.value.toString())} value={selectedFilterTeamId} labelId="team" label="team">
                {options}
            </Select>
        </FormControl >;
    }

    const personSorter = (p1: IPersonBasic, p2: IPersonBasic): number => {
        if (p1.lastName === p2.lastName) {
            return p1.firstName < p2.firstName ? -1 : 1
        }
        return p1.lastName < p2.lastName ? -1 : 1;
    };

    const getNameSelect = () => {
        const options: any[] = [];
        options.push(<MenuItem value={-1}>&nbsp;</MenuItem>);
        if (selectedFilterTeamId === -1) {
            props.persons.sort(personSorter).forEach((person) => {
                options.push(<MenuItem key={person.id} value={person.id}>{person.lastName}, {person.firstName}</MenuItem>)
            })
        } else {
            const personIdsInTeam = props.personTeams.filter((pt) => pt.teamId === selectedFilterTeamId).map((pt) => pt.personId);
            const personsInTeam = props.persons.filter((p) => personIdsInTeam.includes(p.id));
            personsInTeam.sort(personSorter).forEach((person) => {
                options.push(<MenuItem key={person.id} value={person.id}>{person.lastName}, {person.firstName}</MenuItem>)
            })
        }
        return <FormControl sx={{ marginBottom: 2, width: 200 }}>
            <InputLabel id="person">Person</InputLabel>
            <Select size="small" onChange={(e) => setSelectedFilterPersonId(parseInt(e.target.value.toString()))} value={selectedFilterPersonId} labelId="person" label="person">
                {options}
            </Select>
        </FormControl >;
    }

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Program Increment Capacity
            </Typography>

            <FormControl sx={{ marginBottom: 2, width: 200 }}>
                <InputLabel id="inc">Program Increment</InputLabel>
                <Select value={props.selectedProgramIncrement} onChange={(e) => selectProgramIncrement(e.target.value.toString())} labelId="inc" label="Program Increment">
                    <MenuItem value={-1} key={-1}>&nbsp;</MenuItem>
                    {props.programIncrements.sort(piNameSorter).map((p) => <MenuItem key={p.id} value={p.id}>{p.name} </MenuItem>)}
                </Select>
            </FormControl >

            {props.selectedProgramIncrement !== -1 &&
                <>

                    <h2>{currentPI.name}</h2>

                    <div>
                        {getTeamSelect()} 
                        {getNameSelect()} 
                        <FormControlLabel sx={{marginLeft: 1}} control={<Checkbox defaultChecked checked={minimise} onChange={(e) => setMinimise(e.target.checked)} />} label="Minimise results" />
                    </div>

                    <PICapacityTable
                        minimiseResults={minimise}
                        programIncrements={props.programIncrements}
                        programIterations={props.programIterations}
                        persons={props.persons}
                        personTeams={props.personTeams}
                        teams={props.teams}
                        locations={props.locations}
                        locationHolidays={props.locationHolidays}
                        personVacations={props.personVacations}
                        selectedProgramIncrementId={props.selectedProgramIncrement}
                        selectedFilterTeamId={selectedFilterTeamId}
                        selectedFilterPersonId={selectedFilterPersonId}
                    />

                    {/* <div><pre>{JSON.stringify(props.programIterations, null, 2)}</pre></div> */}

                    {/* <div className="filterDiv">Filter by: {getTeamSelect()} {getNameSelect()}</div> */}


                </>
            }

        </div>
    )
}

export default PICapacity;