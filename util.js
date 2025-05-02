( function (global) {
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

    class Room {

        constructor(name, coldPreset, warmPreset, image) {
            this.name = name;
            this.coldPreset = coldPreset;
            this.warmPreset = warmPreset;
            this.currTemp = coldPreset;
            this.image = image
            this.manualOverride = false
            this.airConditionerOn = false;
            this.startTime = '16:30';
            this.endTime = '20:00';
        }

        setCurrTemp(temp) {
            this.currTemp = temp;
        }

        setColdPreset(newCold) {
            this.coldPreset = newCold;
        }

        setWarmPreset(newWarm) {
            this.warmPreset = newWarm;
        }

        decreaseTemp() {
            this.currTemp--;
        }

        increaseTemp() {
            this.currTemp++;
        }
        toggleAircon() {
            this.airConditionerOn
                ? (this.airConditionerOn = false)
                : (this.airConditionerOn = true);
        }
    }

    const exportValues = {
        Room,
        isWithinTimeRange,
        timeToMinutes,
        imageToBase64
    }

    if (typeof window !== 'undefined') {
        Object.assign(global, { ...exportValues })
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = exportValues;
    }

})(this)