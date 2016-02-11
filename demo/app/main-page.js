var app = require("application");
var platformModule = require("platform");
var color = require("color");
var Observable = require("data/observable").Observable;

var data = new Observable({});

function pageLoaded(args) {
    var page = args.object; 
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow(); 
        window.setStatusBarColor(new color.Color("#144474").android);
    }
    page.bindingContext = data;
} 
exports.pageLoaded = pageLoaded;

var viewToAnimate;
var TENSION = 500;
var DAMPER = 10;
var mSpring;


function picLoaded(args) {

    viewToAnimate = args.object.android;

    var springSystem = com.facebook.rebound.SpringSystem.create();
    mSpring = springSystem.createSpring();

    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringUpdate: function (spring) {
            var value = spring.getCurrentValue();
            console.log(value);
            console.log('value: ' + value);
            var mappedValue = com.facebook.rebound.SpringUtil.mapValueFromRangeToRange(mSpring.getCurrentValue(), 0, 1, 1, 0.5);
            viewToAnimate.setScaleX(mappedValue);
            viewToAnimate.setScaleY(mappedValue);

        }
    });

    mSpring.addListener(new listener);

    var config = new com.facebook.rebound.SpringConfig(TENSION, DAMPER);
    mSpring.setSpringConfig(config);
}
exports.picLoaded = picLoaded;


var mMovedUp = false;

function springThis(args) {
    if (mMovedUp) {
        mSpring.setEndValue(0);
    } else {
        mSpring.setEndValue(1);
    }
    mMovedUp = !mMovedUp;
}
exports.springThis = springThis;