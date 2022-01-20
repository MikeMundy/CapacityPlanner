import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { ILocationHoliday } from "../../interfaces/Interfaces";

export interface IProps {
    locationHoliday: ILocationHoliday;
    onSaveEditLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onCancel: () => void;
}

const EditLocationHoliday: React.FC<IProps> = (props: IProps) => {

    const [name, setName] = useState(props.locationHoliday.name);
    const [holidayDate, setHolidayDate] = useState(props.locationHoliday.date);

    const saveEditLocationHoliday = () => {
        const updatedHoliday = { ...props.locationHoliday };
        updatedHoliday.name = name;
        updatedHoliday.date = holidayDate;
        props.onSaveEditLocationHoliday(updatedHoliday);
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
                <CardHeader title="Edit Holiday"></CardHeader>
                <CardContent>
                    <TextField id="holidayname" fullWidth label="Holiday" variant="standard" required onChange={(e) => setName(e.target.value)} value={name} inputProps={{ maxLength: 50 }}/>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <DatePicker onChange={(date: Date) => setHolidayDate(date)} value={holidayDate} clearIcon={null} format="dd MMM y"/>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" disabled={name.trim() === ""} onClick={(e) => saveEditLocationHoliday()}>Update</Button>
                    <Button variant="outlined" size="small" onClick={(e) => props.onCancel()}>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    )

}

export default EditLocationHoliday;