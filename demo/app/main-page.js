var app = require("application");
var platformModule = require("platform");
var color = require("color");
var twitterBang = require("nativescript-twitterbang");

function pageLoaded(args) {
    var page = args.object; 
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow(); 
        window.setStatusBarColor(new color.Color("#D50000").android);
    }   
}
exports.pageLoaded = pageLoaded;

var viewToAnimate;
var TENSION = 800;
var DAMPER = 20;
var mSpring;

function picLoaded(args) {

    viewToAnimate = args.object.android;
    // viewToAnimate.setOnTouchListener(app.android.foregroundActivity);


    var springSystem = com.facebook.rebound.SpringSystem.create();
    mSpring = springSystem.createSpring();

    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringUpdate: function (spring) {
            // console.log(spring);
            var value = spring.getCurrentValue();
            console.log(value);
            console.log('value: ' + value);
            // var scale = 1 - (value * 0.001);
            // console.log('scale: ' + scale);

            var mappedValue = com.facebook.rebound.SpringUtil.mapValueFromRangeToRange(mSpring.getCurrentValue(), 0, 1, 1, 0.5);
            viewToAnimate.setScaleX(mappedValue);
            viewToAnimate.setScaleY(mappedValue);

            // viewToAnimate.setY(value);

        }
    });

    mSpring.addListener(new listener);

    var config = new com.facebook.rebound.SpringConfig(TENSION, DAMPER);
    mSpring.setSpringConfig(config);

}
exports.picLoaded = picLoaded;


var mMovedUp = false;
var mOrigY = null;

function springThis(args) {
    if (mMovedUp) {
        mSpring.setEndValue(0);
    } else {
        mOrigY = viewToAnimate.getY();

        mSpring.setEndValue(1);
    }

    mMovedUp = !mMovedUp;
}
exports.springThis = springThis;


function bangThis(args) {
    var view = args.object.android;
    twitterBang.bang(view);
}
exports.bangThis = bangThis;

function bangHeart(args) {
    var view = args.object.android;
    twitterBang.bang(view);
    args.object.src = "~/images/twitterHeart.png";
}
exports.bangHeart = bangHeart;