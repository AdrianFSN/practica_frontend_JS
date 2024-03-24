# Your second hand store!
This is a practice for the "Frontend Development with JavaScript" module, as part of  the bootcamp "Web Development XVI Edition", by KeepCoding.

The task consists in building an application to display ads for items on sale/search.

## Live Server
The web runs in port 8080 by default.

To load and interact with it You can install and run Live Server in a node terminal:

```sh
npx live-server
```

## The API - using Sparrest
Sparrest is *"A [json-server](https://github.com/typicode/json-server) fork to enjoy developing frontend apps without a real backend, but with JWT auth"*.

Sparrest is the one providing the API and the endpoints needed to interact with the web. Please, follow the instructions in [Sparrest.js](https://github.com/kasappeal/sparrest.js). To get familiar with it.

### Setting up Sparrest
- Copy the [HTTPS URL of Sparrest repository](https://github.com/kasappeal/sparrest.js.git) and git clone it.
- Run npm install on your terminal.
- Create a db.json file in your clon of Sparrest.
- Make there an object with an empty list named "ads" as a parameter:
    ```js
    {
        ads: []
    }
    ``` 
- Sparrest will add a second parameter to this object:

    ```js
    {
        ads: [],
        users: []
    }
    ``` 
- Your web is now able to show an empty list of ads in [localhost:8080/index.html](http://localhost:8080/) and an empty JSON in [localhost:8000/api/ads](http://localhost:8000/api/ads).

## Sample file to fill the DB
In order to test the app, you can use the JSON file provided in the practice repository to fill the DB with some entities. You will find it under the folder "data" > "ads-users-db.json". Just paste the content of "ads-users-db.json" in the "db.json" file of your workspace.

## MVC pattern
Most of the assets of the web are designed by the pattern Model View Controller. You will find different folders for each available feature; each of them with files for its own model, view and controller (and style.css) as needed.

## Features
### Session
In order to manage some features, the session controller checks whether the user is logged in to the app. Depending on that, the user will see different buttons:
- Login (if the session controller can't detect a JWT token)
- Register (same as above)
- Logout (if there is a JWT token detected)
- Create ad (same as above)
- Delete ad (if the user ID returned from the token is the same than the one in the ad entity saved in the DB and returned by the API)

### Register Form 
#### http://localhost:8080/register-user.html
The tool to add new users to the data base. This form uses its own validation proccess and dispatch the subsequent error/success notifications as the user enters the requested data. Fields filled with wrong data are marked in red.

Once a new user is registered, he/she will be redirected to the login form page.

### Login Form
#### http://localhost:8080/login.html
The tool to start a session with a JWT token and start interacting with the ads.

This page also serves notifications when the login is successful or not. Once the user is logged in, redirects to the main ads list.

### Ads List
#### http://localhost:8080/index.html

It's the main panel showing the advertisements available for the customers to sell or buy.

It includes a shorter description of each item (50 chars max); it doesn't show its category; the image shown is smaller and masked in a circle. Please upload **squared images** when creating your own ads.

Clicking on each ad will redirect to its detailed view.

### Ads details
It's the extended info of each advertisement. It shows a bigger picture; the whole description; and the tags included for the category of each ad entity.

Here you can see what an ad entity is:

### The Ad Entity

According to the data returned by the API, it's a piece including:
- A name/title for the product in offer
- A price in €
- A type of offer: On sale or On search
- A description of the offered/searched product
- A category for the item from "lifestyle", "work", "motor", "mobile" or "not provided"
- An image

### Create Ad Form (Creating an Ad Entity)
#### http://localhost:8080/ad-creation.html
Once you are a registered user and you are logged in, you can create a new ad and save it.

This form also has its own validation proccess, with success/error notifications.

Some special features when creating an ad:
- You can access to the URL of this form without starting a session, but you will be redirected to the index page after 2 seconds after receiving a notification.
- Uploading images: you can only enter a URL validated by RegEx or leave that field empty. In that second case, the image of your ad will be substitued by dummy data. Please use a **squared image**.
- Setting tags: So far you can just use tags for category out of "lifestyle", "work", "mobile" and "motor". Other than this, please keep this field empty and will be filled with dummy data.

### Delete ad (button)
When accessing the Ad detail panel of an item, in case you are the owner of the advertisement, you can click on the "Delete ad" button to remove it from the web and from the data base. You will get an alert to confirm the action and success/error notifications when pushing the proccess.

### Notifications
As you can see, all the controllers for the features of the app manage success/error notifications. Those are set by the files under notifications folder and dispatched by a custom event.

### The Spinner
All the actions towards the API load a spinner during the proccess of sending/retrieving the data from the DB.

The spinner is a series of concentric circles that appear and fade away in a loop.

You can find its related files under the folder "spinner".

### Custom Events
There are three custom events and a regular one made to manage the app. You can find them under the folder "utils":

#### DispatchEvent
It's the one that triggers the notifications.

#### LoadSpinner
It's the one that triggers the spinner.

#### CheckNoToken
Used to check if the user has no token, then dispatchs a notification requesting to login. It is used in the "ad-creation" feature, when someone tries to access this screen before starting a session.

#### GoBackButton (regular event)
Used to go one page back in most of the pages.







