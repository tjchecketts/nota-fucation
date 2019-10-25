# WHAT NOTA-FUCATION IS
- Awesome toast notification package with 0 dependencies (super light weight)!
- Quick and easy to setup and use
- Minimal impact on your code
- Native web components implementation for fully isolated styling and functionality

# INSTALLATION

1. Install nota-fucation into your project
```
npm i --save nota-fucation
```
2. Place a script tag in your public index.html file that imports Nota-Fucation's index.js. Place the import in your <head> tag, for example:
```
<script src='path/to/nota-fucation/index.js' type='module'></script>
```
3. In the same file (index.html), place this inside your <body> tag. For it to display appropriately over all other content, it should be right before the close body tag </body>
```
<nota-fucation></nota-fucation>
```
Let us handle the rest. Our component and shadow dom listen for your notaToast events and will position everything appropriately.


# USAGE NOTES
There are two main ways to open a toast, the first requires no special code or requires aside from the install instructions above.
Simply create a new `Event`, set the supported properties on the object, and dispatch that Event to the DOM. The second method uses some small helper functions we've included for convenience, but all they do is wrap the creation and dispatch into a handy one-liner function. For our examples below we only show off the first method which is ultimately more flexible.

## Supported properties on events

|  property name  | effect                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| message         | text you'd like to display on the toast                                                                                                    |
| hideCloseButton | show/hide the close button on the toast                                                                                                    |
| maxTime         | milliseconds the toast will display before auto closing                                                                                    |
| class           | the type of toast to display, one of ["danger", "warn", "info", "error", "success", "failure"]                                             |
| position        | which corner the toast will be anchored to, one of ["top-left", "top-middle", "top-right", "bottom-left", "bottom-middle", "bottom-right"] |

# USAGE EXAMPLES
## React

Although this library is written in native web components, it works great in React as well! It just requires a little setup.
1. In any react js/jsx file, create an event of type "notaToast" and add parameters you want, such as a custom message. Here's an example:
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

2. Enjoy your many reactified Nota-Fucations!

## Vue
```
Coming soon
```
## Vanilla JS
```
<form onsubmit="event.preventDefault(); let a = new Event('notaToast'); a.message = 'asdf asdf '; a.class='success'; document.dispatchEvent(a);">
  <button type="submit">Success</button>
</form>
...
<nota-fucation></nota-fucation>
```
# CONFIGURATION
## changing the defaults


## Styling your toasts
Until the ::part and ::theme CSS standards are finished and implemented we offer styling through CSS variables. Our variable names are long yes, but we are opting for clarity over brevity.

The variables provided follow the pattern `--nota-{type}-{property}` where we tried to keep the properties names consistent with the property it affects. For example `--nota-warn-border-color` will change the `border-color` property of the _warn_ event toasts. In addition, the `--nota-default...` properties will set that value for *ALL* toasts unless overridden for the specific type.

Where sub elements are affected another segment is added to the variable name to indicate the section of the toast affected. (e.g. `--nota-warn-progress-background-color`)

Additional customization is planned, we're just evaluating what properties it makes sense to expose. With everything having to be CSS variables right now exposing more means lower performance so we want to only expose what is needed.

|           css variable          |           effect            |   toast type   |
| ------------------------------- | --------------------------- | -------------- |
| --nota-button-background-color  | button background color     | all            |
| --nota-button-text-color        | button color                | all            |
| --nota-default-color            | color                       | undefined      |
| --nota-default-border-color     | border-color                | undefined      |
| --nota-default-background-color | background-color            | undefined      |
| --nota-default-progress-opacity | progress bar opacity        | undefined      |
| --nota-default-progress-color   | progress bar color          | undefined      |
| --nota-danger-color             | color                       | danger         |
| --nota-danger-border-color      | border-color                | danger         |
| --nota-danger-background-color  | background-color            | danger         |
| --nota-danger-progress-opacity  | progress bar opacity        | danger         |
| --nota-danger-progress-color    | progress bar color          | danger         |
| --nota-failure-color            | color                       | failure        |
| --nota-failure-border-color     | border-color                | failure        |
| --nota-failure-background-color | background-color            | failure        |
| --nota-failure-progress-opacity | progress bar opacity        | failure        |
| --nota-failure-progress-color   | progress bar color          | failure        |
| --nota-warn-color               | color                       | warn           |
| --nota-warn-border-color        | border-color                | warn           |
| --nota-warn-background-color    | background-color            | warn           |
| --nota-warn-progress-opacity    | progress bar opacity        | warn           |
| --nota-warn-progress-color      | progress bar color          | warn           |
| --nota-success-color            | color                       | success        |
| --nota-success-border-color     | border-color                | success        |
| --nota-success-background-color | background-color            | success        |
| --nota-success-progress-opacity | progress bar opacity        | success        |
| --nota-success-progress-color   | progress bar color          | success        |
| --nota-info-color               | color                       | info           |
| --nota-info-border-color        | border-color                | info           |
| --nota-info-background-color    | background-color            | info           |
| --nota-info-progress-opacity    | progress bar opacity        | info           |
| --nota-info-progress-color      | progress bar color          | info           |
