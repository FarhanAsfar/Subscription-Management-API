#base image
FROM node:20

#working-directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]



