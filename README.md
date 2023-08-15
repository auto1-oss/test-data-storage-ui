# <img src="logo.png" alt="Project Icon" width="30" height="30"> Test Data Storage UI

This repository contains an application that serves as a complementary tool to visualize and manage test data queues for the [Test Data Storage Service](https://github.com/auto1-oss/test-data-storage-service) project. The application connects to an API for managing test data and test data queues. It is designed to provide a user interface for interacting with the test data service API.

## Getting Started

To run the application locally, follow the steps below:

### Prerequisites

- Docker must be installed on your system.

### Running the Application

1. Open a terminal window.

2. Run the following Docker command to start the app:

   ```bash
   docker run -d --name test-data-service-ui \
       -p 3000:3000 \
       -e REACT_APP_BASE_URL_API=http://localhost:8085 \
       -e REACT_APP_BASIC_AUTH_USER=custom_user \
       -e REACT_APP_BASIC_AUTH_PASSWORD=custom_password \
       auto1/test-data-storage-ui:latest
   ```

- This command will download the latest version of the app image and start a Docker container named `test-data-service-ui`.

- Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the running application.

## Configuration

The application can be configured using environment variables. When running the Docker container, you can customize the behavior using the following environment variables:

- `REACT_APP_BASE_URL_API`: The base URL of the API service. Replace `http://localhost:8085` with the actual API URL.

- `REACT_APP_BASIC_AUTH_USER`: The username for basic authentication when accessing the API.

- `REACT_APP_BASIC_AUTH_PASSWORD`: The password for basic authentication when accessing the API.

## License

This project is licensed under the [Apache-2.0 license](LICENSE).
