# Web Frontend Administration System

# _________________________________________________________________
# Description

This project administers a relatively straightforward database for educators.

API calls are made to specific end-points to perform CRUD activities on a backend database. The API calls are made via HTTP web requests to Sails which manages the CRUD operations (currently I'm running a Sails backend on my local server to simulate actual web API calls).

Note: This project assumes a working familiarity with Angular and its associated languages and technologies. 

* Starting the Application

    * Backend
        * I use the Sails framework to act as an API server (Not included here) 
        * From the CLI, use 'sails lift' (listens on port 3700) But as long as you're using RESTful API calls you can use any end-point api. Simply modify the frontend to match the appropriate request/response data.
        * Here are some example HTTP calls to end-points:
            * http.GET: table records listing: http://localhost:1337/student
            * http.ADD: table record: http://localhost:1337/student
            * http.GET: fetch record: http://localhost:1337/student/4
            * http.PUT: update record: http://localhost:1337/student/4
            * http.DELETE: remove record: http://localhost:1337/student/4

    * Frontend Angular CLI: ng serve --open (listens on port 4200)

* Framework
    * Angular 5 

*  Authentication
    * There is currently no authentication built into this system

* Styling
    * Bootstrap 4
    * CSS (styles.css)

* Animation
    * Angular 5 fade-in-animation

* Landing Page
    * home

* Navigation
    * navigation (includes a web search method in nav bar)

* Admin Components
    * Students
    * Student Form
    * Grades
    * Grades Form
    * Classes
    * Classe Form
    * Assignments
    * Assignment Form
    * Instructors
    * Instructor Form
    * Majors
    * Major Form
    * Major-Classes Cross-ref
    * Major-Class Cross-ref Form
    * Student-Classes Cross-ref
    * Student-Class Cross-ref Form

* Service
    * data.service (low-level API calls)

* Routing
    * routing.module

* Popup Dialog
    * delete-comfirm.component

**The Change Log is below screen shots & helpful links section**

# _________________________________________________________________
# Screen Shots

**Landing Page** 

![Admin SS](./Student-Admin-SS.png)

**Student List**

![Admin SS Student Inq](./Student-Admin-SS-Inq.png)

**Student Screen** 

![Admin SS Student Inq](./Student-Admin-SS-Edit.png)

**Delete Confirmation Dialog** 

![Admin SS Student Inq](./Student-Admin-SS-Del.png)

# _________________________________________________________________
# Helpful Links

* Stack
    * [Angular](https://angular.io/guide/quickstart)
    * [Sails](https://sailsjs.com/get-started)
    * [MySQL](https://www.mysql.com/) Hosted on my local to simulate API calls but as long as your calls are RESTful, it doesn't matter how the data is hosted.

* Libraries
    * [jquery](https://jquery.com/) jQuery is a fast, small, and feature-rich JavaScript library.
    * [Node.js](https://nodejs.org/en/) Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
    * [Bootstrap 4](https://getbootstrap.com/) Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.
        * [Bootstrap Bootply](http://upgrade-bootstrap.bootply.com/) Converts BS3 to BS4
        * [Bootstrap Select](https://silviomoreto.github.io/bootstrap-select/) utilizes Bootstrap's dropdown.js to style and bring additional functionality to standard select elements
    * [Datatables.net](https://datatables.net/) Add advanced interaction controls to your HTML tables
    * [Font Awesome](https://fontawesome.com/icons?d=gallery&m=free)

* Applications and Web Apps
    * [npmjs.com](https://www.npmjs.com/) npm is the package manager for JavaScript
    * [iTerm 2](https://www.iterm2.com/) iTerm2 is a replacement for Terminal and the successor to iTerm. It works on Macs with macOS
    * [Sequel PRO](https://www.sequelpro.com/) Database Administrator
    * [Postman](https://www.getpostman.com/) complete API development environment for API developers (performs GET, POST, DELETE, etc API calls)
    * [Homebrew](https://docs.brew.sh/) The missing package manager for macOS
    * [Gulp](https://gulpjs.com/) Automate tasks in your workflow
    * [Regular Expressions](http://regexr.com/) Pattern matching on steroids. Lots of steroids
    * [lorem ipsum generator](https://loremipsum.io/) Generate placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
    * [Loading.io](https://loading.io/) Build your own AJAX loading icons
    * [PlaceHolder Images](https://placeholder.com/) Link your page to their blank images
    * [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
    * [Programmable Web](https://www.programmableweb.com/category/all/apis)
    * [MD5 Hash Generator](http://www.md5hashgenerator.com/)
    * [Google Hosted Libraries](https://developers.google.com/speed/libraries/)
    * [CSS3 Button Generator](https://www.designrush.com/resources/css3buttongenerator)

# _________________________________________________________________
# Change Log

## 2018-3-3: 
Converted to Angular 5 & misc. bug fixes 

## 2018-6-8: 
Styled Delete Confirm Component

## 2018-7-19: 
Injected ID number into the Delete Confirm Component

## 2018-7-23: 
Included a string along with the id in the Delete Confirm Component so the popup could include a descriptor of what's being deleted and not just an id number.

## 2018-8-3: 
Upgrading to Bootstrap 4. Temporarily removed datatables.net so ensure a clean Bootstrap 4 upgrade and styles. Added a working web search to the navigation bar.

## WIP (August 2018): 
Continuing Bootstrap 4 upgrades

Added simple ascending/descending table column sorts to all tables

Implemented Font Awesome to replace the glyphicons that were dropped from BS4

Updated footer to use Bootstrap 4
