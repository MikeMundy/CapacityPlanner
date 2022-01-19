import React, { useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProgramIncrements from "./components/ProgramIncrements";
import Menu from "./components/Menu";
import People from "./components/People";
import Teams from "./components/Teams";
import Locations from "./components/LocationAndHoliday/Locations";
import Vacations from "./components/Vacations";
import PICapacity from './components/PICapacity';

import { ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, IIteration, ITeam } from "./interfaces/Interfaces";
import { Typography } from '@mui/material';

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

  const getInitialProgramIncrements2 = () => {
    const programIncrements: IProgramIncrement[] = [
      { id: 1, name: "PI 2022.1" },
      { id: 2, name: "PI 2022.2" },
    ]
    return programIncrements;
  };

  const getInitialProgramIterations = () => {
    const programIterations: IIteration[] = [
      { id: 1, programIncrementId: 1, name: "PI Planning 2022.1", startDate: new Date(2022, 1 - 1, 24), lengthInDays: 2, points: 0 },
      { id: 2, programIncrementId: 1, name: "Iteration 2022.1.1", startDate: new Date(2022, 1 - 1, 26), lengthInDays: 14, points: 8 },
      { id: 3, programIncrementId: 1, name: "Iteration 2022.1.2", startDate: new Date(2022, 2 - 1, 9), lengthInDays: 14, points: 8 },
      { id: 4, programIncrementId: 1, name: "Iteration 2022.1.3", startDate: new Date(2022, 2 - 1, 23), lengthInDays: 14, points: 8 },
      { id: 5, programIncrementId: 1, name: "Iteration 2022.1.4", startDate: new Date(2022, 3 - 1, 9), lengthInDays: 14, points: 8 },
      { id: 6, programIncrementId: 1, name: "Iteration 2022.1.5", startDate: new Date(2022, 3 - 1, 23), lengthInDays: 14, points: 8 },
      { id: 7, programIncrementId: 1, name: "Iteration 2022.1.6", startDate: new Date(2022, 4 - 1, 20), lengthInDays: 21, points: 12 },
      { id: 8, programIncrementId: 2, name: "PI Planning 2022.2", startDate: new Date(2022, 5 - 1, 22), lengthInDays: 2, points: 0 },
      { id: 9, programIncrementId: 2, name: "Iteration 2022.2.1", startDate: new Date(2022, 5 - 1, 24), lengthInDays: 14, points: 8 },
    ]
    return programIterations;
  };

  const [page, setPage] = useState("HOME");
  const [personsBasic, setPersonsBasic] = useState(getInitialPersonsBasic())
  const [teams, setTeams] = useState(getInitialTeams())
  const [personTeams, setPersonTeams] = useState(getInitialPersonTeams())
  const [locations, setLocations] = useState(getInitialLocations())
  const [locationHolidays, setLocationHolidays] = useState(getInitialLocationHolidays())
  const [personVacations, setPersonVacations] = useState(getInitialPersonVacations())
  const [programIncrements2, setProgramIncrements2] = useState(getInitialProgramIncrements2())
  const [programIterations, setProgramIterations] = useState(getInitialProgramIterations())
  const [selectedPersonId, setSelectedPersonId] = useState(-1);
  const [selectedProgramIncrementId, setSelectedProgramIncrementId] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // const [showData, setShowData] = useState(false);

  const onSelectPage = (page: string) => {
    setPage(page);
  }

  const getIterationsForIncrement = () => {
    return programIterations.filter((i) => i.programIncrementId === selectedProgramIncrementId);
  }

  const addPerson = (personBasic: IPersonBasic, thisPersonsTeams: IPersonTeam[]) => {
    let updatedPersonsBasic = [...personsBasic];
    updatedPersonsBasic.push(personBasic);
    setPersonsBasic(updatedPersonsBasic);

    // console.log("thisPersonsTeams: " + JSON.stringify(thisPersonsTeams));

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
    let newLocation: ILocation = { ...location };
    const maxLocationId = locations.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
    newLocation.id = maxLocationId + 1;

    let updatedLocations = [...locations];
    updatedLocations.push(newLocation);
    setLocations(updatedLocations);
  }

  const editLocation = (location: ILocation) => {
    let updatedLocations = [...locations];
    const index = updatedLocations.findIndex((t) => t.id === location.id);
    if (index >= 0) {
      updatedLocations[index] = location;
      setLocations(updatedLocations);
    }
  }

  const addLocationHoliday = (locationHoliday: ILocationHoliday) => {
    let newHoliday: ILocationHoliday = { ...locationHoliday };
    const maxHolidayId = locationHolidays.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
    newHoliday.id = maxHolidayId + 1;

    let updatedHolidays = [...locationHolidays];
    updatedHolidays.push(newHoliday);
    setLocationHolidays(updatedHolidays);
  }

  const editLocationHoliday = (locationHoliday: ILocationHoliday) => {
    let updatedHolidays = [...locationHolidays];
    const index = updatedHolidays.findIndex((h) => h.id === locationHoliday.id);
    if (index >= 0) {
      updatedHolidays[index] = locationHoliday;
      setLocationHolidays(updatedHolidays);
    }
  }

  const deleteLocation = (id: number) => {
    // remove all people from the location:
    let updatedPersons = [...personsBasic];
    updatedPersons.forEach((p) => { if (p.locationId === id) { p.locationId = -1; } });
    setPersonsBasic(updatedPersons);

    // remove all holidays from the location:
    let updatedHolidays = [...locationHolidays];
    updatedHolidays = updatedHolidays.filter((h) => h.locationId !== id);
    setLocationHolidays(updatedHolidays);

    // remove the location:
    let updatedLocations = [...locations];
    updatedLocations = updatedLocations.filter((t) => t.id !== id);
    setLocations(updatedLocations);
  }

  const deleteLocationHoliday = (id: number) => {
    // remove the holiday:
    let updatedLocationHolidays = [...locationHolidays];
    updatedLocationHolidays = updatedLocationHolidays.filter((t) => t.id !== id);
    setLocationHolidays(updatedLocationHolidays);
  }

  const updateVacations = (personVacations: IPersonVacation[]) => {
    let updatedVac = [...personVacations];
    setPersonVacations(updatedVac);
  }

  const addProgramIncrement2 = (pi: IProgramIncrement) => {
    let updatedPIs = [...programIncrements2];
    updatedPIs.push(pi);
    setProgramIncrements2(updatedPIs);
  }

  const setProgramIncrementId = (id: number) => {
    setSelectedProgramIncrementId(id);
  }

  const editProgramIncrement2 = (pi: IProgramIncrement) => {
    let updatedPIs = [...programIncrements2];
    const index = updatedPIs.findIndex((t) => t.id === pi.id);
    if (index >= 0) {
      updatedPIs[index] = pi;
      setProgramIncrements2(updatedPIs);
    }
  }

  const deleteProgramIncrement2 = (id: number) => {
    // delete the PI
    let updatedPIs = [...programIncrements2];
    updatedPIs = updatedPIs.filter((t) => t.id !== id);
    setProgramIncrements2(updatedPIs);
    // delete the Iterations for the PI
    let updatedIterations = [...programIterations];
    updatedIterations = updatedIterations.filter((i) => i.programIncrementId !== id);
    setProgramIterations(updatedIterations);
  }

  const addProgramIteration = (pi: IIteration) => {
    let updatedPIs = [...programIterations];
    const maxId = programIterations.reduce((acc, t) => acc = acc > t.id ? acc : t.id, 0);
    pi.id = maxId + 1;
    updatedPIs.push(pi);
    setProgramIterations(updatedPIs);
  }

  const editProgramIteration = (pi: IIteration) => {
    let updatedPIs = [...programIterations];
    const index = updatedPIs.findIndex((t) => t.id === pi.id);
    if (index >= 0) {
      updatedPIs[index] = pi;
      setProgramIterations(updatedPIs);
    }
  }

  const deleteProgramIteration = (id: number) => {
    let updatedPIs = [...programIterations];
    updatedPIs = updatedPIs.filter((t) => t.id !== id);
    setProgramIterations(updatedPIs);
  }

  const onLogin = (username: string, password: string): string => {
    if (username.trim() === "Manager" && password.trim() === "RedBrick") {
      setIsLoggedIn(true);
      setUserRole("MANAGER");
      setPage("HOME");
      return "";
    }
    if (username.trim() === "User" && password.trim() === "GreenTree") {
      setIsLoggedIn(true);
      setUserRole("USER");
      setPage("HOME");
      return "";
    }
    return "Login failed";
  }

  const onLogOut = () => {
    setIsLoggedIn(false);
  }

  const getComponentToDisplay = () => {

    if (!isLoggedIn) { return <Login onLogin={onLogin} /> }

    switch (page) {
      case "HOME":
        return <Home userRole={userRole}/>;

      case "PEOPLE":
        return <People
          personsBasic={personsBasic}
          locations={locations}
          teams={teams}
          personTeams={personTeams}
          addPerson={addPerson}
          editPerson={editPerson}
          deletePerson={deletePerson}
        />;

      case "TEAMS":
        return <Teams
          teams={teams}
          addTeam={addTeam}
          editTeam={editTeam}
          deleteTeam={deleteTeam}
        />;

      case "LOCATIONS":
        return <Locations
          locations={locations}
          locationHolidays={locationHolidays}
          addLocation={addLocation}
          editLocation={editLocation}
          deleteLocation={deleteLocation}
          addLocationHoliday={addLocationHoliday}
          editLocationHoliday={editLocationHoliday}
          deleteLocationHoliday={deleteLocationHoliday}
        />;

      case "VACATIONS":
        return <Vacations
          selectedPersonId={selectedPersonId}
          personsBasic={personsBasic}
          personVacations={personVacations}
          locationHolidays={locationHolidays}
          updateVacations={updateVacations}
          updateSelectedPersonId={(id: number) => setSelectedPersonId(id)}
        />;

      case "PROGRAM_INCREMENTS":
        return <ProgramIncrements
          programIncrements={programIncrements2}
          programIterations={getIterationsForIncrement()}
          setProgramIncrementId={setProgramIncrementId}
          addProgramIncrement={addProgramIncrement2}
          editProgramIncrement={editProgramIncrement2}
          deleteProgramIncrement={deleteProgramIncrement2}
          addProgramIteration={addProgramIteration}
          editProgramIteration={editProgramIteration}
          deleteProgramIteration={deleteProgramIteration}
        />;

      case "CAPACITY":
        return <PICapacity
          programIncrements={programIncrements2}
          programIterations={getIterationsForIncrement()}
          persons={personsBasic}
          locations={locations}
          teams={teams}
          personTeams={personTeams}
          locationHolidays={locationHolidays}
          personVacations={personVacations}
          selectedProgramIncrement={selectedProgramIncrementId}
          updateSelectedProgramIncrement={(id: number) => setSelectedProgramIncrementId(id)}
        />;

      default: return <h2>Page Unknown</h2>;
    }
  }

  return (
    <div className="app">
      <div className="mainBody">

        <Typography variant="h2" component="div" gutterBottom>
          Intrado Capacity Planner
        </Typography>

        {isLoggedIn &&
          <Menu page={page} userRole={userRole} onSelectPage={onSelectPage} onLogOut={onLogOut} />
        }

        {getComponentToDisplay()}

        {/* <div>selectedProgramIncrementId: {selectedProgramIncrementId}</div>
      <div><pre>{JSON.stringify(programIterations, null, 2)}</pre></div> */}

      </div>
      <Footer></Footer>

      {/* {!showData &&
        <div>
          <button onClick={(e) => setShowData(true)}>Show Data</button>
        </div>
      }

      {showData &&
        <div>
          <button onClick={(e) => setShowData(false)}>Hide Data</button>
          <pre><div className="data"><h4>LOCATIONS:</h4> {JSON.stringify(locations, null, 2)}</div></pre>
          <pre><div className="data"><h4>LOCATION HOLIDAYS:</h4> {JSON.stringify(locationHolidays, null, 2)}</div></pre>
          <pre><div className="data"><h4>TEAMS:</h4> {JSON.stringify(teams, null, 2)}</div></pre>
          <pre><div className="data"><h4>PERSON TEAMS:</h4> {JSON.stringify(personTeams, null, 2)}</div></pre>
          <pre><div className="data"><h4>PIs:</h4> {JSON.stringify(programIncrements2, null, 2)}</div></pre>
          <pre><div className="data"><h4>Iterations:</h4> {JSON.stringify(programIterations, null, 2)}</div></pre>
        </div>
      } */}

    </div >
  );
}

export default App;
