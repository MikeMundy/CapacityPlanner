import React, { useState } from "react";

import { IHoliday, IIterationOLD, IPerson, IPlanning } from "../interfaces/Interfaces";

export interface IProps {
}

const CapacityPlannerOLD: React.FC<IProps> = (props: IProps) => {

    const planning: IPlanning = {
        year: 2012,
        planningIncrement: 4,
        startDate: new Date(2021, 9, 21, 0, 0, 0),
        pointsPerIteration: 8,
        numIterations: 7,
        iterationDuration: 14
    };

    const getInitialPersons = () => {

        const list = [
            { name: "Judy", role: "Dev Manager / PO", avail: 0 },
            { name: "Allan", role: "Dev / Sys arch.", avail: 0.5 },
            { name: "Chunhui", role: "Dev", avail: 0.8 },
            { name: "Jing", role: "Dev", avail: 1 },
            { name: "Keikhosro", role: "Dev", avail: 1 },
            { name: "Lan", role: "Dev", avail: 1 },
            { name: "Mike M", role: "Dev / PO-ish", avail: 0.8 },
            { name: "Tony", role: "Dev", avail: 1 },
            { name: "Mary", role: "QA", avail: 0.25 },
            { name: "Levi", role: "QA", avail: 0.8 },
            { name: "Rishika", role: "QA", avail: 0.8 },
            { name: "Corey", role: "QA", avail: 0 },
            { name: "Knowlton", role: "QA", avail: 0 },
        ];

        const initial_persons: IPerson[] = [];
        list.forEach((l, index) => {
            const person: IPerson = {
                name: l.name,
                role: l.role,
                rawCarryOverPoints: "0",
                carryOverPoints: 0,
                rawBasePointsMultiplier: l.avail.toString(),
                basePointsMultiplier: l.avail,
                ptoPlanned: [0, 0, 0, 0, 0, 0, 0],
                rawPtoPlanned: ["", "", "", "", "", "", ""],
                visible: true
            };
            initial_persons[index] = person;
        })
        return initial_persons;
    }

    const [persons, setPersons] = useState(getInitialPersons());
    const [selectedFilterName, setSelectedFilterName] = useState("");

    const holidays: IHoliday[] = [
        { date: new Date(2021, 12 - 1, 24), name: "Christmas" },
        { date: new Date(2021, 12 - 1, 27), name: "Boxing Day" },
        { date: new Date(2022, 1 - 1, 3), name: "New Years Day" },
        { date: new Date(2022, 2 - 1, 2), name: "Family Day" },
    ];


    //     24-Dec-2021	Christmas Day
    // 27-Dec-2021	Boxing Day
    // 3-Jan-2022	New years Day
    // 2-Feb-2022	Family Day
    // 15-Mar-2022	Good Friday
    // 23-May-2022	Victoria Day
    // 1-Jun-2022	Canada Day
    // 5-Sep-2022	Labor Day
    // 10-Oct-2022	Thanksgiving
    // 23-Dec-2022	Christmas Day
    // 26-Dec-2022	Boxing Day
    // 5-Nov-2021	FAKE Holiday

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

    const isSameDate = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    const getHolidayDatesCount = (startDate: Date, endDate: Date) => {
        let count = 0;

        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            // const dayOfWeek = curDate.getDay();
            // if (!(dayOfWeek in [0, 6])) { // Only include holidays that are on week days
            holidays.forEach((hd, count) => {
                if (isSameDate(curDate, hd.date)) {
                    count = count + 1;
                }
            })
            // }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    let iterations: IIterationOLD[] = [];
    let currentDate = planning.startDate;
    for (let i = 1; i < planning.numIterations + 1; i++) {
        const endDate = addDays(currentDate, planning.iterationDuration - 1);
        const numWeekDays = getWeekDayDatesCount(currentDate, endDate);
        const numHolidays = getHolidayDatesCount(currentDate, endDate);
        const numWorkDays = numWeekDays - numHolidays;
        const iteration: IIterationOLD = {
            num: i,
            startDate: currentDate,
            endDate: endDate,
            duration: planning.iterationDuration,
            numWeekDays,
            numHolidays,
            numWorkDays
        }
        currentDate = addDays(currentDate, planning.iterationDuration)
        iterations[i] = iteration;
    }

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear();
    }

    const getCapacity = (person: IPerson, iteration: IIterationOLD) => {
        const holidaysAndPTOsMultiplier = (iteration.numWeekDays - iteration.numHolidays - person.ptoPlanned[iteration.num - 1]) / iteration.numWeekDays;
        let carryOverPts = 0;
        if (iteration.num === 1) {
            carryOverPts = person.carryOverPoints;
        }
        return (planning.pointsPerIteration * person.basePointsMultiplier * holidaysAndPTOsMultiplier) - carryOverPts;
    }

    const getCapacityDesc = (person: IPerson, iteration: IIterationOLD): string => {
        let output = "";
        const holidaysAndPTOsMultiplier = (iteration.numWeekDays - iteration.numHolidays - person.ptoPlanned[iteration.num - 1]) / iteration.numWeekDays;
        const holidaysAndPTOsMultiplierOutput = "(" + iteration.numWeekDays + " weekdays - " + iteration.numHolidays + " holidays - " + person.ptoPlanned[iteration.num - 1] + " PTO days) / " + iteration.numWeekDays + " weekdays";
        let carryOverPts = 0;
        if (iteration.num === 1) {
            carryOverPts = person.carryOverPoints;
        }
        const total = (planning.pointsPerIteration * person.basePointsMultiplier * holidaysAndPTOsMultiplier) - carryOverPts;
        output = planning.pointsPerIteration + " pts per iteration x " + person.basePointsMultiplier + " availability x (" + holidaysAndPTOsMultiplierOutput + ") - " + carryOverPts + " carryover = " + total.toFixed(1);
        return output;
    }

    const getTotalCapacityForPerson = (person: IPerson) => {
        let total = 0;
        iterations.forEach((iteration) => {
            total += getCapacity(person, iteration)
        })
        return total;
    }

    const getTotalPTOsForPerson = (person: IPerson) => {
        let total = 0;
        iterations.forEach((iteration) => {
            total += person.ptoPlanned[iteration.num - 1];
        })
        return total;
    }

    const updateBasePtsMultiplier = (p: IPerson, rawbasePtsMultiplier: string) => {
        let basePtsMultiplier = Number.parseFloat(rawbasePtsMultiplier);
        if (basePtsMultiplier < 0) { basePtsMultiplier = 0; }
        if (basePtsMultiplier > 100) { basePtsMultiplier = 100; }
        if (isNaN(basePtsMultiplier)) { basePtsMultiplier = 100; }

        let updatedPersons: IPerson[] = [];
        persons.forEach(val => updatedPersons.push(Object.assign({}, val)))
        let thePerson = updatedPersons.find(x => x.name === p.name);
        if (thePerson) {
            thePerson.basePointsMultiplier = basePtsMultiplier / 100;
            setPersons(updatedPersons);
        }
    }

    const updateCarryOverPoints = (p: IPerson, rawCarryOverPoints: string) => {
        let carryOverPoints = Number.parseFloat(rawCarryOverPoints);
        if (!isNaN(carryOverPoints)) {
            if (carryOverPoints < 0) { carryOverPoints = 0; }
            // rawPTO = pto.toString();
        } else {
            carryOverPoints = 0;
        }

        let updatedPersons: IPerson[] = [];
        persons.forEach(val => updatedPersons.push(Object.assign({}, val)))
        let thePerson = updatedPersons.find(x => x.name === p.name);
        if (thePerson) {
            thePerson.carryOverPoints = carryOverPoints;
            thePerson.rawCarryOverPoints = rawCarryOverPoints;
            setPersons(updatedPersons);
        }
    }

    const updatePlannedPTO = (p: IPerson, rawPTO: string, iteration: number) => {
        let pto = Number.parseFloat(rawPTO);
        if (!isNaN(pto)) {
            if (pto < 0) { pto = 0; }
            // rawPTO = pto.toString();
        } else {
            pto = 0;
        }

        let updatedPersons: IPerson[] = [];
        persons.forEach(val => updatedPersons.push(Object.assign({}, val)))
        let thePerson = updatedPersons.find(x => x.name === p.name);
        if (thePerson) {
            thePerson.ptoPlanned[iteration] = pto;
            thePerson.rawPtoPlanned[iteration] = rawPTO;
            setPersons(updatedPersons);
        }
    }

    const getPTOClassName = (pto: number | undefined): string => {
        if (pto === undefined) { return ""; }
        if (pto > 0) { return "red"; }
        return "";
    }

    const ptoTitleRows = (
        <tr className="smaller">
            {iterations.map((iteration, index) =>
                <>
                    <td className="half center topRow"><b>PTOs</b></td>
                    <td className="half center topRow"><b>Capacity</b></td>
                </>
            )}
        </tr>
    );

    const personRows = persons.filter((p) => p.name === selectedFilterName || selectedFilterName === "").map((p: IPerson, index: number) => {
        return (
            <tr className="personRow">
                <td className="nameCol">{p.name}</td>
                <td className="roleCol">{p.role}</td>
                <td className="center"><input type="number" value={(p.basePointsMultiplier * 100).toFixed(0)} min="0" max="100" step="5" className="numInputSmall" onChange={(e) => updateBasePtsMultiplier(p, e.target.value)}></input> %</td>
                <td className="center">
                    <input type="text" value={p.rawCarryOverPoints} className={"numInput " + getPTOClassName(p.carryOverPoints)} onChange={(e) => updateCarryOverPoints(p, e.target.value)}></input>
                </td>
                {iterations.map((iteration, index) =>
                    <>
                        <td className="half"><input type="text" value={p.rawPtoPlanned[index - 1]} className={"numInput " + getPTOClassName(p.ptoPlanned[index - 1])} onChange={(e) => updatePlannedPTO(p, e.target.value, index - 1)}></input></td>
                        <td className="half center" title={getCapacityDesc(p, iteration)}>{getCapacity(p, iteration).toFixed(1)}</td>
                    </>
                )}
                <td className="center"><b>{getTotalCapacityForPerson(p).toFixed(1)}</b></td>
                <td className="center">{getTotalPTOsForPerson(p).toFixed(1)}</td>
            </tr>
        )
    })

    const getTotalCapacityForIteration = (iteration: IIterationOLD): number => {
        let total = 0;
        persons.forEach((p) => {
            total += getCapacity(p, iteration);
        })
        return total;
    }

    const getTotalVelocity = (): number => {
        let total = 0;
        iterations.forEach((iteration) => {
            persons.forEach((p) => {
                total += getCapacity(p, iteration);
            })
        })
        return total;
    }

    const totalsRows = (
        <tr className="topRow">
            <td colSpan={4}><b>Total capacity of team per iteration:</b></td>
            {iterations.map((iteration, index) =>
                <>
                    <td></td>
                    <td className="center"><b>{getTotalCapacityForIteration(iteration).toFixed(1)}</b></td>
                </>
            )}
            <td className="center"><b>{getTotalVelocity().toFixed(1)}</b></td>
            <td></td>
        </tr>
    );

    const changeNameSelected = (event: any) => {
        const name = event.target.value;
        setSelectedFilterName(name);
    }

    const getNameSelect = () => {
        const options: any[] = [];
        options.push(<option value="">-- select person --</option>);
        persons.forEach((person) => {
            options.push(<option>{person.name}</option>)
        })
        return <select onChange={changeNameSelected} value={selectedFilterName}>{options}</select>
    }

    const boldWorkDays = (numHolidays: number): string => {
        if (numHolidays > 0) { return "bold"; }
        return "x";
    }

    const getHolidays = (startDate: Date, endDate: Date) => {
        let output: string[] = [];

        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            // if (!(dayOfWeek in [0, 6])) { // Only include holidays that are on week days
            holidays.forEach((hd) => {
                if (isSameDate(curDate, hd.date)) {
                    output.push(hd.name + ": " + dateDisplay(hd.date));
                }
            })
            // }
            curDate.setDate(curDate.getDate() + 1);
        }
        return output.join("; ");
    }

    return (
        <>

            <table className="capTable">
                <thead></thead>
                <tbody>
                    <tr>
                        <th>Year</th>
                        <th>PI</th>
                        <th>Start Date</th>
                        <th>Pts per Iteration</th>
                        <th>Iteration Duration</th>
                        <th>Velocity</th>
                    </tr>
                    <tr>
                        <td className="center">{planning.year}</td>
                        <td className="center">{planning.planningIncrement}</td>
                        <td className="center">{dateDisplay(planning.startDate)}</td>
                        <td className="center">{planning.pointsPerIteration}</td>
                        <td className="center">{planning.iterationDuration} days</td>
                        <td className="center">{getTotalVelocity().toFixed(1)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="holidaysDiv"><b>Holidays:</b> {getHolidays(planning.startDate, addDays(planning.startDate, planning.numIterations * planning.iterationDuration))}</div>

            <div className="filterDiv">Filter by: {getNameSelect()}</div>

            <table className="mainTable">
                <thead></thead>
                <tbody>
                    <tr className="topRow">
                        <th rowSpan={2} className="smaller">Name</th>
                        <th rowSpan={2} className="smaller">Role</th>
                        <th rowSpan={2} className="smaller">Availability</th>
                        <th rowSpan={2} className="smaller">Carryover<br></br>Points</th>
                        {iterations.map((i, index) =>
                            <th colSpan={2} className="iterationCell">
                                <table className="iterationTable">
                                    <tr>
                                        <td colSpan={2} className="center"><b>{planning.year}.{planning.planningIncrement}.{index.toString()}</b></td>
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
                                    <tr>
                                        <td>Holidays:</td>
                                        <td className={boldWorkDays(i.numHolidays)} title={getHolidays(i.startDate, i.endDate)}>{i.numHolidays}</td>
                                    </tr>
                                    <tr>
                                        <td>Working Days:</td>
                                        <td className={boldWorkDays(i.numHolidays)} title={getHolidays(i.startDate, i.endDate)}><b>{i.numWorkDays}</b></td>
                                    </tr>
                                    {/* <tr>
                                        <td>Points ea.:</td>
                                        <td>{planning.pointsPerIteration}</td>
                                    </tr> */}
                                </table>
                            </th>
                        )}
                        <th rowSpan={2} className="smaller">Total<br></br>Capacity</th>
                        <th rowSpan={2} className="smaller">Total<br></br>PTOs</th>
                    </tr>
                    {ptoTitleRows}
                    {personRows}
                    {totalsRows}
                </tbody>
            </table>
        </>
    )

}

export default CapacityPlannerOLD;

