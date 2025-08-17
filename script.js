const form = document.getElementById('moodForm');
const moodInput = document.getElementById('mood');
const noteInput = document.getElementById('note');
const entriesDiv = document.getElementById('entries');

let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];

function saveToLocalStorage() {
  localStorage.setItem('moodEntries', JSON.stringify(entries));
}

function renderEntries() {
  entriesDiv.innerHTML = '';
  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <p><strong>${entry.mood}</strong> – ${entry.date}</p>
      <p>${entry.note}</p>
    `;
    entriesDiv.appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = moodInput.value;
  const note = noteInput.value;
  const date = new Date().toLocaleString();

  const newEntry = { mood, note, date };
  entries.unshift(newEntry); // recent first
  saveToLocalStorage();
  renderEntries();

  form.reset();
});

renderEntries();
