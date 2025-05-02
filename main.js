// Room objects
// FIX: change rooms array from const to var
var rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    manualOverride:false,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: '19:44',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    manualOverride:false,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: '19:45',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    manualOverride:false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    manualOverride:false,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
];

const warmOverlay = `linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;

const coolOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    // FIX :  changed < to  >
    rooms[0].currTemp >= 25 ? coolOverlay : warmOverlay
    }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    //FIX: changed < to  >
    room.currTemp >= 25 ? coolOverlay : warmOverlay
    }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;

const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

// FIX: changed let to var
var selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array

renderRoomDropDown()

function renderRoomDropDown() {
  roomSelect.innerHTML = ``;
  rooms.forEach((room) => {
    const option = document.createElement("option");
    // FIX: changed vlaue from room to room.name
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
  });
}

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  this.selectedRoom = room.name;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});


// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");

defaultSettings.addEventListener("click", function (e) {

  let room = rooms.filter((room) => room.name == selectedRoom)[0]

  if (e.target.id == "warm" || e.target.parentNode.id == "warm") {
    room.currTemp = room.warmPreset
  }
  if (e.target.id == "cool" || e.target.parentNode.id == "cool") {
    room.currTemp = room.coldPreset
  }


  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;

});

// function to update ui changes
function updateUiChnages() {

  let room = rooms.filter((room) => room.name == selectedRoom)[0]

  setSelectedRoom(room.name)

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  renderRoomDropDown()

  updateBarsProgress(room)

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
}

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // FIX: changed execution context
  // const increaseRoomTemperature = room.increaseTemp;

  if (room.currTemp < 32) {
    // increaseRoomTemperature();
    room.increaseTemp()
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  // FIX: reomve the instance created of the function changing the context of execution
  // const decreaseRoomTemperature = room.decreaseTemp;
  if (room.currTemp > 10) {
    // decreaseRoomTemperature();
    room.decreaseTemp();
  }


  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");


const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  if (coolInput.value && warmInput.value) {
    // Validate the data
    if (coolInput.value < 10 || coolInput.value > 25) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid Cool temperatures (10° - 24°)";
      return
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid Warn temperature (25° - 32°)";
      return
    }

    // Validation passed
    // Set current room's presets
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    currRoom.setColdPreset(parseInt(coolInput.value));
    currRoom.setWarmPreset(parseInt(warmInput.value));


    coolInput.value = "";
    warmInput.value = "";

    errorSpan.innerText = ""

    return

  }

  errorSpan.style.display = "block";
  errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
});

// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
        <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${room.airConditionerOn ? "powerOn" : ""}"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${room.airConditionerOn ? "" : "none"}">${room.currTemp <= 24 ? "Cooling room to: " : "Warming room to: "}${room.currTemp}°</span>
          
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};

const displayTime = (room) => {
  let index_ = rooms.findIndex(room_=>room.name == room_.name)
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars" id="room-${index_}-bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `
}

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.manualOverride = true;
    room.toggleAircon();
    generateRooms();
  }
  // FIX: changed class contains  room-name to switch 
  if (e.target.classList.contains("switch")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});
