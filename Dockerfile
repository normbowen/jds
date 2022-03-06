FROM node:current-alpine3.15
ENV NODE_ENV=production
ENV TZ=America/Moncton

RUN apk update && apk upgrade

# install curl to call winning number API
RUN apk add --update curl 

# install jq to parse winning number API
RUN apk add --update jq 

# Install timezone data
RUN apk add --update tzdata 

# Clean APK cache
RUN rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install --production --silent && mv node_modules ../

# Bundle app source
COPY . .

ADD jds-script /etc/periodic/hourly

RUN mkdir /etc/periodic/DrawBreak

ADD jds-blank /etc/periodic/DrawBreak

RUN crontab crontab.tmp

RUN chown -R node /usr/src/app

USER root

EXPOSE 3000

CMD [ "./startscript.sh" ]
