import React, { useState } from "react";
import { OutputFileType } from "typescript";
import { IIteration, ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IPlanning, IProgramIncrement, ITeam } from "../interfaces/Interfaces";

export interface IProps {
    selectedProgramIncrement: number;
    programIncrements: IProgramIncrement[];
    persons: IPersonBasic[];
    personTeams: IPersonTeam[];
    teams: ITeam[];
    locations: ILocation[];
    locationHolidays: ILocationHoliday[];
    personVacations: IPersonVacation[];
    updateSelectedProgramIncrement: (id: number) => void;
}

const Capacity: React.FC<IProps> = (props: IProps) => {

    const nullPI: IProgramIncrement = { id: -1, incrementNumberInYear: -1, startDate: new Date(), numberIterations: 0, daysPerIteration: 0, pointsPerIteration: 0 };

    const getCurrentPIDetails = () => {
        const currentPI = props.programIncrements.find((p) => p.id === props.selectedProgramIncrement);
        if (currentPI) {
            return currentPI;
        }
        return nullPI;
    }

    const [currentPI, setCurrentPI] = useState(getCurrentPIDetails());
    const [selectedFilterPersonId, setSelectedFilterPersonId] = useState(-1);

    const selectProgramIncrement = (id: string) => {
        props.updateSelectedProgramIncrement(parseInt(id));
        const currentPI = props.programIncrements.find((p) => p.id === parseInt(id));
        if (currentPI) {
            setCurrentPI(currentPI);
        }
    }

    const piSorter = (p1: IProgramIncrement, p2: IProgramIncrement): number => {
        return p1.startDate.getFullYear() > p2.startDate.getFullYear() ? 1 : -1;
    };

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear() + " " + dt.toLocaleDateString("en-US", { weekday: 'short' });;
    }

    const getEndDate = (pi: IProgramIncrement): Date => {
        const newDate = new Date(pi.startDate);
        newDate.setDate(newDate.getDate() + (pi.numberIterations * pi.daysPerIteration) - 1);
        return newDate;
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
        props.persons.sort(personSorter).forEach((person) => {
            options.push(<option value={person.id}>{person.lastName}, {person.firstName}</option>)
        })
        return <select onChange={(e) => setSelectedFilterPersonId(parseInt(e.target.value))} value={selectedFilterPersonId}>{options}</select>;
    }

    const addDays = (date: Date, days: number) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const getWeekDayDatesCount = (startDate: Date, endDate: Date) => {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (!(dayOfWeek in [0, 6])) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    let iterations: IIteration[] = [];
    let currentDate = currentPI.startDate;
    for (let i = 1; i <= currentPI.numberIterations; i++) {
        const endDate = addDays(currentDate, currentPI.daysPerIteration - 1);
        const numWeekDays = getWeekDayDatesCount(currentDate, endDate);
        // const numHolidays = 0; //getHolidayDatesCount(currentDate, endDate); // this varies by person's location. 
        // const numWorkDays = numWeekDays - numHolidays;
        const iteration: IIteration = {
            num: i,
            startDate: currentDate,
            endDate: endDate,
            duration: currentPI.daysPerIteration,
            numWeekDays,
            // numHolidays,
            // numWorkDays
        }
        currentDate = addDays(currentDate, currentPI.daysPerIteration)
        iterations[i] = iteration;
    }

    const ptoTitleRows = (
        <tr className="smaller">
            {iterations.map((iteration, index) =>
                <>
                    <td className="half center topRow"><b>Hols.</b></td>
                    <td className="half center topRow"><b>PTOs</b></td>
                    <td className="half center topRow"><b>Capacity</b></td>
                </>
            )}
        </tr>
    );

    const getTeamName = (teamId: number): string => {
        const team = props.teams.find((t) => t.id === teamId);
        if (team) {
            return team.name;
        };
        return "?";
    }

    const getLocationName = (locationId: number) => {
        const location = props.locations.find((l) => l.id === locationId);
        if (location) {
            return location.name;
        };
        return "?";
    }

    const getRoleName = (teamId: number, personId: number) => {
        const team = props.personTeams.find((t) => t.teamId === teamId && t.personId === personId);
        if (team) {
            return team.role;
        };
        return "?";
    }

    const getAvailability = (teamId: number, personId: number): number => {
        const team = props.personTeams.find((t) => t.teamId === teamId && t.personId === personId);
        if (team) {
            return team.percentage;
        };
        return 0;
    }

    const personTeamSorter = (pt1: IPersonTeam, pt2: IPersonTeam): number => {
        const p1 = props.persons.find((p) => p.id === pt1.personId);
        const p2 = props.persons.find((p) => p.id === pt2.personId);
        if (p1 && p2) {
            if (p1.lastName === p2.lastName) {
                return p1.firstName < p2.firstName ? -1 : 1
            }
            return p1.lastName < p2.lastName ? -1 : 1;
        }
        return 0;
    };

    const getHolidaysForPersonForIteration = (iteration: IIteration, person: IPersonBasic, personTeam: IPersonTeam) => {
        let count = 0;

        const locationId = person.locationId;
        const locationHolidays = props.locationHolidays.filter((l) => l.locationId === locationId);
        console.log("locationHolidays: " + JSON.stringify(locationHolidays));

        if (locationHolidays) {
            locationHolidays.filter((lh) => lh.date >= iteration.startDate && lh.date <= iteration.endDate).forEach((lh) => {
                // count = count + (1 * personTeam.percentage / 100);
                count = count + 1;
            })
        }

        return count;
    }

    const getPTOsForPersonForIteration = (iteration: IIteration, person: IPersonBasic, personTeam: IPersonTeam) => {
        let count = 0;

        const personVacations = props.personVacations.filter((pv) => pv.personId === person.id);
        // console.log("locationHolidays: " + JSON.stringify(locationHolidays));

        if (personVacations) {
            personVacations.filter(pv => pv.date >= iteration.startDate && pv.date <= iteration.endDate).forEach((pv) => {
                // console.log(JSON.stringify(iteration));
                // console.log(JSON.stringify(lh));
                // count = count + (1 * personTeam.percentage / 100);
                count = count + pv.fractionOfDay;
            })
        }

        return count;
    }

    const getCapacityForPersonForIteration = (pi: IProgramIncrement, iteration: IIteration, person: IPersonBasic, personTeam: IPersonTeam, holidays: number, ptos: number) => {

        // Start with the basic points per iteration (usually 8).
        let capacity = pi.pointsPerIteration;

        // Multiply by the person's base Availability:
        let availabilityMultiplier = (personTeam.percentage / 100);
        capacity = capacity * availabilityMultiplier;

        // Multiply by time spent on holiday:
        let holidayMultiplier = (iteration.numWeekDays - holidays) / iteration.numWeekDays;
        capacity = capacity * holidayMultiplier;

        // Multiply by time spent on PTO:
        let ptoMultiplier = (iteration.numWeekDays - ptos) / iteration.numWeekDays;
        capacity = capacity * ptoMultiplier;

        return capacity;
    }

    const getCapacityDescForPersonForIteration = (pi: IProgramIncrement, iteration: IIteration, person: IPersonBasic, personTeam: IPersonTeam, holidays: number, ptos: number) => {

        let out = "";

        // Start with the basic points per iteration (usually 8).
        let capacity = pi.pointsPerIteration;
        out = out + "Base " + capacity + " points ";

        // Multiply by the person's base Availability:
        let availabilityMultiplier = (personTeam.percentage / 100);
        capacity = capacity * availabilityMultiplier;
        out = out + "x Availability " + availabilityMultiplier + " ";

        // Multiply by time spent on holiday:
        let holidayMultiplier = (iteration.numWeekDays - holidays) / iteration.numWeekDays;
        capacity = capacity * holidayMultiplier;
        out = out + "x Holidays " + holidayMultiplier + " ";

        // Multiply by time spent on PTO:
        let ptoMultiplier = (iteration.numWeekDays - ptos) / iteration.numWeekDays;
        capacity = capacity * ptoMultiplier;
        out = out + "x PTOs " + ptoMultiplier + " ";

        out = out + "= " + capacity;

        return out;
    }

    const getNumTeams = (personId: number) => {
        let output = 1;
        const teams = props.personTeams.filter((pt) => pt.personId === personId);
        if (teams) {
            output = teams.length;
        };
        return output;
    }

    interface ICapIteration { num: number, holidays: number, ptos: number, capacity: number; capacityDesc: string};
    interface ICapacityRow { num: number, personId: number, name: string, location: string, team: string; role: string; availability: number, carryoverPoints: number, skipHolsAndPTOs: boolean, newPerson: boolean, iterations: ICapIteration[] }

    const zeroToDash = (num: number): string => {
        if (num === 0) { return "-"; }
        return num.toString();
    }

    const setSkippedHolidayAndPTOCells = (capRows: ICapacityRow[]): ICapacityRow[] => {
        if (capRows.length > 0) {
            for (let i = capRows.length - 1; i >= 1; i--) {
                if (capRows[i].personId === capRows[i - 1].personId) {
                    capRows[i].skipHolsAndPTOs = true;
                    capRows[i].newPerson = true;
                }
            }
        }
        return capRows;
    }

    const setNewPerson = (capRows: ICapacityRow[]): ICapacityRow[] => {
        if (capRows.length > 0) {
            let currentPersonId = -1;
            for (let i = 0; i < capRows.length; i++) {
                if (capRows[i].personId !== currentPersonId) {
                    capRows[i].newPerson = true;
                } else {
                    capRows[i].newPerson = false;
                }
                currentPersonId = capRows[i].personId;
            }
        }
        return capRows;
    }

    const getCapacityRows = (): ICapacityRow[] => {

        let theCapRows: ICapacityRow[] = [];

        let rowNum = 1;

        props.personTeams.sort(personTeamSorter).forEach(pt => {
            const p = props.persons.filter((p) => p.id === selectedFilterPersonId || selectedFilterPersonId === -1).find((p) => p.id === pt.personId);
            if (p) {

                const capRow: ICapacityRow = {
                    num: rowNum,
                    personId: p.id,
                    name: p.lastName + ", " + p.firstName,
                    location: getLocationName(p.locationId),
                    team: getTeamName(pt.teamId),
                    role: getRoleName(pt.teamId, pt.personId),
                    availability: getAvailability(pt.teamId, pt.personId),
                    carryoverPoints: 0,
                    skipHolsAndPTOs: false,
                    newPerson: false,
                    iterations: []
                };
                rowNum = rowNum + 1;

                let capIterNum = 1;
                iterations.map((iteration, index) => {
                    const holidays = getHolidaysForPersonForIteration(iteration, p, pt);
                    const ptos = getPTOsForPersonForIteration(iteration, p, pt);
                    const capIter = {
                        num: capIterNum,
                        holidays,
                        ptos,
                        capacity: getCapacityForPersonForIteration(currentPI, iteration, p, pt, holidays, ptos),
                        capacityDesc: getCapacityDescForPersonForIteration(currentPI, iteration, p, pt, holidays, ptos),
                    };
                    capRow.iterations.push(capIter);
                    capIterNum = capIterNum + 1;

                });

                theCapRows.push(capRow)
            }
        });

        theCapRows = setSkippedHolidayAndPTOCells(theCapRows);
        theCapRows = setNewPerson(theCapRows);
        return theCapRows;
    };



    let capRows: ICapacityRow[] = getCapacityRows();

    const getTableRows = (capRows: ICapacityRow[]): any => {

        let out: any[] = [];

        const getRow = (cr: ICapacityRow) => {
            return (
                <tr className="personRow">
                    <td>{cr.name}</td>
                    <td>{cr.location}</td>
                    <td>{cr.team} ({cr.role})</td>
                    <td className="center">{cr.availability}%</td>
                    <td className="center">
                        <input type="text" value={0} className={"numInput"} onChange={(e) => { }}></input>
                    </td>
                    {cr.iterations.map((cri, index) =>
                        <>
                            {!cr.skipHolsAndPTOs &&
                                <>
                                    <td className="half center" rowSpan={getNumTeams(cr.personId)}>{zeroToDash(cri.holidays)}</td>
                                    <td className="half center" rowSpan={getNumTeams(cr.personId)}>{zeroToDash(cri.ptos)}</td>
                                </>
                            }
                            <td className="half center question" title={cri.capacityDesc}>{cri.capacity.toFixed(1)}</td>
                        </>
                    )}
                    <td className="center"><b>{getTotalCapacityForPersonRow(cr).toFixed(1)}</b></td>
                </tr >

            );
        }

        capRows.forEach((cr) => {
            out.push(getRow(cr));
        });

        return out;
    }

    const getTotalCapacityForIteration = (capRows: ICapacityRow[], iteration: IIteration) => {
        let tot = 0;

        capRows.forEach((cr) => {
            const thisIteration = cr.iterations.find((i) => i.num === iteration.num);
            if (thisIteration) {
                tot = tot + thisIteration.capacity;
            }
        })

        return tot;
    }

    const getTotalCapacityForPersonRow = (capRow: ICapacityRow) => {
        let tot = 0;
        capRow.iterations.forEach((i) => {
            tot = tot + i.capacity;
        })
        return tot;
    }

    const getTotalCapacity = (capRows: ICapacityRow[]) => {
        let tot = 0;
        capRows.forEach((cr) => {
            cr.iterations.forEach((i) => {
                tot = tot + i.capacity;
            })
        })
        return tot;
    }

    const getTotalsRows = (capRows: ICapacityRow[]) => {
        return (
            <tr className="topRow">
                <td colSpan={5}><b>Total:</b></td>
                {iterations.map((iteration, index) =>
                    <>
                        <td colSpan={2}></td>
                        <td className="center">{getTotalCapacityForIteration(capRows, iteration).toFixed(1)}</td>
                    </>
                )}
                <td className="center"><b>{getTotalCapacity(capRows).toFixed(1)}</b></td>
            </tr>
        )
    };

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
                                {props.programIncrements.sort(piSorter).map((p) => <option value={p.id}>{p.startDate.getFullYear()}.{p.incrementNumberInYear} </option>)}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            {props.selectedProgramIncrement !== -1 &&
                <>
                    <table className="capTable">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Year</th>
                                <th>PI</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Iterations</th>
                                <th>Pts per Iteration</th>
                                <th>Iteration Duration</th>
                                <th>Velocity</th>
                            </tr>
                            <tr>
                                <td className="center">{currentPI.startDate.getFullYear()}</td>
                                <td className="center">{currentPI.incrementNumberInYear}</td>
                                <td className="center">{dateDisplay(currentPI.startDate)}</td>
                                <td className="center">{dateDisplay(getEndDate(currentPI))}</td>
                                <td className="center">{currentPI.numberIterations}</td>
                                <td className="center">{currentPI.pointsPerIteration}</td>
                                <td className="center">{currentPI.daysPerIteration} days</td>
                                <td className="center"><b>{getTotalCapacity(capRows).toFixed(1)}</b></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="filterDiv">Filter by: {getNameSelect()}</div>

                    <table className="mainTable">
                        <thead></thead>
                        <tbody>
                            <tr className="topRow">
                                <th rowSpan={2} className="smaller">Name</th>
                                <th rowSpan={2} className="smaller">Location</th>
                                <th rowSpan={2} className="smaller">Team & Role</th>
                                <th rowSpan={2} className="smaller">Availability</th>
                                <th rowSpan={2} className="smaller">Carryover<br></br>Points</th>
                                {iterations.map((i, index) =>
                                    <th colSpan={3} className="iterationCell">
                                        <table className="iterationTable">
                                            <tr>
                                                <td colSpan={2} className="center"><b>{currentPI.startDate.getFullYear()}.{currentPI.incrementNumberInYear}.{index.toString()}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>{dateDisplay(i.startDate)} to</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>{dateDisplay(i.endDate)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Days:</td>
                                                <td>{i.duration}</td>
                                            </tr>
                                            <tr>
                                                <td>Week Days:</td>
                                                <td>{i.numWeekDays}</td>
                                            </tr>
                                        </table>
                                    </th>
                                )}
                                <th rowSpan={2} className="smaller">Total<br></br>Capacity</th>
                            </tr>
                            {ptoTitleRows}
                            {getTableRows(capRows)}
                            {getTotalsRows(capRows)}
                        </tbody>
                    </table>

                    <pre>{JSON.stringify(capRows, null, 2)}</pre>

                    {/* <pre>{JSON.stringify(ipr, null, 2)}</pre> */}

                </>
            }

        </div>
    )
}

export default Capacity;