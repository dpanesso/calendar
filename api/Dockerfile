# base image
FROM node:8.0.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn global add yarn@1.2.1 &&\
	yarn &&\
	yarn global add react-scripts@1.1.1

# start app
CMD ["yarn", "start"]
