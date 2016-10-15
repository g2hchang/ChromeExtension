#Initial Planning

##What did we plan to build and what were our goals?

Our main goal of this phase was to achieve a minimal viable product for our extension. In the previous phase, we focused on actually gathering personal data which could be used to identify the user and learning about how the Chrome extension API works. However, for this phase, we shifted our focus to presenting the data in an accessible and educational way to the user, rather than just displaying raw data in an unorganized fashion. That is, we have decided to make the extension a tool for educating non-technical users about privacy concerns over the internet. To this end, we planned to create friendly, progressive lesson plans with different topics of interest.

More specifically, we organized our tasks into these high level goals and subgoals:

### [#16](https://github.com/csc301-winter-2016/project-team5/issues/16) Changing the user interface into a lesson-based system
This required changing the controller, and how it sends messages, as well as the banner elements themselves. Our extension now uses a lesson-based system: the user progresses to a new lesson (with an informative message about privacy issues) only after they have seen and read over the lesson which they are currently on.

#### [#30](https://github.com/csc301-winter-2016/project-team5/issues/30) , [#40](https://github.com/csc301-winter-2016/project-team5/issues/40) Changing the controller to work with a new format (Adam)
The controller which sent the information from the background scripts to the view elements needed to be adapted to a new format. Also, the current level in the lesson plan had to be saved in the extension's persistent storage. ([lessonController.js] (../../src/main/extension/scripts/controller/lessonController.js))

#### [#31](https://github.com/csc301-winter-2016/project-team5/issues/31) Changing the UI to accept lesson plan messages (Marc & Doga)
Our current banners have a button that allows showing longer messages. Clicking the same button also advances the level of the lesson plan (For example, the topic of "fingerprinting" has 3 levels).
Additionally, actual [lesson plan] (../../src/main/extension/scripts/controller/lessons.js) messages (i.e. content) were written. These convey information about private data and how it affects the user in clear, understandable, and non-technical language.

### [#45](https://github.com/csc301-winter-2016/project-team5/pull/45) Displaying third party cookie information in a user-friendly manner
In the previous phase, we developed a database which continually adds information about third party cookies. In this phase, we began to actually use and aggregate this data and present it in a way which is easy to understand (links to Display cookie information in a visual manner).

#### [#28](https://github.com/csc301-winter-2016/project-team5/issues/28), [#29](https://github.com/csc301-winter-2016/project-team5/issues/29) Displaying cookie information in a visual manner (Angel, Albert)
We have constructed [tables and bar graphs] (../../src/main/extension/scripts/infopage/infopage.js) that display the number of times, the time of day, and day of the week a user visits a website. These elements are shown in a [separate HTML page] (../../src/main/extension/infopage.html) in the extension. The idea is that these graphs and tables shed light on how other websites can learn about their browsing habits. Also, we began implementing using a graph via d3.js (in the computer science sense) to display how third-party cookies can be connected together to build a profile of a user.

#### [#27](https://github.com/csc301-winter-2016/project-team5/issues/27) A glossary page for terminology (Angel, Doga)
This is also included in the [infopage] (../../src/main/extension/infopage.html). The glossary shows the user a list of terms about Internet privacy. The idea is that while the user progresses through the lesson plans, he/she may want further clarification of certain terminology.

### Exposing additional private information tracking

#### [#9](https://github.com/csc301-winter-2016/project-team5/issues/9) Highlighting more in-depth [fingerprinting](../../resources/PrivacyGlossary.md#catalogue-of-privacy-threats) (Marc)
This has to do with seeing if a page is reading the user's plugins and fonts, which can be used to uniquely identify them.
It is accomplished by parsing the inline and downloaded scripts for specific calls that would obtain the sensitive information. 
The result is a new message that will trigger a more in-depth lesson on computer fingerprinting.

#### [#8](https://github.com/csc301-winter-2016/project-team5/issues/8) Highlighting social network buttons (Adam, Allan)
Since [Facebook and Twitter buttons can be used to track you](http://www.geek.com/news/facebook-like-button-tracks-you-even-if-you-dont-click-1380793/), we put borders around the elements (i.e. Facebook buttons) within the HTML page for all websites. We also presented information for the user (i.e. that a Facebook button can be used to track the user).

We picked these goals because we thought that the implementations contribute meaningfully to our MVP as most of these topics involve displaying information in a presentable manner. We believe that the user may not be familiar with this information, but is worth learning. 

#Re-planning & Readjustment of Goals

##What goals were not met?
We had several tasks in the backlog, which we defined last phase ([#10](https://github.com/csc301-winter-2016/project-team5/issues/10), [#7](https://github.com/csc301-winter-2016/project-team5/issues/7), [#1](https://github.com/csc301-winter-2016/project-team5/issues/1)) which we decided were not part of a MVP, and that we would not have time to implement these features.

##What went wrong?
We decided these three tasks were not part of a MVP because they all were large tasks which did not contribute directly to the idea of a user-friendly learning-based user interface. Presenting the data to the user in the right way was our main focus for this phase. Additionally, these tasks are difficult to implement (for instance, [Canvas fingerprinting](../../resources/PrivacyGlossary.md#catalogue-of-privacy-threats) is a complex process which we may not be able to accurately identify) and are out of the scope of our project.

##Improvements for the next phase
The next tasks we choose to implement should be researched slightly more thoroughly in terms of the practicality of achieving them. The issues that we discarded were good ideas, but unfortunately, were too complex and not appropriate for a MVP.
We also plan to further refine the actual content in the lesson messages to ensure that they meet the standard in terms of being meaningful and friendly to non-technical users. Finally, we plan to implement automated testing (for phase 4) to confirm that our code works as intended.

#Review and Retrospective

## What worked?
Our Git and GitHub workflow was much better this phase than in the previous phases. We learned from the mistakes of last phase (as mentioned in [process.md] (../phase2/process.md) and the [product.md] (../phase/product.md) for phase 2) and used pull-requests to our advantage: as means of code-review and ensuring that everyone's contributions worked as planned before integrating them into the extension. Also, we mainly used branches instead of pushing anything directly to master (except for some small fixes).

## What didn't work?
As of now, our code-base is growing larger in size, but we have not run thorough testing to ensure that EVERYTHING works. Also, we are reaching the point where merging branches is becoming more difficult. Different group members were working on different issues and tasks, but the files usually have close interactions with one another. As a result, after merging branches and accepting pull-requests, there were more conflicts this phase, as compared to previous phases. More time was required to resolve these conflicts. Also, since we have more code, it is typically harder to trace the conflicts and to ensure that the extension still functions after merging. Additionally, the code-base is becoming larger and larger, so it is becoming difficult for every team member to be fully comfortable with all areas of the code, and so debugging errors has become more difficult.
