# Integration Engineer Test

We appreciate your interest in the Integration Engineer role at our company. This test helps us understand your skills in creating a Node.js backend API and a ReactJS frontend. You should finish the test within a few hours. Please read the instructions carefully.

## Task Overview:

Your task is to build a simple task management application. This template offers a basic setup for a React frontend using Vite, which connects to a Node/Express backend. Users should be able to view, create, update, and delete tasks.

There are different parts to this exercise:

1. Set up the backend and frontend, resolving any issues that may arise (some issues might not have been noticed by the original developer since 'it works locally').
2. Complete the endpoints for task creation and deletion.
3. Implement missing functions in the React frontend to interact with the new endpoints for task creation and deletion.
4. Develop a new endpoint in the Express app for updating tasks. Create a UI allowing users to update tasks and communicate with this new endpoint.
5. Update the CSS to improve the usability of the solution.

*Additional Information*

* Tasks should be stored temporarily in memory; permanent storage is not necessary.
* Prevent creating or updating tasks with empty titles or descriptions. Display an error if users attempt to submit an invalid task. (Your backend should handle this check and return an error.)
* No guidance is available from the previous developer on setting up the project on a new machine. You'll need to use the existing files to figure it out, considering possible mistakes.
* The backend is in JavaScript, while the frontend React code is in a .tsx file. Make sure your work is valid TypeScript.
* Enable CORS support in the API to permit cross-origin requests.
* The app's rudimentary styling by the previous developer can be improved for better user experience.
* BONUS: If you can optimize the React app's rendering for efficiency, feel free to make changes.

*Submission Guidelines*

* Fork this GitHub repository to your own GitHub account.
* Develop the backend and frontend using the provided directory structure.
* Edit this README below to explain how to run both the backend and frontend.
* Once done, share the link to your forked repository via email.

*Evaluation Criteria*

* Functionality: Does the app meet the requirements and work error-free?
* Code Quality: Is the code well-structured, modular, and easy to understand?
* API Design: Did you design the API in a RESTful way? Is error handling and validation effective?
* Frontend Design: Is the frontend user-friendly, responsive, and visually appealing?
* Git Usage: Are your commits meaningful and code changes well-tracked?
* Documentation: Are instructions provided for setting up the app on a new machine?

Use this opportunity to showcase your skills. If you see fit, add extra features or improvements.

Please note that this test aims to be completed in a few hours. However, quality work is more important than speed. If you have questions, feel free to email us.

Best wishes, and we're excited to review your submission!

Regards,
The Duda Solutions Engineering Team

## Add any instructions to get your submission running below this line.

The application uses nodemon for the backend and Vite for the frontend.

To run it, you'll need to open two terminals:

1. In one terminal in the root of the application, run ```npm run dev```
2. In the other terminal, navigate to the frontend directory by running ```cd frontend``` and then run ```npm run dev``` as well

With this, the back and frontend will be running simultaneously. In the frontend terminal, simpy type ```o``` and hit enter to open the app in your browser. You'll ba able to interact with the application from there.