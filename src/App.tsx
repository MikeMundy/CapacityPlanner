import React, { useState } from 'react';

import Footer from "./components/Footer";
import Home from "./components/Home";
import ProgramIncrements from "./components/ProgramIncrements";
import Menu from "./components/Menu";
import People from "./components/People";
import Teams from "./components/Teams";
import Locations from "./components/Locations";
import Vacations from "./components/Vacations";
// import CapacityPlanner_OLD from "./components/CapacityPlanner_OLD";

import { ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, ITeam } from "./interfaces/Interfaces";
import Capacity from './components/Capacity';
export interface IProps {
}

const App: React.FC<IProps> = (props: IProps) => {

  const getInitialPersonsBasic = () => {
    const personsBasic: IPersonBasic[] = [
      { id: 1, firstName: "Mary", lastName: "Ang", locationId: 1 },
      { id: 2, firstName: "Rishika", lastName: "Singh", locationId: 1 },
      { id: 3, firstName: "Levi", lastName: "Dimalibot", locationId: 1 },
      { id: 4, firstName: "Shane", lastName: "O'Malley", locationId: 1 },
      { id: 5, firstName: "Knowlton", lastName: "Wang", locationId: 1 },
      { id: 6, firstName: "Corey", lastName: "Little", locationId: 1 },
      { id: 7, firstName: "Judy", lastName: "Wang", locationId: 1 },
      { id: 8, firstName: "Allan", lastName: "Hou", locationId: 1 },
      { id: 9, firstName: "Chunhui", lastName: "Liu", locationId: 1 },
      { id: 10, firstName: "Tony", lastName: "Zhang", locationId: 1 },
      { id: 11, firstName: "Jing", lastName: "Zhang", locationId: 1 },
      { id: 12, firstName: "Lan", lastName: "Luo", locationId: 1 },
      { id: 13, firstName: "Mike", lastName: "Mundy", locationId: 1 },
      { id: 14, firstName: "Chris", lastName: "Dufour", locationId: 1 },
      { id: 15, firstName: "Keikhosro", lastName: "Safavi", locationId: 1 },
      { id: 16, firstName: "Chris", lastName: "Mate", locationId: 1 },
      { id: 17, firstName: "Trevor", lastName: "Mackay", locationId: 1 },
      { id: 18, firstName: "Mike", lastName: "Deroin", locationId: 1 },
    ]
    return personsBasic;
  };

  const getInitialTeams = () => {
    const teams: ITeam[] = [
      { id: 1, name: "Azurites" },
      { id: 2, name: "Presence" },
    ]
    return teams;
  };

  const getInitialPersonTeams = () => {
    const personTeams: IPersonTeam[] = [
      { personId: 1, teamId: 1, role: "QA Manager", percentage: 50 },
      { personId: 1, teamId: 2, role: "QA Manager", percentage: 50 },
      { personId: 18, teamId: 1, role: "Product Manager", percentage: 25 },
      { personId: 18, teamId: 2, role: "Product Manager", percentage: 75 },
      { personId: 3, teamId: 2, role: "QA", percentage: 100 },
      { personId: 14, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 8, teamId: 2, role: "Developer", percentage: 50 },
      { personId: 6, teamId: 2, role: "QA", percentage: 100 },
      { personId: 9, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 12, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 17, teamId: 2, role: "Tech Writer", percentage: 100 },
      { personId: 16, teamId: 2, role: "Software Release Developer", percentage: 100 },
      { personId: 13, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 4, teamId: 2, role: "QA Manager", percentage: 100 },
      { personId: 15, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 2, teamId: 2, role: "QA", percentage: 100 },
      { personId: 7, teamId: 2, role: "Director IS", percentage: 100 },
      { personId: 5, teamId: 2, role: "QA", percentage: 100 },
      { personId: 10, teamId: 2, role: "Developer", percentage: 100 },
      { personId: 11, teamId: 2, role: "Developer", percentage: 100 },
    ]
    return personTeams;
  };

  const getInitialLocations = () => {
    const locations: ILocation[] = [
      { id: 1, name: "Ontario" },
      { id: 2, name: "California" },
    ]
    return locations;
  };

  const getInitialLocationHolidays = () => {
    const locationHolidays: ILocationHoliday[] = [
      { id: 1, locationId: 1, name: "New Years Day (obs. Mon.)", date: new Date(2022, 1 - 1, 3) },
      { id: 2, locationId: 1, name: "Family Day", date: new Date(2022, 2 - 1, 2) },
      { id: 3, locationId: 1, name: "Good Friday", date: new Date(2022, 4 - 1, 15) },
      { id: 4, locationId: 1, name: "Victoria Day", date: new Date(2022, 5 - 1, 23) },
      { id: 5, locationId: 1, name: "Canada Day", date: new Date(2022, 7 - 1, 1) },
      { id: 6, locationId: 1, name: "Civic Holiday", date: new Date(2022, 8 - 1, 1) },
      { id: 7, locationId: 1, name: "Labour Day", date: new Date(2022, 9 - 1, 5) },
      { id: 8, locationId: 1, name: "Thanksgiving", date: new Date(2022, 10 - 1, 10) },
      { id: 9, locationId: 1, name: "Christmas (obs. Tue.)", date: new Date(2022, 12 - 1, 27) },
      { id: 9, locationId: 1, name: "Boxing Day", date: new Date(2022, 12 - 1, 26) },

      { id: 10, locationId: 2, name: "Martin Luther King Jr. Day", date: new Date(2021, 1 - 1, 18) },
      { id: 11, locationId: 2, name: "Thanksgiving (USA)", date: new Date(2021, 11 - 1, 25) },
    ]
    return locationHolidays;
  };

  const getInitialPersonVacations = () => {
    const personVacations: IPersonVacation[] = [
      { id: 1, personId: 13, date: new Date(2022, 1 - 1, 31), fractionOfDay: 1 },
      { id: 2, personId: 13, date: new Date(2022, 2 - 1, 1), fractionOfDay: 1 },
      { id: 3, personId: 13, date: new Date(2022, 2 - 1, 3), fractionOfDay: 1 },
      { id: 4, personId: 13, date: new Date(2022, 2 - 1, 4), fractionOfDay: 1 },
      { id: 5, personId: 13, date: new Date(2022, 2 - 1, 7), fractionOfDay: 1 },
      { id: 6, personId: 13, date: new Date(2022, 2 - 1, 8), fractionOfDay: 1 },
      { id: 7, personId: 13, date: new Date(2022, 2 - 1, 9), fractionOfDay: 1 },
      { id: 8, personId: 13, date: new Date(2022, 2 - 1, 10), fractionOfDay: 1 },
      { id: 9, personId: 13, date: new Date(2022, 2 - 1, 11), fractionOfDay: 1 },
    ]
    return personVacations;
  };

  const getInitialProgramIncrements = () => {
    const programIncrements: IProgramIncrement[] = [
      { id: 1, incrementNumberInYear: 1, startDate: new Date(2022, 1-1, 17), numberIterations: 7, daysPerIteration: 14, pointsPerIteration: 8 },
      { id: 2, incrementNumberInYear: 2, startDate: new Date(2022, 4-1, 25), numberIterations: 7, daysPerIteration: 14, pointsPerIteration: 8 },
    ]
    return programIncrements;
  };

  const [page, setPage] = useState("LOCATIONS");
  const [personsBasic, setPersonsBasic] = useState(getInitialPersonsBasic())
  const [teams, setTeams] = useState(getInitialTeams())
  const [personTeams, setPersonTeams] = useState(getInitialPersonTeams())
  const [locations, setLocations] = useState(getInitialLocations())
  const [locationHolidays, setLocationHolidays] = useState(getInitialLocationHolidays())
  const [personVacations, setPersonVacations] = useState(getInitialPersonVacations())
  const [programIncrements, setProgramIncrements] = useState(getInitialProgramIncrements())
  const [selectedPersonId, setSelectedPersonId] = useState(-1);
  const [selectedProgramIncrementId, setSelectedProgramIncrementId] = useState(-1);

  // const [showData, setShowData] = useState(false);

  const onSelectPage = (page: string) => {
    setPage(page);
  }

  const addPerson = (personBasic: IPersonBasic, thisPersonsTeams: IPersonTeam[]) => {
    let updatedPersonsBasic = [...personsBasic];
    updatedPersonsBasic.push(personBasic);
    setPersonsBasic(updatedPersonsBasic);

    console.log("thisPersonsTeams: " + JSON.stringify(thisPersonsTeams));

    // add new teams
    const updatedPersonTeams = [...personTeams, ...thisPersonsTeams];
    setPersonTeams(updatedPersonTeams);
  }

  const editPerson = (personBasic: IPersonBasic, thisPersonsTeams: IPersonTeam[]) => {
    let updatedPersonsBasic = [...personsBasic];
    const index = updatedPersonsBasic.findIndex((p) => p.id === personBasic.id);
    if (index >= 0) {
      updatedPersonsBasic[index] = personBasic;
      setPersonsBasic(updatedPersonsBasic);
    }

    // delete existing teams and add new teams
    let updatedPersonTeams = [...personTeams];
    updatedPersonTeams = updatedPersonTeams.filter((p) => p.personId !== personBasic.id);
    updatedPersonTeams = [...updatedPersonTeams, ...thisPersonsTeams];
    setPersonTeams(updatedPersonTeams);
  }

  const deletePerson = (id: number) => {
    // delete the person from all teams
    let updatedPersonTeams = [...personTeams];
    updatedPersonTeams = updatedPersonTeams.filter((pt) => pt.personId !== id);
    setPersonTeams(updatedPersonTeams);

    // delete the person
    let updatedPersonsBasic = [...personsBasic];
    updatedPersonsBasic = updatedPersonsBasic.filter((p) => p.id !== id);
    setPersonsBasic(updatedPersonsBasic);
  }

  const addTeam = (team: ITeam) => {
    let updatedTeams = [...teams];
    updatedTeams.push(team);
    setTeams(updatedTeams);
  }

  const editTeam = (team: ITeam) => {
    let updatedTeams = [...teams];
    const index = updatedTeams.findIndex((t) => t.id === team.id);
    if (index >= 0) {
      updatedTeams[index] = team;
      setTeams(updatedTeams);
    }
  }

  const deleteTeam = (id: number) => {
    // remove all people from the team:
    let updatedPersonTeams = [...personTeams];
    updatedPersonTeams = updatedPersonTeams.filter((pt) => pt.teamId !== id);
    setPersonTeams(updatedPersonTeams);

    // remove the team:
    let updatedTeams = [...teams];
    updatedTeams = updatedTeams.filter((t) => t.id !== id);
    setTeams(updatedTeams);
  }

  const addLocation = (location: ILocation) => {
    let updatedLocations = [...locations];
    updatedLocations.push(location);
    setLocations(updatedLocations);
  }

  const editLocation = (location: ILocation, newLocationHolidays: ILocationHoliday[]) => {

    console.log("newLocationHolidays: " + JSON.stringify(newLocationHolidays, null, 2));

    // Update location
    let updatedLocations = [...locations];
    const index = updatedLocations.findIndex((t) => t.id === location.id);
    if (index >= 0) {
      updatedLocations[index] = location;
      setLocations(updatedLocations);
    }

    // Update location's holidays
    let updatedLocationHolidays = [...locationHolidays];
    // delete any existing holidays for location
    updatedLocationHolidays = updatedLocationHolidays.filter((lh) => lh.locationId !== location.id);
    // add new holidays 
    updatedLocationHolidays = [...updatedLocationHolidays, ...newLocationHolidays];
    setLocationHolidays(updatedLocationHolidays);
  }

  const deleteLocation = (id: number) => {
    // remove all people from the location:
    let updatedPersons = [...personsBasic];
    updatedPersons.forEach((p) => { if (p.locationId === id) { p.locationId = -1; } });
    setPersonsBasic(updatedPersons);

    // remove the location:
    let updatedLocations = [...locations];
    updatedLocations = updatedLocations.filter((t) => t.id !== id);
    setLocations(updatedLocations);
  }

  const updateVacations = (personVacations: IPersonVacation[]) => {
    let updatedVac = [...personVacations];
    setPersonVacations(updatedVac);
  }

  const addProgramIncrement = (pi: IProgramIncrement) => {
    let updatedPIs = [...programIncrements];
    updatedPIs.push(pi);
    setProgramIncrements(updatedPIs);
  }

  const editProgramIncrement = (pi: IProgramIncrement) => {

    let updatedPIs = [...programIncrements];
    const index = updatedPIs.findIndex((t) => t.id === pi.id);
    if (index >= 0) {
      updatedPIs[index] = pi;
      setProgramIncrements(updatedPIs);
    }
  }

  const deleteProgramIncrement = (id: number) => {

    let updatedPIs = [...programIncrements];
    updatedPIs = updatedPIs.filter((t) => t.id !== id);
    setProgramIncrements(updatedPIs);
  }

  const getComponentToDisplay = () => {
    switch (page) {
      case "HOME": return <Home/>;
      case "PEOPLE": return <People personsBasic={personsBasic} locations={locations} teams={teams} personTeams={personTeams} addPerson={addPerson} editPerson={editPerson} deletePerson={deletePerson} />;
      case "TEAMS": return <Teams teams={teams} addTeam={addTeam} editTeam={editTeam} deleteTeam={deleteTeam} />;
      case "LOCATIONS": return <Locations locations={locations} locationHolidays={locationHolidays} addLocation={addLocation} editLocation={editLocation} deleteLocation={deleteLocation} />;
      case "VACATIONS": return <Vacations selectedPersonId={selectedPersonId} personsBasic={personsBasic} personVacations={personVacations} locationHolidays={locationHolidays} updateVacations={updateVacations} updateSelectedPersonId={(id: number) => setSelectedPersonId(id)} />;
      case "PROGRAM_INCREMENTS": return <ProgramIncrements programIncrements={programIncrements} addProgramIncrement={addProgramIncrement} editProgramIncrement={editProgramIncrement} deleteProgramIncrement={deleteProgramIncrement} />;
      case "CAPACITY": return <Capacity programIncrements={programIncrements} persons={personsBasic} locations={locations} teams={teams} personTeams={personTeams} locationHolidays={locationHolidays} personVacations={personVacations} selectedProgramIncrement={selectedProgramIncrementId} updateSelectedProgramIncrement={(id: number) => setSelectedProgramIncrementId(id)}/>;
      // case "CAPACITY_OLD": return <CapacityPlanner_OLD />;

      default: return <h2>Page Unknown</h2>;
    }
  }

  return (
    <div className="app">
      <h1>Capacity Planner</h1>

      <Menu page={page} onSelectPage={onSelectPage} />

      {getComponentToDisplay()}

      {/* {!showData &&
        <button onClick={(e) => setShowData(true)}>Show Data</button>
      }

      {showData &&
        <>
          <button onClick={(e) => setShowData(false)}>Hide Data</button>
          <pre><div className="data"><h4>LOCATIONS:</h4> {JSON.stringify(locations, null, 2)}</div></pre>
          <pre><div className="data"><h4>LOCATION HOLIDAYS:</h4> {JSON.stringify(locationHolidays, null, 2)}</div></pre>
          <pre><div className="data"><h4>TEAMS:</h4> {JSON.stringify(teams, null, 2)}</div></pre>
          <pre><div className="data"><h4>PERSON TEAMS:</h4> {JSON.stringify(personTeams, null, 2)}</div></pre>
        </>
      } */}

      <Footer></Footer>

    </div>
  );
}

export default App;
