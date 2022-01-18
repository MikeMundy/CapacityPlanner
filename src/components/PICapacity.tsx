import React, { useState } from "react";
import PICapacityTable from "./PICapacityTable";
import { IIteration, ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "../interfaces/Interfaces";

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
        options.push(<option value={-1}>-- select team --</option>);
        props.teams.sort(teamSorter).forEach((team) => {
            options.push(<option value={team.id}>{team.name}</option>)
        })
        return <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedFilterTeamId}>{options}</select>;
    }

    const personSorter = (p1: IPersonBasic, p2: IPersonBasic): number => {
        if (p1.lastName === p2.lastName) {
            return p1.firstName < p2.firstName ? -1 : 1
        }
        return p1.lastName < p2.lastName ? -1 : 1;
    };

    const getNameSelect = () => {
        const options: any[] = [];
        options.push(<option value={-1}>-- select person --</option>);
        if (selectedFilterTeamId === -1) {
            props.persons.sort(personSorter).forEach((person) => {
                options.push(<option value={person.id}>{person.lastName}, {person.firstName}</option>)
            })
        } else {
            const personIdsInTeam = props.personTeams.filter((pt) => pt.teamId === selectedFilterTeamId).map((pt) => pt.personId);
            const personsInTeam = props.persons.filter((p) => personIdsInTeam.includes(p.id));
            personsInTeam.sort(personSorter).forEach((person) => {
                options.push(<option value={person.id}>{person.lastName}, {person.firstName}</option>)
            })
        }
        return <select onChange={(e) => setSelectedFilterPersonId(parseInt(e.target.value))} value={selectedFilterPersonId}>{options}</select>;
    }

    return (
        <div>
            <h2>Program Increment Capacity</h2>

            <table className="formTable">
                <tbody>
                    <tr>
                        <td><b>Program Increment</b></td>
                        <td>
                            <select value={props.selectedProgramIncrement} onChange={(e) => selectProgramIncrement(e.target.value)}>
                                <option value={-1}>-- select --</option>
                                {props.programIncrements.sort(piNameSorter).map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            {props.selectedProgramIncrement !== -1 &&
                <>

                    <h2>{currentPI.name}</h2>

                    <div className="filterDiv">Filter by: {getTeamSelect()} {getNameSelect()}</div>

                    <PICapacityTable
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