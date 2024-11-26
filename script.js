const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const searchInput = document.getElementById("search");
const saveToFileBtn = document.getElementById("saveToFile");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
    attachEventListeners();
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachEventListeners() {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.querySelector('img').addEventListener('click', () => {
            note.remove();
            updateStorage();
        });

        note.addEventListener('input', updateStorage);
    });
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("div");
    const img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "assets/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachEventListeners();
});

searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    notes.forEach(note => {
        const noteText = note.textContent.toLowerCase();
        note.style.display = noteText.includes(searchValue) ? "block" : "none";
    });
});

saveToFileBtn.addEventListener("click", () => {
    const notes = Array.from(document.querySelectorAll('.input-box'))
        .map(note => note.textContent.trim());
    const blob = new Blob([notes.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'notes.txt';
    link.click();
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

showNotes();
