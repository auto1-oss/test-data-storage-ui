#
# This file is part of the auto1-oss/test-data-storage-ui.
#
# (c) AUTO1 Group SE https://www.auto1-group.com
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#

FROM node:16-alpine
WORKDIR /
COPY . .
RUN npm ci
# Build the app
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
# Start the app
CMD ["/bin/sh", "-c", "echo \"window.REACT_APP_BASE_URL_API = '$REACT_APP_BASE_URL_API'; window.REACT_APP_BASIC_AUTH_USER = '$REACT_APP_BASIC_AUTH_USER'; window.REACT_APP_BASIC_AUTH_PASSWORD = '$REACT_APP_BASIC_AUTH_PASSWORD';\" > ./build/config.js && npx serve build"]