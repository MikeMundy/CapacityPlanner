import React, { useState } from "react";
import { IIteration2 } from "../interfaces/Interfaces";
import DatePicker from 'react-date-picker';

export interface IProps {
    programIncrementId: number;
    programIterations: IIteration2[];
    addProgramIteration: (programIteration: IIteration2) => void;
    editProgramIteration: (programIteration: IIteration2) => void;
    deleteProgramIteration: (id: number) => void;
}

const ProgramIterations: React.FC<IProps> = (props: IProps) => {

    const [programIterationId, setProgramIterationId] = useState(-1);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [lengthInDays, setLengthInDays] = useState(0);
    const [points, setPoints] = useState(8);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getProgramIterationElements = () => {

        if (props.programIterations.length === 0) { return <div className="marBottom5">There are currently no Program Iterations.</div> }

        const sorter = (pi1: IIteration2, pi2: IIteration2): number => {
            return pi1.startDate < pi2.startDate ? -1 : 1;
        };

        const dateDisplay = (dt: Date): string => {
            const pad = (s: number): string => s.toString().padStart(2, "0");
            return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear();
        }

        const addDays = (d: Date, days: number) => {
            var date: Date = new Date(d);
            date.setDate(date.getDate() + days);
            return date;
        }

        const output = props.programIterations.sort(sorter).map((t) =>
            <tr key={t.id}>
                <td>{t.name}</td>
                <td>{dateDisplay(t.startDate)}</td>
                <td>{dateDisplay(addDays(t.startDate, t.lengthInDays - 1))}</td>
                <td className="center">{t.lengthInDays}</td>
                <td className="center">{t.points}</td>
                <td><button onClick={(e) => startEdit(t.id)}>Edit</button></td>
                <td><button onClick={(e) => deleteProgramIteration(t.id)}>Delete</button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
                    <tr>
                        <th>Iteration Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Length (days)</th>
                        <th>Points</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {output}
                </tbody>
            </table>
        );
    }

    const startAdd = () => {
        const newDate = new Date();
        setName("");
        setStartDate(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
        setLengthInDays(14);
        setPoints(8);
        setIsAdding(true);
    }

    const saveAddProgramIteration = () => {
        const newPI: IIteration2 = { id: -1, programIncrementId: props.programIncrementId, name: name, startDate: startDate, lengthInDays: lengthInDays, points: points };
        props.addProgramIteration(newPI);
        setIsAdding(false);
    }

    const startEdit = (id: number) => {
        const pi = props.programIterations.find((pi) => pi.id === id);
        if (pi) {
            setProgramIterationId(id);
            setName(pi.name);
            setStartDate(pi.startDate);
            setLengthInDays(pi.lengthInDays);
            setPoints(pi.points);
            setIsEditing(true);
        }
    }

    const saveEditProgramIteration = () => {
        const pi = props.programIterations.find((pi) => pi.id === programIterationId);
        if (pi) {
            pi.name = name;
            pi.startDate = startDate;
            pi.lengthInDays = lengthInDays;
            pi.points = points;
            props.editProgramIteration(pi);
            setIsEditing(false);
        }
    }

    const deleteProgramIteration = (id: number) => {
        if (window.confirm('Are you sure that you want to delete this Program Iteration?')) { // tslint:disable-line
            props.deleteProgramIteration(id);
        }
    }

    const checkEditIsInvalid = () => {
        if (name.trim() === "") { return true; }
        return false;
    }

    const getAddOrEditTitle = () => {
        if (isAdding) { return "Add"; }
        if (isEditing) { return "Edit"; }
        return "?";
    }

    const CancelAddOrEdit = () => {
        setIsAdding(false);
        setIsEditing(false);
    }

    const filterAsInteger = (x: string): number => {
        if(parseInt(x)) {
            return parseInt(x);
        } else {
            return 0;
        }
    }

    return (
        <div>

            {(isAdding || isEditing) &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>{getAddOrEditTitle()} a Program Iteration</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Iteration Name</b></td>
                                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Start Date</b></td>
                                    <td><DatePicker onChange={(date: Date) => setStartDate(date)} value={startDate} clearIcon={null} /></td>
                                </tr>
                                <tr>
                                    <td><b>Length (days)</b></td>
                                    <td><input type="text" value={lengthInDays} onChange={(e) => setLengthInDays(filterAsInteger(e.target.value))} className="percentInput"></input></td>
                                </tr>
                                <tr>
                                    <td><b>Points</b></td>
                                    <td><input type="text" value={points} onChange={(e) => setPoints(filterAsInteger(e.target.value))} className="percentInput"></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            {isAdding &&
                                <button onClick={saveAddProgramIteration} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Save</button>
                            }
                            {isEditing &&
                                <button onClick={() => saveEditProgramIteration()} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Update</button>
                            }
                            <button onClick={CancelAddOrEdit} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getProgramIterationElements()}
                </>
            }

            {!isAdding && !isEditing &&
                <div><button onClick={(e) => startAdd()} className="bigButton">Add Program Iteration</button></div>
            }

            {/* <div><pre>{JSON.stringify(props.programIterations, null, 2)}</pre></div> */}

        </div>
    )

}

export default ProgramIterations;