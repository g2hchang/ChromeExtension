#What we built during this phase:

For this phase, we have constructed the basic "settings" page for the extension as well as the fundamental UI elements. The UI currently contains toggle-tabs and retractable banners that are meant to display relevant data to the user, such as the fact that a user-visited website knows what operating system the user is running and the number of cookies stored on the user's machine from a website. On top of this, we have also created a database that tracks and stores information from all cookies from websites a user visits. This database has the option of filtering entries between first-party and third-party cookies and thus, the extension will alert the user when a third-party cookie is being stored and where (i.e. domain name) the third-party cookie is coming from, via the aforementioned toggle-tabs.


#High-level design of our software:
(Please refer to [software architecture overview artifacts] (../software_design/architecture_overview.svg))

During this phase, we began our development process by creating a high level view of our application structure.
We first created a [CRC diagram] (../software_design/CRC_16_02_10.png) and decided to use the Model View Controller architectural pattern as it is suitable for managing and passing information to the UI. That is, the extension generates data (model), passes information (controller) to the UI for the user to see (view); the requirements naturally follow the MVC pattern.
From the CRC diagram, we decided on the following division of the application structure:

Model: The model contains all relevant data that is meant to be displayed to the user (i.e. [third-party cookie information] (../../src/main/extension/scripts/background/cookies.js)).
Controller: The controller is responsible for [passing messages] (../../src/main/extension/scripts/controller/messagepasser.js) from the model to the view to be displayed for the user.
View:  The view is responsible for acting on user interaction functionalities (i.e. enabling and disabling extension). The view updates the message being displayed based on the updated model.

The Chrome code execution sandbox is divided into 3 different environments to fit with the MVC architecture. The toolbar icon is strictly part of the view (i.e. disabling the extension), the web page section corresponds to the view and controller side as it accesses web page resources. The background corresponds to the controller and model parts of MVC. It allows us to access the chrome*.API and has storage space required for our extension. The idea is that one environment should not have the same privilege and access rights as another environment.

More details about interactions between scripts (refer to [diagram here] (../software_design/architecture_detail_03-01.png)):

[view.js] (../../src/main/extension/scripts/views/view.js), [messagepasser.js] (../../src/main/extension/scripts/controller/messagepasser.js), and [messagePassingQueue.js] (../../src/main/extension/scripts/controller/messagePassingQueue.js) are part of the controller side of the MVC framework as they take in data from the model side and display it on either the [banner] (../../src/main/extension/scripts/views/banner.js) or the [toggle-tab] (../../src/main/extension/scripts/views/infotab.js). [cookies.js] (../../src/main/extension/scripts/background/cookies.js) creates the database described above in this document. Cookies are placed in a queue so they will appear in a list when the user clicks on the information tab.

#Technical Highlights

##Interesting bugs:
- Messages were not being properly sent to the banner for display; the banner would be completely blank. This was because one message would write on top of the previous message sent.
- There was a bug that mislabelled first party cookies as third party cookies. As a result, it gave the false impression that there were two third party cookies.

##Challenges/issues and decisions made:
- We originally wanted the option to display information on the toolbar pop-up display (i.e. when you click on the extension's icon on the toolbar, the pop-up appears). We had difficulties in attempting to communicate between this display and the back-end code (model). As a result, we decided to limit the functionality of the toolbar pop-up display to include only the settings of the extension (disable extension and disable pop-ups).
- It is difficult to analyze outgoing HTTP requests from the client. It is easy to analyze responses from the server. However, every HTTP request has a User-Agent field that is sent to the server. We assumed that since an HTTP request is required for viewing any webpage, the server knows what operating system the user is using based on the sent request's header.

##Lessons learned/observations:
- Gained knowledge of how a chrome extension generally operates and how messages are passed from the backend to the view.
- Learned about how third parties collect user information from visited websites.
- We learned that we had to write similar code in two different places because of Two-Way message passing (to meet the requirements of the chrome API). Both the view and controller has to communicate with each other.

#What we are thinking to focus on for the next phase (Note: This part is flexible)
- Developing a teaching plan for what is privacy (the goal is to educate the user in progressive steps)
- Canvas Fingerprinting
- Geo-Location
- EverCookies and Cookie Syncing

#What we focused on:
- UI and displaying relevant information to the user.
- Data generation, message passing to view.
- First/third party cookie tracking.

##Open Issues:
- Create a progression of messages to educate the user.
- Highlight when cookies are syncing to share browsing history.
- Highlighting more in-depth fingerprinting.
- Highlight social network buttons and scripts (links to social media sites that actually know who you are).

##Closed Issues:
- New UI element display hidden information.
- Make a background controller file for extension.
- UI - Settings page.
- UI - Within page presentation of information.
- Ability to turn off the extension/popups from the extension.
- Showing the OS information.
- Track when cookies are sent to third-party servers.
- Show the number of all cookies on the page.
- Show the number of 3rd party scripts in the page.






