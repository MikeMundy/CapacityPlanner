Hosted at insidious-knowledge.surge.sh
(URL is stored in /build/CNAME)

to surge, start in this folder:
yarn build
cd build
surge

To be really useful I'd need to add a persistent back-end data store (maybe https://jsonbin.io/) and use Web Sockets to synch data back and forth so it could be used by the whole team. Maybe I'll do this for the next hackathon.

An even nicer addition would be to add a Vacation Calendar, so users can enter their planned PTOs, and then use that data to auto-fill the Capacity Planner. That'd make capacity planning for the team almost completely automatic.

Limitation: Assumes all persons are in same location and have same holidays. Really, each person should have a Location set
that corresponds to a list of local holidays. Then you can have a team consisting of persons that are located in different 
countries. 