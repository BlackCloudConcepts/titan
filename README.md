License: (MIT) 
Copyright (C) 2013 Scott Gay

Titan Javascript Controls
- Titan is an ever expanding collection of javascript controls I have written to extend the typical or basic functionality of common HTML input elements, and to envision completely new controls in some cases.  These were built for specific projects of mine and I have found them to be useful as a base for each new project.  From a style perspective they can be adjusted to fit your own project and functionality if necessary can easily be adjusted as well.  Hopefully these controls provide a useful starting point to new projects for others as they have for me.  I will be continuing to add more controls that I have built on a regular basis. 

- requires jquery
- requires lowpro.jquery (for javascript OO support)

Controls:
Input Textbox Control
- Features: placeholder, validation
- Parameters: container*, placeholder*, width, validationRegex
- Exposed Actions: setValue(val), getValue(), isValid()

Dropdown Control
- Features: autoComplete, list item images
- Parameters: container*, data*, width, onchange
- Exposed Actions: setValue(val), getValue()

Toggle Control
- Features: on/off style toggle, custom on/off text
- Parameters: container*, textOn, textOff, checked
- Exposed Actions: setValue(val), getValue()

Grouping Control
- Features: grouping for multiple toggle controls
- Parameters: container*, width, values, type, onChange
- Exposed Actions: NA

Spiderweb Control
- Features: visualization of items, weighted by data order, clickable
- Parameters: container*, title, subtitle, middlePictureUrl*, middlePictureHexColor*, displayHexColor*, data*, onclick*
- Exposed Actions: NA

*** http://css3pie.com is used for IE8 support.  Make sure PIE.htc exists as the path specified in spiderweb.js.  Update if necessary.  Also excanvas.min.js is required for IE8 canvas support.

Tooltip Control
- Features: on hover info display
- Parameters: container*, width, xOffset, yOffset, text*
- Exposed Actions: hide(), show()

Button Control
- Features: customizable buttons
- Parameters: container*, buttonText*, buttonColor, buttonSize, hoverEffect, onclick*
- Exposed Actions: NA

Popup Control
- Features: resizeable, draggable, background blackout
- Parameters: container*, width, height, minWidth, maxWidth, minHeight, maxHeight, headerText*, headerExtra, content*, blackout, draggable, resizeable, resizeCallback, closeCallback
- Exposed Actions: close(), hide(), show()

Radio Group Control
- Features: radio button group with labels
- Parameters: container*, items*, selected, onchange
- Exposed Actions: setValue(val), getValue()

Checkbox Control
- Features: checkbox with label
- Parameters: container*, label, checked, onchange
- Exposed Actions: setValue(val), getValue()

Textarea Control
- Features: placeholder, no resize
- Parameters: container*, placeholder*, height, width, value, onchange
- Exposed Actions: setValue(val), getValue()

*** see index.html for usage examples of each control

Demo:
- http://titan.blackcloudconcepts.com/

GitHub:
- https://github.com/BlackCloudConcepts/titan
 
