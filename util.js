// encode uploaded image to base64 for display purpose
function imageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event.target.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(imageFile);
    });
}

// convert time to minutes {HH:MM} format only
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// check if current time is within start-end range
function isWithinTimeRange(start, end) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
  
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }