const imageInputRef = document.getElementById('room-image');
const previewContainerRef = document.getElementById('uploadPreview');
const addRoomFormRef = document.getElementById('add-room-form');
const modalRef = document.querySelector('.add-room-modal');
const toggleAddRoomButtonRef = document.querySelector('.add-room-toggle')
const modalContentRef = document.querySelector('.modal-content-container');
const switchAllAccButtonRef = document.getElementById('switch-all-button');

class Room {

    constructor(name, coldPreset, warmPreset, image) {
        this.name = name;
        this.coldPreset = coldPreset;
        this.warmPreset = warmPreset;
        this.currTemp = coldPreset;
        this.image = image
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
switchAllAccButtonRef.addEventListener('click',(e)=>{

    rooms.forEach(room =>{
        room.toggleAircon()
    })

    switchAllAccButtonRef.classList.toggle('powerOn')

    updateUiChnages()

})
