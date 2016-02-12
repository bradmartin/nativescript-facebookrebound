/*/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin                 
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Rebound Docs - http://facebook.github.io/rebound/javadocs/
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/
var Rebound = require("./rebound-common");
var mSpring;

// Create a spring with a random uuid for its name.
Rebound.createSpring = function (tension, friction) {
    return new Promise(function (resolve, reject) {
        try {
            var springSystem = com.facebook.rebound.SpringSystem.create();
            mSpring = springSystem.createSpring();

            // constructor for the SpringConfig
            var config = new com.facebook.rebound.SpringConfig(tension, friction);
            mSpring.setSpringConfig(config);

            resolve(mSpring);
        }
        catch (ex) {
            reject("Error in rebound.createSpring(): " + ex);
        }
    });
}

// Destroys this Spring, meaning that it will be deregistered from its BaseSpringSystem
Rebound.destroySpring = function (spring) {
    mSpring.destroy();
}

// called whenever the spring is updated
Rebound.onSpringUpdate = function (callback) {
    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringUpdate: function (spring) {
            callback();
        }
    });
    mSpring.addListener(new listener);
}

// called whenever the spring leaves its resting state
Rebound.onSpringActivate = function (callback) {
    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringActivate: function (spring) {
            callback();
        }
    });
    mSpring.addListener(new listener);
}

// called whenever the spring achieves a resting state
Rebound.onSpringAtRest = function (callback) {
    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringAtRest: function (spring) {
            callback();
        }
    });
    mSpring.addListener(new listener);
}

// called whenever the spring notifies of displacement state changes
Rebound.onSpringAtEndState = function (callback) {
    var listener = com.facebook.rebound.SimpleSpringListener.extend({
        onSpringEndStateChange: function (spring) {
            callback();
        }
    });
    mSpring.addListener(new listener);
}

module.exports = Rebound;