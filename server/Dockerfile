# ---- Base Node ----
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# copy app sources
COPY . .
# build application
RUN npm run build
# expose port and define CMD
EXPOSE 4000
CMD [ "npm", "run", "start" ]