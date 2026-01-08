# Specify the base image
FROM node:22

# set the work directory, it is like a cd command in the container
WORKDIR /app

# copy the configs of your project into our work directory
COPY package*.json ./

# Install the dependency
RUN npm install

#copy our code to docker image
COPY . .

# run the build and run command
CMD ["npm", "run", "dev"]