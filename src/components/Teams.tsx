import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ITeam } from "../interfaces/Interfaces";

export interface IProps {
    teams: ITeam[];
    addTeam: (team: ITeam) => void;
    editTeam: (team: ITeam) => void;
    deleteTeam: (id: number) => void;
}

const Teams: React.FC<IProps> = (props: IProps) => {

    const nullTeam: ITeam = { id: -1, name: "" }

    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [teamEdited, setTeamEdited] = useState(nullTeam);

    const getTeamsElements = () => {

        if (props.teams.length === 0) { return <p>There are currently no teams.</p> }

        const sorter = (t1: ITeam, t2: ITeam): number => {
            return t1.name < t2.name ? -1 : 1;
        };

        const output = props.teams.sort(sorter).map((t) =>
            <tr key={t.id}>
                {/* <td>{t.id}</td> */}
                <td>{t.name}</td>
                <td><Button variant="outlined" size="small" onClick={(e) => beginEditTeam(t)}>Edit</Button></td>
                <td><Button variant="outlined" size="small" onClick={(e) => deleteTeam(t.id)}>Delete</Button></td>
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

    const addTeam = () => {
        const maxId = props.teams.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const newTeam: ITeam = { id: maxId + 1, name: name.trim() };
        props.addTeam(newTeam);
        setName("");
        setIsAdding(false);
    }

    const beginEditTeam = (team: ITeam) => {
        setTeamEdited(team);
        setIsEditing(true);
        setEditName(team.name);
    }

    const editTeam = () => {
        const updatedTeam: ITeam = { ...teamEdited };
        updatedTeam.name = editName;
        props.editTeam(updatedTeam);
        setName("");
        setIsEditing(false);
    }

    const deleteTeam = (id: number) => {
        if (window.confirm('Are you sure that you want to delete this Team?')) { // tslint:disable-line
            props.deleteTeam(id);
        }
    }

    const cancelAdd = () => {
        setIsAdding(false);
        setName("");
    }

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Teams
            </Typography>


            {!isAdding && !isEditing &&
                <div><Button variant="contained" onClick={(e) => setIsAdding(true)} className="bigButton">Add Team</Button></div>
            }
            {isAdding &&
                <Box display="inline-block">
                    <Card
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <CardHeader title="Add Team"></CardHeader>
                        <CardContent>
                            <TextField id="username" label="Team Name" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={addTeam} disabled={name.trim() === ""} >Add</Button>
                            <Button variant="outlined" onClick={cancelAdd} >Cancel</Button>
                        </CardActions>
                    </Card>
                </Box>
            }

            {!isEditing && !isAdding &&
                <>
                    {getTeamsElements()}
                </>
            }

            {isEditing &&
                <Box display="inline-block">
                    <Card
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <CardHeader title="Edit Team"></CardHeader>
                        <CardContent>
                            <TextField id="username" label="Team Name" variant="standard" required value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={editTeam} disabled={editName.trim() === ""} >Update</Button>
                            <Button variant="outlined" onClick={(e) => setIsEditing(false)} >Cancel</Button>
                        </CardActions>
                    </Card>
                </Box>
            }

        </div>
    )

}

export default Teams;