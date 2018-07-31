## Quick Start
---
### RUN BACKEND SERVER 
:: Task-management-back-end-code
#### `npm install`
#### `npm start`
---
After BACK-END server running...

### RUN FRONTEND SERVER 
:: Task-management-front-end-code
#### `npm install`
#### `npm start`
##### Open [http://localhost:8080/#/project](http://localhost:8080/#/project) to view it in the browser.
---

### Code Testing
#### `npm install --dev`
#### `npm test`
---

### Build Code

#### `npm run build`

Builds the app for production to the `build` folder.

---

## WORK FLOW

- Start BackEnd server : `npm start`
- Start FrontEnd server : `npm start`
- FrontEnd Server load projects data from BackEnd using `loadProjects()` when it's start.
- When User add project or add task or add new member or task status or swap cards from one column to other column then first update or add data on backend server and BackEnd server update database after BackEnd server responce Redux will update or add data according this event.
---
