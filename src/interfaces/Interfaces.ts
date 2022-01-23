export interface IPerson {
    name: string;
    role: string;
    rawBasePointsMultiplier: string;
    basePointsMultiplier: number;
    rawCarryOverPoints: string;
    carryOverPoints: number;
    rawPtoPlanned: string[];
    ptoPlanned: number[];
    visible: boolean;
}

export interface IPersonBasic {
    id: number;
    firstName: string;
    lastName: string;
    locationId: number;
}

export interface ITeam {
    id: number;
    name: string;
}

export interface IPersonTeam {
    id: number;
    personId: number;
    teamId: number;
    role: string;
    percentage: number;
}

export interface IInTeam {
    teamId: number;
    inTeam: boolean;
    role: string;
    percentage: number;
}


export interface IPlanning {
    year: number;
    planningIncrement: number;
    startDate: Date;
    pointsPerIteration: number;
    numIterations: number;
    iterationDuration: number;
}
export interface IProgramIncrement {
    id: number;
    name: string;
}

export interface IIteration {
    id: number;
    programIncrementId: number;
    name: string;
    startDate: Date;
    lengthInDays: number;
    points: number;
}

export interface IIterationExtended {
    id: number;
    programIncrementId: number;
    name: string;
    startDate: Date;
    lengthInDays: number;
    points: number;
    numWeekDays: number;
    num: number;
}

export interface IHoliday {
    date: Date;
    name: string;
}

export interface ILocation {
    id: number;
    name: string;
}

export interface ILocationHoliday {
    id: number;
    locationId: number;
    date: Date;
    name: string;
}

export interface IPersonVacation {
    id: number;
    personId: number;
    date: Date;
    fractionOfDay: number;
}

export interface IEvent {
    start: Date;
    end: Date;
    title: string;
}