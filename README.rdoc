#Display Box

https://display-box.herokuapp.com/

##Description

Display Box is a "What you see is what you get" Image Collage tool. Users make their display by creating "frames", which hold the user's images. The frames are movable and resizable, as are the images that are placed within. The user can use the draggable control panel to control the functionality of frames and images, locking their proportions or locking them in place to prevent from dragging or resizing the wrong element.

A user can create an account at Display Box in order to save the displays they are currently working on for later editing. The database will save every aspect of a user's display, including the images placed within frames.

When the user is satisfied with their display, they can render HTML code to recreate their display on the web. At this time, the editor only creates a stand-alone HTML document which will recreate the display, with sizing and positioning faithfully reproduced. At a later time, I hope to add new options to render different pieces of code, so more advanced users can integrate their displays into pre-existing web documents.

##Technologies Used

Display Box's functionality is accomplished primarily through front-end JavaScript, using jQuery and the jQuery UI Library (https://jqueryui.com/). The back-end is a simple Ruby on Rails application, using Active Record to maintain its database.
