AlgoPath App 
========================
![stellar-search](https://github.com/stephenandersondev/stellar-app/blob/master/stellar-frontend/src/assets/img/search-gif.gif?raw=true)
## About

Welcome to Stellar! This app was developed by Stephen Anderson (@stephenandersondev) and Ben Looper (@BenLooper) as part of week 12 of the Flatiron School Software Engineering program. It is an educational platform for students to research, create, and present space science projects. It utilizes a React frontend and a Ruby on Rails backend.

## Demo Video
https://youtu.be/i7R7HOpHyKs

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
You should now be brought to the login screen. Here you can create a new account, create a new project for you to use for your new account, or login with an existing account! 

![stellar-login](https://github.com/stephenandersondev/stellar-app/blob/master/stellar-frontend/src/assets/img/login-gif.gif?raw=true)

After logging in, you will be brought to the home screen where you can search and browse through NASA's library of resources. When you find one that interests you, click it, then you can view its details or even add some notes and assign it to your project.

![stellar-search](https://github.com/stephenandersondev/stellar-app/blob/master/stellar-frontend/src/assets/img/search-gif.gif?raw=true)

On the project screen, you can view all the resources that have been assigned to your project. Here you can edit, delete, or even re-order them to your liking.

 ![stellar-project](https://github.com/stephenandersondev/stellar-app/blob/master/stellar-frontend/src/assets/img/project-gif.gif?raw=true)

Once you have everything to your liking, you can click the "Present Project" button to enter presentation mode and show off your project!

 ![stellar-present](https://github.com/stephenandersondev/stellar-app/blob/master/stellar-frontend/src/assets/img/present-gif.gif?raw=true)

We hope you enjoy building learning about space in Stellar! 😊