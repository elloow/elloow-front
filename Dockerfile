FROM node:lts-alpine as builder
RUN apk add --no-cache git
WORKDIR /home/node

COPY package.json ./
COPY yarn.lock ./

# Install all packages
RUN yarn install
COPY . .
# Build AdonisJS for production
RUN yarn build


# Install only production node modules
FROM node:lts-alpine as prod_packages
RUN apk add --no-cache git
WORKDIR /home/node

COPY package.json ./
COPY yarn.lock ./

# Install only prod packages
RUN yarn install --production=true


# Build final runtime container
FROM node:lts-alpine
# Set environment variables
ENV NODE_ENV=production

USER node
RUN mkdir -p /home/node/app/
# Set working directory
WORKDIR /home/node/app
# Copy over required files from previous steps
# Copy over built files
COPY --from=builder /home/node/.nuxt ./.nuxt
# Copy over node_modules
COPY --from=prod_packages /home/node/node_modules ./node_modules
# Copy over package.json files
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY nuxt.config.ts ./
# Expose port 3333 to outside world
EXPOSE 3000
# Start server up
CMD [ "yarn", "start" ]