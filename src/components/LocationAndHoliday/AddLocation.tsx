import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, TextField} from "@mui/material";
import React, { useState } from "react";
import { ILocation } from "../../interfaces/Interfaces";

export interface IProps {
    onSaveNewLocation: (location: ILocation) => void;
    onCancel: () => void;
}

const AddLocation: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState("");

    const addLocation = () => {
        const newLocation: ILocation = { id: -1, name: name };
        props.onSaveNewLocation(newLocation);
    }

    return (
        <Box display="inline-block">
            <Card
                component="form"
                noValidate
                autoComplete="off"
            >
                <CardHeader title="Add Location"></CardHeader>
                <CardContent>
                    <TextField id="location" label="Location" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} inputProps={{ maxLength: 50 }}/>
                </CardContent>
                <CardContent>
                    <Chip label="Edit this location to add Holidays" size="small" />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={addLocation} disabled={name.trim() === ""}  >Add</Button>
                    <Button variant="outlined" onClick={props.onCancel} >Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    )

}

export default AddLocation;