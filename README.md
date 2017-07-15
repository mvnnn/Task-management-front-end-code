## Quick Start

Install dependency

### `npm install --dev`


RUN BACKEND SERVER :: sprinklr-gurgaon-back-end-code

### `npm start`


RUN FRONTEND SERVER :: sprinklr-gurgaon-front-end-code

### `npm start`

Open [http://localhost:3000/#/project](http://localhost:3000/#/project) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>


## WORK FLOW

- Start BackEnd server : `npm start`
- Start FrontEnd server : `npm start`
- FrontEnd Server load projects data from BackEnd using `loadProjects()` when it's start.
- When User add project or add task or add new member or task status or swap cards from one column to other column then first update or add data on backend server and BackEnd server update database after BackEnd server responce Redux will update or add data according this event.

## NOTE (ASSUMPTION)

- When User create new Project and fill no. of members data in this new project Modal and I display this no. of members as a `Total Member` but Inside that project no. of members different. My ASSUMPTION is this because In Project Modal user fill no. of members also so i think this is `Total Member` else User don't need to add no. of members because when User create new project then no. of User is 0. 
