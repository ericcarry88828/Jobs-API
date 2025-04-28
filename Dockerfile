FROM node:alpine
WORKDIR /usr/backend
COPY . /usr/backend/
RUN npm install --only=production
CMD [ "npm", "start" ]