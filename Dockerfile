FROM node:wheezy 

ENV APP_HOME /app/ 
ENV TEMP_NPM /temp/ 

RUN mkdir $APP_HOME 

# caching npm packages 
WORKDIR $TEMP_NPM COPY package.json $TEMP_NPM 
RUN npm install 
RUN cp -a $TEMP_NPM/node_modules $APP_HOME 
WORKDIR $APP_HOME 
COPY ./ $APP_HOME 
EXPOSE 9000 
CMD [ "npm", "start" ]

