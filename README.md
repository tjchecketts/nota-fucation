WHAT NOTA-FUCATION IS:
- Awesome toast notification package with 0 dependencies (super light weight)!
- Quick and easy to setup and use
- Minimalistic impact on your code
- Native web components implementation for fully isolated styling and functionality

USAGE NOTES:
- How to create and throw event
- Parameters on the event

USAGE EXAMPLES:
- React

Although this library is written in native web components, it works great in React as well! It just requires a little setup.

1. Install nota-fucation into your project
```
npm i --save nota-fucation
```
2. Place a script tag in your public index.html file that imports Nota-Fucation's index.js. Place the import in your <head> tag, for example:
```
<script src='./nota-fucation/index.js' type='module'></script>
```
3. In the same file (index.html), place this inside your <body> tag.
```
<nota-fucation></nota-fucation>
```
This inserts a shadow dom into your dom, which listens for your notaToast events.
4. In any react js/jsx file, create an event of type "notaToast" and add parameters you want, such as a custom message. Here's an example:
```
import React from 'react';
import './App.css';

const handleClick = () => {
  const notafucation = new Event('notaToast');
  notafucation.position = "bottom-middle";
  notafucation.message = "What a wonderful Nota-Fucation";
  document.dispatchEvent(notafucation);
}

function App() {
  return (
    <div className="App">
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

export default App;
```

5. Enjoy your many reactified Nota-Fucations!

- Vue
```
Coming soon
```
- Vanilla JS
```
<form onsubmit="event.preventDefault(); let a = new Event('notaToast'); a.message = 'asdf asdf '; a.class='success'; document.dispatchEvent(a);">
  <button type="submit">Success</button>
</form>
...
<nota-fucation></nota-fucation>
```