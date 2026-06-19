// localStorage
const storage_key = "activity_tasks";

// Part of header
const dateChip =  document.getElementById('dateChip');
const notifBtn =  document.getElementById('notifBtn');
const notifBadge =  document.getElementById('notifBadge');
const notifPanel =  document.getElementById('notifPanel');
const notifClear =  document.getElementById('notifClear');
const notifList =  document.getElementById('notifList');

const today = new Date();
const Formating = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
const date = today.toLocaleDateString('en-US', Formating);

//  greeting
const greetingText = document.getElementById('greetingText');

// tasks
const btnAddTask = document.getElementById('btnAddTask');
const taskList = document.getElementById('taskList');
const modalOverlayTask = document.querySelector('.modal-overlay-task');
const modalCloseTask = document.querySelector('.modal-close-task');
const TasklistIsEmpty = document.querySelector('.list-is-empty');

// routines | right column
const btnAddRoutine = document.getElementById('btnAddRoutine');
const routineList = document.getElementById('routineList');
const modalOverlayRoutine = document.querySelector('.modal-overlay-routine');
const modalCloseRoutine = document.querySelector('.modal-close-routine');
const routineListIsEmpty = document.querySelector('.routine-list-is-empty');


// TABLE 
const tblSearch = document.getElementById('tblSearch');
const dataTable = document.getElementById('dataTable');
const tblBody = document.getElementById('tblBody');
const tableSection = document.querySelector('.table-section');

// modal : add task
const modalTask = document.getElementById('modalTask');
const taskName = document.getElementById('taskName');
const taskTime = document.getElementById('taskTime');
const taskNote = document.getElementById('taskNote');
const formTask = document.getElementById('taskForm');

// modal : add routine
const modalRoutine = document.getElementById('modalRoutine');
const routineName = document.getElementById('routineName');
const routineTime = document.getElementById('routineTime');
const routineNote = document.getElementById('routineNote');
const formRoutine = document.getElementById('routineForm');

// modal : add note
const modalNote = document.getElementById('modalNote');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const linkedTaskField = document.getElementById('linkedTaskField');
const linkedTask = document.getElementById('linkedTask');
const saveNote = document.getElementById('saveNote');

// modal : failed reason
const modalReason = document.getElementById('modalReason');
const reasonTaskName = document.getElementById('reasonTaskName');
const reasonText = document.getElementById('reasonText');
const saveReason = document.getElementById('saveReason');

// modal : note detail
const modalNoteDetail = document.getElementById('modalNoteDetail');
const noteDetailTitle = document.getElementById('noteDetailTitle');
const noteDetailTag = document.getElementById('noteDetailTag');
const noteDetailBody = document.getElementById('noteDetailBody');
const deleteNote = document.getElementById('deleteNote');
// toast 
const toast = document.getElementById('toast');

