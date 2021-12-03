# Gitlab CI/CD Stack

# [ReactTS, ExpressTS, PostgreSQL, Nginx]

### Prerequisites

- gitlab-ci.yml
    - Change "arge" folder to some other folder that runner has full access to
    - Change "volumes" folder to wherever you want volume data
    - Change "arge-server" tag to whatever tag your runner have
    - Change "master" to whatever branch you need
- docker-compose.yml
    - Change "projectname" to your project name
- .env
    - Check the .env file and descriptions
    - If you add a variable for react, also add it inside react Dockerfile and docker-compose build context.
- set-gitlab-variables.sh

  This script automatically sets Gitlab CI/CD variables inside .env file. This is done on "build" step of gitlab-ci
    - Add your deployment variables here. For example change HOST_URL to `https://example.com` to deploy your app there

If you don't need postgresql or nginx, just removing them from docker-compose.yml is enough. You might want to expose
ports for your app if you are removing nginx.

## Adding new project to stack

For example you want to add a cloud server to the stack.

- create "api-cloud" folder
- create Dockerfile and .dockerignore You can copy existing one from "api"
- Create "api-cloud" in docker-compose.yml. You can copy existing "api" and modify it
- If you have remote endpoints, add your route to nginx/app.conf

