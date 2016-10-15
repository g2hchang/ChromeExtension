# January 27th - A 1.5 hour meeting

## Marc's idea
- browser extension for revealing all 3rd party scripts that are running, allows you to show what private data is being extracted on every page, different from AdBlock since it gives you information/awareness, raises awareness, all about the information, Firefox has an API for extensions, all in JavaScript
- Allan: make a text blocking service for phones
- Albert: should we also collect user data when running this plugin
- Adam: hardest part would be finding how the scripts are taking data and which scripts actually manipulate data

## Doga's Idea
- make an app for users to choose where to go out, eg. for dates, choose a budget, where you want to go (restaurant, bar, etc.) and the app owners/developers make a deal w/ the establishments, they make the reservations, etc.
- used for individuals or multiple people
- choose area, what you want to do, price range, number of people
- Adam: write a db for backend
- Marc: two different ideas, one about being a broker for restaurants, and the other is about event planning
- Doga: its directly an event planner, can also add calendar features, can plan an entire day, map features
- Marc: broad idea, we just need to focus on it a bit

## Adam's Idea
- learn regex using an app, like a game, using randomly generated text/questions, make it w/ Android, use Java regexs, aimed mainly towards CS students
- Marc: its been done before, eg. RegexGolf
- Albert: sounds doable
- Angel: its a pain to type all those regex characters on a phone

## Albert's Idea
- aim to teenagers, teach you how to drive, animations/pictures, what you would do in certain situations, understand of how driving works in a visual way, web app, app stops during a scenario and asks the questions
- Doga: its been done, we can use Google Cardboard for it (and make it an Android app), animations would be difficult

## Allan's idea
- mobile app that scrapes deadlines, tests, etc. from a course website to put everything into your calendar
- Doga: this would be useful for students
- Adam: hard part is scraping the data, every website is in a different format
- Allan: use PhoneGap instead, write plain HTML/CSS/JS and itll compile it to native code

## Angel's Idea
- building off of Allans idea, make something that scrapes course webpages and download PDFs, organize course websites into a consistent format
- most of U of T doesnt use plain HTML websites like the CS department does, they use Blackboard
- Marc: consistency in Blackboard sites
- Angel: even CS courses have some degree of consistency

## Decision
- put it to a vote? Most of us like Marcs idea, so were going with it
- challenges: biggest part is finding out the vulnerabilities/3rd party code with JS code
- Marc: we would learn a lot about browsers and how these vulnerabilities work
- we will all meet with the TA to talk about our idea

## Working methodology
- Agile techniques
- pair programming: half of us know JS, the other half does not, the best way for the beginners to learn is to pair w/ someone who knows it
- research how the Firefox plugin stuff works, for those who dont know JS maybe read up on it
- tools were using: Slack (for communication), Firefox plugin API, maybe unit testing (may be difficult), JSLint 

## Todos
- meet with the TA (Monday, Feb. 1st)
- post reading materials about JS and the Firefox plugin API on Slack
- push this (and any other additional files) to the GitHub repo when its created
- meet again on Feb. 3rd
- actually write the phase 1 .md files