document.addEventListener('DOMContentLoaded', () => {
    // header
    startRealTimeClock();

    // greeting text 
    greeting();

    // stats
    const allData = localStorage.getItem(storage_key);
    const dataArray = allData ? JSON.parse(allData) : [];
    const statTasks = document.getElementById('statTasks');
    const statDone = document.getElementById('statDone');
    const statTotal = document.getElementById('statTotal');
    const statRoutines = document.getElementById('statRoutines');

    statTasks.textContent = filterTask().length;
    statRoutines.textContent = filterRoutine().length;
    statDone.textContent = filterIsDone().length
    statTotal.textContent = dataArray.length;
    if (filterTask().length > 0) {
        TasklistIsEmpty.remove();
    }

    btnAddTask.onclick = () => {
        modalOverlayTask.style.display = "flex";
    }
    modalCloseTask.onclick = () => {
        modalOverlayTask.style.display = "none";
    }

    // create task
    formTask.addEventListener('submit', (ev) => {
        ev.preventDefault();
        createTask();
        modalOverlayTask.style.display = "none";
        alert("YEY! Plan has been saved.");
        document.location.reload();
    });


    if (filterRoutine().length > 0) {
        routineListIsEmpty.remove();
    }
    btnAddRoutine.onclick = () => {
        modalOverlayRoutine.style.display = "flex";
    }
    modalCloseRoutine.onclick = () => {
        modalOverlayRoutine.style.display = "none";
    }
    // create routine
    formRoutine.addEventListener('submit', (ev) => {
        ev.preventDefault();
        createRoutine();
        modalOverlayTask.style.display = "none";
        alert("YEY! Routine has been saved.");
        document.location.reload();
    });

    // SEARCH

    // TABLE
    // identify screen size for responsive design table and loop data

    const data = localStorage.getItem(storage_key);
    const modalOverlayMore = document.querySelector('.modal-overlay-more');
    const modalCloseMore = document.querySelector('.modal-close-more');
    const tblBodyAbsoluteTrue = document.getElementById('tblBodyAbsoluteTrue');
    const tblBodyAbsoluteFalse = document.getElementById('tblBodyAbsoluteFalse');
    const btnFilterAllOverview = document.getElementById('btnFilterAllOverview');
    const btnFilterAllDone = document.getElementById('btnFilterAllDone');
    const modalTableTrue = document.getElementById('modalTableTrue');
    const modalTableFalse = document.getElementById('modalTableFalse');
    const modalCloseTableTrue = document.querySelector('.modal-close-table-true');
    const modalCloseTableFalse = document.querySelector('.modal-close-table-false');
    const trTrue = document.getElementById('trTrue');
    const trFalse = document.getElementById('trFalse');


    if (unChecked().length === 0) {
        tblBody.innerHTML += `
        <tr><td colspan="6" class="tbl-empty">Belum ada data. Mulai tambahkan task, rutinitas, atau catatan!</td></tr>
        `
    } else {
        const arrayData = unChecked();
        const dataTerbaru = arrayData.slice(-5);
        dataTerbaru.reverse().forEach(item => {
            tblBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="td">${item.type}</td>
                <td class="td">${item.time_planed}</td>
                <td><button onclick="wasCheckedOrUnChecked(${item.id})" class="btn-done"><p>${item.done}</p></button></td>
                <td><button class="btn-more"><p>More</p></button></td>
            </tr>
            `
        });
    }

    const tblBodyDone = document.getElementById('tblBodyDone');
    if (filterIsDone().length === 0) {
        tblBodyDone.innerHTML += `
        <tr><td colspan="6" class="tbl-empty">Belum ada data. Mulai selesaikan!</td></tr>
        `
    } else {
        const dataTerbaru = filterIsDone().slice(-5);
        dataTerbaru.forEach(item => {
            tblBodyDone.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="td">${item.type}</td>
                <td class="td">${item.time_planed}</td>
                <td><button onclick="wasCheckedOrUnChecked(${item.id})" class="btn-done"><p>${item.done}</p></button></td>
                <td><button class="btn-more"><p>More</p></button></td>
            </tr>
            `
        });
    }

    btnFilterAllOverview.onclick = () => {
        const filterUnChecked = unChecked();
        if (filterUnChecked.length === 0) {
            null
        } else {
        trFalse.style.display = 'none';
        tblBodyAbsoluteFalse.innerHTML = '';
        const dataTerbaru = filterUnChecked;
        dataTerbaru.reverse().forEach(item => {
            tblBodyAbsoluteFalse.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="td">${item.type}</td>
                <td class="td">${item.time_planed}</td>
                <td><p>${item.done}</p></td>
                <td><button class="btn-more"><p>More</p></button></td>
            </tr>
            `
        });
        }
        modalTableFalse.style.display = "flex";
    };

    btnFilterAllDone.onclick = () => {
        const filterDone = filterIsDone();
        if (filterDone.length === 0) {
            null
        } else {
        trTrue.style.display = 'none';
        tblBodyAbsoluteTrue.innerHTML = '';
        const dataTerbaru = filterDone;
        dataTerbaru.reverse().forEach(item => {
            tblBodyAbsoluteTrue.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="td">${item.type}</td>
                <td class="td">${item.time_planed}</td>
                <td><p>${item.done}</p></td>
                <td><button class="btn-more"><p>More</p></button></td>
            </tr>
            `
            });
        }
        modalTableTrue.style.display = "flex";
    }

    modalCloseTableTrue.onclick = () => {
        modalTableTrue.style.display = "none";
    }
    modalCloseTableFalse.onclick = () => {
        modalTableFalse.style.display = "none";
    }

const btnMore = document.querySelectorAll('.btn-more');
    // untuk deteksi apakah tombol more di klik
btnMore.forEach(button => {
    button.addEventListener
})
    // PASANG EVENT DELEGATION DI UNTUK TABEL
document.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('.btn-more')) {
        modalOverlayMore.style.display = "flex";
    }
});
//Fungsi untuk menutup modal More
modalCloseMore.onclick = () => {
    modalOverlayMore.style.display = "none";
}

});

