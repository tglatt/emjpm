ARG NODE_VERSION=10.15.3

FROM node:${NODE_VERSION} as builder
WORKDIR /app

COPY packages/app .
COPY yarn.lock ./yarn.lock

RUN yarn
RUN yarn build

FROM node:${NODE_VERSION}

WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/static /app/static
COPY --from=builder /app/next.config.js /app/next.config.js
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

EXPOSE 80

ENTRYPOINT [ "yarn", "start:build" ]



# ARG BASE_IMAGE=socialgouv/emjpm:master

# FROM ${BASE_IMAGE} as emjpm-base-image

# FROM node:10-stretch
# WORKDIR /app

# COPY --from=emjpm-base-image /app/packages/app/.next /app/.next
# COPY --from=emjpm-base-image /app/packages/app/static /app/static
# COPY --from=emjpm-base-image /app/packages/app/next.config.js /app/next.config.js
# COPY --from=emjpm-base-image /app/packages/app/package.json /app/package.json
# COPY --from=emjpm-base-image /app/node_modules /app/node_modules

# EXPOSE 80

# ENTRYPOINT ["yarn", "start:build"]
