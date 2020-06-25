## Backend Challenge


### Development tool

The following tools were used for the test.
1. React and Redux (Frontend)
2. Laravel (Backend)


### Assumptions made

For the sake of the test, user authentication was implemented. 
User will be able to register and also login with the same form.
If a user tries to login with a new email address that hasn't been used, the email is registered successfully alongside the inputed password. Thus, the user is authenticated.


### Work flow

1. When a user signs in with a new email, the email address is registered successfully and authenticated 
2. On sigin, the user is redirected to the Talks page, where the user can add a Talk and view all existing Talks.
3. The user will be able to add an Attendee by navigating to the Attendees' page.
4. To add an Attendee to a Talk, navigate to the Talks page then click the view link which shows the single Talks page. User will be able to 
view the list of Attendees added to the Talk selected and also will be able to add one or more Attendees at a time to selected Talk.


### Challenges

1. The database is hosted on https://db4free.net/ which provides free mysql server. Thus, there might be a little lag in the load time when performing various actions.
2. The mobile responsiveness of the UI was not worked on due to the limited time allocated