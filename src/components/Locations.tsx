import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
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
                <td><Button variant="outlined" size="small" onClick={(e) => beginEditLocation(l)}>Edit</Button></td>
                <td><Button variant="outlined" size="small" onClick={(e) => deleteLocation(l.id)}>Delete</Button></td>
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
        setIsEditingLocHoliday(false);
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

    const cancelMain = () => {
        setIsEditing(false);
        setIsEditingLocHoliday(false);
        setIsAdding(false);
        setIsAddingLocHoliday(false);
    }

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Locations & Holidays
            </Typography>

            <Typography variant="body1" gutterBottom>

                {!isAdding && !isEditing &&
                    <div><Button variant="contained" onClick={(e) => setIsAdding(true)} className="bigButton">Add Location</Button></div>
                }

                {isAdding &&
                    <Box display="inline-block">
                        <Card
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <CardHeader title="Add Location"></CardHeader>
                            <CardContent>
                                <TextField id="location" label="Location" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} />
                            </CardContent>
                            <CardContent>
                                <Chip label="Edit this location to add Holidays" size="small" />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={addLocation} disabled={name.trim() === ""}  >Add</Button>
                                <Button variant="outlined" onClick={cancelAdd} >Cancel</Button>
                            </CardActions>
                        </Card>
                    </Box>
                }

                {!isEditing && !isAdding &&
                    <>
                        {getLocationsElements()}
                    </>
                }

                {isEditing &&
                    <>
                        <Box display="inline-block">
                            <Card
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <CardHeader title="Edit Location"></CardHeader>
                                <CardContent>
                                    <Stack>
                                        <TextField id="location" label="Location" variant="standard" required value={editName} onChange={(e) => setEditName(e.target.value)} />
                                        <h5>Holidays</h5>
                                        <div>
                                            {!isEditingLocHoliday && !isAddingLocHoliday &&
                                                <>
                                                    {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).length > 0 &&
                                                        <table className="formTable marginBottom10">
                                                            {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).sort(dateSort).map((lh) =>
                                                                <tr>
                                                                    <td>{lh.name}</td>
                                                                    <td>{dateDisplay(lh.date)}</td>
                                                                    <td><Button variant="outlined" size="small" onClick={(e) => editLocationHoliday(lh)}>Edit</Button></td>
                                                                    <td><Button variant="outlined" size="small" onClick={(e) => deleteLocationHoliday(lh)}>Delete</Button></td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    }
                                                    {locationHolidays.filter((lh) => lh.locationId === locationEdited.id).length <= 0 &&
                                                        <div className="marginBottom10">No holidays have been created for this location.</div>
                                                    }
                                                    <div>
                                                        <Button variant="outlined" onClick={(e) => addLocHoliday()}>Add Holiday</Button>
                                                    </div>
                                                </>
                                            }

                                            {isEditingLocHoliday &&
                                                <Box>
                                                    <Card
                                                        component="form"
                                                        noValidate
                                                        autoComplete="off"
                                                        sx={{ width: 400, overflow: "visible" }}
                                                        variant="outlined"
                                                    >
                                                        <CardHeader title="Edit Holiday"></CardHeader>
                                                        <CardContent>
                                                            <TextField id="holidayname" fullWidth label="Holiday" variant="standard" required onChange={(e) => onChangeLocHolidayEditedName(e.target.value)} value={locHolidayEdited.name} />
                                                        </CardContent>
                                                        <CardContent>
                                                            <FormControl>
                                                                <FormLabel>Date</FormLabel>
                                                                <DatePicker onChange={(date: Date) => onChangeLocHolidayEditedDate(date)} value={locHolidayEdited.date} clearIcon={null} />
                                                            </FormControl>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button variant="contained" size="small" disabled={locHolidayEdited.name.trim() === ""} onClick={(e) => updateLocHoliday()}>Update</Button>
                                                            <Button variant="outlined" size="small" onClick={(e) => cancelEditLocationHoliday()}>Cancel</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Box>
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

                                        </div>
                                    </Stack>
                                </CardContent>
                                {!isEditingLocHoliday && !isAddingLocHoliday &&
                                    <CardActions>
                                        <Button variant="contained" onClick={editLocation} disabled={editName.trim() === ""} >Update</Button>
                                        <Button variant="outlined" onClick={cancelMain} >Cancel</Button>
                                    </CardActions>
                                }
                            </Card>
                        </Box>

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
                                <button onClick={cancelMain} className="bigButton">Cancel</button>
                            </div>
                        </fieldset>
                    </>
                }

            </Typography>
        </div>
    )

}

export default Locations;