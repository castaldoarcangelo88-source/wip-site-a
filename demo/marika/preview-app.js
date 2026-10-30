// Anteprima autonoma: nessuna richiesta al database o a WhatsApp.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

const form = document.getElementById('booking-form');
const serviceField = document.getElementById('booking-service');
const timeField = document.getElementById('booking-time');
const monthLabel = document.getElementById('calendar-month');
const daysGrid = document.getElementById('calendar-days');
const dateLabel = document.getElementById('booking-date-label');
const prevButton = document.getElementById('calendar-prev');
const nextButton = document.getElementById('calendar-next');
const slotGrid = document.getElementById('booking-slot-grid');
const slotHelp = document.getElementById('booking-slots-help');
const feedback = document.getElementById('booking-feedback');
const result = document.getElementById('booking-result');
const durations = {
  'one-to-one': 150, 'soft-volume': 150, 'mega-volume': 150,
  'laminazione-ciglia': 45, 'laminazione-sopracciglia': 30,
  'laminazione-combinata': 75, ceretta: 5, 'filo-viso': 15, mento: 6,
};
const dateFormatter = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const monthFormatter = new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' });
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);
let visibleMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);
let chosenDate = null;
const demoBookings = [];

function dayKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function availableTimes() {
  const duration = durations[serviceField.value];
  if (!duration || !chosenDate) return [];
  const day = dayKey(chosenDate);
  const now = new Date();
  const options = [];
  for (let minutes = 15 * 60; minutes + duration <= 18 * 60; minutes += 15) {
    const start = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate(), Math.floor(minutes / 60), minutes % 60);
    if (start <= now) continue;
    if (demoBookings.some((item) => item.active && item.day === day && minutes < item.end && minutes + duration > item.start)) continue;
    options.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`);
  }
  return options;
}

function renderSlots() {
  timeField.value = '';
  slotGrid.replaceChildren();
  if (!serviceField.value || !chosenDate) {
    slotHelp.textContent = 'Scegli prima il trattamento e il giorno.';
    return;
  }
  const times = availableTimes();
  slotHelp.textContent = times.length
    ? 'Orari dimostrativi. Tocca un orario per vedere come funziona la prenotazione.'
    : 'Nessun orario dimostrativo disponibile: scegli un altro giorno.';
  for (const time of times) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'booking-slot';
    button.textContent = time;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      timeField.value = time;
      slotGrid.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      feedback.textContent = '';
    });
    slotGrid.append(button);
  }
}

function renderCalendar() {
  monthLabel.textContent = monthFormatter.format(visibleMonth);
  daysGrid.replaceChildren();
  prevButton.disabled = visibleMonth.getFullYear() === startOfToday.getFullYear() && visibleMonth.getMonth() === startOfToday.getMonth();
  const offset = (new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay() + 6) % 7;
  for (let index = 0; index < offset; index += 1) {
    const spacer = document.createElement('span');
    spacer.setAttribute('aria-hidden', 'true');
    daysGrid.append(spacer);
  }
  const days = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  for (let number = 1; number <= days; number += 1) {
    const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), number);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(number);
    button.setAttribute('aria-label', dateFormatter.format(date));
    button.disabled = date < startOfToday || date.getDay() === 0;
    if (chosenDate?.getTime() === date.getTime()) {
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
    }
    button.addEventListener('click', () => {
      chosenDate = date;
      dateLabel.textContent = `Giorno scelto: ${dateFormatter.format(date)}`;
      feedback.textContent = '';
      renderCalendar();
      renderSlots();
    });
    daysGrid.append(button);
  }
}

function changeMonth(delta) {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + delta, 1);
  chosenDate = null;
  dateLabel.textContent = 'Seleziona un giorno';
  renderCalendar();
  renderSlots();
}
prevButton.addEventListener('click', () => changeMonth(-1));
nextButton.addEventListener('click', () => changeMonth(1));
serviceField.addEventListener('change', renderSlots);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const time = timeField.value;
  if (!chosenDate || !time || !availableTimes().includes(time)) {
    feedback.textContent = 'Scegli trattamento, giorno e uno degli orari proposti.';
    return;
  }
  const minutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const booking = { day: dayKey(chosenDate), start: minutes, end: minutes + durations[serviceField.value], active: true };
  demoBookings.push(booking);
  const selectedService = serviceField.selectedOptions[0].textContent;
  result.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = 'Prenotazione simulata';
  const details = document.createElement('p');
  details.textContent = `${selectedService} · ${dateFormatter.format(chosenDate)} alle ${time}`;
  const note = document.createElement('p');
  note.textContent = 'Questa prova non salva dati e non riserva un appuntamento reale.';
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Simula la disdetta';
  cancel.addEventListener('click', () => {
    booking.active = false;
    title.textContent = 'Disdetta simulata';
    note.textContent = 'L’orario torna disponibile. Nessun dato reale è stato modificato.';
    cancel.remove();
    renderSlots();
  });
  result.append(title, details, note, cancel);
  result.hidden = false;
  feedback.textContent = '';
  renderSlots();
});

renderCalendar();
