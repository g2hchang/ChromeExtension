# Summary

## What are we building?

We are building a browser extension that seeks to provide information to users 
about how their internet activity and private information and what information is collected through
analysing common methods of data collection such as third-party cookies.

As most websites do not charge subscription fees, the vast majority of the 
internet is supported by serving targetted ads towards users. However, many
of these users are not familiar with or knowledgable about the methods used to 
decide which ad to serve to which user. Since the development of the internet,
large-scale collection of data on users' interests and browsing habits has 
become relatively easy; moreover, this data collection can occur in ways to 
which the average user is completely unaware.

Towards the goal of raising awareness about internet privacy, this app would 
seek to present data to users in a simplified and digested way, with the option
for further explanation if desired. By giving concrete examples of how a user
is being tracked (for instance, company X knows you've visited these websites,
and done these activities on them), we might be able to explain to a basic user 
(for whom the term "cookie" is just a buzzword), what information about themselves
is being leaked to private companies through their regular habits. With this 
information, the user may make a decision (positive or negative) regarding their
habits.

It is important to note that the goal of this app is not to push users towards
using an adblocker (or not using one), but rather to simply expose information
in an understandable way, enabling a user to make an informed decision.

Similar apps, such as [Lightbeam](https://www.mozilla.org/en-US/lightbeam/) by 
Mozilla, do already exist. While the information presented by Lightbeam has a
shock value (in terms of the sheer number of third party sites involved in a 
normal browsing experience), it both perhaps too technical in its terminology 
(it is hard to know what the information means in a practical sense) and less 
than effective in its presentation, as it is difficult to see fine-grained
information.


## Who are we building this for?

According to [DailyMail UK](http://www.dailymail.co.uk/health/article-2989952/How-technology-taking-lives-spend-time-phones-laptops-SLEEPING.html), in 2015, study has been shown that average person spends more
time--around 8 hours and 41 minutes per day--on their phone or laptop than they 
do sleeping. Although every person has distinct preferences, it is likely that a 
large part of this screen time involves being connected to the Internet. Many 
people, however, are unaware that every time they visit a website, multiple third party
companies collect data on their behavior, and that this this information is used
for everything from market research to ad targetting.

People who are knowledgeable about how the Internet functions,
and how tech companies operate, are already aware of the "partnership" between third-party and first-party sites and take action accordingly. This is not our target userbase. There are many people who are not aware of the extent of third-party tracking. They would be shocked about the extent as documented in [MOTHERBOARD](http://motherboard.vice.com/read/looking-up-symptoms-online-these-companies-are-collecting-your-data); it states that searches (i.e health related queries) that people make on search-engines are being tracked and shared with third party companies.

Our web extension targets individuals who have minimal technical knowledge on how private information is collected and aggregated or how their private information is tracked online. These individuals visit a multitude of websites with the expectation that the history of their interaction with a particular website is only known by that website, but are not aware of third-party sites that also collect information about that interaction. After learning about what information is collected, the user may decide to modify their browsing habits in the interest of preserving their privacy.

Alternatively, our target user may be someone who has a vague idea that their behavior is being "tracked", but has no in-depth knowledge of who is doing this tracking, and how they are doing it. They may be dismissive of privacy concerns since they are aware that, for instance, Facebook has their personal information and they are comfortable with it. However, their opinion is based off of a very limited understanding, and this may change if they are presented with the fact that Facebook also tracks their behavior on unrelated pages.

Some potential user archtypes are presented in the file [Personas.md](./Personas.md). 

## Why will users find this useful?

This extension offers the means for users to learn about internet privacy while browsing normally.
Recently published academic papers claim that when ordinary internet users become aware of potential online
privacy risks, they change behaviourial habits when surfing the internet. By providing digested, simplified 
explanations that are clear and understandable to the layperson, we can provide information in a way that does
not overwhelm and confuse a user, and thus enables them to make an informed decision regarding their browsing habits.

As Acquisti and Grossklags discuss in "Uncertainty, Ambiguity, and Privacy"[1], people are not able to make rational decisions about protecting their privacy when they are faced with uncertainty and ambiguity. In the standard browsing environment, the person browsing receives no signals about what parties are taking what private information, and receive no information about the consequences of divulging this private information. Use of this browser extension will provide the user with the information required to dispel some of the ambiguity and uncertainty, and therefore help them make more rational decisions about their web browsing practices.


## How are we going to build the actual application?
We plan to use Javascript, HTML, and CSS as these languages are required to build an extension. We also have access to the
Chrome Extension API, some of which provide functions necessary for determining running scripts and 
metadata (i.e. cookies).
We will seek out research about the display of privacy-related information in order to design the interface for effective communication.

## What are some anticipated challenges?
Only some group members are experienced with web programming; the others need to review/"pick it up" (we put together some [resources](../../resources/programmingResources.md)). Also, no group members
have experience with Chrome Extension APIs, so everyone will need to become comfortable with these APIs.
We also need to organize meetings and divide required work in order to be productive and efficient when working on the project.
Since we have much to learn, there is a level of uncertainity on estimating how long a task will take and how
time should be allocated, until the deadline.

## How will the work be divided up?
In our [collaboration file](./Collaboration.md), we listed each members' strengths and weaknesses in skills that are relevant 
to our project. We plan to practice pair programming: one member of the pair will be stronger in one aspect than the other. This allows
the weaker member to learn from the stronger member.
We also plan to divide each pair based on actual classes/methods required (during the design phase).

## Reference
1. [Acquisti, Alessandro, and Jens Grossklags. "Uncertainty, Ambiguity and Privacy." WEIS. 2005.](../background_research/Uncertainty\,\ Ambiguity\ and\ Privacy.pdf)
