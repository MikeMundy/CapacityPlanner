import React, { useState } from "react";

import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import EditLocationHistory from "./EditLocationHoliday";

import { ILocation, ILocationHoliday } from "../../interfaces/Interfaces";
import ListLocations from "./ListLocations";
import AddLocationHoliday from "./AddLocationHoliday";

export interface IProps {
    locations: ILocation[];
    locationHolidays: ILocationHoliday[];
    addLocation: (location: ILocation) => void;
    editLocation: (location: ILocation) => void;
    deleteLocation: (id: number) => void;
    addLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    editLocationHoliday: (locationHoliday: ILocationHoliday) => void;
    deleteLocationHoliday: (id: number) => void;
}

const Locations: React.FC<IProps> = (props: IProps) => {

    const nullLocation: ILocation = { id: -1, name: "" };
    const nullLocHoliday: ILocationHoliday = { id: -1, locationId: -1, name: "", date: new Date() };

    const [screen, setScreen] = useState("ListLocations");
    const [location, setLocation] = useState(nullLocation);
    const [locationHoliday, setLocationHoliday] = useState(nullLocHoliday);

    // Locations:

    const beginAddLocation = () => {
        setScreen("AddLocation");
    }

    const saveNewLocation = (location: ILocation) => {
        props.addLocation(location);
        setScreen("ListLocations");
    }

    const beginEditLocation = (location: ILocation) => {
        setLocation(location);
        setScreen("EditLocation");
    }

    const saveEditLocation = (location: ILocation) => {
        props.editLocation(location);
        setScreen("ListLocations");
    }

    const deleteLocation = (location: ILocation) => {
        props.deleteLocation(location.id);
    }

    const cancelAddLocation = () => {
        setScreen("ListLocations");
    }

    // Locations Holidays:

    const beginAddLocationHoliday = () => {
        setScreen("AddLocationHoliday");
    }

    const saveNewLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.addLocationHoliday(locationHoliday);
        setScreen("EditLocation");
    }

    const beginEditLocationHoliday = (locationHoliday: ILocationHoliday) => {
        setLocationHoliday(locationHoliday);
        setScreen("EditLocationHoliday");
    }

    const saveEditLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.editLocationHoliday(locationHoliday);
        setScreen("EditLocation");
    }

    const cancelEditLocationHoliday = () => {
        setScreen("EditLocation");
    }

    const deleteLocationHoliday = (locationHoliday: ILocationHoliday) => {
        props.deleteLocationHoliday(locationHoliday.id);
    }


    switch (screen) {
        case "ListLocations":
            return <ListLocations
                locations={props.locations}
                addLocation={beginAddLocation}
                beginEditLocation={beginEditLocation}
                deleteLocation={deleteLocation}
            />;

        case "AddLocation":
            return <AddLocation
                onSaveNewLocation={saveNewLocation}
                onCancel={cancelAddLocation}
            />;

        case "EditLocation":
            return <EditLocation
                location={location}
                locationHolidays={props.locationHolidays}
                onSaveEditLocation={saveEditLocation}
                onCancel={cancelAddLocation}
                onBeginAddNewLocationHoliday={beginAddLocationHoliday}
                onSaveNewLocationHoliday={saveNewLocationHoliday}
                onEditLocationHoliday={beginEditLocationHoliday}
                onDeleteLocationHoliday={deleteLocationHoliday}
            />;

        case "AddLocationHoliday":
            return <AddLocationHoliday
                location={location}
                onAddLocationHoliday={saveNewLocationHoliday}
                onCancel={cancelEditLocationHoliday}
            />

        case "EditLocationHoliday":
            return <EditLocationHistory
                locationHoliday={locationHoliday}
                onSaveEditLocationHoliday={saveEditLocationHoliday}
                onCancel={cancelEditLocationHoliday}
            />

    }

    return null;
}

export default Locations;