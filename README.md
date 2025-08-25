# HealthiMart

HealthiMart is an interactive educational project designed to make nutrition engaging and fun. Through a game-like shopping experience, users explore different food groups, select items, and receive feedback on the nutritional balance of their choices.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

### Built with:
* [![Next][Next.js]][Next-url] 
* [![React][React.js]][React-url]
* [![Javascript][Javascript.js]][Javascript-url]
* [![CSS][CSS.com]][CSS-url]
* [![HTML][HTML.com]][HTML-url]

### Demo

<div align="center"> 
  <img src="./healthimart-demo.gif" alt="screenshot" />
</div>

### Features

- food pyramid-like menu
- food item pop-up nutrition information on hover
- ratings based on nutrition value of meal and reference daily intake for the average adult (see [below](#acknowledgements))
- best and worst choice from your selected items
- one-time backend API call that loads the nutrition data for food items

### Color Codes
![Primary](https://img.shields.io/badge/Primary%20Color-7A824F?style=for-the-badge)
![Secondary](https://img.shields.io/badge/Secondary%20Color-48502F?style=for-the-badge)
![Accent](https://img.shields.io/badge/Accent-F7EFDA?style=for-the-badge)

### Project Structure

```yaml
HealthiMart/
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── backend/
│   └── load-data.py          # One-time CalorieNinjas API call
├── public/
│   └── assets/
│       └── images/           # All the food item images here
└── src/
    ├── main.jsx              # React entrypoint
    ├── App.jsx               # Routes & layout
    ├── Boundary.jsx          # Debugging
    ├── routes/
    │   ├── Home.jsx          # Starting screen
    │   ├── Menu.jsx          # Group hover menu (6 food groups)
    │   ├── FoodRack.jsx      # 3 rows of items for selected group
    │   ├── Basket.jsx        # “Shopping cart” screen
    │   └── Summary.jsx       # Nutrition facts receipt + star rating
    ├── components/
    │   ├── FoodGroupMenu.jsx # Hoverable transparent menu
    │   ├── FoodItemCard.jsx  # Displays item in rack & pop-up info
    │   ├── HeaderBar.jsx     # Header bar displaying app name
    │   ├── NutrientList.jsx  # Macros & micros display
    │   ├── StarRating.jsx    # 0–5 stars component
    │   └── Button.jsx        # Reusable button
    ├── context/
    │   └── MealContext.jsx   # Tracks selected items & nutrient totals
    ├── data/
    │   ├── food-items.js     # Loading raw JSON data
    │   └── meta-data.json    # Food item data (from CalorieNinjas API)
    ├── hooks/
    │   └── useNutritionCalc.js # Calculates totals, deficits, excesses, ratios
    ├── styles/
    │   ├── Basket.css
    │   ├── Button.css
    │   ├── FoodGroupMenu.css
    │   ├── FoodItemCard.css
    │   ├── FoodRack.css
    │   ├── Home.css
    │   ├── Menu.css
    │   ├── NutrientList.css
    │   ├── StarRating.css
    │   └── Summary.css
    └── utils/
        ├── nutrientHelpers.js # Formatting and comparison logic
        └── storage.js        # Basket persistence in localStorage
```

<p align="right">(<a href="#HealthiMart">back to top</a>)</p>

## Getting Started

### Prerequisites

Make sure you have `node.js` and `npm` installed:

```bash
node -v
npm -v
```

To install npm and node.js, visit [https://nodejs.org/en/download](https://nodejs.org/en/download)

### Installation

1. Clone the repository

```bash
git clone https://github.com/vienna601/HealthiMart.git
cd HealthiMart
```

2. Install dependencies

```bash
npm install
```

3. Change git remote URL to avoid accidental pushes to base project

```bash
git remote set-url origin <your_repo_url>
```

4. Confirm the change

```bash
git remote -v
```

### Usage

Start the app in development mode:

```bash
npm run dev
```

Then open `http://localhost:5173/` to see HealthiMart in action!

<p align="right">(<a href="#HealthiMart">back to top</a>)</p>

## Contributors

| Team member | Roles |
|------------|----------|
| Vienna | Food Rack, Basket, Summary, Backend/food data, hooks/utils/context|
| Angela  | Home, Menu, Basket, Summary, UI/UX Design, styling and aesthetics |

<p align="right">(<a href="#HealthiMart">back to top</a>)</p>

## Contact

Vienna Zhao - [GitHub](https://github.com/vienna601) - [LinkedIn](https://www.linkedin.com/in/vienna-zhao-207b402b5/) - [vienna.sw.chiu@gmail.com](vienna.sw.chiu@gmail.com)

Angela Ho - [GitHub](https://github.com/Angelaho1128) - [LinkedIn](https://www.linkedin.com/in/angela-ho-a08a10304/) - [hocheukwing1128@gmail.com](hocheukwing1128@gmail.com)

Project Link: https://github.com/vienna601/HealthiMart

<p align="right">(<a href="#HealthiMart">back to top</a>)</p>

## Acknowledgements

[Daily Value on the Nutrition and Supplement Facts labels](https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels)

> U.S. Food and Drug Administration

[Reference Daily Intake](https://en.wikipedia.org/wiki/Reference_Daily_Intake)

> Wikipedia

[How much Sodium Should I Eat Per Day?](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/how-much-sodium-should-i-eat-per-day)

> American Heart Association

[Get to Know Carbs](https://diabetes.org/food-nutrition/understanding-carbs/get-to-know-carbs)

> American Diabetes Association

[Daily Diet Composition Charts for Carbs, Protein, and Fat](https://www.verywellfit.com/daily-diet-composition-calculator-charts-carbs-protein-fat-3861072)

> VeryWellFit

[CalorieNinjas Docs](https://calorieninjas.com/api)

[Flaticon](https://www.flaticon.com/)

[Readme Template 1 - othneildrew](https://github.com/othneildrew/Best-README-Template)

[Readme Template 2 - Louis3797](https://github.com/Louis3797/awesome-readme-template?tab=readme-ov-file)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Javascript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[CSS.com]: https://img.shields.io/badge/CSS-639?style=for-the-badge&logo=css&logoColor=fff
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[HTML.com]: https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
