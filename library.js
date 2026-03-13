// Логика управления библиотекой кодов
const libraryList = document.getElementById("library-list");
const STORAGE_KEY = "akancode_saved_scripts";

// Загрузка библиотеки при старте
document.addEventListener("DOMContentLoaded", renderLibrary);

function saveToLibrary() {
  const code = document.getElementById("code").value;
  if (!code.trim()) {
    alert("Нельзя сохранить пустой код!");
    return;
  }

  const name = prompt("Введите название для сохранения:", "Мой скрипт " + new Date().toLocaleTimeString());
  if (!name) return;

  const savedScripts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  
  savedScripts.push({
    id: Date.now(),
    name: name,
    code: code,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedScripts));
  renderLibrary();
}

function renderLibrary() {
  const savedScripts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  libraryList.innerHTML = "";

  if (savedScripts.length === 0) {
    libraryList.innerHTML = "<p style='color: #888;'>Сохранений пока нет...</p>";
    return;
  }

  savedScripts.forEach((script) => {
    const item = document.createElement("div");
    item.className = "library-item";
    item.innerHTML = `
      <span><strong>${script.name}</strong><br><small>${script.date}</small></span>
      <div class="library-actions">
        <button onclick="loadFromLibrary(${script.id})">Открыть</button>
        <button onclick="runFromLibrary(${script.id})" style="background:#4CAF50">▶</button>
        <button class="btn-delete" onclick="deleteFromLibrary(${script.id})">🗑</button>
      </div>
    `;
    libraryList.appendChild(item);
  });
}

function loadFromLibrary(id) {
  const savedScripts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const script = savedScripts.find(s => s.id === id);
  if (script) {
    document.getElementById("code").value = script.code;
    alert("Код '" + script.name + "' загружен в редактор");
  }
}

function runFromLibrary(id) {
  const savedScripts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const script = savedScripts.find(s => s.id === id);
  if (script) {
    document.getElementById("code").value = script.code;
    // Вызываем функцию запуска из основного script.js
    runCode();
  }
}

function deleteFromLibrary(id) {
  if (!confirm("Удалить это сохранение?")) return;
  
  let savedScripts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  savedScripts = savedScripts.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedScripts));
  renderLibrary();
}
