import { Box, Button, Card, CardContent, CardHeader, FormControl, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { IIteration } from "../interfaces/Interfaces";
import DatePicker from 'react-date-picker';

export interface IProps {
    programIncrementId: number;
    programIterations: IIteration[];
    addProgramIteration: (programIteration: IIteration) => void;
    editProgramIteration: (programIteration: IIteration) => void;
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

        if (props.programIterations.length === 0) { return <p>There are currently no Program Iterations.</p> }

        const sorter = (pi1: IIteration, pi2: IIteration): number => {
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
                <td><Button variant="outlined" size="small" onClick={(e) => startEdit(t.id)}>Edit</Button></td>
                <td><Button variant="outlined" size="small" onClick={(e) => deleteProgramIteration(t.id)}>Delete</Button></td>
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
        const newPI: IIteration = { id: -1, programIncrementId: props.programIncrementId, name: name, startDate: startDate, lengthInDays: lengthInDays, points: points };
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
        if (parseInt(x)) {
            return parseInt(x);
        } else {
            return 0;
        }
    }

    return (
        <div>

            {(isAdding || isEditing) &&
                <>
                    <Box display="inline-block">
                        <Card sx={{ width: 400, overflow: "visible" }}>
                            <CardHeader title={getAddOrEditTitle() + " a Program Iteration"} ></CardHeader>
                            <CardContent>
                                <TextField id="iteration" label="Iteration Name" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} inputProps={{ maxLength: 50 }}/>
                            </CardContent>
                            <CardContent>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <DatePicker onChange={(date: Date) => setStartDate(date)} value={startDate} clearIcon={null} format="dd MMM y"/>
                                </FormControl>
                            </CardContent>
                            <CardContent>
                                <TextField id="length" label="Length (days)" variant="standard" required value={lengthInDays} onChange={(e) => setLengthInDays(filterAsInteger(e.target.value))} inputProps={{ maxLength: 3 }}/>
                            </CardContent>
                            <CardContent>
                                <TextField id="points" label="Points" variant="standard" required value={points} onChange={(e) => setPoints(filterAsInteger(e.target.value))} inputProps={{ maxLength: 3 }}/>
                            </CardContent>
                            <CardContent>
                                {isAdding &&
                                    <Button variant="contained" onClick={saveAddProgramIteration} disabled={checkEditIsInvalid()}>Save</Button>
                                }
                                {isEditing &&
                                    <Button variant="contained" onClick={() => saveEditProgramIteration()} disabled={checkEditIsInvalid()}>Update</Button>
                                }
                                <Button variant="outlined" onClick={CancelAddOrEdit} className="bigButton">Cancel</Button>
                            </CardContent>
                        </Card>
                    </Box>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    <h3>Program Iterations</h3>
                    {getProgramIterationElements()}
                </>
            }

            {!isAdding && !isEditing &&
                <div><Button variant="outlined" onClick={(e) => startAdd()}>Add Program Iteration</Button></div>
            }

            {/* <div><pre>{JSON.stringify(props.programIterations, null, 2)}</pre></div> */}

        </div>
    )

}

export default ProgramIterations;