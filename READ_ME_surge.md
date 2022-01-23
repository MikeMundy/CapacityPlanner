# Deployment and Hosting via Surge

The site is hosted online at https://breezy-leg.surge.sh/

The URL used when deploying the site is stored in the '/build/CNAME' file. 

## Before first deployment

Before first deployment to production, run: 

yarn global add surge

## Deploying to Production

After installing surge, you can deploy the front end to production via Surge. Start in the root folder and run:

yarn build

cd build

surge
