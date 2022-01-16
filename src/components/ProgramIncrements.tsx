import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { IProgramIncrement } from "../interfaces/Interfaces";

export interface IProps {
    programIncrements: IProgramIncrement[];
    addProgramIncrement: (programIncrement: IProgramIncrement) => void;
    editProgramIncrement: (programIncrement: IProgramIncrement) => void;
    deleteProgramIncrement: (id: number) => void;
}

const ProgramIncrements: React.FC<IProps> = (props: IProps) => {

    const nullPI: IProgramIncrement = { id: -1, incrementNumberInYear: -1, startDate: new Date(), numberIterations: 0, daysPerIteration: 0, pointsPerIteration: 0 };

    const [programIncrementEdited, setProgramIncrementEdited] = useState(nullPI);

    const [incrementNumberInYear, setIncrementNumberInYear] = useState("1");
    const [startDate, setStartDate] = useState(new Date());
    const [numberIterations, setNumberIterations] = useState("7");
    const [daysPerIteration, setDaysPerIteration] = useState("14");
    const [pointsPerIteration, setPointsPerIteration] = useState("8");

    const [editIncrementNumberInYear, setEditIncrementNumberInYear] = useState("1");
    const [editStartDate, setEditStartDate] = useState(new Date());
    const [editNumberIterations, setEditNumberIterations] = useState("7");
    const [editDaysPerIteration, setEditDaysPerIteration] = useState("14");
    const [editPointsPerIteration, setEditPointsPerIteration] = useState("8");

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear() + " " + dt.toLocaleDateString("en-US", { weekday: 'short' });;
    }

    const getEndDate = (pi: IProgramIncrement): Date => {
        const newDate = new Date(pi.startDate);
        newDate.setDate(newDate.getDate() + (pi.numberIterations * pi.daysPerIteration) - 1);
        return newDate;
    }

    const getProgramIncrementElements = () => {

        if (props.programIncrements.length === 0) { return <p>There are currently no Program Increments.</p> }

        const sorter = (pi1: IProgramIncrement, pi2: IProgramIncrement): number => {
            return pi1.startDate < pi2.startDate ? -1 : 1;
        };

        const output = props.programIncrements.sort(sorter).map((t) =>
            <tr key={t.id}>
                <td>{t.startDate.getFullYear()}</td>
                <td>{t.incrementNumberInYear}</td>
                <td>{dateDisplay(t.startDate)}</td>
                <td>{dateDisplay(getEndDate(t))}</td>
                <td>{t.numberIterations}</td>
                <td>{t.daysPerIteration}</td>
                <td>{t.pointsPerIteration}</td>
                <td><button onClick={(e) => beginEditProgramIncrement(t)}>Edit</button></td>
                <td><button onClick={(e) => deleteProgramIncrement(t.id)}>Delete</button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Year</th>
                        <th>PI</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Iterations</th>
                        <th>Days per Iteration</th>
                        <th>Points per Iteration</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {output}
                </tbody>
            </table>
        );
    }

    const startAdd = () => {
        setIncrementNumberInYear("1");
        setStartDate(new Date());
        setNumberIterations("7");
        setDaysPerIteration("14");
        setPointsPerIteration("8");
        setIsAdding(true);
    }

    const addProgramIncrement = () => {
        const maxId = props.programIncrements.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const newPI: IProgramIncrement = { id: maxId + 1, incrementNumberInYear: parseInt(incrementNumberInYear), startDate: startDate, numberIterations: parseInt(numberIterations), daysPerIteration: parseInt(daysPerIteration), pointsPerIteration: parseInt(pointsPerIteration) };
        props.addProgramIncrement(newPI);
        setIsAdding(false);
    }

    const beginEditProgramIncrement = (pi: IProgramIncrement) => {
        setProgramIncrementEdited(pi);
        setEditIncrementNumberInYear(pi.incrementNumberInYear.toString());
        setEditStartDate(pi.startDate);
        setEditNumberIterations(pi.numberIterations.toString());
        setEditDaysPerIteration(pi.daysPerIteration.toString());
        setEditPointsPerIteration(pi.pointsPerIteration.toString());
        setIsEditing(true);
    }

    const editProgramIncrement = () => {
        const updatedPI: IProgramIncrement = { ...programIncrementEdited };
        updatedPI.incrementNumberInYear = parseInt(editIncrementNumberInYear);
        updatedPI.startDate = editStartDate;
        updatedPI.numberIterations = parseInt(editNumberIterations);
        updatedPI.daysPerIteration = parseInt(editDaysPerIteration);
        updatedPI.pointsPerIteration = parseInt(editPointsPerIteration);
        props.editProgramIncrement(updatedPI);
        setIsEditing(false);
    }

    const deleteProgramIncrement = (id: number) => {
        if (window.confirm('Are you sure that you want to delete this Program Increment?')) { // tslint:disable-line
            props.deleteProgramIncrement(id);
        }
    }

    const checkEditIsInvalid = () => {
        if (!Number.isInteger(parseFloat(editIncrementNumberInYear))) { return true; }
        if (parseInt(editIncrementNumberInYear) < 1) { return true; }

        if (!Number.isInteger(parseFloat(editNumberIterations))) { return true; }
        if (parseInt(editNumberIterations) < 1) { return true; }

        if (!Number.isInteger(parseFloat(editDaysPerIteration))) { return true; }
        if (parseInt(editDaysPerIteration) < 1) { return true; }

        if (!Number.isInteger(parseFloat(editPointsPerIteration))) { return true; }
        if (parseInt(editPointsPerIteration) < 1) { return true; }

        return false;
    }

    return (
        <div>
            <h2>Program Increments</h2>

            {!isAdding && !isEditing &&
                <div><button onClick={(e) => startAdd()} className="bigButton">Add Program Increment</button></div>
            }

            {isAdding &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Add a Program Increment</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Increment Number</b></td>
                                    <td><input type="text" value={incrementNumberInYear} onChange={(e) => setIncrementNumberInYear(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Start Date</b></td>
                                    <td><DatePicker onChange={(date: Date) => setStartDate(date)} value={startDate} clearIcon={null} /></td>
                                </tr>
                                <tr>
                                    <td><b>Num Iterations</b></td>
                                    <td><input type="text" value={numberIterations} onChange={(e) => setNumberIterations(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Days per Iteration</b></td>
                                    <td><input type="text" value={daysPerIteration} onChange={(e) => setDaysPerIteration(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Points per Iteration</b></td>
                                    <td><input type="text" value={pointsPerIteration} onChange={(e) => setPointsPerIteration(e.target.value)} className="percentInput"></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={addProgramIncrement} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Save</button>
                            <button onClick={(e) => setIsAdding(false)} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getProgramIncrementElements()}
                </>
            }

            {isEditing &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Edit a Program Increment</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Increment Number</b></td>
                                    <td><input type="text" value={editIncrementNumberInYear} onChange={(e) => setEditIncrementNumberInYear(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Start Date</b></td>
                                    <td><DatePicker onChange={(date: Date) => setEditStartDate(date)} value={editStartDate} clearIcon={null} /></td>
                                </tr>
                                <tr>
                                    <td><b>Num Iterations</b></td>
                                    <td><input type="text" value={editNumberIterations} onChange={(e) => setEditNumberIterations(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Days per Iteration</b></td>
                                    <td><input type="text" value={editDaysPerIteration} onChange={(e) => setEditDaysPerIteration(e.target.value)} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Points per Iteration</b></td>
                                    <td><input type="text" value={editPointsPerIteration} onChange={(e) => setEditPointsPerIteration(e.target.value)} className="percentInput"></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={editProgramIncrement} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Update</button>
                            <button onClick={(e) => setIsEditing(false)} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }
        </div>
    )

}

export default ProgramIncrements;