import React from "react";
import { IIteration, IIterationExtended, ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "../interfaces/Interfaces";

export interface IProps {
    minimiseResults: boolean;
    programIncrements: IProgramIncrement[];
    programIterations: IIteration[];
    persons: IPersonBasic[];
    personTeams: IPersonTeam[];
    teams: ITeam[];
    locations: ILocation[];
    locationHolidays: ILocationHoliday[];
    personVacations: IPersonVacation[];
    selectedProgramIncrementId: number;
    selectedFilterTeamId: number;
    selectedFilterPersonId: number;
}

const PICapacityTable: React.FC<IProps> = (props: IProps) => {

    const addDays = (d: Date, days: number) => {
        var date: Date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + days);
        return date;
    }

    const getWeekDayDatesCount = (startDate: Date, endDate: Date) => {
        let count = 0;
        const curDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0);
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { count = count + 1; }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    const getExtendedIterations = () => {
        let extIterations: IIterationExtended[] = [];
        let n = 1;
        props.programIterations.forEach((i) => {
            const newExtIteration: IIterationExtended = {
                id: i.id,
                programIncrementId: i.programIncrementId,
                name: i.name,
                startDate: i.startDate,
                lengthInDays: i.lengthInDays,
                points: i.points,
                numWeekDays: getWeekDayDatesCount(i.startDate, addDays(i.startDate, i.lengthInDays - 1)),
                num: n,
            }
            n = n + 1;
            extIterations.push(newExtIteration);
        })

        return extIterations;
    }

    const iterations = getExtendedIterations();

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear() + " " + dt.toLocaleDateString("en-US", { weekday: 'short' });;
    }

    interface ICapIteration { num: number, holidays: number, ptos: number, capacity: number; capacityDesc: string };
    interface ICapacityRow { num: number, personId: number, name: string, location: string, team: string; role: string; availability: number, carryoverPoints: number, skipHolsAndPTOs: boolean, newPerson: boolean, iterations: ICapIteration[] }

    const getNumTeams = (personId: number) => {
        let output = 1;
        const teams = props.personTeams.filter((pt) => pt.teamId === props.selectedFilterTeamId || props.selectedFilterTeamId === -1).filter((pt) => pt.personId === personId);
        if (teams) {
            output = teams.length;
        };
        return output;
    }

    const zeroToDash = (num: number): string => {
        if (num === 0) { return "-"; }
        return num.toString();
    }

    const getTotalCapacityForPersonRow = (capRow: ICapacityRow) => {
        let tot = 0;
        capRow.iterations.forEach((i) => {
            tot = tot + i.capacity;
        })
        return tot;
    }

    const getTableRows = (capRows: ICapacityRow[]): any => {

        let out: any[] = [];

        const getRow = (cr: ICapacityRow) => {
            return (
                <tr className="personRow">
                    <td>{cr.name}</td>
                    {!props.minimiseResults &&
                        <>
                            <td>{cr.location}</td>
                            <td>{cr.team} ({cr.role})</td>
                            <td className="center">{cr.availability}%</td>
                        </>
                    }
                    {/* <td className="center">
                        <input type="text" value={0} className={"numInput"} onChange={(e) => { }}></input>
                    </td> */}
                    {cr.iterations.map((cri, index) =>
                        <React.Fragment key={index}>
                            {!cr.skipHolsAndPTOs &&
                                <React.Fragment key={index}>
                                    <td className="half center" rowSpan={getNumTeams(cr.personId)}>{zeroToDash(cri.holidays)}</td>
                                    <td className="half center" rowSpan={getNumTeams(cr.personId)}>{zeroToDash(cri.ptos)}</td>
                                </React.Fragment>
                            }
                            <td className="half center question" title={cri.capacityDesc}>{cri.capacity.toFixed(1)}</td>
                        </React.Fragment>
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

    const ptoTitleRows = (
        <tr className="smaller">
            {iterations.map((iteration, index) =>
                <React.Fragment key={index}>
                    <td className="half center topRow"><b>Hols.</b></td>
                    <td className="half center topRow"><b>PTOs</b></td>
                    <td className="half center topRow"><b>Capacity</b></td>
                </React.Fragment>
            )}
        </tr>
    );

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

    const getLocationName = (locationId: number) => {
        const location = props.locations.find((l) => l.id === locationId);
        if (location) {
            return location.name;
        };
        return "?";
    }

    const getTeamName = (teamId: number): string => {
        const team = props.teams.find((t) => t.id === teamId);
        if (team) {
            return team.name;
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

    const getHolidaysForPersonForIteration = (iteration: IIteration, person: IPersonBasic) => {
        let count = 0;

        const locationId = person.locationId;
        const locationHolidays = props.locationHolidays.filter((l) => l.locationId === locationId);
        // console.log("locationHolidays: " + JSON.stringify(locationHolidays));

        if (locationHolidays) {
            locationHolidays.filter((lh) => lh.date >= iteration.startDate && lh.date <= addDays(iteration.startDate, iteration.lengthInDays - 1)).forEach((lh) => {
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
            personVacations.filter(pv => pv.date >= iteration.startDate && pv.date <= addDays(iteration.startDate, iteration.lengthInDays - 1)).forEach((pv) => {
                // console.log(JSON.stringify(iteration));
                // console.log(JSON.stringify(lh));
                // count = count + (1 * personTeam.percentage / 100);
                count = count + pv.fractionOfDay;
            })
        }

        return count;
    }

    const getCapacityForPersonForIteration = (pi: IProgramIncrement, iteration: IIterationExtended, person: IPersonBasic, personTeam: IPersonTeam, holidays: number, ptos: number) => {

        // Start with the basic points per iteration
        let capacity = iteration.points;

        // Multiply by the person's base Availability:
        let availabilityMultiplier = (personTeam.percentage / 100);
        capacity = capacity * availabilityMultiplier;

        // Multiply by time spent on holidays and PTOs:
        let holidayAndPTOMultiplier = (iteration.numWeekDays - holidays - ptos) / iteration.numWeekDays;
        capacity = capacity * holidayAndPTOMultiplier;

        return capacity;
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

    const nullPI: IProgramIncrement = { id: -1, name: "" };

    const getCurrentPIDetails = () => {
        const currentPI = props.programIncrements.find((p) => p.id === props.selectedProgramIncrementId);
        if (currentPI) {
            return currentPI;
        }
        return nullPI;
    }

    const currentPI = getCurrentPIDetails();

    const getCapacityDescForPersonForIteration = (pi: IProgramIncrement, iteration: IIterationExtended, personTeam: IPersonTeam, holidays: number, ptos: number) => {

        let out = "";

        // Start with the basic points per iteration (usually 8).
        let capacity = iteration.points;
        out = out + "Base " + capacity + " points ";

        // Multiply by the person's base Availability:
        let availabilityMultiplier = (personTeam.percentage / 100);
        capacity = capacity * availabilityMultiplier;
        out = out + "x Availability " + availabilityMultiplier + " ";

        // Multiply by time spent on holiday and PTOs:
        let holidayAndPTOMultiplier = (iteration.numWeekDays - holidays - ptos) / iteration.numWeekDays;
        capacity = capacity * holidayAndPTOMultiplier;
        out = out + "x (" + holidays + " Holidays + " + ptos + " PTOs) / " + iteration.numWeekDays + " Workdays = " + holidayAndPTOMultiplier.toFixed(2) + ") ";

        out = out + "= " + capacity.toFixed(1);

        return out;
    }

    const getCapacityRows = (): ICapacityRow[] => {

        let theCapRows: ICapacityRow[] = [];

        let rowNum = 1;

        props.personTeams.filter((pt) => pt.teamId === props.selectedFilterTeamId || props.selectedFilterTeamId === -1).sort(personTeamSorter).forEach(pt => {
            const p = props.persons.filter((p) => p.id === props.selectedFilterPersonId || props.selectedFilterPersonId === -1).find((p) => p.id === pt.personId);
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
                iterations.forEach((iteration, index) => {
                    const holidays = getHolidaysForPersonForIteration(iteration, p);
                    const ptos = getPTOsForPersonForIteration(iteration, p, pt);
                    const capIter = {
                        num: capIterNum,
                        holidays,
                        ptos,
                        capacity: getCapacityForPersonForIteration(currentPI, iteration, p, pt, holidays, ptos),
                        capacityDesc: getCapacityDescForPersonForIteration(currentPI, iteration, pt, holidays, ptos),
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

    const getTotalCapacityForIteration = (capRows: ICapacityRow[], iteration: IIterationExtended) => {
        let tot = 0;

        capRows.forEach((cr) => {
            const thisIteration = cr.iterations.find((i) => i.num === iteration.num);
            if (thisIteration) {
                tot = tot + thisIteration.capacity;
            }
        })

        return tot;
    }

    const getTotalsRows = (capRows: ICapacityRow[]) => {
        let colspan = 4;
        if (props.minimiseResults) { colspan = 1; }

        return (
            <tr className="topRow">
                <td colSpan={colspan}><b>Total:</b></td>
                {iterations.map((iteration, index) =>
                    <React.Fragment key={index}>
                        <td colSpan={2}></td>
                        <td className="center"><b>{getTotalCapacityForIteration(capRows, iteration).toFixed(1)}</b></td>
                    </React.Fragment>
                )}
                <td className="center"><b>{getTotalCapacity(capRows).toFixed(1)}</b></td>
            </tr>
        )
    };

    const getTotalCapacity = (capRows: ICapacityRow[]) => {
        let tot = 0;
        capRows.forEach((cr) => {
            cr.iterations.forEach((i) => {
                tot = tot + i.capacity;
            })
        })
        return tot;
    }

    let capRows: ICapacityRow[] = getCapacityRows();

    return (
        <>
            <h3>Total Velocity</h3>

            <div className="mainTableDiv">

                <table className="mainTable">
                    <thead></thead>
                    <tbody>
                        <tr className="topRow">
                            <th rowSpan={2} className="smaller">Name</th>
                            {!props.minimiseResults &&
                                <>
                                    <th rowSpan={2} className="smaller">Location</th>
                                    <th rowSpan={2} className="smaller">Team & Role</th>
                                    <th rowSpan={2} className="smaller">Availability</th>
                                </>
                            }
                            {iterations.map((i, index) =>
                                <th key={index} colSpan={3} className="iterationCell">
                                    <table className="iterationTable">
                                        <tr>
                                            <td colSpan={2} className="center"><b>{i.name}</b></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>{dateDisplay(i.startDate)} to</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>{dateDisplay(addDays(i.startDate, i.lengthInDays - 1))}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Days:</td>
                                            <td>{i.lengthInDays}</td>
                                        </tr>
                                        <tr>
                                            <td>Week Days:</td>
                                            <td>{i.numWeekDays}</td>
                                        </tr>
                                        <tr>
                                            <td>Points:</td>
                                            <td>{i.points}</td>
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

            </div>
        </>
    )

}

export default PICapacityTable;