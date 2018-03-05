# calendar
A meeting room booking system for shared offices.

## Demo
TBD

## Stack
* [ReactJS](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Redis](https://redis.io/download)
* [Nginx](https://nginx.org/en/)
* [Docker](https://www.docker.com/)

![alt text](https://raw.githubusercontent.com/johnnyconroy/calendar/master/images/stackDiagram.png)

## Run with Docker
* Install [Docker](https://www.docker.com/), launch docker-compose, and check the logs until the services are running.
```bash
docker-compose up -d && docker-compose logs -f -t
```
> App running on http://localhost and Redis Commander running on http://localhost:8081

## Manual run (if needed)
* Install and launch [Redis](https://redis.io/download)
```bash
# on a Mac
cd /my/redis/installation/folder
make
src/redis-server
```
* Start api
```bash
cd api
yarn
yarn start
```
> Running on http://localhost:4000

* Start app
```bash
cd App
yarn
yarn start
```
> Running on http://localhost:3000

## Deploy on AWS
Here's a set-up example.
* Launch an Ubuntu EC2 instance with the following parameters (use default for others):

AMI
![alt text](https://raw.githubusercontent.com/johnnyconroy/calendar/master/images/AMI.png)

Size (Docker needs a bit more memory to launch all the services)
![alt text](https://raw.githubusercontent.com/johnnyconroy/calendar/master/images/instance_size.png)

Security groups (specific to the ports choosen in app config)
![alt text](https://raw.githubusercontent.com/johnnyconroy/calendar/master/images/security_groups.png)

* SSH to your instance
* Install docker (see [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository)), docker-compose (see [here](https://docs.docker.com/compose/install/)), and manage docker as non-root user (see [here](https://docs.docker.com/install/linux/linux-postinstall/)). You can use the script below.
```bash
scripts/AWS/install-docker.sh
```
* Log out and log back in so that your group membership is re-evaluated.
* Clone this repository
* Launch docker-compose, and check the logs until the services are running.
```bash
docker-compose up -d && docker-compose logs -f -t
```
> App running on your EC2 public DNS (something like http://ec2-39-205-118-100.us-west-2.compute.amazonaws.com/)
