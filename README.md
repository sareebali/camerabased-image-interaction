Introduction
This readme details the design and development of a hand recognition program, aiming to empower users to perform image operations through hand gestures and keyboard inputs. The program utilizes P5.js, a client-side JavaScript library, and ML5.js's Handpose machine learning model for hand recognition. The primary functionalities include pointing at specific image areas, freehand drawing, and selecting/copying/pasting image parts with dimension adjustments.
 
Specifications
Development Tools:
P5.js for program development
ML5.js Handpose model for hand recognition
Google Chrome browser version 119.0.6045.200 (64-bit) for testing
HP ProBook 450 G5 for testing
Features and Design
Setup

Initial display with live webcam view (left) and a static image (right).
Canvas size: 1200x500 pixels, webcam and image display size: 600x500 pixels.
Pointer

Utilizes Handpose model to detect the index fingertip.
A red circle acts as a pointer, mirroring the fingertip's movement.
Freehand Drawing

Triggered by pressing 'F' key.
Allows users to draw freely on the image using their index finger.
Exiting this mode is done by pressing the 'E' key.
Selection and Copying

Activated by pressing 'S' key.
A red bounding box appears, defined by the user's thumb and index finger.
Pressing 'C' copies the selected area; 'V' pastes it at a new location.
The copied area adjusts to the new bounding box dimensions.
Exiting this mode is done by pressing the 'E' key.
Limitations
Handpose model accuracy issues, particularly when the finger obstructs the face.
Lack of comprehensive Handpose documentation, necessitating trial and error.
Tested on a specific browser and machine; potential variations in results with different specifications.
Future Improvements
Camera View Orientation:

Flip the mirrored camera view vertically for a more natural user experience.
Enhanced Copy-Paste Functionality:

Allow users to use selection, copying, and pasting features multiple times in a session.
Dual-Hand Detection:

Explore models capable of detecting both hands simultaneously for more complex operations.
Freehand Drawing Enhancements:

Implement erasing and pausing functionalities for more versatile drawings.
Zooming Feature:

Integrate pinch actions for zooming in and out of the image.
How to Use
Open the program in a browser.
Ensure your webcam is accessible.
Use your index finger to interact with the image and perform specified operations.
Trigger freehand drawing by pressing 'F', and exit by pressing 'E'.
Activate selection mode with 'S', copy with 'C', paste with 'V', and exit with 'E'.
Feel free to explore.

Note: The program is designed to work optimally on Google Chrome; other browsers may exhibit varying results.






