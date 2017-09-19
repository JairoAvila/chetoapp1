cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "phonegap-plugin-push.PushNotification",
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "cordova-plugin-globalization.GlobalizationError",
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "id": "cordova-plugin-globalization.globalization",
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "id": "cordova-plugin-native-settings.Settings",
        "file": "plugins/cordova-plugin-native-settings/www/settings.js",
        "pluginId": "cordova-plugin-native-settings",
        "clobbers": [
            "cordova.plugins.NativeSettings"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "id": "cordova-plugin-background-fetch.BackgroundFetch",
        "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
        "pluginId": "cordova-plugin-background-fetch",
        "clobbers": [
            "window.BackgroundFetch"
        ]
    },
    {
        "id": "cordova-background-geolocation-lt.BackgroundGeolocation",
        "file": "plugins/cordova-background-geolocation-lt/www/BackgroundGeolocation.js",
        "pluginId": "cordova-background-geolocation-lt",
        "clobbers": [
            "window.BackgroundGeolocation"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "phonegap-plugin-push": "2.0.0",
    "cordova-plugin-dialogs": "1.3.3",
    "cordova-plugin-vibration": "2.1.5",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-globalization": "1.0.7",
    "cordova-plugin-native-settings": "1.0.0",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.4.3",
    "phonegap-plugin-barcodescanner": "6.0.8",
    "cordova-plugin-background-mode": "0.7.2",
    "cordova-plugin-background-fetch": "5.0.0",
    "cordova-background-geolocation-lt": "2.8.4"
};
// BOTTOM OF METADATA
});