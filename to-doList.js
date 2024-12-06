const inputBox1 = document.getElementById('task-name1');
const inputBox2 = document.getElementById('task-name2');
const inputBox3 = document.getElementById('task-name3');
const listContainer1 = document.getElementById('list-container1');
const listContainer2 = document.getElementById('list-container2');
const listContainer3 = document.getElementById('list-container3');

const listContainers = [listContainer1, listContainer2, listContainer3];
const presetData = [
    [
        { task: "Create a C++ Project", description: "something creative" },
        { task: "Improve Chess Skill", description: "Learn new oppenings" }
    ],
    [
        { task: "Create a Dream Journal (CSC 101)", description: "due Jan 6." },
        { task: "Study for Finals", description: "for high grades" }
    ],
    [
        { task: "Try to land a job in a big Company", description: "Manifesting" },
        { task: "Improve Social Skills", description: "talk to everyone" }
    ]
];

function addTask(inputBox, listContainer) {
    const taskNumber = getTaskNumber(listContainer);

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        li.innerHTML = `${taskNumber}. ${inputBox.value}`;

        let span = document.createElement("span");
        span.innerHTML = "\u00D7"; 
        li.appendChild(span);

        let dt = document.createElement("dt");
        dt.innerHTML = "Description:";

        const dd = document.createElement('dd');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');  
        input.setAttribute('placeholder', 'Add description');
        input.setAttribute('id', 'descriptionbox') 
        dd.appendChild(input);  

        li.appendChild(dt);
        li.appendChild(dd);

        listContainer.appendChild(li);
        inputBox.value = "";  

        input.addEventListener('input', function() {
            saveData();
        });

        saveData(); 
    }
}

document.getElementById('b1').addEventListener("click", function() {
    addTask(inputBox1, listContainer1);
});

document.getElementById('b2').addEventListener("click", function() {
    addTask(inputBox2, listContainer2);
});

document.getElementById('b3').addEventListener("click", function() {
    addTask(inputBox3, listContainer3);
});

listContainers.forEach((listContainer, index) => {
    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    });
});

function getTaskNumber(listContainer) {
    const tasks = listContainer.querySelectorAll('li');
    return tasks.length + 1;
}

function saveData() {
    listContainers.forEach((listContainer, index) => {
        localStorage.setItem(`data${index + 1}`, listContainer.innerHTML);

        const descriptions = Array.from(listContainer.querySelectorAll('input[type="text"]'))
            .map(input => input.value);
        localStorage.setItem(`descriptions${index + 1}`, JSON.stringify(descriptions));
    });
}

function showTask() {
    listContainers.forEach((listContainer, index) => {
        const savedData = localStorage.getItem(`data${index + 1}`);
        const savedDescriptions = JSON.parse(localStorage.getItem(`descriptions${index + 1}`)) || [];

        if (!savedData) {
            presetData[index].forEach((taskData, taskIndex) => {
                addPresetTask(listContainer, taskData.task, taskData.description, taskIndex + 1);
            });
        } else {
            listContainer.innerHTML = savedData;

            const inputs = listContainer.querySelectorAll('input[type="text"]');
            inputs.forEach((input, idx) => {
                input.value = savedDescriptions[idx] || '';
                input.addEventListener('input', function () {
                    saveData();
                });
            });
        }
    });
}

function addPresetTask(listContainer, taskName, description, taskNumber) {
    let li = document.createElement("li");
    li.innerHTML = `${taskNumber}. ${taskName}`;
    
    let span = document.createElement("span");
    span.innerHTML = "\u00D7"; 
    li.appendChild(span);

    let dt = document.createElement("dt");
    dt.innerHTML = "Description:";

    const dd = document.createElement('dd');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Add description');
    input.value = description; 
    dd.appendChild(input);

    li.appendChild(dt);
    li.appendChild(dd);
    
    listContainer.appendChild(li);
    
    input.addEventListener('input', function () {
        saveData();
    });
}


showTask();
