# Tweeter Project

A Twitter clone that implements HTML, CSS, JS, jQuery and AJAX front-end, and Node, Express and MongoDB back-end.

## Screenshots
!["Screenshot of the tweet compose box"](https://github.com/kaushjonna/tweeter/blob/master/docs/compose%20tweet%20box.png)
!["Screenshot of a few tweets"](https://github.com/kaushjonna/tweeter/blob/master/docs/tweets.png)

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Using The Application

1. Once the page is loaded, click on the compose button that is present in the top right corner of your window.
2. You can immediately begin typing a tweet that is >=140 characters.
3. Once completed, press the Tweet button which will trigger the tweet to be displayed at the top of the previous tweets and presist to a MongoDB database.

## Features

- jQuery and AJAX front-end responsible for form and button event handling. 
- Backend utilizing ExpressJS, and MongoDB database broadcasting to PORT:27017.

## Dependencies

- Express
- Node 5.10.x or above
- MongoDB
