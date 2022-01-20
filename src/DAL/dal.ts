import http from "./http-common";
import { IIteration, ILocation, ILocationHoliday, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "../interfaces/Interfaces";

export class DAL {

    constructor() {

    }

    // Persons:

    getAllPersons() {
        return http.get<Array<ITeam>>("/person");
    }

    // Teams:

    getAllTeams() {
        return http.get<Array<ITeam>>("/team");
    }

    addTeam(team: ITeam) {
        return http.post<ITeam>("/team", team);
    }

    updateTeam(team: ITeam) {
        return http.put<ITeam>("/team/" + team.id, team);
    }

    deleteTeam(teamId: number) {
        return http.delete<ITeam>("/team/" + teamId);
    }

    // PersonTeams:

    getAllPersonTeams() {
        return http.get<Array<IPersonTeam>>("/person-team");
    }

    // Locations:

    getAllLocations() {
        return http.get<Array<ILocation>>("/location");
    }

    // Location Holidays:

    getAllLocationHolidays() {
        return http.get<Array<ILocationHoliday>>("/location-holiday");
    }

    // Person Vacations:

    getAllPersonVacations() {
        return http.get<Array<IPersonVacation>>("/person-vacation");
    }

    // Program Increments

    getAllProgramIncrements() {
        return http.get<Array<IProgramIncrement>>("/program-increment");
    }

    // Program Iterations:

    getAllProgramIterations() {
        return http.get<Array<IIteration>>("/iteration");
    }

}