import React, { useState } from "react";
import { ILocation, IPersonBasic, IPersonTeam, ITeam, IInTeam } from "../interfaces/Interfaces";

export interface IProps {
    personsBasic: IPersonBasic[];
    personTeams: IPersonTeam[];
    teams: ITeam[];
    locations: ILocation[];
    addPerson: (person: IPersonBasic, personTeams: IPersonTeam[]) => void;
    editPerson: (person: IPersonBasic, personTeams: IPersonTeam[]) => void;
    deletePerson: (id: number) => void;
}

const People: React.FC<IProps> = (props: IProps) => {

    const nullPerson: IPersonBasic = { id: -1, firstName: "", lastName: "", locationId: -1 }
    let nullPersonTeams: IInTeam[] = [];

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [locationId, setLocationId] = useState(-1);

    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editLocationId, setEditLocationId] = useState(-1);
    const [thisPersonsTeams, setThisPersonsTeams] = useState(nullPersonTeams);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [personEdited, setPersonEdited] = useState(nullPerson);

    const getPersonsElements = () => {

        if (props.personsBasic.length === 0) { return <p>There are currently no people.</p> }

        const sorter = (p1: IPersonBasic, p2: IPersonBasic): number => {
            if (p1.lastName === p2.lastName) {
                return p1.firstName < p2.firstName ? -1 : 1
            }
            return p1.lastName < p2.lastName ? -1 : 1;
        };

        const displayPersonTeams = (p: IPersonBasic) => {
            const sorter = (t1: ITeam, t2: ITeam) => t1.name < t2.name ? -1 : 1;

            const thisPersonsTeamIds = props.personTeams.filter((pt) => pt.personId === p.id);
            const thisPersonsTeamNames = props.teams.sort(sorter).filter((t) => thisPersonsTeamIds.find((i) => i.teamId === t.id));

            const showPercent = (percent: number | undefined) => {
                if (percent) {
                    return percent?.toString();
                }
                return;
            }

            const teamRoles = thisPersonsTeamNames.map((n) => <div id={"n" + n.id} className="marBottom5">{n.name} ({thisPersonsTeamIds.filter((ptr) => ptr.teamId === n.id).map((r) => <span id={r.role + r.teamId} >{r.role.trim() === "" ? "no role" : r.role}</span>)})<span className="floatRight">&nbsp;{showPercent(thisPersonsTeamIds.find((ptr) => ptr.teamId === n.id)?.percentage)}%</span></div>);
            return <>{teamRoles}</>;
        }

        const displayPersonLocation = (p: IPersonBasic) => {
            const location = props.locations.find((l) => l.id === p.locationId);
            if (location) {
                return location.name
            } else {
                return "?";
            }
        }

        const confirmDeletePerson = (id: number) => {
            if (window.confirm("Are you sure that you want to delete this person?")) { // tslint:disable-line
                deletePerson(id)
            };
        }

        const output = props.personsBasic.sort(sorter).map((p) =>
            <tr key={p.id}>
                {/* <td>{p.id}</td> */}
                <td>{p.lastName}</td>
                <td>{p.firstName}</td>
                <td>{displayPersonLocation(p)}</td>
                <td>{displayPersonTeams(p)}</td>
                <td><button onClick={(e) => beginEditPerson(p)}>Edit</button></td>
                <td><button onClick={(e) => confirmDeletePerson(p.id)}>Delete</button></td>
            </tr>
        )
        return (
            <table className="capTable">
                <tbody>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Location</th>
                        <th>Team (Role) & Avail.</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {output}
                </tbody>
            </table>
        );
    }

    const beginAddPerson = () => {
        setIsAdding(true);
        setThisPersonsTeams([]);
        setFirstName("");
        setLastName("");

        let addPersonTeams: IInTeam[] = [];
        props.teams.forEach((t) => {
            addPersonTeams.push({ teamId: t.id, inTeam: false, role: "", percentage: 100 });
        })
        setThisPersonsTeams(addPersonTeams);
    }

    const addPerson = () => {
        const maxId = props.personsBasic.reduce((acc, p) => acc = acc > p.id ? acc : p.id, 0);
        const newPerson: IPersonBasic = { id: maxId + 1, firstName: firstName.trim(), lastName: lastName.trim(), locationId: locationId };

        const isNullPercent = (percent: number | null) => {
            if (percent === null) { return 100; }
            return percent;
        }

        let personTeams: IPersonTeam[] = [];
        thisPersonsTeams.forEach((pt) => {
            if (pt.inTeam) {
                personTeams.push({ teamId: pt.teamId, personId: newPerson.id, role: pt.role, percentage: isNullPercent(pt.percentage) });
            }
        })

        props.addPerson(newPerson, personTeams);

        setFirstName("");
        setLastName("");
        setLocationId(-1);
        setIsAdding(false);
    }

    const beginEditPerson = (personBasic: IPersonBasic) => {
        setPersonEdited(personBasic);
        setIsEditing(true);
        setEditFirstName(personBasic.firstName);
        setEditLastName(personBasic.lastName);
        setEditLocationId(personBasic.locationId);

        const thisPersonsTeams: IInTeam[] = [];

        props.teams.forEach((t) => {
            let roleInTeam = "";
            let percentageInTeam = 100;
            let inTeam = false;
            const thisTeam = props.personTeams.find((pt) => pt.personId === personBasic.id && pt.teamId === t.id);
            if (thisTeam) {
                roleInTeam = thisTeam.role;
                percentageInTeam = thisTeam.percentage;
                inTeam = true;
            }

            thisPersonsTeams.push({ teamId: t.id, inTeam: inTeam, role: roleInTeam, percentage: percentageInTeam });
        })

        setThisPersonsTeams(thisPersonsTeams);
    }

    const editPerson = () => {
        const updatedPerson: IPersonBasic = { ...personEdited };
        updatedPerson.firstName = editFirstName;
        updatedPerson.lastName = editLastName;
        updatedPerson.locationId = editLocationId;

        let personTeams: IPersonTeam[] = [];

        thisPersonsTeams.forEach((pt) => {
            if (pt.inTeam) {
                personTeams.push({ teamId: pt.teamId, personId: personEdited.id, role: pt.role, percentage: pt.percentage });
            }
        })
        props.editPerson(updatedPerson, personTeams);

        setFirstName("");
        setLastName("");
        setIsEditing(false);
    }

    const deletePerson = (id: number) => {
        props.deletePerson(id);
    }

    const isInTeam = (team: ITeam): boolean => {
        const index = thisPersonsTeams.findIndex((t) => t.teamId === team.id && t.inTeam === true);
        return index > -1;
    }

    const changeIsInTeam = (isInTeam: boolean, team: ITeam) => {
        let updatedPersonsTeams = [...thisPersonsTeams];
        const index = updatedPersonsTeams.findIndex((pt) => pt.teamId === team.id);
        updatedPersonsTeams[index].inTeam = isInTeam;
        setThisPersonsTeams(updatedPersonsTeams);
    }

    const changeRoleInTeam = (role: string, team: ITeam) => {
        let updatedPersonsTeams = [...thisPersonsTeams];
        const index = updatedPersonsTeams.findIndex((pt) => pt.teamId === team.id);
        updatedPersonsTeams[index].role = role;
        setThisPersonsTeams(updatedPersonsTeams);
    }

    const getRoleInTeam = (team: ITeam) => {
        // console.log("team: " + JSON.stringify(team));
        // console.log("thisPersonsTeams: " + JSON.stringify(thisPersonsTeams));
        const role = thisPersonsTeams.find((pt) => pt.teamId === team.id)?.role;
        // console.log("role: " + JSON.stringify(role));
        if (role) { return role; }
        return "";
    }

    const getPercentInTeam = (team: ITeam) => {
        const percent = thisPersonsTeams.find((pt) => pt.teamId === team.id)?.percentage;
        if (percent) { return percent; }
        return "";
    }

    const changePercentInTeam = (percent: string, team: ITeam) => {
        let updatedPersonsTeams = [...thisPersonsTeams];
        const index = updatedPersonsTeams.findIndex((pt) => pt.teamId === team.id);
        if (parseInt(percent)) {
            updatedPersonsTeams[index].percentage = parseInt(percent);
        } else {
            updatedPersonsTeams[index].percentage = 100;
        }
        setThisPersonsTeams(updatedPersonsTeams);
    }

    return (
        <div>
            <h2>People</h2>

            {!isAdding && !isEditing &&
                <>
                    <div><button onClick={(e) => beginAddPerson()} className="bigButton">Add Person</button></div>
                    {getPersonsElements()}
                </>
            }

            {!isEditing && isAdding &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Add Person</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>First Name</b></td>
                                    <td><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Last Name</b></td>
                                    <td><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Location</b></td>
                                    <td>
                                        <select value={locationId} onChange={(e) => setLocationId(parseInt(e.target.value))}>
                                            <option value={-1}>-- select --</option>
                                            {props.locations.map((l) => <option value={l.id}>{l.name}</option>)}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Teams</b></td>
                                    <td>
                                        {props.teams.length > 0 &&
                                            <table className="formTable">
                                                <tbody>
                                                    <tr>
                                                        <th className="left">Team</th>
                                                        <th>In Team?</th>
                                                        <th>Role in team</th>
                                                        <th>%</th>
                                                    </tr>
                                                    {props.teams.map((t) =>
                                                        <tr key={"ta" + t.id}>
                                                            <td>{t.name}</td>
                                                            <td className="center"><input type="checkbox" checked={isInTeam(t)} onChange={(e) => changeIsInTeam(e.target.checked, t)}></input></td>
                                                            <td>
                                                                {isInTeam(t) &&
                                                                    <input type="text" value={getRoleInTeam(t)} onChange={(e) => changeRoleInTeam(e.target.value, t)}></input>
                                                                }
                                                                {!isInTeam(t) &&
                                                                    <>n/a</>
                                                                }
                                                            </td>
                                                            <td>
                                                                {isInTeam(t) &&
                                                                    <input type="text" value={getPercentInTeam(t)} onChange={(e) => changePercentInTeam(e.target.value, t)} className="percentInput"></input>
                                                                }
                                                                {!isInTeam(t) &&
                                                                    <>n/a</>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        }

                                        {props.teams.length <= 0 &&
                                            <span>There are currently no teams set up.</span>
                                        }

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={addPerson} disabled={firstName.trim() === "" || lastName.trim() === ""} className="bigButton rightMargin">Add</button>
                            <button onClick={(e) => setIsAdding(false)} className="bigButton">Cancel</button>
                        </div>

                    </fieldset>
                </>
            }

            {isEditing &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Edit Person</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>First Name</b></td>
                                    <td><input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Last Name</b></td>
                                    <td><input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Location</b></td>
                                    <td>
                                        <select value={editLocationId} onChange={(e) => setEditLocationId(parseInt(e.target.value))}>
                                            <option value={-1}>-- select --</option>
                                            {props.locations.map((l) => <option value={l.id}>{l.name}</option>)}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Teams</b></td>
                                    <td>

                                        {props.teams.length > 0 &&
                                            <table className="capTable">
                                                <tbody>
                                                    <tr>
                                                        <th className="left">Team</th>
                                                        <th>In Team?</th>
                                                        <th>Role in team</th>
                                                        <th>%</th>
                                                    </tr>
                                                    {props.teams.map((t) =>
                                                        <tr key={"t" + t.id}>
                                                            <td>{t.name}</td>
                                                            <td className="center"><input type="checkbox" checked={isInTeam(t)} onChange={(e) => changeIsInTeam(e.target.checked, t)}></input></td>
                                                            <td>
                                                                {isInTeam(t) &&
                                                                    <input type="text" value={getRoleInTeam(t)} onChange={(e) => changeRoleInTeam(e.target.value, t)}></input>
                                                                }
                                                                {!isInTeam(t) &&
                                                                    <>n/a</>
                                                                }
                                                            </td>
                                                            <td>
                                                                {isInTeam(t) &&
                                                                    <input type="text" value={getPercentInTeam(t)} onChange={(e) => changePercentInTeam(e.target.value, t)} className="percentInput"></input>
                                                                }
                                                                {!isInTeam(t) &&
                                                                    <>n/a</>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        }

                                        {props.teams.length <= 0 &&
                                            <span>There are currently no teams set up.</span>
                                        }

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={editPerson} disabled={editFirstName.trim() === "" || editLastName.trim() === ""} className="bigButton rightMargin">Update</button>
                            <button onClick={(e) => setIsEditing(false)} className="bigButton">Cancel</button>
                        </div>

                    </fieldset>
                </>
            }
        </div>
    )

}

export default People;