const dayId = document.getElementById('days')
const secondId = document.getElementById('seconds')
const hoursId = document.getElementById('hours')
const minsId = document.getElementById('mins')
const format = '1 Jan 2021'

function currentlyDate() {
    const newYear = new Date(format)
    const dateToday = new Date()
    const totalSeconds = (newYear - dateToday) / 1000;
    const days = Math.floor((totalSeconds / 3600) / 24)
    const hours = Math.floor((totalSeconds / 3600) % 24)
    const mins = Math.floor((totalSeconds / 60) % 60)
    const seconds = Math.floor(totalSeconds) % 60
    dayId.innerHTML = formatTime(days)
    secondId.innerHTML = formatTime(seconds)
    hoursId.innerHTML = formatTime(hours)
    minsId.innerHTML = formatTime(mins)

    function formatTime(params) {
        return params < 10 ? `0${params}` : params
    }
}

currentlyDate()
setInterval(currentlyDate, 1000);