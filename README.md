# Produce Exchange
www.produceex.herokuapp.com

A community based application that helps neighbors trade homegrown fruits and vegetables. 

# Screenshots:

![alt text](http://res.cloudinary.com/dia36odnd/image/upload/v1465583662/Screen_Shot_2016-06-10_at_9.38.30_AM_clc5wl.png "Landing page")
![alt text](http://res.cloudinary.com/dia36odnd/image/upload/v1465583652/Screen_Shot_2016-06-10_at_9.39.25_AM_ffzx7u.png "create a post")

# Technology:

MEAN stack application utilizing: 

* *Mongo* and *Mongoose*, database 
* *Express*, back-end app
* *Angular*, front-end framework 
* *Node.js*, server


# General approach :
I started by creating wireframes and the user story. After the user story was finished I build the basic skeleton of the app using Node.js and installed and imported all needed dependencies/modules (Express, Router, bodyParser, path, Mongoose and Angular). After I tested that Angular and all other dependencies were working I proceeded to integrate the Cloudinary API (to upload pictures) and its endpoints. In the next step I created the models using Mongo and Mongoose, then tested saving and retrieving data from the database. After all the parts were working I created the routes I would need for full CRUD functionality. The last part I worked on was the styling utilizing the Bootstrap library, Angular UI, and CSS. 
And finally I deployed to Heroku using mLab as my database service.

# Wireframes & User Story:
 I wanted to solve a problem that I encounter every summer. My garden always seems to grow too much of one thing and I'm always looking to share and trade my artichokes, blueberries and grapes. My neighborhood has an active facebook blog where we are able to share things we no longer need or post any neighborhood alerts. This app is specifically for produce items only and gives users the choice to check and see what's available whenever they want (without getting daily alerts for everything in the facebook group).

https://ninjamock.com/s/TSWFD

# Install Instructions:
1. npm install
2. in index.js change mongoose.connect to point to your local db
3. require keys for Cloudinary API and update in config settings
4. run nodemon
5. run mongod 
6. localhost:3000

# Known Issues/Future Features
* posts can be deleted without confirmatin
* currently no email validation on form
* add authentication to create a post
* implement internal email client (i.e. Mailgun)
* add Google Maps to filter items by location
* add error message when nothing is returned from the search

