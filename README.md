# Capacity Planner

This is a tool to assist in generating a precise Team Velocity for Planning Iterations during Agile planning.
# Quick Setup

git clone https://github.com/MikeMundy/CapacityPlanner.git

cd CapacityPlanner

git checkout -b myNewBranch

yarn install --ignore-engines

yarn start

## Back End

This project requires a back end service. The back end is available at https://github.com/MikeMundy/CapacityPlannerBackEnd

## Configuration

You will need to update the baseURL value in \src\DAL\http-common.ts to point to the URL where your local back end MySQL instance is running, followed by '/api/', i.e. 'http://localhost:8080/api/'

## Deployment to live site

See 'READ_ME_surge.md' for instructions for quickly deploying and hosting the front end online via the Surge hosting service. 

## Based on Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
