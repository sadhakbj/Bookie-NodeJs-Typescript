FROM node:19-alpine as development

# Create app directory
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add ts-node
COPY . .

RUN yarn build

FROM node:19-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --only=production
COPY . .
COPY --from=development /app/build ./build
CMD yarn prod 
