# Pure Angular 5 Goodness CRUD Administration System (Template)

# _______________________________________________________________________________
# Description:
This project administers a relatively straightforward school database. 

Angular 5
Bootstrap 4
Uses REST

The application leverages a MySQL database accessed via API calls to a separate Sails framework. The API calls are made via HTTP web requests to Sails which manages the CRUD operations (currently I'm running the Sails backend on my local server to simulate web API calls).

* Starting the Application
    * Backend CLI: sails lift (listens on port 3700)
    * Frontend CLI: ng serve --open (listens on port 4200)

* Application Styling
    * Angular 5 
    * Bootstrap 4
    * styles.css

* Application Landing Page
    * Home

* Admin Components: 
    * Student
    * Student Form
    * Grades
    * Grades Form
    * Classes
    * Classes Form
    * Assignments
    * Assignments Form
    * Instructors
    * Instructors Form
    * Majors
    * Majors Form
    * Major-Class Cross-ref
    * Major-Class Cross-ref Form
    * Student-Class Cross-ref
    * Student-Class Cross-ref Form

* Navigation Component
    * Navigation (includes web search method in nav bar)

* Animations
    * fade-in-animation

* Service
    * data.service (all low-level API calls)

* Routing
    * routine.module

* Popup Dialog
    * delete-comfirm.component

Change log below helpful links section.

![Admin SS](./Student-Admin-SS.png)

![Admin SS Student Inq](./Student-Admin-SS-Inq.png)

![Admin SS Student Inq](./Student-Admin-SS-Edit.png)

![Admin SS Student Inq](./Student-Admin-SS-Del.png)

# _______________________________________________________________________________
# Helpful Links

[Bootstrap Bootply](http://upgrade-bootstrap.bootply.com/) (Converts BS3 to BS4)

[npmjs.com](https://www.npmjs.com/)

[Angular](https://angular.io/guide/quickstart)

[Sails](https://sailsjs.com/get-started)

[MySQL](https://www.mysql.com/)

[Regular Expressions](http://regexr.com/)

[Postman](https://www.getpostman.com/)

[PlaceHolder Images](https://placeholder.com/)

[Mozilla Developer Network](https://developer.mozilla.org/en-US/)

[Programmable Web](https://www.programmableweb.com/category/all/apis)

[MD5 Hash Generator](http://www.md5hashgenerator.com/)

[Google Hosted Libraries](https://developers.google.com/speed/libraries/)

[CSS3 Button Generator](https://www.designrush.com/resources/css3buttongenerator)

# _______________________________________________________________________________
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

## WI (August 2018)P: 
Continuing Bootstrap 4 upgrades. 
Adding simple ascending/descending table column sorts
