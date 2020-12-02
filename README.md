AlgoPath App 
========================
![algopath-dijkstra](https://github.com/stephenandersondev/algopath-app/blob/master/algopath-frontend/src/img/algopath-dijkstra-gif.gif?raw=true)
## About

Welcome to AlgoPath! This was developed by myself as a capstone project for the Flatiron School Software Engineering program. It is a data visualization tool for different types of pathfinding algorithms that utilizes a React frontend and a Ruby on Rails backend.

## Demo Video
https://youtu.be/sV5KLkQYRcw

## Installation

**1.** Fork and Clone this repository.

**2.** Navigate to the backend directory and run bundle install to install necessary gems:
```bash
$ bundle install
```
**3.** Migrate the database:
```bash
$ rails db:migrate
```
**4.** Start the rails server:
```bash
$ rails s
```
**5.** Navigate to the frontend directory and run npm install to install necessary modules:
```bash
$ npm install
```
**6.** Start the react server:
```bash
$ npm start
```
## Usage
You will now be brought to the login screen. Here you can create a new account or login with an existing one! 

![algopath-login](https://github.com/stephenandersondev/algopath-app/blob/master/algopath-frontend/src/img/algopath-login-gif.gif?raw=true)

After logging in, you will be brought to the main screen where you will see the visualization grid. You can move the start and end nodes to new locations, add some walls, select an algorithm, and watch it find its way to the end node.

![algopath-dijkstra](https://github.com/stephenandersondev/algopath-app/blob/master/algopath-frontend/src/img/algopath-dijkstra-gif.gif?raw=true)

You also have the ability to change the speed of the visualization, and even call upon an old visualization with the history dropdown.

 ![algopath-dfs](https://github.com/stephenandersondev/algopath-app/blob/master/algopath-frontend/src/img/algopath-dfs-gif.gif?raw=true)

I hope you enjoy learning how pathfinding algorithms work in AlgoPath! 😊