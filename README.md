# \<bread-hydration-calculator\>

An Bread Hydration Calculator built with [lit](https://lit.dev/). See the demo here: https://www.dgendill.com/content/playbox/bread-hydration-calculators/

# Usage

Copy `dist/hydration-calculator.bundled.js` into your HTML project, then add a script to the `head` of your page.

```
<head>
    <script type="module" src="path/to//hydration-calculator.bundled.js"></script>
</head>
```

You can display the calculator with markup like this...

```html
<bread-recipe-calculator
  precision="0"
  hydration=".9"
  totalWeight="1000"
  starterWeight="230"
></bread-recipe-calculator>

<bread-recipe-calculator
  mode="getFlour"
  precision="0"
  hydration=".9"
  totalWeight="1000"
  starterWeight="230"
></bread-recipe-calculator>

<bread-recipe-calculator
  mode="getWater"
  precision="0"
  hydration=".9"
  totalWeight="1000"
  starterWeight="230"
></bread-recipe-calculator>
```

And style it with CSS, for example...

```css
bread-recipe-calculator {
  max-width:99%;
  display:block;
  font-size:inherit;
  border:1px solid black;
  padding:20px ;
  margin-bottom:20px;
  text-align:right;

  --label-width:40%;
  --label-text-align:right;
  --input-width:55%;
  --button-background:none;
  --button-border:1px solid black;
  --button-padding:5px 20px;
  --button-font-size:inherit;
  --row-margin:0 0 .5em 0;
  --controls-margin: 1em 0 0 0;
  
}
```

# Building/Development

This web component can be built by first running `npm install` followed by `npm run dev`. This will generate the distribution file
`hydration-calculator.bundled.js` in the `dist` folder.

If you'd like to edit the web component, you can run `npm run server` and navigate to http://localhost:8000/dev. After that you can edit the files in the `hydration-calculator.js` file and it will rebuild hydration-calculator.bundled.js on save.

