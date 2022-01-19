import React from "react";
import { Button} from "@mui/material";
import { ILocation, ILocationHoliday } from "../../interfaces/Interfaces";

export interface IProps {
    location: ILocation;
    locationHolidays: ILocationHoliday[];
    onBeginAddNewLocationHoliday: () => void;
    onEditLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onDeleteLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    onAddLocationHoliday: (locationHoliday: ILocationHoliday) => void;
}

const ListHolidays: React.FC<IProps> = (props: IProps) => {

    const locationHolidays = props.locationHolidays.filter((lh) => lh.locationId === props.location.id);

    const dateSort = (d1: ILocationHoliday, d2: ILocationHoliday) => {
        return d1.date > d2.date ? 1 : -1;
    }

    const dateDisplay = (dt: Date): string => {
        const pad = (s: number): string => s.toString().padStart(2, "0");
        return pad(dt.getDate()) + " " + dt.toLocaleString("default", { month: "short" }) + " " + dt.getFullYear();
    }

    const deleteLocationHoliday = (locationHoliday: ILocationHoliday) => {
        if (window.confirm('Are you sure that you want to delete this Holiday?')) { // tslint:disable-line
            props.onDeleteLocationHoliday(locationHoliday);
        }
    }

    return (
        <>
            <h3>Holidays</h3>
            <div>
                {locationHolidays.length > 0 &&
                    <table className="formTable marginBottom10">
                        {locationHolidays.sort(dateSort).map((lh) =>
                            <tr key={lh.id}>
                                <td>{lh.name}</td>
                                <td>{dateDisplay(lh.date)}</td>
                                <td><Button variant="outlined" size="small" onClick={(e) => props.onEditLocationHoliday(lh)}>Edit</Button></td>
                                <td><Button variant="outlined" size="small" onClick={(e) => deleteLocationHoliday(lh)}>Delete</Button></td>
                            </tr>
                        )}
                    </table>
                }
                {locationHolidays.length <= 0 &&
                    <div className="marginBottom10">No holidays have been created for this location.</div>
                }
                <div>
                    <Button variant="outlined" onClick={(e) => props.onBeginAddNewLocationHoliday()}>Add Holiday</Button>
                </div>
            </div>
        </>
    )

}

export default ListHolidays;