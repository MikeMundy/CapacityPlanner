import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import React, { useState } from "react";
import { ILocation, ILocationHoliday } from "../../interfaces/Interfaces";
import ListHolidays from "./ListHolidays";

export interface IProps {
    location: ILocation;
    locationHolidays: ILocationHoliday[];
    onSaveEditLocation: (location: ILocation) => void;
    onCancel: () => void;

    onBeginAddNewLocationHoliday: () => void;
    onSaveNewLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onEditLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onDeleteLocationHoliday: (locationHoliday: ILocationHoliday) => void;
}

const EditLocation: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState(props.location.name);

    const editLocation = () => {
        const updatedLocation = {...props.location};
        updatedLocation.name = name;
        props.onSaveEditLocation(updatedLocation);
    }

    const editLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.onEditLocationHoliday(locationHoliday);
    }

    const deleteLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.onDeleteLocationHoliday(locationHoliday);
    }

    const addLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.onSaveNewLocationHoliday(locationHoliday);
    }

    return (
        <Box display="inline-block">
        <Card
            component="form"
            noValidate
            autoComplete="off"
        >
            <CardHeader title="Edit Location"></CardHeader>
            <CardContent>
                <TextField id="location" label="Location" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} />
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={editLocation} disabled={name.trim() === ""}  >Update</Button>
                <Button variant="outlined" onClick={props.onCancel} >Cancel</Button>
            </CardActions>
            <CardContent>
                <ListHolidays 
                    location={props.location} 
                    locationHolidays={props.locationHolidays} 
                    onBeginAddNewLocationHoliday={props.onBeginAddNewLocationHoliday}
                    onEditLocationHoliday={editLocationHoliday}
                    onDeleteLocationHoliday={deleteLocationHoliday}
                    onAddLocationHoliday={addLocationHoliday}
                />
            </CardContent>
        </Card>
    </Box>
    )

}

export default EditLocation;