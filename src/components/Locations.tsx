import React, { useState } from "react";
import DatePicker from 'react-date-picker';

import { ILocation, ILocationHoliday } from "../interfaces/Interfaces";

export interface IProps {
    locations: ILocation[];
    locationHolidays: ILocationHoliday[];
    addLocation: (location: ILocation) => void;
    editLocation: (location: ILocation, locationHolidays: ILocationHoliday[]) => void;
    deleteLocation: (id: number) => void;
}

const Locations: React.FC<IProps> = (props: IProps) => {

    const nullLocation: ILocation = { id: -1, name: "" };
    const nullLocHoliday: ILocationHoliday = { id: -1, locationId: -1, name: "", date: new Date() };

    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");

    const [locationHolidays, setLocationHolidays] = useState(props.locationHolidays);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [locationEdited, setLocationEdited] = useState(nullLocation);

    const [locHolidayEdited, setLocHolidayEdited] = useState(nullLocHoliday);
    const [isEditingLocHoliday, setIsEditingLocHoliday] = useState(false);
    const [isAddingLocHoliday, setIsAddingLocHoliday] = useState(false);

    const getLocationsElements = () => {

        if (props.locations.length === 0) { return <p>There are currently no locations.</p> }

        const sorter = (l1: ILocation, l2: ILocation): number => {
            return l1.name < l2.name ? -1 : 1;
        };

        const output = props.locations.sort(sorter).map((l) =>
            <tr key={l.id}>
                {/* <td>{l.id}</td> */}
                <td>{l.name}</td>
                <td><button onClick={(e) => beginEditLocation(l)}>Edit</button></td>
                <td><button onClick={(e) => deleteLocation(l.id)}>Delete</button></td>
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

    const addLocation = () => {
        const maxId = props.locations.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const newLocation: ILocation = { id: maxId + 1, name: name.trim() };
        props.addLocation(newLocation);
        setName("");
        setIsAdding(false);
    }

    const beginEditLocation = (location: ILocation) => {
        setLocationEdited(location);
        setIsEditing(true);
        setEditName(location.name);
    }

    const editLocation = () => {
        const updatedLocation: ILocation = { ...locationEdited };

        let updatedLocationHolidays: ILocationHoliday[] = [...locationHolidays];
        updatedLocationHolidays = updatedLocationHolidays.filter((lh) => lh.locationId === locationEdited.id)

        updatedLocation.name = editName;
        props.editLocation(updatedLocation, updatedLocationHolidays);
        setName("");
        setIsEditing(false);
        setIsAddingLocHoliday(false);
        setIsEditingLocHoliday(false);
    }

    const deleteLocation = (id: number) => {
        if (window.confirm('Are you sure that you want to delete this Location?')) { // tslint:disable-line
            props.deleteLocation(id);
        }
    }

    const cancelAdd = () => {
        setIsAdding(false);
        setName("");
    }

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear();
    }

    const dateSort = (d1: ILocationHoliday, d2: ILocationHoliday) => {
        return d1.date > d2.date ? 1 : -1;
    }

    const deleteLocationHoliday = (locHoliday: ILocationHoliday) => {
        let updatedLocationHolidays = [...locationHolidays];
        updatedLocationHolidays = updatedLocationHolidays.filter((lh) => lh.id !== locHoliday.id);
        setLocationHolidays(updatedLocationHolidays);
    }

    const editLocationHoliday = (locHoliday: ILocationHoliday) => {
        const updatedLocHoliday = { ...locHoliday };
        setLocHolidayEdited(updatedLocHoliday);
        setIsEditingLocHoliday(true);
    }

    const cancelEditLocationHoliday = () => {
        setIsEditingLocHoliday(false);
    }

    const onChangeLocHolidayEditedName = (name: string) => {
        const updatedLocHoliday = { ...locHolidayEdited };
        updatedLocHoliday.name = name;
        setLocHolidayEdited(updatedLocHoliday);
    }

    const onChangeLocHolidayEditedDate = (date: Date) => {
        const updatedLocHoliday = { ...locHolidayEdited };
        updatedLocHoliday.date = date;
        setLocHolidayEdited(updatedLocHoliday);
    }

    const updateLocHoliday = () => {
        const updatedLocHolidays = [...locationHolidays];
        const thisLocHoliday = updatedLocHolidays.find((lh) => lh.id === locHolidayEdited.id);
        if (thisLocHoliday) {
            thisLocHoliday.name = locHolidayEdited.name;
            thisLocHoliday.date = locHolidayEdited.date;
            setLocationHolidays(updatedLocHolidays);
        }
        setIsEditingLocHoliday(false);
    }

    const addLocHoliday = () => {
        setLocHolidayEdited(nullLocHoliday);
        setIsAddingLocHoliday(true);
    }

    const addNewLocHoliday = () => {
        const updatedLocHolidays = [...locationHolidays];
        const maxId = props.locationHolidays.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const newLocHol: ILocationHoliday = { id: maxId + 1, locationId: locationEdited.id, name: locHolidayEdited.name, date: locHolidayEdited.date };
        updatedLocHolidays.push(newLocHol)
        setLocationHolidays(updatedLocHolidays);
        setIsAddingLocHoliday(false);
    }

    const cancelAddLocationHoliday = () => {
        setIsAddingLocHoliday(false);
    }

    return (
        <div>
            <h2>Locations & Holidays</h2>

            {!isAdding && !isEditing &&
                <div><button onClick={(e) => setIsAdding(true)} className="bigButton">Add Location</button></div>
            }
            {isAdding &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Add a Location</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Location</b></td>
                                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={addLocation} disabled={name.trim() === ""} className="bigButton rightMargin">Add</button>
                            <button onClick={cancelAdd} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }

            {!isEditing && !isAdding &&
                <>
                    {getLocationsElements()}
                </>
            }

            {isEditing &&
                <>
                    <fieldset className="inlineBlock pad10">
                        <legend><h3>Edit a Location</h3></legend>
                        <table className="formTable">
                            <tbody>
                                <tr>
                                    <td><b>Location</b></td>
                                    <td><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><b>Holidays:</b></td>
                                    <td>
                                        {!isEditingLocHoliday && !isAddingLocHoliday &&
                                            <>
                                                {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).length > 0 &&
                                                    <table className="formTable marginBottom10">
                                                        {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).sort(dateSort).map((lh) =>
                                                            <tr>
                                                                <td>{lh.name}</td>
                                                                <td>{dateDisplay(lh.date)}</td>
                                                                <td><button onClick={(e) => editLocationHoliday(lh)}>Edit</button></td>
                                                                <td><button onClick={(e) => deleteLocationHoliday(lh)}>Delete</button></td>
                                                            </tr>
                                                        )}
                                                    </table>
                                                }
                                                {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).length <= 0 &&
                                                    <div className="marginBottom10">No holidays have been created for this location.</div>
                                                }
                                                <div>
                                                    <button onClick={(e) => addLocHoliday()}>Add Holiday</button>
                                                </div>
                                            </>
                                        }

                                        {isEditingLocHoliday &&
                                            <fieldset className="inlineBlock pad10">
                                                <legend><b>Edit Holiday</b></legend>

                                                <table className="formTable">
                                                    <tr>
                                                        <td>Name:</td>
                                                        <td><input type="text" onChange={(e) => onChangeLocHolidayEditedName(e.target.value)} value={locHolidayEdited.name}></input></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date:</td>
                                                        <td><DatePicker onChange={(date: Date) => onChangeLocHolidayEditedDate(date)} value={locHolidayEdited.date} clearIcon={null} /></td>
                                                    </tr>
                                                </table>
                                                <div>
                                                    <button className="rightMargin" disabled={locHolidayEdited.name.trim() === ""} onClick={(e) => updateLocHoliday()}>Update</button>
                                                    <button onClick={(e) => cancelEditLocationHoliday()}>Cancel</button>
                                                </div>

                                            </fieldset>
                                        }

                                        {isAddingLocHoliday &&
                                            <fieldset className="inlineBlock pad10">
                                                <legend><b>Add Holiday</b></legend>

                                                <table className="formTable">
                                                    <tr>
                                                        <td>Name:</td>
                                                        <td><input type="text" onChange={(e) => onChangeLocHolidayEditedName(e.target.value)} value={locHolidayEdited.name}></input></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date:</td>
                                                        <td><DatePicker onChange={(date: Date) => onChangeLocHolidayEditedDate(date)} value={locHolidayEdited.date} clearIcon={null} /></td>
                                                    </tr>
                                                </table>
                                                <div>
                                                    <button className="rightMargin" onClick={(e) => addNewLocHoliday()} disabled={locHolidayEdited.name.trim() === ""}>Save</button>
                                                    <button onClick={(e) => cancelAddLocationHoliday()}>Cancel</button>
                                                </div>

                                            </fieldset>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="right">
                            <button onClick={editLocation} disabled={editName.trim() === ""} className="bigButton rightMargin">Update</button>
                            <button onClick={(e) => setIsEditing(false)} className="bigButton">Cancel</button>
                        </div>
                    </fieldset>
                </>
            }
        </div>
    )

}

export default Locations;