# Produce Exchange
www.produceex.herokuapp.com

A community based application that helps neighbors trade homegrown fruits and vegetables. 


# Technology:
MEAN stack application utilizing: 
Mongo db and Mongoose
Express
Angular 
Node.js


# General approach :
I wanted to solve a problem that I encounter every summer. My garden always seems to grow too much of one thing
and I am always looking to share tons of artichokes, blueberries and grapes. 
Wireframes: 

# Wireframes:
# Screenshots:

![alt text](http://res.cloudinary.com/dia36odnd/image/upload/v1465583662/Screen_Shot_2016-06-10_at_9.38.30_AM_clc5wl.png "Landing page")
![alt text](http://res.cloudinary.com/dia36odnd/image/upload/v1465583652/Screen_Shot_2016-06-10_at_9.39.25_AM_ffzx7u.png "create a post")


# Install Instructions:
1. npm install
2. in index.js change mongoose.connect to point to your local db
3. require keys for Cloudinary API and update in config settings
4. run nodemon
5. run mongod 
6. localhost:3000

# Known Issues/Future Features
- posts can be deleted without confirmatin
- currently no email validation on form
- add authentication to create a post
- implement internal email client (i.e. Mailgun)
- add Google Maps to filter items by location
- add error message when nothing is returned from the search

