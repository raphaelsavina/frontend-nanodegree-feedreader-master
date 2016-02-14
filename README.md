# Overview

This project is a web-based application that reads RSS feeds. It uses [Jasmine](http://jasmine.github.io/) for testing.

# How-To

## Run
Open ```index.html``` in your browser. You can also use the command ```python -m SimpleHTTPServer``` in ```index.html``` directory and you should then see:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```
It means the server is up and running on your computer on port 8000. You can type http://localhost:8000/ into the address bar of a web browser to see the page.

## Run the application

The page will load and run all the test, they would be displayed at the bottom and all tests would appears green.

# Timeout Error

If any of the tests with an async callback are failling with the following error:
```
Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
```
You will need then to change the timeout value (value_in_miliseconds) in ```jasmine/spec/feedreader.js``` line 16:
```
jasmine.DEFAULT_TIMEOUT_INTERVAL = value_in_miliseconds;
```

It is set to 20 seconds to give enough time to Google Feed readers API but with some feeds, this might not be enough.

# Jasmine.Jquery

To help for tests based on DOM or on event (i.e click), Jasmine specs needs Jasmine.Jquery (```js/jasmine-jquery.js```). Source and doc here: https://github.com/velesin/jasmine-jquery.
