# nativescript-facebookrebound :basketball:
NativeScript plugin to use Facebook's Spring Animations for Android

### FacebookRebound Usage 
<span style="color: #de3a3a">** The .gif doesn't show how smooth this really is. **</span>
![FacebookRebound](facebookRebound.gif)

## Installation
`npm install nativescript-facebookrebound`

## Usage

### XML:
```XML
 <Image tap="springThis" height="240" loaded="picLoaded" src="~/images/deadpool2.jpg" stretch="aspectFit" />
```

### JS:
```JS
var rebound = require("nativescript-facebookrebound");

// Any tap event in NativeScript has (args) as the passed EventData.
// args.object is the View/component that triggered the tap event
function reboundThis(args) {
    // TODO - figure out the API for this...
}
exports.bangThis = bangThis; 
```