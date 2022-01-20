import { ITeam } from "../interfaces/Interfaces";
import { DAL } from "./dal";

export class Requests {
    private dal: DAL;

    constructor(dataAccessLayer: DAL) {
        this.dal = dataAccessLayer;
    }

    getPersonsBasic = async (setPersons: any) => {
        const persons = await this.dal.getAllPersons();
        setPersons(persons.data);
    }

    // Teams:

    getTeams = async (setTeams: any) => {
        const teams = await this.dal.getAllTeams();
        setTeams(teams.data);
    }

    addTeam = async (team: ITeam) => {
        await this.dal.addTeam(team);
    }

    updateTeam = async (team: ITeam) => {
        await this.dal.updateTeam(team);
    }

    deleteTeam = async (teamId: number) => {
        await this.dal.deleteTeam(teamId);
    }


    getPersonTeams = async (setPersonTeams: any) => {
        const personTeams = await this.dal.getAllPersonTeams();
        setPersonTeams(personTeams.data);
    }

    getLocations = async (setLocations: any) => {
        const locations = await this.dal.getAllLocations();
        setLocations(locations.data);
    }

    getLocationHolidays = async (setLocationHolidays: any) => {
        const locationHolidays = await this.dal.getAllLocationHolidays();

        let lh = locationHolidays.data;
        lh.forEach((x) => {
            x.date = new Date(x.date);
        })

        setLocationHolidays(lh);
    }

    getPersonVacations = async (setPersonVacations: any) => {
        const personVacations = await this.dal.getAllPersonVacations();

        let pv = personVacations.data;
        pv.forEach((x) => {
            x.date = new Date(x.date);
        })

        setPersonVacations(pv);
    }

    getProgramIncrements = async (setProgramIncrements: any) => {
        const pis = await this.dal.getAllProgramIncrements();
        setProgramIncrements(pis.data);
    }

    getIterations = async (setIterations: any) => {
        const iterations = await this.dal.getAllProgramIterations();

        let i = iterations.data;
        i.forEach((x) => {
            x.startDate = new Date(x.startDate);
        })

        setIterations(i);
    }

}