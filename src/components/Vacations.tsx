import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-modal';

import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

import { IEvent, ILocationHoliday, IPersonBasic, IPersonVacation } from "../interfaces/Interfaces";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export interface IProps {
    selectedPersonId: number;
    personsBasic: IPersonBasic[];
    personVacations: IPersonVacation[];
    locationHolidays: ILocationHoliday[];
    updateVacations: (personVactions: IPersonVacation[]) => void;
    updateSelectedPersonId: (personId: number) => void;
}

const Vacations: React.FC<IProps> = (props: IProps) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({} as IEvent);
    const [fractionOfDay, setFractionOfDay] = useState("");


    const getEvents = () => {
        const person = props.personsBasic.find((p) => p.id === props.selectedPersonId);
        if (person) {

            // Show person's vacations
            const personVacations = [...props.personVacations.filter((pv) => pv.personId === props.selectedPersonId)];
            // setVacationsForPerson(personVacations);

            // Show holidays
            const personHolidays = [...props.locationHolidays.filter((lh) => lh.locationId === person.locationId)];
            // setHolidaysForPerson(personHolidays);

            // Create the events
            const events: IEvent[] = [];
            personVacations.forEach((pv) => {
                const newEvent: IEvent = { start: pv.date, end: pv.date, title: pv.fractionOfDay.toString() };
                events.push(newEvent);
            })
            personHolidays.forEach((hp) => {
                const newEvent: IEvent = { start: hp.date, end: hp.date, title: hp.name };
                events.push(newEvent);
            })

            return events;
        }
    }

    moment.locale("es-es", {
        week: {
            dow: 1 //Monday is the first day of the week.
        }
    });

    const localizer = momentLocalizer(moment);

    const sorter = (p1: IPersonBasic, p2: IPersonBasic): number => {
        if (p1.lastName === p2.lastName) {
            return p1.firstName < p2.firstName ? -1 : 1
        }
        return p1.lastName < p2.lastName ? -1 : 1;
    };

    const selectPersonId = (id: string) => {
        props.updateSelectedPersonId(parseInt(id));
    }

    const isSameDate = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    const onSelectSlot = (data: any) => {
        // console.log(JSON.stringify(data));
        // console.log(data.start);

        const maxId = props.personVacations.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
        const existingEvent = props.personVacations.find((vp) => isSameDate(vp.date, data.start) && vp.personId === props.selectedPersonId);
        if (!existingEvent) {
            const newVacForPerson: IPersonVacation = { id: maxId + 1, personId: props.selectedPersonId, date: data.start, fractionOfDay: 1 };
            const updatedVacPerson = [...props.personVacations];
            updatedVacPerson.push(newVacForPerson)
            props.updateVacations(updatedVacPerson);
        }
    }

    const onSelectEvent = (data: any) => {
        // console.log(JSON.stringify(data));
        // console.log(parseFloat(data.title));
        if (!isNaN(parseFloat(data.title))) {
            setSelectedEvent(data);
            setFractionOfDay(data.title);
            setModalIsOpen(true);
        }
    }

    const onDeleteEvent = () => {
        const existingEvent = props.personVacations.find((vp) => isSameDate(vp.date, selectedEvent.start) && vp.personId === props.selectedPersonId);
        if (existingEvent) {
            let updatedVacPerson = [...props.personVacations];
            updatedVacPerson = updatedVacPerson.filter((vp) => vp.id !== existingEvent.id);
            props.updateVacations(updatedVacPerson);
        }
        setModalIsOpen(false);
    }

    const onUpdateEvent = () => {
        const existingEvent = props.personVacations.find((vp) => isSameDate(vp.date, selectedEvent.start) && vp.personId === props.selectedPersonId);
        if (existingEvent) {
            let updatedVacPerson = [...props.personVacations];
            const thisEvent = updatedVacPerson.find((vp) => isSameDate(vp.date, selectedEvent.start) && vp.personId === props.selectedPersonId);
            if (thisEvent && parseFloat(fractionOfDay)) {
                thisEvent.fractionOfDay = Math.max(Math.min(parseFloat(fractionOfDay), 1), 0);
            }
            props.updateVacations(updatedVacPerson);
        }
        setModalIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1,
            zIndex: 1000000,
        },
        overlay: {
            zIndex: 1000000,
        }
    };

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Vacations
            </Typography>



            {/* <div>{JSON.stringify(props.personVacations, null, 2)}</div>
            <div>{JSON.stringify(props.locationHolidays, null, 2)}</div> */}

            {props.personsBasic.length > 0 &&
                <>
                    <p>Select your name in the Person dropdown. In the calendar use the Back & Next buttons to find a month, then click on a day to
                       add a vacation.</p>
                    <p style={{ marginBottom: "20px" }}>A value of '1' equals one entire day of vacation. Click on any vacation entry to edit the proportion of the day (to '0.5' or '0.25' etc.) or to delete the vacation.</p>

                    <FormControl sx={{ marginBottom: 2, width: 200 }}>
                        <InputLabel id="person">Person</InputLabel>
                        <Select value={props.selectedPersonId} onChange={(e) => selectPersonId(e.target.value.toString())} labelId="person" label="person">
                            <MenuItem value={-1} key={-1}>&nbsp;</MenuItem>
                            {props.personsBasic.sort(sorter).map((p) => <MenuItem key={p.id} value={p.id}>{p.lastName}, {p.firstName} </MenuItem>)}
                        </Select>
                    </FormControl>
                </>
            }

            {props.personsBasic.length === 0 &&
                <p>There are currently no people to create vacations for.</p>
            }


            {
                props.selectedPersonId !== -1 &&
                <>
                    <div className="calendarDiv">
                        <Calendar
                            selectable
                            localizer={localizer}
                            events={getEvents()}
                            startAccessor="start"
                            endAccessor="end"
                            views={['month']}
                            onSelectSlot={e => onSelectSlot(e)}
                            onSelectEvent={e => onSelectEvent(e)}
                        />
                    </div>

                    {/* <div>vacay: {JSON.stringify(vacationsForPerson, null, 2)}</div>
                    <div>hols: {JSON.stringify(holidaysForPerson, null, 2)}</div> */}

                </>
            }

            {
                modalIsOpen &&
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                    onRequestClose={() => setModalIsOpen(false)}
                >
                    <table className="formTable">
                        <tr>
                            <td>Fraction of Day:</td>
                            <td><input value={fractionOfDay} onChange={(e) => setFractionOfDay(e.target.value)} /></td>
                        </tr>
                    </table>

                    <div className="right">
                        <button onClick={(e) => onUpdateEvent()} className="bigButton rightMargin">Update</button>
                        <button onClick={(e) => onDeleteEvent()} className="bigButton rightMargin">Delete</button>
                        <button onClick={e => setModalIsOpen(false)} className="bigButton">Close</button>
                    </div>

                </Modal>
            }

        </div >

    )


}

export default Vacations;