# cryptowatch
Web app monitoring various cryptocurrencies through public APIs.

## Demo
TBD

## Stack
* [ReactJS](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Redis](https://redis.io/download)
* [Nginx](https://nginx.org/en/)
* [Docker](https://www.docker.com/)

![alt text](https://raw.githubusercontent.com/johnnyconroy/cryptowatch/master/images/stackDiagram.png)

## Get Started
* Install and launch [Redis](https://redis.io/download)
```bash
# on a Mac
cd /my/redis/installation/folder
make
src/redis-server
```
* Dependencies
```bash
yarn
```
* Start server - in a second terminal window
```bash
yarn start-server
```
> Running on http://localhost:4000
* Start React App
```bash
yarn start
```
> Running on http://localhost:3000

## Run with Docker
* Install [Docker](https://www.docker.com/) and launch the docker-compose
```bash
docker-compose up -d
```
* Watch the logs until the web app is running
```bash
docker-compose logs -f -t
```
> App running on http://localhost and Redis Commander running on http://localhost:8081

## Deploy on AWS
Here's a set-up example.
* Launch an Ubuntu EC2 instance with default parameters except for the security groups (see picture below)
* SSH to your instance
* Install docker (see [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository)), docker-compose (see [here](https://docs.docker.com/compose/install/)), and manage docker as non-root user (see [here](https://docs.docker.com/install/linux/linux-postinstall/)). You can use the script below.
```bash
scripts/AWS/install-docker.sh
```
* Log out and log back in so that your group membership is re-evaluated.
* Clone this repository
* Launch docker-compose
```
docker-compose up -d
```
* Watch the logs until the web app is running
```bash
docker-compose logs -f -t
```
> App running on your EC2 public DNS (something like http://ec2-39-205-118-100.us-west-2.compute.amazonaws.com/)
