#use node image as a base
FROM node:18.7.0

#create an app directory
RUN mkdir -p /app

#set work directory
WORKDIR /app

#copy App folder
COPY . ./

#install dependencies
RUN npm install

#expose to port
EXPOSE 3000

#start app
CMD ["npm", "run", "dev"]
