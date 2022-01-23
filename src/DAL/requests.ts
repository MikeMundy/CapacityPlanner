import http from "./http-common";
import { IIteration, ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "../interfaces/Interfaces";

export class Requests {

    // Teams:

    static getTeams = async (setTeams: any) => {
        const teams = await http.get<Array<ITeam>>("/team");
        setTeams(teams.data);
    }

    static addTeam = async (team: ITeam) => {
        await http.post<ITeam>("/team", team);
    }

    static editTeam = async (team: ITeam) => {
        await http.put<ITeam>("/team/" + team.id, team);
    }

    static deleteTeam = async (teamId: number) => {
        await http.delete<ITeam>("/team/" + teamId);
    }

    // Locations:

    static getLocations = async (setLocations: any) => {
        const locations = await http.get<Array<ILocation>>("/location");
        setLocations(locations.data);
    }

    static addLocation = async (location: ILocation) => {
        await http.post<ILocation>("/location", location);
    }

    static editLocation = async (location: ILocation) => {
        await http.put<ILocation>("/location/" + location.id, location);
    }

    static deleteLocation = async (locationId: number) => {
        await http.delete<ILocation>("/location/" + locationId);
    }

    // Location Holidays:

    static getLocationHolidays = async (setLocationHolidays: any) => {
        const locationHolidays = await http.get<Array<ILocationHoliday>>("/location-holiday");

        let lh = locationHolidays.data;
        lh.forEach((x) => { x.date = new Date(x.date); })

        setLocationHolidays(lh);
    }

    static addLocationHoliday = async (locationHoliday: ILocationHoliday) => {
        await http.post<ILocationHoliday>("/location-holiday", locationHoliday);
    }

    static editLocationHoliday = async (locationHoliday: ILocationHoliday) => {
        await http.put<ILocationHoliday>("/location-holiday/" + locationHoliday.id, locationHoliday);
    }

    static deleteLocationHoliday = async (locationHolidayId: number) => {
        await http.delete<ILocationHoliday>("/location-holiday/" + locationHolidayId);
    }

    // Persons:

    static getPersonsBasic = async (setPersons: any) => {
        const persons = await http.get<Array<IPersonBasic>>("/person");
        setPersons(persons.data);
    }

    static addPerson = async (person: IPersonBasic, personTeams: IPersonTeam[]) => {
        console.log(JSON.stringify(personTeams));
        await http.post<IPersonBasic>("/person", { id: person.id, firstName: person.firstName, lastName: person.lastName, locationId: person.locationId, personTeams: [...personTeams] });
    }

    static editPerson = async (person: IPersonBasic, personTeams: IPersonTeam[]) => {
        await http.put<IPersonBasic>("/person/" + person.id, { id: person.id, firstName: person.firstName, lastName: person.lastName, locationId: person.locationId, personTeams: [...personTeams] });
    }

    static deletePerson = async (personId: number) => {
        await http.delete<IPersonBasic>("/person/" + personId);
    }

    // Person Teams:

    static getPersonTeams = async (setPersonTeams: any) => {
        const personTeams = await http.get<Array<IPersonTeam>>("/person-team");
        setPersonTeams(personTeams.data);
    }

    static addPersonTeams = async (personTeams: IPersonTeam[]) => {
        await http.post<IPersonTeam[]>("/person-team", personTeams);
    }

    // Person Vacations:

    static getPersonVacations = async (setPersonVacations: any) => {
        const personVacations = await http.get<Array<IPersonVacation>>("/person-vacation");

        let pv = personVacations.data;
        pv.forEach((x) => { x.date = new Date(x.date); })

        setPersonVacations(pv);
    }

    static addPersonVacation = async (personVacation: IPersonVacation) => {
        await http.post<IPersonTeam[]>("/person-vacation", personVacation);
    }

    static editPersonVacation = async (personVacation: IPersonVacation) => {
        await http.put<IPersonTeam>("/person-vacation/" + personVacation.id, personVacation);
    }

    static deletePersonVacation = async (personVacationId: number) => {
        await http.delete<IPersonTeam>("/person-vacation/" + personVacationId);
    }

    // Program Increments:

    static getProgramIncrements = async (setProgramIncrements: any) => {
        const pis = await http.get<Array<IProgramIncrement>>("/program-increment");
        setProgramIncrements(pis.data);
    }

    static addProgramIncrement = async (programIncrement: IProgramIncrement) => {
        await http.post<IProgramIncrement>("/program-increment", programIncrement);
    }

    static editProgramIncrement = async (programIncrement: IProgramIncrement) => {
        await http.put<IProgramIncrement>("/program-increment/" + programIncrement.id, programIncrement);
    }

    static deleteProgramIncrement = async (programIncrementId: number) => {
        await http.delete<IProgramIncrement>("/program-increment/" + programIncrementId);
    }

    // Program Iterations:

    static getIterations = async (setIterations: any) => {
        const iterations = await http.get<Array<IIteration>>("/iteration");

        let i = iterations.data;
        i.forEach((x) => { x.startDate = new Date(x.startDate); })

        setIterations(i);
    }

    static addIteration = async (iteration: IIteration) => {
        await http.post<IIteration>("/iteration", iteration);
    }

    static editIteration = async (iteration: IProgramIncrement) => {
        await http.put<IIteration>("/iteration/" + iteration.id, iteration);
    }

    static deleteIteration = async (iterationId: number) => {
        await http.delete<IIteration>("/iteration/" + iterationId);
    }

}