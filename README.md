# DevOps Assignment Submission Portal

## How to run the application locally
1. Open the `public/index.html` file in any modern web browser.
2. The application is a static frontend, so no backend server is required to view it.

## How to execute tests locally
1. Ensure Node.js is installed on your computer.
2. Open the terminal in the root directory.
3. Run `npm install` to install dependencies.
4. Run `npm test` to execute the automated tests.

## How to start the Local Report Receiver
1. Open a new terminal and navigate to the `receiver/` folder.
2. Run `npm install` (only required the first time).
3. Run `node server.js`. The receiver will start on port 3000.
4. In another terminal, expose the port using Ngrok: `ngrok http 3000`
5. Copy the Ngrok URL, append `/webhook` to it, and update your GitHub repository secret `NGROK_URL`.