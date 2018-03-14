# How to Use Box Art
1. Click on the boxes you want to color. Selected boxes are highlighted in black and white. Clicking them again deselects the box.
2. Pick your color hue and transparency level. Selected boxes will update as you change colors.
3. Deselect boxes manually or press clear all to deselect all boxes.

# Installing/Developing Box Art
Boxart was made with Create React App https://github.com/facebook/create-react-app
'npm install' and 'npm start' should get you up and running

# Why Is This a Thing?
1. I wanted to learn React and I'm sick of doing 'To-Do List Apps.' This is a result of reading about React for a few hours then jumping in head first.
2. I wanted to experiment with what kind of wacky drawings I could come up with if I had an unconventional drawing tool. Going in I had three expectations for this app:
* Resizing the window should warp the picture.
* The boxes should have space around them to abstract it away from looking exactly like pixels.
* Use only vanilla CSS3 and HTML5 with full range rgb colors for the boxes.

# What’s next?
1. Add a much much better color picker than manually typing in rgb colors. - Completed! Thanks to https://github.com/casesandberg/react-color
2. Allow the user to further edit the boxes and the frame.
3. Make the function used for coloring in boxes more efficient. - Completed! Topmost parent is now the only component with states and uses a single update function instead of 1 per pixel.
4. Review the 'Reactiness' of the project to see how else this project could be achieved. - Getting better (see 2)!
5. Move the project out of the create-react-app cli and into my own build process so I can host it and learn react build process stuff.
