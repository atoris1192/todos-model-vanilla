FROM node
WORKDIR /app
RUN npm install -g parcel-bundler\
                  pug\
                  stylus\
                  typescript\
                  sass
CMD ["/bin/bash"]