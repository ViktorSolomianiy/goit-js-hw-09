import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const DayEl = document.querySelector('span[data-days]');
const HourEl = document.querySelector('span[data-hours]');
const MinuteEl = document.querySelector('span[data-minutes]');
const SecondEl = document.querySelector('span[data-seconds]');

const timeArray = [DayEl, HourEl, MinuteEl, SecondEl];

let timerId = null;

convertMs();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!isDateCorrect(selectedDates)) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    if (timerId !== null) {
      timer.stop();
    }

    timer.start(selectedDates[0]);
  },

  onChange(selectedDates) {
    if (!isDateCorrect(selectedDates)) {
      btnEl.setAttribute('disabled', true);
      return;
    }
    btnEl.removeAttribute('disabled', true);
  },
};

function isDateCorrect(selectedDates) {
  return new Date().getTime() < new Date(selectedDates[0]).getTime();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  start(selectedDate) {
    const startTime = Date.now();

    timerId = setInterval(() => {
      const currentTime =
        new Date(selectedDate).getTime() - new Date().getTime();

      const convertedTimes = convertMs(currentTime);

      const { days, hours, minutes, seconds } = convertedTimes.test;

      if (new Date(selectedDate).getTime() <= new Date().getTime()) {
        return;
      }

      timeArray.forEach((item, index) => {
        item.textContent = convertedTimes.arr[index];
      });
      // DayEl.textContent = days;
      // HourEl.textContent = hours;
      // MinuteEl.textContent = minutes;
      // SecondEl.textContent = seconds;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },

  stop() {
    clearInterval(timerId);
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return {
    arr: [days, hours, minutes, seconds],
    test: { days, hours, minutes, seconds },
  };
}
