import React, { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { IPersonBasic, IPersonVacation, ITeam, IPersonTeam } from "../../interfaces/Interfaces";
import DatePicker from "react-date-picker";

export interface IProps {
    selectedPersonId: number;
    personsBasic: IPersonBasic[];
    personVacations: IPersonVacation[];
    teams: ITeam[];
    personTeams: IPersonTeam[];
    updateSelectedPersonId: (personId: number) => void;
}

const ReviewVacations: React.FC<IProps> = (props: IProps) => {

    const currentDate = new Date();

    const [selectedFilterTeamId, setSelectedFilterTeamId] = useState(-1);
    const [fromDate, setFromDate] = useState(new Date(currentDate.getFullYear(), 0, 1, 0, 0, 0));
    const [toDate, setToDate] = useState(new Date(currentDate.getFullYear(), 11, 31, 0, 0, 0));

    const resetDates = () => {
        setFromDate(new Date(currentDate.getFullYear(), 0, 1, 0, 0, 0));
        setToDate(new Date(currentDate.getFullYear(), 11, 31, 0, 0, 0));
    }

    const setSelectedTeam = (teamId: string) => {
        setSelectedFilterTeamId(parseInt(teamId));
        props.updateSelectedPersonId(-1);
    }

    const updateFromDate = (d: Date) => {
        setFromDate(d);
        if (toDate <= d) {
            const newToDate = new Date(d);
            newToDate.setMonth(newToDate.getMonth() + 1);
            setToDate(newToDate);
        }
    }

    const updateToDate = (d: Date) => {
        setToDate(d);
        if (fromDate >= d) {
            const newFromDate = new Date(d);
            newFromDate.setMonth(newFromDate.getMonth() - 1);
            setFromDate(newFromDate);
        }
    }

    const teamSorter = (p1: ITeam, p2: ITeam): number => {
        if (p1.name === p2.name) {
            return p1.name < p2.name ? -1 : 1
        }
        return p1.name < p2.name ? -1 : 1;
    };

    const getTeamSelect = () => {
        const options: any[] = [];
        options.push(<MenuItem value={-1}>&nbsp;</MenuItem>);
        props.teams.sort(teamSorter).forEach((team) => {
            options.push(<MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>)
        })
        return <FormControl sx={{ marginBottom: 0, width: 200 }}>
            <InputLabel id="team">Team</InputLabel>
            <Select size="small" onChange={(e) => setSelectedTeam(e.target.value.toString())} value={selectedFilterTeamId} labelId="team" label="team">
                {options}
            </Select>
        </FormControl >;
    }

    const getNameSelect = () => {
        const options: any[] = [];
        options.push(<MenuItem value={-1}>&nbsp;</MenuItem>);
        if (selectedFilterTeamId === -1) {
            props.personsBasic.sort(personSorter).forEach((person) => {
                options.push(<MenuItem key={person.id} value={person.id}>{person.lastName}, {person.firstName}</MenuItem>)
            })
        } else {
            const personIdsInTeam = props.personTeams.filter((pt) => pt.teamId === selectedFilterTeamId).map((pt) => pt.personId);
            const personsInTeam = props.personsBasic.filter((p) => personIdsInTeam.includes(p.id));
            personsInTeam.sort(personSorter).forEach((person) => {
                options.push(<MenuItem key={person.id} value={person.id}>{person.lastName}, {person.firstName}</MenuItem>)
            })
        }
        return <FormControl sx={{ marginBottom: 0, width: 200 }}>
            <InputLabel id="person">Person</InputLabel>
            <Select size="small" onChange={(e) => props.updateSelectedPersonId(parseInt(e.target.value.toString()))} value={props.selectedPersonId} labelId="person" label="person">
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

    const getPersonsVacations = (id: number) => {
        const results: any[] = [];

        const pad = (s: number): string => s.toString().padStart(2, " ");

        props.personVacations.filter((pv) => pv.personId === id).filter((pv) => pv.date >= fromDate && pv.date <= toDate).map((pv) => {
            return results.push(<tr><td>{pv.date.toLocaleDateString("default", { weekday: 'short' })}</td><td>{pad(pv.date.getDate())}</td><td>{pv.date.toLocaleString("default", { month: "short" })}</td><td>{pv.date.getFullYear()}</td><td>-</td><td>{pv.fractionOfDay.toFixed(2)} day</td></tr>)
        })

        if (results.length === 0) {
            results.push(<td>-</td>);
        }

        return <table className="dateTable"><tbody>{results}</tbody></table>;
    }

    const getPersonRows = () => {
        const results: any[] = [];

        let persons: any[] = [];

        if (props.selectedPersonId === -1 && selectedFilterTeamId === -1) {
            persons = props.personsBasic;
        }

        if (props.selectedPersonId !== -1 && selectedFilterTeamId === -1) {
            persons = props.personsBasic.filter((p) => p.id === props.selectedPersonId || props.selectedPersonId === -1)
        }

        if (selectedFilterTeamId !== -1 && props.selectedPersonId === -1) {
            props.personTeams.filter((pt) => pt.teamId === selectedFilterTeamId || selectedFilterTeamId === -1).forEach(pt => {
                const p = props.personsBasic.filter((p) => p.id === props.selectedPersonId || props.selectedPersonId === -1).find((p) => p.id === pt.personId);
                persons.push(p);
            });
        }

        if (props.selectedPersonId !== -1 && selectedFilterTeamId !== -1) {
            persons = props.personsBasic.filter((p) => p.id === props.selectedPersonId || props.selectedPersonId === -1)
        }

        persons.sort(personSorter).map((p) => {
            const personsVacations = getPersonsVacations(p.id);
            return results.push(<tr><td>{p.lastName}, {p.firstName}</td><td>{personsVacations}</td></tr>)
        });
        return results;
    }

    return (
        <>
            <Typography variant="h4" component="div" gutterBottom>
                Review Vacations
            </Typography>

            <Stack direction="row" spacing={0} sx={{ marginBottom: 1 }}>
                {getTeamSelect()}
                {getNameSelect()}
                &nbsp;
                <DatePicker onChange={(date: Date) => updateFromDate(date)} value={fromDate} clearIcon={null} format="dd MMM y" />
                <DatePicker onChange={(date: Date) => updateToDate(date)} value={toDate} clearIcon={null} format="dd MMM y"/>
                <Button variant="outlined" size="small" onClick={resetDates}>Reset dates</Button>
            </Stack>

            <table className="capTable">
                <tbody>
                    {getPersonRows()}
                </tbody>
            </table>

        </>
    )

}

export default ReviewVacations;