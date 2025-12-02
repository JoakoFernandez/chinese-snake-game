# 中文蛇 Chinese Snake Game

A fun and educational Snake game to learn Chinese characters and their English translations. Inspired by Google Snake with three different game modes.

## Features

- 🎮 Three game modes:
  - **Character → English**: See Chinese characters, eat English translations
  - **English → Character**: See English translations, eat Chinese characters  
  - **Mixed Challenge**: Random questions both ways
- 🐍 Smooth snake movement with direction queuing
- 🍎 Apple-styled word boxes with leaves and stems
- 📚 100+ Chinese vocabulary words
- ⏸️ Auto-pause after correct answers
- 💀 Educational feedback on wrong answers

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Installation

### 1. Clone or Download the Project
```bash
git clone <your-repo-url>
cd chinese-snake-game
```

Or download and extract the ZIP file.

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Tailwind CSS and Related Packages
```bash
npm install -D tailwindcss@3.4.1 postcss autoprefixer
```

### 4. Configure Tailwind

Create `tailwind.config.js` in the root directory:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js` in the root directory:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. Update CSS

Edit `src/index.css` and replace all content with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Add Background Image (Optional)

Place your background image in the `public` folder:
```
public/background.jpg
```

If you don't have a background image, the game will use a default color.

### 7. Run the Development Server
```bash
npm run dev
```

The game will open at `http://localhost:5173`

## How to Play

### Controls
- **Arrow Keys**: Move the snake (Up, Down, Left, Right)
- The snake automatically moves forward

### Rules
- Eat the correct answer (character or translation)
- Wrong answer = Game Over
- Hitting walls = Game Over
- Hitting yourself = Game Over
- Game pauses for 3 seconds after each correct answer

### Game Modes

1. **Mode 1: Character → English**
   - A Chinese character appears at the top
   - Find and eat the correct English translation

2. **Mode 2: English → Character**
   - An English translation appears at the top
   - Find and eat the correct Chinese character

3. **Mode 3: Mixed Challenge**
   - Random mix of both modes
   - Most challenging!

## Building for Production

To create a production build:
```bash
npm run build
```

The optimized files will be in the `dist` folder.

To preview the production build:
```bash
npm run preview
```

## Project Structure
```
chinese-snake-game/
├── public/
│   └── background.jpg      # Background image (optional)
├── src/
│   ├── App.jsx            # Main game component
│   ├── index.css          # Tailwind CSS imports
│   └── main.jsx           # React entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Vocabulary

The game includes 100+ common Chinese words covering topics like:
- Places (school, library, store)
- Time (noon, afternoon, day)
- Actions (eat, write, sing)
- Directions (near, far, here, there)
- And much more!

## Troubleshooting

### Colors not showing
1. Make sure Tailwind is installed: `npm install -D tailwindcss@3.4.1`
2. Check that `postcss.config.js` and `tailwind.config.js` exist
3. Verify `src/index.css` has the `@tailwind` directives
4. Restart the dev server

### Background not loading
- Ensure `background.jpg` is in the `public` folder
- Check the filename matches exactly (case-sensitive)
- Try using a different image format (PNG, JPEG)

### Arrow keys scroll the page
- Click inside the game area first
- The game prevents default arrow key behavior when focused

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **JavaScript**: Game logic

## Credits

- Inspired by Google Snake
- Chinese vocabulary for language learners
- Built with ❤️ for education

## License

MIT License - feel free to use and modify for your own projects!

## Contributing

Contributions are welcome! Feel free to:
- Add more vocabulary
- Create new game modes
- Improve the UI
- Fix bugs

---

Enjoy learning Chinese while playing! 🐍🇨🇳
