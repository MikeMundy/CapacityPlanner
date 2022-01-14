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
                <td><button onClick={(e) => beginEditTeam(t)}>Edit</button></td>
                <td><button onClick={(e) => deleteTeam(t.id)}>Delete</button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
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
            <h2>Teams</h2>

            {!isAdding && !isEditing &&
                <div><button onClick={(e) => setIsAdding(true)} className="bigButton">Add Team</button></div>
            }
            {isAdding &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Add a Team</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Team Name</b></td>
                                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={addTeam} disabled={name.trim() === ""} className="bigButton rightMargin">Add</button>
                            <button onClick={cancelAdd} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getTeamsElements()}
                </>
            }

            {isEditing &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Edit a Team</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Team Name</b></td>
                                    <td><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={editTeam} disabled={editName.trim() === ""} className="bigButton rightMargin">Update</button>
                            <button onClick={(e) => setIsEditing(false)} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }
        </div>
    )

}

export default Teams;