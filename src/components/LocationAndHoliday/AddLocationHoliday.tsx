import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { ILocation, ILocationHoliday } from "../../interfaces/Interfaces";

export interface IProps {
    location: ILocation;
    onAddLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onCancel: () => void;
}

const AddLocationHoliday: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState("");
    const [holidayDate, setHolidayDate] = useState(new Date());

    const addLocationHoliday = () => {

        const newLocationHoliday: ILocationHoliday = {
            id: -1,
            locationId: props.location.id,
            name: name,
            date: holidayDate
        }
        props.onAddLocationHoliday(newLocationHoliday);
    }

    return (
        <Box>
            <Card
                component="form"
                noValidate
                autoComplete="off"
                sx={{ width: 400, overflow: "visible" }}
                variant="outlined"
            >
                <CardHeader title="Add Holiday"></CardHeader>
                <CardContent>
                    <TextField id="holidayname" fullWidth label="Holiday" variant="standard" required onChange={(e) => setName(e.target.value)} value={name} />
                </CardContent>
                <CardContent>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <DatePicker onChange={(date: Date) => setHolidayDate(date)} value={holidayDate} clearIcon={null} />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" disabled={name.trim() === ""} onClick={(e) => addLocationHoliday()}>Save</Button>
                    <Button variant="outlined" size="small" onClick={(e) => props.onCancel()}>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    )

}

export default AddLocationHoliday;