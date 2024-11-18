# Use an updated Node image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./

# Set NPM configuration for longer timeouts and install dependencies
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install --no-optional

# Copy the rest of the code and build the app
COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
