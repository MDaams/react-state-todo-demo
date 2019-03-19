FROM node:11 AS BUILD_STAGE

WORKDIR /app

COPY client-app/package.json ./
COPY client-app/yarn.lock ./

RUN mkdir ~/.ssh \
  && test "$(ssh-keyscan -t rsa github.com | ssh-keygen -lf -)" = "2048 SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8 github.com (RSA)" \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ARG SSH_KEY

RUN echo "$SSH_KEY" > ~/.ssh/id_rsa \
  && chmod 600 ~/.ssh/id_rsa \
  && eval "$(ssh-agent -s)" \
  && ssh-add ~/.ssh/id_rsa \
  && yarn install --frozen-lockfile \
  && rm ~/.ssh/id_rsa

ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}

COPY client-app .

RUN yarn build

FROM nginx AS EXECUTION_STAGE

COPY --from=BUILD_STAGE /app/dist /usr/share/nginx/html
