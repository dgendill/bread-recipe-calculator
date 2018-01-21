# \<bread-hydration\>

An HTML Bread Hydration Calculator.

# Usage

Copy `bread-hydration.html` from `/build/es6-bundled` into your project, then add a link to it in the `head`.

```
<head>
    <link rel="import" href="path/to/bread-hydration.html">
</head>
```

To use the element, just add this tag to your page.

```
<bread-hydration
  dry="100"
  liquid="90"
  precision="0"
  dry-label="Dry Weight"
  liquid-label="Liquid Weight">
</bread-hydration>
```

## Demo

Start a local server in the project root or use <a href="https://htmlpreview.github.io/?https://htmlpreview.github.io/?https://github.com/dgendill/html-bread-hydration/blob/master/demo/index.html">htmlpreview</a>.

## 

Using npm install polymer globally. Then run 

```
$ polymer build
```