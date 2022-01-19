import { Button, Typography } from "@mui/material";
import React from "react";
import { ILocation } from "../../interfaces/Interfaces";

export interface IProps {
    locations: ILocation[];
    addLocation: () => void;
    beginEditLocation: (location: ILocation) => void;
    deleteLocation: (location: ILocation) => void;
}

const ListLocations: React.FC<IProps> = (props: IProps) => {

    const getLocationsTable = () => {

        if (props.locations.length === 0) { return <p>There are currently no locations.</p> }

        const sorter = (l1: ILocation, l2: ILocation): number => {
            return l1.name < l2.name ? -1 : 1;
        };

        const output = props.locations.sort(sorter).map((l) =>
            <tr key={l.id}>
                <td>{l.name}</td>
                <td><Button variant="outlined" size="small" onClick={(e) => props.beginEditLocation(l)}>Edit</Button></td>
                <td><Button variant="outlined" size="small" onClick={(e) => deleteLocation(l)}>Delete</Button></td>
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

    const deleteLocation = (location: ILocation) => {
        if (window.confirm('Are you sure that you want to delete this Location and all its holidays?')) { // tslint:disable-line
            props.deleteLocation(location);
        }
    }

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Locations & Holidays
            </Typography>

            <div><Button variant="contained" onClick={props.addLocation} className="bigButton">Add Location</Button></div>

            {getLocationsTable()}

        </div>
    )

}

export default ListLocations;