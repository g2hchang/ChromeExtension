# Programming Resources
Since we all [have varying degrees of skills](../doc/phase1/Collaboration.md#skill-sets-table), we are collecting some programming references and resources here.

## Javascript

### For beginners
Only half of our group knows JavaScript, but they can learn it using...
- [W3Schools JavaScript Tutorials](http://www.w3schools.com/js/default.asp)
- [CSC309 lecture slides about JavaScript](http://www.cs.toronto.edu/~mashiyat/csc309/Lectures/javascript.pdf)
- [TutorialsPoint JavaScript Tutorials](http://www.tutorialspoint.com/javascript/index.htm)
- [Codeacademy](https://www.codecademy.com/learn)

### For those of us who already know JavaScript
Style and avoiding common mistakes are both important issues. We should read over the W3Schools entries on:
- [JavaScript Conventions](http://www.w3schools.com/js/js_conventions.asp)
- [JavaScript Best Practices](http://www.w3schools.com/js/js_best_practices.asp)
- [JavaScript Mistakes](http://www.w3schools.com/js/js_mistakes.asp)

## Chrome Extension API
The documentation for making Chrome extensions is quite good, check out the [getting started page](https://developer.chrome.com/extensions/getstarted) and the more detailed [overview page](https://developer.chrome.com/extensions/overview). To modify the DOM we'll need to use [content scripts](https://developer.chrome.com/extensions/content_scripts).
The content scripts have very limited privileges. For instance they do not have access to the **chrome.\*API**. The extension scripts do have access to the **chrome.\*API**, and we must use [Message Passing](https://developer.chrome.com/extensions/messaging) in order to get data that is accessed through the **chrome.\*API** to be displayed in the web page.

## Miscellaneous
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [In-browser Markdown editor](https://stackedit.io/)

### Eclipse Setup
- install JavaScript Development tools in Eclipse (Go to Help -> Install New Software, choose All Avialable Sites and search for it)
- the [Moonrise UI Theme](https://github.com/guari/eclipse-ui-theme#installation) is pretty cool, it makes it look like kind of like IntelliJ
