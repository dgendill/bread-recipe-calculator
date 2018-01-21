# \<bread-hydration\>

An HTML Bread Hydration Calculator.

# Usage

Copy `bread-hydration.html` from `/build/es6-bundled` into your project, then add a <link> to it in the <head> of your page.

```
<head>
    <link rel="import" href="path/to/bread-hydration.html">
</head>
```

To use the element, just add this tag to your page.

```
<bread-hydration
  dry="Number"
  liquid="Number"
  precision="Number"
  dry-label="String"
  liquid-label="String">
</bread-hydration>
```

## Demo

Start a local server in the project root or use <a href="https://htmlpreview.github.io/?https://github.com/dgendill/html-bread-hydration/blog/master/demo/index.html">htmlpreview</a>.

## 

Using npm install polymer globally. Then run 

```
$ polymer build
```