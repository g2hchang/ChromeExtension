## What is Personally Identifiable Information (PII)

This is information that could serve to identify a person. It includes the obvious stuff such as name, date of birth, and bio-metric data. It will also include any other type of data that can be used to identify a person. The [Wikipedia](https://en.wikipedia.org/wiki/Personally_identifiable_information) article includes web cookies in their list.

## Browsing History

This is not considered PII, but the point of web user identification is to link browsing history to PII. Browsing history is obtained through the use of cookies.

## Catalogue of Privacy Threats

**Fingerprinting:** collecting information about the user's machine and software; focused on obtaining the user's particular combination of User Agent (OS and browser), system fonts, and plug-ins. This is apparently an effective strategy, as the variety of possible combinations of OS, browser, system fonts and plug-ins is so great. Check out the EFF's [Panopticlick](https://panopticlick.eff.org) project for your uniqueness score.
Note that the User Agent is communicated in the HTTP request headers: when a web page is requested and with every AJAX request from additional scripts. [Wikipedia](https://en.wikipedia.org/wiki/User_agent)

**Canvas Fingerprinting:** is uses HTML5 to draw an invisible canvas element. Apparently, every computer configuration will draw it slightly differently, leading to a unique fingerprint. So far, it is undetectable by conventional tracking detection and circumvents cookie blocking. [ProPublica](https://www.propublica.org/article/meet-the-online-tracking-device-that-is-virtually-impossible-to-block) Lots more detail in this [paper](https://securehomes.esat.kuleuven.be/~gacar/persistent/index.html).

**Geo-Location:** facilitated by the user's IP address. Check out this [site](http://whatismyipaddress.com) to see how accurate it is (it located my home to within a half kilometre).

**Cookie Tracking:** is for building and sharing a user's browsing history, linked to a user's machine. Not to be confused with authentication cookies. [Wikipedia](https://en.wikipedia.org/wiki/HTTP_cookie) has an extensive article on the various uses of cookies.

**EverCookies** and **Cookie Syncing** are also explained in the same [paper](https://securehomes.esat.kuleuven.be/~gacar/persistent/index.html). It is likely that we were unwittingly observing some of this at our meeting of February 10. This [article](https://freedom-to-tinker.com/blog/englehardt/the-hidden-perils-of-cookie-syncing/) more fully explains cookie-syncing and its effectiveness.

**Spam:** Junk e-mails are digital spam and email addresses are being collected, used and disclosed email addrresses without the user's consent. Spammers can create e-mail accounts that look real and once a response is been sent; address, profile, IP address etc. can be collected by them. Check out this [site](https://www.priv.gc.ca/youth-jeunes/fs-fi/choice-choix_e.asp) for more information and learn how to protect yourself.

## [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting)
From Wikipedia: "Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS enables attackers to inject client-side script into web
   pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same-origin policy. Cross-site scripting
   carried out on websites accounted for roughly 84% of all security vulnerabilities documented by Symantec as of 2007." 