// FOR TABLE
function filterIsDone() {
    const dataTask = localStorage.getItem(storage_key);
    const arrayTask = dataTask ? JSON.parse(dataTask) : [];
    const filterDone = arrayTask.filter(item => item.done === true);
    return filterDone;
}
function unChecked () {
    const data = localStorage.getItem(storage_key);
    const dataArray = data ? JSON.parse(data) : [];
    const filterName = dataArray.filter(item => item.done === false);
    return filterName;
}
function wasCheckedOrUnChecked(id) {
    const data = localStorage.getItem(storage_key);
    const dataArray = data ? JSON.parse(data) : [];
    const item = dataArray.find(item => item.id === id);
    item.done = !item.done;
    const parsed = JSON.stringify(dataArray);
    localStorage.setItem( storage_key, parsed);
    document.location.reload();
}
function removeItem() {
    return null
}

// function for real time clock
function startRealTimeClock() {
  // 1. Create a formatter for local time configurations
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to false for 24-hour format
    timeZone: 'Asia/Jakarta'
  });

  // 2. Loop the execution every 1000 milliseconds (1 second)
  setInterval(() => {
    const now = new Date();
    const liveTime = formatter.format(now);

    dateChip.textContent = date + " at " + liveTime;
    
  }, 1000);
}

// function for greeting
function greeting() {
    const choice = today.getDay();

    switch(choice) {
        case 1:
            greetingText.textContent = "Happy Monday 😶‍🌫️";
            break;
        case 2:
            greetingText.textContent = "Happy Tuesday 😶‍🌫️";
            break;
        case 3:
            greetingText.textContent = "Happy Wednesday 😶‍🌫️";
            break;
        case 4:
            greetingText.textContent = "Happy Thursday 😶‍🌫️";
            break;
        case 5:
            greetingText.textContent = "Happy Friday 😶‍🌫️";
            break;
        case 6:
            greetingText.textContent = "Happy Saturday 😶‍🌫️";
            break;
        case 0:
            greetingText.textContent = "Happy Sunday 😶‍🌫️";
            break;
        default: 
            greetingText.textContent = "Have a nice day 😶‍🌫️";
    }    
}

// function for task
function createTask() {
    const newTask = {
        id : generateId(),
        name: taskName.value,
        type: "plan",
        time_planed: taskTime.value,
        note: taskNote.value,
        done: false  
    }
    const ArrayTasks = localStorage.getItem(storage_key);
    const dataArray = ArrayTasks ? JSON.parse(ArrayTasks) : [];
    dataArray.push(newTask);
    const parsed = JSON.stringify(dataArray);
    localStorage.setItem( storage_key, parsed);
}

// function for routine
function createRoutine() {
    const newRoutine = {
        id : generateId(),
        name: routineName.value,
        type: "routine",
        time_planed: routineTime.value,
        note: routineNote.value,
        done: false
    }
    const ArrayRoutine = localStorage.getItem(storage_key);
    const dataArray = ArrayRoutine ? JSON.parse(ArrayRoutine) : [];
    dataArray.push(newRoutine);
    const parsed = JSON.stringify(dataArray);
    localStorage.setItem( storage_key, parsed);
}

// generate id
function generateId() {
    return +new Date()
}

// column routines | modal
function filterRoutine() {
    const dataRoutine = localStorage.getItem(storage_key);
    const arrayRoutine = dataRoutine ? JSON.parse(dataRoutine) : [];
    const filterRoutine = arrayRoutine.filter(item => item.type === "routine");
    return filterRoutine;
}

// column tasks | modal
function filterTask() {
    const dataTask = localStorage.getItem(storage_key);
    const arrayTask = dataTask ? JSON.parse(dataTask) : [];
    const filterTask = arrayTask.filter(item => item.type === "task");
    return filterTask;
}

function filterDone() {
    const dataTask = localStorage.getItem(storage_key);
    const arrayTask = dataTask ? JSON.parse(dataTask) : [];
    const filterTask = arrayTask.filter(item => item.type === "task");
    const filterDone = filterTask.filter(item => item.done === true);
    return filterDone;
    
}