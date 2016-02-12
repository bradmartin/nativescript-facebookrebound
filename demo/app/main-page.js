var app = require("application");
var platformModule = require("platform");
var color = require("color");
var Observable = require("data/observable").Observable; 
var rebound = require("nativescript-facebookrebound");

var data = new Observable({});


var Spring; // global access to our Spring when we set it in the promise success
var mMovedUp = false; // bool to keep track if we are springing UP/DOWN 

function pageLoaded(args) {
    var page = args.object; 
    page.bindingContext = data;
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow();
        window.setStatusBarColor(new color.Color("#144474").android);
    }
}  
exports.pageLoaded = pageLoaded;

function picLoaded(args) {

    // Getting the native android view (picture in this case)
    var view = args.object.android;

    // create a Rebound Spring() ( TENSION, DAMPER ) -- @returns a Spring() if successful
    rebound.createSpring(500, 10).then(function (result) {

        // Now we have a Spring to work with.
        Spring = result;       

        // called whenever the spring is updated
        rebound.onSpringUpdate(function () {
            var mappedValue = com.facebook.rebound.SpringUtil.mapValueFromRangeToRange(Spring.getCurrentValue(), 0, 1, 1, 0.5);
            view.setScaleX(mappedValue);
            view.setScaleY(mappedValue);
        });

        // called whenever the spring leaves its resting state
        rebound.onSpringActivate(function () {
            console.log('setSpringActivate started...');
        });

        // called whenever the spring notifies of displacement state changes
        rebound.onSpringAtEndState(function () {
            console.log('setSpringAtEndState...');
        });

        // called whenever the spring achieves a resting state
        rebound.onSpringAtRest(function () {
            console.log('setSpringAtRest...');
            // Here you could do something like hide a view or trigger more spring if you wanted...
        });

    }, function (err) {
        alert("Error in rebound.createSpring(): " + err);
    });
}
exports.picLoaded = picLoaded;

// tap function on our image to trigger the spring
function springThis(args) {

    // quick boolean to check if we are going up or down
    if (mMovedUp) {

        // setEndValue():  set the rest value to determine the displacement for the spring
        Spring.setEndValue(0);
    } else {
        Spring.setEndValue(1);
    }
    mMovedUp = !mMovedUp;
}
exports.springThis = springThis;