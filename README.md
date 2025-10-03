# Hallen

Hallen is a framework for visual novels based on html, css and js.

## Project structure

- **core** framework code
  - **html**
    - **views** template code for the application main views
  - **js**
    - **classes** business logic and OOP classes
    - **constants** variables and constants
    - **components** html custom components
    - **utils** utility functions and helpers
- **scenes** game scenes
- **config** game configuration
- **index.css** game styles
- **index.html** main app document

## Get started

```bash
nvm use
node server.js
```

Your project will be available at http://localhost:8000

## Vision

Hallen can be used to create accessible, responsive web-based CYOA games.
The games are composed of scenes, which link to new scenes. A scene is composed of an optional visual and dialogue. At the end of a scene, it navigates to a new scene or presents a couple of dialogue options which each leads to a new scene.

## Concept

### Views

- Title
- Loading
- Save Menu
- Options
- Unlocks
- Game view

### Persistence

- Game progress and settings are persisted in indexedDB
- The game creates two stores: system and saves
- System is for app settings
- Saves is for savestates of the game

### Scenes

Scenes are the individual units a story is created from. Scenes are saved as .html files.
A scene can have the following parts:

- A visual, the main image of the scene
- A dialogue, the scenes main text.
- Choices that can lead to new scenes.
- A data object in jsonLD format that can manipulate game state and unlocks upon scene view

Examples for the different scene capabilities can be seen in the scenes folder.
