## Application Process Flow

1. User requests a new web page.
2. Browser loads the page assets.
3. Extension scans/parses the scripts and the DOM:
 - analyzes scripts according to criteria; each criterion represents a different way for a script to capture the user's private information
4. Extension displays information to the page:
 - inserting new elements in the page
 - and/or modifying existing elements in the page

## Overall Design Pattern

The design pattern chosen is Model-View-Controller (MVC).

The **model** consists of the collection of third-party scripts.

The **view** is the set of information displays shown to the user in the page.

The **controller** updates the information displays with third-party scripts' activities.

## Design Diagrams

[Initial CRC](./CRC_16_02_10.png)



