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
import Vacations from "./components/Vacations/Vacations";
import PICapacity from './components/PICapacity';

import { Requests } from "./DAL/requests";

import { ILocation, ILocationHoliday, IPersonBasic, IPersonTeam, IPersonVacation, IProgramIncrement, IIteration, ITeam } from "./interfaces/Interfaces";
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export interface IProps {
}

const App: React.FC<IProps> = (props: IProps) => {

  const [page, setPage] = useState("HOME");
  const [personsBasic, setPersonsBasic] = useState([] as IPersonBasic[]);
  const [teams, setTeams] = useState([] as ITeam[]);
  const [personTeams, setPersonTeams] = useState([] as IPersonTeam[]);
  const [locations, setLocations] = useState([] as ILocation[]);
  const [locationHolidays, setLocationHolidays] = useState([] as ILocationHoliday[]);
  const [personVacations, setPersonVacations] = useState([] as IPersonVacation[]);
  const [programIncrements, setProgramIncrements] = useState([] as IProgramIncrement[]);
  const [programIterations, setProgramIterations] = useState([] as IIteration[]);

  const [selectedPersonId, setSelectedPersonId] = useState(-1);
  const [selectedProgramIncrementId, setSelectedProgramIncrementId] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  // const [showData, setShowData] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // Log in and Log out:

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

  // Load data required on each page:

  const onSelectPage = async (page: string) => {
    setPage(page);
    if (page === "TEAMS") {
      try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred loading teams data.") };
    }
    if (page === "LOCATIONS") {
      try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
      try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
    }
    if (page === "PEOPLE") {
      try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred loading persons.") };
      try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
      try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred loading teams data.") };
      try { await Requests.getPersonTeams(setPersonTeams); } catch (e: any) { setErrorMessage("Error occurred loading person teams.") };
    }
    if (page === "VACATIONS") {
      try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred loading persons.") };
      try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person vacations.") };
      try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading location holidays.") };
    }
    if (page === "PROGRAM_INCREMENTS") {
      try { await Requests.getProgramIncrements(setProgramIncrements); } catch (e: any) { setErrorMessage("Error occurred program increments.") };
      try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations.") };
    }
    if (page === "CAPACITY") {
      try { await Requests.getProgramIncrements(setProgramIncrements); } catch (e: any) { setErrorMessage("Error occurred program increments.") };
      try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations.") };
      try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred loading persons.") };
      try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
      try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred loading teams data.") };
      try { await Requests.getPersonTeams(setPersonTeams); } catch (e: any) { setErrorMessage("Error occurred loading person teams.") };
      try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
      try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person vacations.") };
    }
  }

  // Load the component for the page:

  const getComponentToDisplay = () => {

    if (!isLoggedIn) { return <Login onLogin={onLogin} /> }

    // if (allInitialDataLoaded) {
    switch (page) {
      case "HOME":
        return <Home userRole={userRole} />;

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

      case "VACATIONS":
        return <Vacations
          selectedPersonId={selectedPersonId}
          personsBasic={personsBasic}
          personVacations={personVacations}
          locationHolidays={locationHolidays}
          teams={teams}
          personTeams={personTeams}
          addVacation={addVacation}
          editVacation={editVacation}
          deleteVacation={deleteVacation}
          updateSelectedPersonId={(id: number) => setSelectedPersonId(id)}
        />;

      case "PROGRAM_INCREMENTS":
        return <ProgramIncrements
          programIncrements={programIncrements}
          programIterations={getIterationsForIncrement()}
          setProgramIncrementId={setProgramIncrementId}
          addProgramIncrement={addProgramIncrement}
          editProgramIncrement={editProgramIncrement}
          deleteProgramIncrement={deleteProgramIncrement}
          addProgramIteration={addIteration}
          editProgramIteration={editIteration}
          deleteProgramIteration={deleteIteration}
        />;

      case "CAPACITY":
        return <PICapacity
          programIncrements={programIncrements}
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

  // Various:

  const getIterationsForIncrement = () => {
    return programIterations.filter((i) => i.programIncrementId === selectedProgramIncrementId);
  }

  const setProgramIncrementId = (id: number) => {
    setSelectedProgramIncrementId(id);
  }

  // Update Teams data: 

  const addTeam = async (team: ITeam) => {
    try { await Requests.addTeam(team); } catch (e: any) { setErrorMessage("Error occurred while adding a team.") };
    try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred while loading teams.") };
  }

  const editTeam = async (team: ITeam) => {
    try { await Requests.editTeam(team); } catch (e: any) { setErrorMessage("Error occurred while updating a team.") };
    try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred loading a team.") };
  }

  const deleteTeam = async (id: number) => {
    try { await Requests.deleteTeam(id); } catch (e: any) { setErrorMessage("Error occurred while deleting a team.") };
    try { await Requests.getTeams(setTeams); } catch (e: any) { setErrorMessage("Error occurred loading teams data.") };
  }

  // Update Location data:

  const addLocation = async (location: ILocation) => {
    try { await Requests.addLocation(location); } catch (e: any) { setErrorMessage("Error occurred while adding a location.") };
    try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
  }

  const editLocation = async (location: ILocation) => {
    try { await Requests.editLocation(location); } catch (e: any) { setErrorMessage("Error occurred while editing a location.") };
    try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
  }

  const deleteLocation = async (id: number) => {
    // Delete the location, remove all Persons from the location, and remove all holidays for the location:
    try { await Requests.deleteLocation(id); } catch (e: any) { setErrorMessage("Error occurred while deleting a location.") };
    try { await Requests.getLocations(setLocations); } catch (e: any) { setErrorMessage("Error occurred loading locations.") };
    try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred loading persons data.") };
    try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading location-holidays data.") };
  }

  // Update Location Holidays:

  const addLocationHoliday = async (locationHoliday: ILocationHoliday) => {
    try { await Requests.addLocationHoliday(locationHoliday); } catch (e: any) { setErrorMessage("Error occurred while adding a location holiday.") };
    try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading location holidays.") };
  }

  const editLocationHoliday = async (locationHoliday: ILocationHoliday) => {
    try { await Requests.editLocationHoliday(locationHoliday); } catch (e: any) { setErrorMessage("Error occurred while editing a location holiday.") };
    try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading location holidays.") };
  }

  const deleteLocationHoliday = async (id: number) => {
    try { await Requests.deleteLocationHoliday(id); } catch (e: any) { setErrorMessage("Error occurred while deleting a location holiday.") };
    try { await Requests.getLocationHolidays(setLocationHolidays); } catch (e: any) { setErrorMessage("Error occurred loading location holidays.") };
  }

  // Update Person data: 

  const addPerson = async (personBasic: IPersonBasic, thisPersonsTeams: IPersonTeam[]) => {

    try { await Requests.addPerson(personBasic, thisPersonsTeams); } catch (e: any) { setErrorMessage("Error occurred while adding a person.") };
    try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred while loading persons.") };
    try { await Requests.getPersonTeams(setPersonTeams); } catch (e: any) { setErrorMessage("Error occurred while loading person's teams.") };
  }

  const editPerson = async (personBasic: IPersonBasic, thisPersonsTeams: IPersonTeam[]) => {
    // Update person
    try { await Requests.editPerson(personBasic, thisPersonsTeams); } catch (e: any) { setErrorMessage("Error occurred while editing a person.") };
    try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred while loading persons.") };
    try { await Requests.getPersonTeams(setPersonTeams); } catch (e: any) { setErrorMessage("Error occurred while loading person's teams.") };
  }

  const deletePerson = async (id: number) => {
    // delete the person, delete the Person's Vacations, and delete the Persons's Teams. 
    try { await Requests.deletePerson(id); } catch (e: any) { setErrorMessage("Error occurred while deleting a person.") };
    try { await Requests.getPersonsBasic(setPersonsBasic); } catch (e: any) { setErrorMessage("Error occurred while loading persons.") };
    try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person-vacations data.") };
    try { await Requests.getPersonTeams(setPersonTeams); } catch (e: any) { setErrorMessage("Error occurred loading person-teams data.") };
  }

  // Update Vacations data:

  const addVacation = async (personVacation: IPersonVacation) => {
    try { await Requests.addPersonVacation(personVacation); } catch (e: any) { setErrorMessage("Error occurred while adding a person's vacation.") };
    try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person-vacations data.") };
  }

  const editVacation = async (personVacation: IPersonVacation) => {
    try { await Requests.editPersonVacation(personVacation); } catch (e: any) { setErrorMessage("Error occurred while editing a person's vacation.") };
    try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person-vacations data.") };
  }

  const deleteVacation = async (personVacationId: number) => {
    try { await Requests.deletePersonVacation(personVacationId); } catch (e: any) { setErrorMessage("Error occurred while deleting a person's vacation.") };
    try { await Requests.getPersonVacations(setPersonVacations); } catch (e: any) { setErrorMessage("Error occurred loading person-vacations data.") };
  }

  // Update Program Increments data:

  const addProgramIncrement = async (programIncrement: IProgramIncrement) => {
    try { await Requests.addProgramIncrement(programIncrement); } catch (e: any) { setErrorMessage("Error occurred while adding a program increment.") };
    try { await Requests.getProgramIncrements(setProgramIncrements); } catch (e: any) { setErrorMessage("Error occurred loading program increments data.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  const editProgramIncrement = async (programIncrement: IProgramIncrement) => {
    try { await Requests.editProgramIncrement(programIncrement); } catch (e: any) { setErrorMessage("Error occurred while editing a program increment.") };
    try { await Requests.getProgramIncrements(setProgramIncrements); } catch (e: any) { setErrorMessage("Error occurred loading program increments data.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  const deleteProgramIncrement = async (programIncrementId: number) => {
    // delete PI and all its Iterations.
    try { await Requests.deleteProgramIncrement(programIncrementId); } catch (e: any) { setErrorMessage("Error occurred while deleting a program incrmeent.") };
    try { await Requests.getProgramIncrements(setProgramIncrements); } catch (e: any) { setErrorMessage("Error occurred loading program increments data.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  // Update Iterations data:

  const addIteration = async (iteration: IIteration) => {
    try { await Requests.addIteration(iteration); } catch (e: any) { setErrorMessage("Error occurred while adding an iteration.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  const editIteration = async (iteration: IIteration) => {
    try { await Requests.editIteration(iteration); } catch (e: any) { setErrorMessage("Error occurred while editing an iteration.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  const deleteIteration = async (iterationId: number) => {
    try { await Requests.deleteIteration(iterationId); } catch (e: any) { setErrorMessage("Error occurred while deleting a program incrmeent.") };
    try { await Requests.getIterations(setProgramIterations); } catch (e: any) { setErrorMessage("Error occurred loading iterations data.") };
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage("");
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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

        <Snackbar
          open={errorMessage !== ""}
          onClose={handleClose}
          message={errorMessage}
          action={action}
        />

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
          <pre><div className="data"><h4>PIs:</h4> {JSON.stringify(programIncrements, null, 2)}</div></pre>
          <pre><div className="data"><h4>Iterations:</h4> {JSON.stringify(programIterations, null, 2)}</div></pre>
        </div>
      } */}

    </div >
  );
}

export default App;
