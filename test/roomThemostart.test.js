/**
 * @jest-environment jsdom
*/
const fs = require('fs')
const { describe } = require("node:test");
const { imageToBase64, timeToMinutes, isWithinTimeRange, Room, getElapsedBarCount } = require("../util");


describe("Utility function", () => {

    it('returns base64 string for a valid image uplaod', async () => {
        const blob = new Blob(['fake image data'], { type: 'image/png' });
        const file = new File([blob], 'test.png', { type: 'image/png' });

        const result = await imageToBase64(file);
        expect(result.startsWith('data:image/png;base64')).toBe(true);
    });


    it('return a minutes value for a give 24hour time', () => {
        const timeStr = "05:00"
        expect(timeToMinutes(timeStr)).toBe(300)
    })


    it('returns true if current sysytem time is in range', () => {
        // set fake timer
        const fixedDate = new Date();
        fixedDate.setHours(18, 0, 0, 0);
        jest.useFakeTimers().setSystemTime(fixedDate);

        const startTime = "16:30"
        const endTime = "20:00"

        expect(isWithinTimeRange(startTime, endTime)).toBe(true);

        jest.useRealTimers();
    })

    it('returns false if current sysytem time is in range', () => {
        // set fake timer
        const fixedDate = new Date();
        fixedDate.setHours(15, 0, 0, 0);
        jest.useFakeTimers().setSystemTime(fixedDate);

        const startTime = "16:30"
        const endTime = "20:00"

        expect(isWithinTimeRange(startTime, endTime)).toBe(false);

        jest.useRealTimers();
    })


    describe("Room Class", () => {
        beforeEach(() => {
            room = new Room('Living Room', 18, 24, 'living_room.jpg');
        });


        it('should create a room and return correct initial values', () => {
            expect(room.name).toBe('Living Room');
            expect(room.coldPreset).toBe(18);
            expect(room.warmPreset).toBe(24);
            expect(room.currTemp).toBe(18);
            expect(room.image).toBe('living_room.jpg');
            expect(room.manualOverride).toBe(false);
            expect(room.airConditionerOn).toBe(false);
            expect(room.startTime).toBe('16:30');
            expect(room.endTime).toBe('20:00');
        });


        it('should set current temperature', () => {
            room.setCurrTemp(20);
            expect(room.currTemp).toBe(20);
        });


        it('should set cold preset temperature correctly', () => {
            room.setColdPreset(16);
            expect(room.coldPreset).toBe(16);
        });



        it('should set warm preset temperature correctly', () => {
            room.setWarmPreset(22);
            expect(room.warmPreset).toBe(22);
        });

        it('should decrease the current temperature', () => {
            room.decreaseTemp();
            expect(room.currTemp).toBe(17);
        });


        it('should increase the current temperature', () => {
            room.increaseTemp();
            expect(room.currTemp).toBe(19);
        });

        it('should toggle air condition on or off', () => {
            room.toggleAircon();
            expect(room.airConditionerOn).toBe(true);

            room.toggleAircon();
            expect(room.airConditionerOn).toBe(false);
        });

    })

    describe('getElapsedBarCount', () => {

        it('0 before start', () => {
            const fakeNow = new Date('2023-01-01T08:00:00');
            expect(getElapsedBarCount('09:00','10:00',32,fakeNow)).toBe(0);
          });
        
          it('full at end', () => {
            const fakeNow = new Date('2023-01-01T10:00:00');
            expect(getElapsedBarCount('09:00','10:00',32,fakeNow)).toBe(32);
          });
        
          it('half at midpoint', () => {
            const fakeNow = new Date('2023-01-01T09:30:00');
            expect(getElapsedBarCount('09:00','10:00',32,fakeNow)).toBe(16);
          });
    });

})


describe("Event handler", () => {

    beforeAll(() => {
        const html = fs.readFileSync('./index.html', 'utf-8');
        document.documentElement.innerHTML = html;
    });


    it('', () => {
       const roomSelectorRef =  document.getElementById('rooms')

    });
    


})

