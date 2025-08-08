#base image specific version of Node
#Layer 1
FROM node:20 

#working-directory
#Layer 2
WORKDIR /app

#copying the package file before running npm install helps to build faster(docker's layer caching). npm install will only run when the package file changes, otherwise during iamge building cached will be used till layer 4 and the build will be much faster. 
#Layer 3
COPY package* .

#Layer 4
RUN npm install

#Layer 5
COPY . .

#Layer 6
EXPOSE 3000

# to run the container
#Layer 7
CMD [ "npm", "start" ]



