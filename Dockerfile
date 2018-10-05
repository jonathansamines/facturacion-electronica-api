FROM node:8

WORKDIR /opt/src
ENV NODE_ENV=production

COPY .npmrc /opt/src
COPY package.json /opt/src
COPY package-lock.json /opt/src

RUN npm install --production

COPY . /opt/src

CMD ["npm", "start"]