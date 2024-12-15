# Investment API

This is a simple API built with Express and SQLite for managing investments. It provides several endpoints for querying investment data, including sorting by date and amount, and filtering based on budget rules.

## Features

- **GET /investments**: Retrieve all investments.
- **GET /investments/date**: Retrieve all investments sorted by date in ascending order.
- **GET /investments/amount**: Retrieve all investments sorted by amount in ascending order.
- **GET /investments/pass**: Retrieve investments that pass the budget rules.
- **GET /investments/violate**: Retrieve investments that violate the budget rules.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup

Follow these steps to set up the project locally:

1. Clone the repository:
2. Install the required dependencies:
npm install
3. Start the server:
npm start

### Explanation of Sections:
1. **Project Description**: An overview of the API and its purpose.
2. **Features**: A brief list of the key functionalities of the API.
3. **Prerequisites**: Installation requirements (Node.js and npm).
4. **Setup**: Instructions for setting up the project locally, including cloning the repo, installing dependencies, and running the server.
5. **API Endpoints**: Detailed descriptions of each available API endpoint with example requests and responses.
6. **Database Structure**: A brief overview of the database schema used by the application.
7. **License**: A section for licensing information.
8. **Acknowledgments**: Credit to libraries or frameworks used in the project (Express.js and SQLite).


We hope you enjoy using the API and that it helps streamline your investment management tasks. Happy coding!
