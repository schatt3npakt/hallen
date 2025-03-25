# Hallen

Hallen is a framework for visual novels based on html, css and js.

## Project structure

- **core** framework code
  - **html**
    - **views** template code for the application main views
  - **js**
    - **classes** business logic and OOP classes
    - **constants** variables and constants
    - **utils** utility functions and helpers
- **scenes** game code and scenes
- **index.html** main app document

## Vision

Hallen can be used to create accessible, responsive web-based visual novels.
The games are composed of scenes, which link to new scenes. A scene is composed of a visual and dialogue. At the end of a scene, it navigates to a new scene or presents a couple of dialogue options which each leads to a new scene.

## Concept

### Views

- Title
- Loading
- Main Menu
- Save Menu
- Options
- Game view

### Persistence

- Game progress and settings are persisted in indexed DB
- the game creates two stores: system and saves
- system is for app settings
- saves is for savestates of the game

### Scenes

Scenes are the individual units a story is created from. Scenes are saved as .html files.
A scene can have the following parts:

- A visual, the main image of the scene
- A dialogue, an interactive series of texts whose contents are displayed in a text box
- A BGM which is played upon entering the scene.

### Dialogue

Dialogues tell the main part of the story. They are series of texts displayed in a text box one after another.
Dialogue texts can have the following elements:

- An image, for example the image of the speaker
- Text which is displayed in the text box
- A sound which is played upon showing the text.
