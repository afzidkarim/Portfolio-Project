<h1>ASMOUAL JIGSAW </div><img src="https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/2bdb1d7e-423a-49ee-8e7f-9c5368beae2c" width="35px" height="32px"></h1>
<div align="center">
<img src="https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/0b52c9b4-5b35-4156-8657-ba9abc57eefb" width="550px" height="250px" ></div>
</div>


## Table of Contents
1. [Introduction](#introduction)
2. [What is ASMOUAL JIGSAW?](#what-is-asmoual-jigsaw)
3. [Target Groups](#target-groups)
4. [Technology Stack](#technology-stack)
5. [Puzzle Generation Logic for Image Dissection](#puzzle-generation-logic-for-image-dissection)
6. [Interactive Landing Page Showcase](#interactive-landing-page-showcase)
7. [Interactive Game Interface Showcase](#interactive-game-interface-showcase)
8. [Jigsaw Puzzle Game Features](#jigsaw-puzzle-game-features)
9. [Congratulations Screen Overview](#congratulations-screen-overview)
10. [Mobile Orientation Reminder Overview](#mobile-orientation-reminder-overview)
11. [A Simple Addition to the Fun](#a-simple-addition-to-the-fun)
12. [Conclusion](#conclusion)

## Introduction

Welcome to **ASMOUAL JIGSAW** your new digital destination for immersive jigsaw puzzle experiences. Designed with passion and precision, this platform offers a seamless blend of tradition and innovation. Dive into a world where captivating images meet intuitive gameplay, tailored to challenge and delight puzzle enthusiasts of all levels. Experience the joy of puzzle-solving like never before with **ASMOUAL JIGSAW**.


## What is ASMOUAL JIGSAW?

**ASMOUAL JIGSAW** is a meticulously crafted digital jigsaw puzzle platform designed to elevate the puzzle-solving experience to new heights. Here's what sets it apart:

- **Customizable Difficulty Levels**: Tailor the challenge to suit your expertise, from novice to expert.
  
- **High-Quality Visuals and Animations**: Immerse yourself in stunning visuals and dynamic animations that enhance every puzzle-solving moment.
  
- **Diverse Image Library**: Explore a curated collection of images spanning various genres and themes, ensuring something for everyone.
  
- **User-Friendly Interface**: Navigate with ease through an intuitive design that prioritizes user experience.
  
- **Multi-Platform Accessibility**: Enjoy the flexibility of accessing puzzles across a range of devices, anytime, anywhere.

## Target Groups

**ASMOUAL JIGSAW** appeals to a broad spectrum of individuals, including:

- **Digital Nomads**: Those seeking a portable and engaging way to unwind during their travels.
  
- **Brain Training Enthusiasts**: Individuals interested in enhancing cognitive skills and memory through stimulating puzzles.
  
- **Gift Shoppers**: Those looking for a unique and thoughtful gift for friends or family members of all ages.
  
- **Therapeutic Users**: Individuals using puzzles as a therapeutic tool for relaxation and stress relief.

## Technology Stack

### Frontend:

- **HTML**: 
  Utilized for semantic structuring of the web pages.
  
- **CSS (Tailwind CSS)**: 
  Employed for scalable and maintainable styling of the user interface components. Tailwind CSS facilitates rapid UI development with its utility-first approach.
  
- **JavaScript (Vanilla JS)**:
  Implemented for client-side scripting to enhance interactivity, handle user events, and orchestrate the core puzzle mechanics.

### External Dependencies:

- **Google Fonts**: 
  Integrated for incorporating the 'Moul' font, enhancing the textual aesthetics of the platform.
  
- **js-confetti**: 
  Utilized for adding celebratory confetti animations upon puzzle completion, sourced from a CDN.
  
- **Tailwind CSS CDN**: 
  Leveraged to apply Tailwind CSS styles, ensuring a responsive and visually appealing user interface.

### File Structure:

```
Asmoual_Jigsaw_Game/
├── static/
│   ├── styles/
│   │   ├── asmoual_jigsaw_styles.css
│   │   └── landing_page_styles.css
│   ├── scripts/
│   │   ├── jigsawGameController.js
│   │   ├── generateJigsawLogic.js
│   │   └── detectMobileOrientation.js
│   └── game_assets/
│       ├── game_images/
│       ├── teaser_images/
│       │   ├── footer_icons/
│       │   ├── hero_images/
│       │   └── moving_images/
│       └── preview_images/
│
├── templates/
│   ├── asmoual_jigsaw_interface.html
│   └── landing_page.html
│
└── README.md
```

## Puzzle Generation Logic for Image Dissection

The **ASMOUAL JIGSAW** game employs a sophisticated approach to dissecting uploaded images into multiple, interlocking puzzle pieces. The underlying logic for this puzzle generation and image dissection process is as follows:

1. **Grid Calculation**: Upon receiving an image, the `generateJigsawLogic.js` script calculates the necessary dimensions for the puzzle grid based on the selected difficulty level. This computation determines the number of rows and columns required to segment the image effectively.

2. **Edge Detection**: For each potential puzzle piece, the script performs edge detection to identify its surrounding edges. These edges are crucial for determining how individual pieces will connect with one another. Based on the continuity of the image, each edge is categorized as either connectable or non-connectable.

3. **Image Segmentation**: Leveraging the identified edges, the script segments the original image into distinct puzzle pieces. This segmentation process ensures that each piece contains the necessary image details to allow for a coherent and seamless reassembly.

4. **Randomization**: To introduce variability and complexity into the puzzles, the script incorporates a randomization feature. This feature slightly alters the shapes and dimensions of the puzzle pieces within the established grid, enhancing the overall challenge and diversity of the puzzles.

5. **User Interaction**: The `jigsawGameController.js` script complements the dissection logic by managing user interactions with the puzzle pieces. It enables players to manipulate and position the pieces through drag-and-drop actions, providing real-time feedback to enhance the gaming experience.


## Interactive Landing Page Showcase
<div align="center">
  <img src="https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/490313e7-12b4-47cc-815b-fed3bc525b01"  width="850px" height="450px" ></div>
</div>


The landing page for ASMOUAL JIGSAW is meticulously designed, effectively blending visual elements with descriptive content to provide visitors with a comprehensive understanding of the platform's capabilities. The structured layout ensures easy navigation and readability. The inclusion of animated moving images adds a dynamic flair, enhancing user engagement and underscoring the platform's innovative approach to jigsaw puzzle gaming.


<div align="center">
  <img src="https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/512ea65d-b043-4224-869f-cabbfd49b09b" width="850px" height="550px" ></div>


**Game Preview Section:**
This section allows users to select a puzzle for playing. Users can easily navigate to a specific puzzle by clicking on its corresponding image. For a seamless experience, simply touch any image to be directed to the desired puzzle page.

**Play Now Button:**
Located below the puzzle preview grid, the "Play Now" button encourages immediate gameplay. By clicking this button, users are taken to the game interface.

**Footer:**
You can upload any image to a page by simply touching it. There is also another option that you can use to move to the page, and below it are my social media sites:


## Interactive Game Interface Showcase

[Display.the.game.interface.webm](https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/4faec010-2a89-4c44-8f58-cfdfbe5669cd)


## Jigsaw Puzzle Game Features

- **Image Selection**: 
  - Import images from direct links or local downloads.
  - Seamless UI: Automatic hide of input methods post image selection.
  - Error Handling: Notifies users of invalid image links.

[Show.errors.webm](https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/858a207f-9c02-4021-9887-c3b7c67e0c3a)


- **Gameplay Options**: 
  - Choose puzzle difficulty levels.
  - Shuffle & Solve: Intuitive tile shuffling mechanism.
  - Timer: Real-time gameplay duration tracking.

- **User Assistance**: 
  - Quick access help guide for game instructions.

- **Navigation**: 
  - Exit feature for easy return to the landing page.


## Congratulations Screen Overview

[Congratulations.webm](https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/3f59b250-0a2c-4fda-8f8d-25a88146ea28)


The "Congratulations" screen is an integral part of the game, designed to provide feedback and celebrate the player's success upon completing the puzzle. Here's a breakdown of its components and functionalities:

### Trophy Images
- **Gold Cup**: Awarded to players who complete the puzzle in under a minute.
- **Silver Cup**: Awarded to players who complete the puzzle between 1 and 2 minutes.
- **Bronze Cup**: Awarded to players who take longer than 2 minutes to complete the puzzle.

### Displayed Information
- **Elapsed Time**: Shows the total time taken to complete the puzzle.
- **Score**: Represents the player's performance based on the elapsed time.
- **Moves**: Displays the total number of moves made by the player to complete the puzzle.

### Interactive Buttons
- **Continue**: 
  - **Functionality**: Resumes the game allowing players to continue playing.
  - **UI Changes**: Restores the game sidebar and hamburger menu for enhanced gameplay.
  
- **Exit Game**: 
  - **Functionality**: Redirects players back to the game's landing page.

## Mobile Orientation Reminder Overview

[rotate.phone.webm](https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/d2a27970-20d2-4478-8bb4-56a44799a03c)


The mobile orientation reminder is an intuitive feature integrated into the game page to optimize the gaming experience specifically for mobile users. This section elucidates the feature's objective and its interaction methodology with the user.

- **Turning Phone GIF**: Upon accessing the game page via a mobile device, the Turning Phone GIF acts as a clear visual prompt, encouraging users to rotate their device to landscape mode to ensure an enhanced gaming experience.

- **Orientation Detection**: The system autonomously identifies the user's device category and screen orientation. When a user is on a mobile device with a screen width of 500 pixels or less and is holding the device in portrait orientation, the turning phone GIF becomes visible, signaling the need for a landscape device orientation.


## A Simple Addition to the Fun

Enhance your experience with a playful touch! As you navigate away from **ASMOUAL JIGSAW**, a friendly reminder beckons you back to continue your puzzle-solving adventure.
<div align="center">
  <img src="https://github.com/OUALIID/Asmoual_Jigsaw_Puzzle/assets/96590775/5c00f270-dff9-4e97-bf1e-3b1f3a34d67e"  width="750px" >


## Conclusion

**ASMOUAL JIGSAW** represents a harmonious blend of traditional puzzle-solving with modern digital innovation. Offering customizable difficulty levels, diverse image libraries, and high-quality visuals, the platform caters to a broad audience seeking both entertainment and cognitive stimulation. Utilizing a robust technology stack and user-friendly design, **ASMOUAL JIGSAW** provides an immersive, accessible, and visually pleasing puzzle-solving experience, making it a standout choice for puzzle enthusiasts of all levels.
</div>

