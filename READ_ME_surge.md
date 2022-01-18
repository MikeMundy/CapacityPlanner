Hosted at https://breezy-leg.surge.sh/
(URL is stored in /build/CNAME)

Before first deployment to production, run: 

yarn global add surge

To deploy to production via Surge, start in this folder:

yarn build

cd build

surge

To be really useful I'd need to add a persistent back-end data store (maybe https://jsonbin.io/) and maybe
user accounts and roles. Maybe I'll do this for the next hackathon.