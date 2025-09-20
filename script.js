document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // World Clock functionality
    const currentTimeDisplay = document.getElementById('current-time');
    const timezoneSelect = document.getElementById('timezone-select');
    const worldClocksContainer = document.getElementById('world-clocks');

    const timezones = [
        { name: 'New York', zone: 'America/New_York' },
        { name: 'London', zone: 'Europe/London' },
        { name: 'Tokyo', zone: 'Asia/Tokyo' },
        { name: 'Sydney', zone: 'Australia/Sydney' },
        { name: 'Dubai', zone: 'Asia/Dubai' },
        { name: 'Mumbai', zone: 'Asia/Kolkata' }
    ];

    function updateTime() {
        const now = new Date();
        currentTimeDisplay.textContent = now.toLocaleTimeString();
    }

    function populateTimezones() {
        timezoneSelect.innerHTML = '';
        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.zone;
            option.textContent = tz.name;
            timezoneSelect.appendChild(option);
        });
    }

    function addWorldClock(zone, name) {
        const now = new Date().toLocaleTimeString('en-US', { timeZone: zone });
        const clockDiv = document.createElement('div');
        clockDiv.innerHTML = `<span>${name}</span><span>${now}</span>`;
        worldClocksContainer.appendChild(clockDiv);
    }

    timezoneSelect.addEventListener('change', (event) => {
        const selectedZone = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        addWorldClock(selectedZone, selectedName);
    });

    setInterval(updateTime, 1000);
    populateTimezones();
    updateTime();
    addWorldClock('America/New_York', 'New York'); // Default world clock

    // Timer functionality
    const timerDisplay = document.querySelector('.timer-display');
    const timerHoursInput = document.getElementById('timer-hours');
    const timerMinutesInput = document.getElementById('timer-minutes');
    const timerSecondsInput = document.getElementById('timer-seconds');
    const startTimerButton = document.getElementById('start-timer');
    const pauseTimerButton = document.getElementById('pause-timer');
    const resetTimerButton = document.getElementById('reset-timer');

    let timerInterval;
    let timeRemaining = 0;
    let isTimerRunning = false;

    function formatTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    function startTimer() {
        if (isTimerRunning) return;

        const hours = parseInt(timerHoursInput.value) || 0;
        const minutes = parseInt(timerMinutesInput.value) || 0;
        const seconds = parseInt(timerSecondsInput.value) || 0;

        if (timeRemaining === 0) {
            timeRemaining = hours * 3600 + minutes * 60 + seconds;
        }

        if (timeRemaining <= 0) return;

        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = formatTime(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                alert('Timer Finished!');
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timeRemaining = 0;
        timerDisplay.textContent = '00:00:00';
        timerHoursInput.value = '';
        timerMinutesInput.value = '';
        timerSecondsInput.value = '';
    }

    startTimerButton.addEventListener('click', startTimer);
    pauseTimerButton.addEventListener('click', pauseTimer);
    resetTimerButton.addEventListener('click', resetTimer);

    // Stopwatch functionality
    const stopwatchDisplay = document.querySelector('.stopwatch-display');
    const startStopwatchButton = document.getElementById('start-stopwatch');
    const pauseStopwatchButton = document.getElementById('pause-stopwatch');
    const resetStopwatchButton = document.getElementById('reset-stopwatch');
    const lapStopwatchButton = document.getElementById('lap-stopwatch');
    const lapsList = document.getElementById('laps');

    let stopwatchInterval;
    let stopwatchTime = 0;
    let isStopwatchRunning = false;
    let lapCounter = 0;

    function formatStopwatchTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
        return `${h}:${m}:${s}.${milliseconds}`;
    }

    function startStopwatch() {
        if (isStopwatchRunning) return;
        isStopwatchRunning = true;
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
        }, 10);
    }

    function pauseStopwatch() {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        stopwatchTime = 0;
        lapCounter = 0;
        stopwatchDisplay.textContent = '00:00:00.00';
        lapsList.innerHTML = '';
    }

    function lapStopwatch() {
        if (!isStopwatchRunning) return;
        lapCounter++;
        const lapTime = formatStopwatchTime(stopwatchTime);
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(listItem);
    }

    startStopwatchButton.addEventListener('click', startStopwatch);
    pauseStopwatchButton.addEventListener('click', pauseStopwatch);
    resetStopwatchButton.addEventListener('click', resetStopwatch);
    lapStopwatchButton.addEventListener('click', lapStopwatch);

    // Alarm functionality
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmVolumeInput = document.getElementById('alarm-volume');
    const volumeDisplay = document.getElementById('volume-display');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmsList = document.getElementById('alarms-list');

    let alarms = [];
    let alarmAudio = new Audio('alarm.mp3'); // Assuming an alarm sound file exists

    alarmVolumeInput.addEventListener('input', () => {
        volumeDisplay.textContent = `${alarmVolumeInput.value}%`;
        alarmAudio.volume = (alarmVolumeInput.value / 100) * 2; // Up to 200% volume
    });

    function setAlarm() {
        const alarmTime = alarmTimeInput.value;
        if (!alarmTime) {
            alert('Please select a time for the alarm.');
            return;
        }

        const [hours, minutes] = alarmTime.split(':');
        const now = new Date();
        let alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

        if (alarmDate <= now) {
            alarmDate.setDate(alarmDate.getDate() + 1); // Set for next day if time has passed today
        }

        const alarm = {
            time: alarmTime,
            volume: alarmVolumeInput.value,
            date: alarmDate,
            id: Date.now()
        };
        alarms.push(alarm);
        renderAlarms();
        scheduleAlarm(alarm);
        alarmTimeInput.value = '';
    }

    function renderAlarms() {
        alarmsList.innerHTML = '';
        alarms.forEach(alarm => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${alarm.time} (Volume: ${alarm.volume}%)</span>
                <button data-id="${alarm.id}">Delete</button>
            `;
            alarmsList.appendChild(listItem);
        });

        document.querySelectorAll('#alarms-list button').forEach(button => {
            button.addEventListener('click', (event) => {
                const idToDelete = parseInt(event.target.dataset.id);
                alarms = alarms.filter(alarm => alarm.id !== idToDelete);
                renderAlarms();
                // Need to clear scheduled alarm here as well
            });
        });
    }

    function scheduleAlarm(alarm) {
        const timeToAlarm = alarm.date.getTime() - new Date().getTime();
        if (timeToAlarm < 0) return; // Should not happen with the date logic

        setTimeout(() => {
            playAlarm(alarm.volume);
            // Optionally remove alarm after it plays or set for next day
        }, timeToAlarm);
    }

    function playAlarm(volume) {
        alarmAudio.volume = (volume / 100) * 2;
        alarmAudio.play();
        alert('Alarm! Wake up!'); // Or a more sophisticated UI notification
    }

    setAlarmButton.addEventListener('click', setAlarm);

    // Initial render for volume display
    volumeDisplay.textContent = `${alarmVolumeInput.value}%`;
    alarmAudio.volume = (alarmVolumeInput.value / 100) * 2;
});