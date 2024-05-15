# NotesApp frontend

This React application acts as a frontend for the Notes application, it uses axios to make requests to Flask backend

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Important](#important)

## Installation

Instructions on how to set up the project locally. 

```bash
# Clone the repository
git clone https://github.com/DavidBakalov21/ReactFrontendShow

#Navigate to the root of the project and run these two commands They will run app in docker:
docker build -t react-app .
docker run -p 3000:3000 react-app
```
## Usage
To interact with fronend you can open this in browser`http://localhost:3000`.

The whole application is also available by this link: https://davidbakalov21.github.io/NotesAppFront
Flask backend is deployed to the render.com and React is deployed to github pages

## Important:
During the development, there was a requirement to sort notes by the date of creation. However it was decided to modify the date each time the user updates the note, rather than creating a new field that will represent the modified date, such a decision was taken to simplify the user's interaction with the app.

Additional functionality is the ability to create multiple accounts, so the user can have multiple accounts where he can store notes from different activities


