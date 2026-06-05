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

// stats
const statTasks = document.getElementById('statTasks');
const statDone = document.getElementById('statDone');
const statTotal = document.getElementById('statTotal');
const statRoutines = document.getElementById('statRoutines');

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
const colTime = document.querySelector('.time-col');
const colNote = document.querySelector('.note-col');

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

//  FUNCTIONS

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
        name: taskName.value,
        type: "task",
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
        name: routineName.value,
        type: "routine",
        time_planed: routineTime.value,
        note: routineNote.value,
        done: false
    }
    const ArrayRoutine = localStorage.getItem(storage_key);
    const dataArray = ArrayRoutine ? JSON.parse(ArrayRoutine) : [];
    dataArray.push(newRoutine);
    console.log(dataArray);
    const parsed = JSON.stringify(dataArray);
    console.log(parsed);
    localStorage.setItem( storage_key, parsed);
}

// header
startRealTimeClock();

// greeting text 
greeting();

// stats

// column tasks | modal
const dataTask = localStorage.getItem(storage_key);
if (dataTask) {
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

// column routines | modal
const dataRoutine = localStorage.getItem(storage_key);
if (dataRoutine) {
    routineListIsEmpty.remove()
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
    document.location.reload();
});

// SEARCH

// TABLE

// identify screen size for responsive design table and loop data
function identifyScreenSize() {
    const widthScreen = window.innerWidth;
    return widthScreen;
}
window.addEventListener('resize', () => {
        if (identifyScreenSize() < 720) {
            tableSection.style.display = "none";
        } else {
            tableSection.style.display = "block";
        }
});