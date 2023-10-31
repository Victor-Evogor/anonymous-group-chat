FROM registry.access.redhat.com/ubi8/nodejs-16:latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages
RUN npm install --force

COPY . /opt/app-root/src

ENV NODE_ENV production
ENV PORT 3030

EXPOSE 3030

RUN npm run build

CMD ["npm", "start"]
