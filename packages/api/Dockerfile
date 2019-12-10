ARG NODE_VERSION=10.15.3

FROM node:${NODE_VERSION} as builder
WORKDIR /app

COPY packages/api .
COPY yarn.lock ./yarn.lock

RUN yarn
RUN yarn build

FROM node:${NODE_VERSION}

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

ENTRYPOINT [ "yarn", "start" ]

# ARG BASE_IMAGE=socialgouv/emjpm:master

# FROM ${BASE_IMAGE} as emjpm-base-image

# FROM node:10-alpine

# WORKDIR /app

# COPY --from=emjpm-base-image /app/packages/api/dist /app/dist
# COPY ./package.json /app/package.json
# COPY ./private.pem /app/private.pem
# COPY ./public.pem /app/public.pem

# ENTRYPOINT [ "yarn", "start" ]
