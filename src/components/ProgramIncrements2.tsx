import React, { useState } from "react";
import { IProgramIncrement2, IIteration2 } from "../interfaces/Interfaces";
import ProgramIterations from "./ProgramIterations";

export interface IProps {
    programIncrements: IProgramIncrement2[];
    programIterations: IIteration2[];
    setProgramIncrementId: (id: number) => void;
    addProgramIncrement: (programIncrement: IProgramIncrement2) => void;
    editProgramIncrement: (programIncrement: IProgramIncrement2) => void;
    deleteProgramIncrement: (id: number) => void;
    addProgramIteration: (programIteration: IIteration2) => void;
    editProgramIteration: (programIteration: IIteration2) => void;
    deleteProgramIteration: (id: number) => void;
}

const ProgramIncrements2: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState("");

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [programIncrementId, setProgramIncrementId] = useState(-1);

    const getProgramIncrementElements = () => {

        if (props.programIncrements.length === 0) { return <p>There are currently no Program Increments.</p> }

        const sorter = (pi1: IProgramIncrement2, pi2: IProgramIncrement2): number => {
            return pi1.name < pi2.name ? -1 : 1;
        };

        const output = props.programIncrements.sort(sorter).map((t) =>
            <tr key={t.id}>
                <td>{t.name}</td>
                <td><button onClick={(e) => startEdit(t.id)}>Edit</button></td>
                <td><button onClick={(e) => deleteProgramIncrement(t.id)}>Delete</button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
                    <tr>
                        <th>PI Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {output}
                </tbody>
            </table>
        );
    }

    const startAdd = () => {
        setName("");
        setIsAdding(true);
    }

    const saveAddProgramIncrement = () => {
        const maxId = props.programIncrements.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const newPI: IProgramIncrement2 = { id: maxId + 1, name: name };
        props.addProgramIncrement(newPI);
        setIsAdding(false);
    }

    const startEdit = (id: number) => {
        setProgramIncrementId(id);
        props.setProgramIncrementId(id);
        const pi = props.programIncrements.find((pi) => pi.id === id);
        if (pi) {
            setName(pi.name);

            setIsEditing(true);
        }
    }

    const saveEditProgramIncrement = () => {
        const pi = props.programIncrements.find((pi) => pi.id === programIncrementId);
        if (pi) {
            pi.name = name;
            props.editProgramIncrement(pi);
            setIsEditing(false);
        }
    }

    const deleteProgramIncrement = (id: number) => {
        if (window.confirm('Are you sure that you want to delete this Program Increment and all its Iterations?')) { // tslint:disable-line
            props.deleteProgramIncrement(id);
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

    return (
        <div>
            <h2>Program Increments</h2>

            {!isAdding && !isEditing &&
                <div><button onClick={(e) => startAdd()} className="bigButton">Add Program Increment</button></div>
            }

            {(isAdding || isEditing) &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>{getAddOrEditTitle()} a Program Increment</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>PI Name</b></td>
                                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Iterations</b></td>
                                    {isAdding &&
                                        <td>Edit to add Iterations after saving this new PI</td>
                                    }
                                    {isEditing &&
                                        <td><ProgramIterations programIncrementId={programIncrementId} programIterations={props.programIterations} addProgramIteration={props.addProgramIteration} editProgramIteration={props.editProgramIteration} deleteProgramIteration={props.deleteProgramIteration} /></td>
                                    }
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            {isAdding &&
                                <button onClick={saveAddProgramIncrement} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Save</button>
                            }
                            {isEditing &&
                                <button onClick={() => saveEditProgramIncrement()} disabled={checkEditIsInvalid()} className="bigButton rightMargin">Save</button>
                            }
                            <button onClick={CancelAddOrEdit} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getProgramIncrementElements()}
                </>
            }

            {/* <div>ProgramIncrements2, programIncrementId: {programIncrementId}</div>
            <div>ProgramIncrements2, props.programIterations:  <pre>{JSON.stringify(props.programIterations, null, 2)}</pre></div> */}

        </div>
    )

}

export default ProgramIncrements2;