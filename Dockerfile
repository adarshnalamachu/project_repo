# Use the official Node.js image as the base image
FROM node:20-alpine   
 
# Set the working directory in the container
WORKDIR /app  
 
# Copy the package.json and package-lock.json files
COPY package*.json ./   
 
# Install the dependencies
RUN npm install 
 
# Copy the rest of the application code
COPY . .
 
# Build the Next.js application
RUN npm run build 
 
# Expose the port the app runs on
EXPOSE 3000
 
# Start the Next.js application
CMD ["npm", "start"]  

# FROM nginx:1.21.6-alpine
# COPY /dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf 
# COPY config/nginx/nginx.conf /etc/nginx/conf.d 
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]  