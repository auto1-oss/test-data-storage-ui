FROM node:16-alpine
WORKDIR /
COPY . .
RUN npm ci 
# Build the app
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]