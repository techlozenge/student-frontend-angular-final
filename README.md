# Angular 5 Goodness CRUD Administration System

# Description:
This project administers a relatively straightforward school database.

The application leverages a MySQL database accessed via API calls to a separate Sails framework. The API calls are made via HTTP web requests to Sails which manages the CRUD operations (currently I'm running the Sails backend on my local server to simulate web API calls).

![Admin SS](./Student-Admin-SS.png)
Format: ![Admin SS](./)


# 2018-3-3: 
Converted to Angular 5 & misc. bug fixes 

# 2018-6-8: 
Styled Delete Confirm Component

# 2018-7-19: 
Injected ID number into the Delete Confirm Component

# 2018-7-23: 
Included a string along with the id in the Delete Confirm Component so the popup could include a descriptor of what's being deleted and not just an id number.

# 2018-8-3: 
Upgrading to Bootstrap 4. Temporarily removed datatables.net so ensure a clean Bootstrap 4 upgrade and styles. Added a working web search to the navigation bar.

# WIP: 
Continuing Bootstrap 4 upgrades. 
