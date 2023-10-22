# Exam #1: "CMSmall"

## Student: s316931 ACQUAVIVA SALVATORE 

# Server side

## API Server

### CMS management

#### Get the name of the website
- GET `/api/websiteName`
  - Request body: None
  - Response: `200 OK` (success)
  - Response body: One object containing the name of the website
  ```json
    {
      "name": "WebSite"
    }
  ```
  - Error responses: `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Add a new page

#### Update an existing page

#### Delete an existing page

#### ...

#### Update the name of the website

### User management

#### Login
  
#### Check if user is logged in

#### Logout

## Database Tables

- Table `users` - contains the registered users (user_id, email, name, surname, password, salt, admin_role)
- Table `pages` - contains all the created pages (page_id, title, author, creation_date, publication_date)
- Table `blocks` - contains all the informations about blocks related to a specific page (block_id, type, content, position, page_id)
- Table `website`- contains the name of the website (name)

# Client side


## React Client Application Routes

- Route `/`: Main page for both authenticated and not authenticated users, contain the list of all pages or only those published, depending on the Office
- Route `/login`: Login page. Once login is done, it redirects to `/`
- Route `/pages/:page_id`: Page where you can see all the details of a certain page (specified by the param 'page_id')
- Route `/addPage`: Page that allows to create a new page by submitting a specific form
- Route `/editPage/:page_id`: Page that allows to edit a certain page (specified by the param 'page_id')


## Main React Components

- `LoginForm` (in `Auth.jsx`): It's the component where the login form is rendered. It handles the login procedure invoking the appropriate API in App.jsx. LoginForm also shows an alert in case of credentials errors
- `Navigation` (in `Navigation.jsx`): It's the Navbar component. Here, the name of the website is shown, near the name of the user (if logged in) and the Login/Logout button
- ...

(only _main_ components, minor ones may be skipped)

# Usage info

## Example Screenshot

## Users Credentials

Here you can find a list of the users already registered inside the provided database.

|         email           | plain-text password |
|-----------------------|---------------------|
| marioRossi@gmail.com    | pass1            |
| luigiNeri@gmail.com    | pass2            |