document.addEventListener('deviceready', function() {
    console.log('Device is ready');

    // Display device info
    var info = `
        Device Model: ${device.model} <br>
        Platform: ${device.platform} <br>
        Version: ${device.version} <br>
        UUID: ${device.uuid}
    `;
    var deviceInfoElem = document.getElementById('deviceInfo');
    if (deviceInfoElem) {
        deviceInfoElem.innerHTML = info;
    }
}, false);

function takePicture() {
    if (!navigator.camera) {
        alert('Camera not available');
        return;
    }

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    });
}

function choosePicture() {
    if (!navigator.camera) {
        alert('Camera not available');
        return;
    }

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}

function onSuccess(imageData) {  
    var image = document.getElementById('projectPhoto');
    if(image) {
        image.src = "data:image/jpeg;base64," + imageData;
    }
}

function onFail(message) {  
    alert('Failed because: ' + message);
}

function getLocation() {
    var output = document.getElementById('locationOutput');
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by this device.";
        return;
    }

    output.textContent = "Locating...";

    navigator.geolocation.getCurrentPosition(
        function(position) {
            output.innerHTML = 'Latitude: ' + position.coords.latitude.toFixed(6) +
                '<br>Longitude: ' + position.coords.longitude.toFixed(6) +
                '<br><a href="https://maps.google.com?q=' + position.coords.latitude + ',' + position.coords.longitude + '" target="_blank">View on map</a>';
        },
        function() {
            output.textContent = "Unable to retrieve your location.";
        }
    );
}
