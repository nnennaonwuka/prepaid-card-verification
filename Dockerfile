# Use a specific version of node as the base image
FROM node:18.20.3-alpine3.20@sha256:538e4e1286473c79ec415222d2ed61c1112c00056ad7f212ce64c15c908bde41

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_PREPAID_CARD_API=https://portfolio.agric-os.com/web
ENV NEXT_PUBLIC_SSO_WEB=http://bg-sso.dev.babbangonaapps.com 

# Build the application
RUN npm run build

# Ensure the entry point script has execution permissions
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]