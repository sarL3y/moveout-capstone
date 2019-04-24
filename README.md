# MoveOut Capstone

<a href="https://moveout-capstone.herokuapp.com">MoveOut Capstone - Link to Live Site</a><br>

[![Build Status](https://travis-ci.org/sarL3y/moveout-capstone.svg?branch=master)](https://travis-ci.org/sarL3y/moveout-capstone)

This app is a service site for clients to submit request forms to the company. Hidden from the client, the company can view all request details with the option to delete them.

### Demo

Users are directed to a landing page:

<h1 align="center">
  <img src="public/img/Homepage.png" alt="Homepage" width="600">
</h1>

Users are directed to submit a request form:

<h1 align="center">
  <img src="public/img/SubmitForm.png" alt="Submit Form" width="600">
</h1>

Company/admin can use <a href="https://moveout-capstone.herokuapp.com/dashboard">Dashboard</a> to login:
<h4>Credentials:</h4> 
Username: moveoutadmin 

Password: moveoutadmin123

<h1 align="center">
  <img src="public/img/LoginPage.png" alt="Login Page" width="600">
</h1>

Company can view the dashboard to see submitted requests, with the option to delete:

<h4>Credentials:</h4> 
Username: moveoutadmin 

Password: moveoutadmin123
<h1 align="center">
  <img src="public/img/Dashboard.png" alt="Login Page" width="600">
</h1>

### API

This app uses Mongoose Schemas to create the submitted forms. A fetch call is used to retrieve the submitted forms from the dashboard.

### Technologies
* HTML with Embedded Javascript files
* CSS
* Javascript
* Node/Express
* NoSQL database with MongoDB
* Database schema Mongoose
* Testing with Mocha/Chai
* Continuous Integration with TravisCI
* Auto-deployed with Heroku

