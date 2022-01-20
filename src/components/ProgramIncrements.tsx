import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { IProgramIncrement, IIteration } from "../interfaces/Interfaces";
import ProgramIterations from "./ProgramIterations";

export interface IProps {
    programIncrements: IProgramIncrement[];
    programIterations: IIteration[];
    setProgramIncrementId: (id: number) => void;
    addProgramIncrement: (programIncrement: IProgramIncrement) => void;
    editProgramIncrement: (programIncrement: IProgramIncrement) => void;
    deleteProgramIncrement: (id: number) => void;
    addProgramIteration: (programIteration: IIteration) => void;
    editProgramIteration: (programIteration: IIteration) => void;
    deleteProgramIteration: (id: number) => void;
}

const ProgramIncrements: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState("");

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [programIncrementId, setProgramIncrementId] = useState(-1);

    const getProgramIncrementElements = () => {

        if (props.programIncrements.length === 0) { return <p>There are currently no program increments.</p> }

        const sorter = (pi1: IProgramIncrement, pi2: IProgramIncrement): number => {
            return pi1.name < pi2.name ? -1 : 1;
        };

        const output = props.programIncrements.sort(sorter).map((t) =>
            <tr key={t.id}>
                <td>{t.name}</td>
                <td><Button variant="outlined" size="small" onClick={(e) => startEdit(t.id)}>Edit</Button></td>
                <td><Button variant="outlined" size="small" onClick={(e) => deleteProgramIncrement(t.id)}>Delete</Button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
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
        const newPI: IProgramIncrement = { id: maxId + 1, name: name };
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
            <Typography variant="h3" component="div" gutterBottom>
                Program Increments
            </Typography>

            {!isAdding && !isEditing &&
                <div><Button variant="contained" onClick={(e) => startAdd()}>Add Program Increment</Button></div>
            }

            {(isAdding || isEditing) &&
                <>
                    <Box display="inline-block">
                        <Card>
                            <CardHeader title={getAddOrEditTitle() + " Program Increment"} ></CardHeader>
                            <CardContent>
                                <TextField id="location" label="PI Name" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} inputProps={{ maxLength: 50 }}/>
                            </CardContent>
                            <CardActions>
                                {isAdding &&
                                    <Button variant="contained" onClick={saveAddProgramIncrement} disabled={checkEditIsInvalid()}>Save</Button>
                                }
                                {isEditing &&
                                    <Button variant="contained" onClick={() => saveEditProgramIncrement()} disabled={checkEditIsInvalid()}>Update</Button>
                                }
                                <Button variant="outlined" onClick={CancelAddOrEdit}>Cancel</Button>
                            </CardActions>
                            <CardContent>
                                {isAdding &&
                                    <Chip label="Edit this PI Increment to add Iterations" size="small" />
                                }
                                {isEditing &&
                                    <ProgramIterations programIncrementId={programIncrementId} programIterations={props.programIterations} addProgramIteration={props.addProgramIteration} editProgramIteration={props.editProgramIteration} deleteProgramIteration={props.deleteProgramIteration} />
                                }
                            </CardContent>
                        </Card>
                    </Box>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getProgramIncrementElements()}
                </>
            }

        </div >
    )

}

export default ProgramIncrements;