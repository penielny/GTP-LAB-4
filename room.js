

const imageInputRef = document.getElementById('room-image');
const previewContainerRef = document.getElementById('uploadPreview');
const addRoomFormRef = document.getElementById('add-room-form');
const modalRef = document.querySelector('.add-room-modal');
const toggleAddRoomButtonRef = document.querySelector('.add-room-toggle')
const modalContentRef = document.querySelector('.modal-content-container');
const switchAllAccButtonRef = document.getElementById('switch-all-button');
const presetTimerRef = document.getElementById('presetTimer')
const presetTimerFormRef = document.getElementById('time-edit-form')
const savePresetTimerButtonRef = document.querySelector('.time-edit-save-button')
// keep track of interval to avoid multiple instances
var intervalRef = null;

modalRef.addEventListener('click', () => {
    if (modalRef.classList.contains('animate__fadeInUp')) {
        modalRef.classList.replace('animate__fadeInUp', 'animate__fadeOutDown')
    }
});

toggleAddRoomButtonRef.addEventListener('click', (e) => {
    if (modalRef.classList.contains('animate__fadeOutDown')) {
        modalRef.classList.replace('animate__fadeOutDown', 'animate__fadeInUp')
    }
    if (modalRef.classList.contains('hidden')) {
        modalRef.classList.replace('hidden', 'animate__fadeInUp')
    }
})

modalContentRef.addEventListener('click', (e) => {
    e.stopPropagation();
});


previewContainerRef.addEventListener('click', () => {
    imageInputRef.click();
});

imageInputRef.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        imageToBase64(file)
            .then(base64 => {
                previewContainerRef.style.backgroundImage = `url(${base64})`;
                previewContainerRef.style.backgroundSize = 'cover';
                previewContainerRef.style.backgroundPosition = 'center';
            }).catch((err) => {
                console.log(err.message)
                previewContainerRef.style.backgroundImage = 'none';
            })

    } else {
        previewContainerRef.style.backgroundImage = 'none';
    }
});

addRoomFormRef.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(addRoomFormRef);
    const data = {};

    const imageFile = formData.get('image');

    if (imageFile.size == 0) {
        alert('Please provide an image');
        return
    }

    for (const [name, value] of formData.entries()) {
        data[name] = value;
    }


    data.name = data.name?.trim();
    data.coldPreset = parseInt(data.coldPreset?.trim());
    data.warmPreset = parseInt(data.warmPreset?.trim());

    if (!data.name || !data.coldPreset || !data.warmPreset) {
        alert('Please fill in all required fields.');
        return;
    }

    if (data.coldPreset < 10 || data.coldPreset >= 25 || data.warmPreset < 25 || data.warmPreset > 32) {
        alert("please make sure cool values are between { } and warn values are between { }")
        return;
    }


    try {
        data.image = await imageToBase64(imageFile);
    } catch (error) {
        console.log(error.message);
        alert("Please make sure to provide a valid image file");
        return;
    }


    rooms.push(new Room(data.name, data.coldPreset, data.warmPreset, data.image))
    updateUiChnages()
    addRoomFormRef.reset()
    previewContainerRef.style.backgroundImage = ""
    modalRef.click()
})


// on all acc
switchAllAccButtonRef.addEventListener('click', (e) => {

    rooms.forEach(room => {
        room.manualOverride = true
        room.toggleAircon()
        
        if (switchAllAccButtonRef.classList.contains('powerOn')) {
            room.manualOverride = false
        }
    })


    switchAllAccButtonRef.classList.toggle('powerOn')

    updateUiChnages()

})

// on start run scheduler 
startAccScheduler()

function startAccScheduler() {
    if (intervalRef !== null) {
        clearInterval(intervalRef);
    }

    intervalRef = setInterval(() => {
        const now = new Date();
        const currentMinutes = (now.getHours() * 60) + now.getMinutes();

        rooms.forEach(room => {
            if (room.manualOverride) return;
            const start = timeToMinutes(room.startTime);
            const end = timeToMinutes(room.endTime);
            const shouldBeOn = currentMinutes >= start && currentMinutes < end;
            if (shouldBeOn && !room.airConditionerOn) {
                room.toggleAircon()
            } else if (!shouldBeOn && room.airConditionerOn) {
                room.toggleAircon()
            }
        });

        updateUiChnages()
    }, 10 * 1000);
}

function updateBarsProgress(room){
    if (!room.airConditionerOn) return
    let index_ = rooms.findIndex(room_=>room.name == room_.name)

    let highlightedBars = getElapsedBarCount(room.startTime, room.endTime)

    document.querySelectorAll(`#room-${index_}-bars>.bar`).forEach((bar, index) => {
        if (index < highlightedBars) {
          bar.classList.add('active');
        } else {
          bar.classList.remove('active');
        }
      });

      console.log("highlightedBars",highlightedBars)
      console.log("start",room.startTime)
      console.log("end",room.endTime)

}

// toggle add timer form
presetTimerRef.addEventListener('click', (e) => {

    presetTimerFormRef.classList.toggle('hidden')
})


savePresetTimerButtonRef.addEventListener('click', (e) => {
    let startTime = document.getElementById('startTime').value
    let endTime = document.getElementById('endTime').value

    if (!startTime || !endTime) {
        alert("please provide valid time")
        return
    }

    const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
    room.startTime = startTime
    room.endTime = endTime

    updateUiChnages()
    presetTimerFormRef.classList.toggle('hidden')

    startAccScheduler()
})

