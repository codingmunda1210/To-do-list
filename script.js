const inptbox = document.getElementById("input-text");
const lt = document.getElementById("list");

function addTask() {
    if (inptbox.value === '') {
        alert("YOU MUST WRITE SOMETHING!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inptbox.value;
        lt.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inptbox.value = "";
    saveData();
}

inptbox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

lt.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

lt.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        let currentText = e.target.childNodes[0].nodeValue;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        e.target.innerHTML = "";
        e.target.appendChild(input);

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                e.target.innerHTML = input.value;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                e.target.appendChild(span);
                saveData();
            }
        });

        input.addEventListener("blur", function() {
            e.target.innerHTML = input.value;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            e.target.appendChild(span);
            saveData();
        });

        input.focus();
    }
});

function saveData() {
    localStorage.setItem("data", lt.innerHTML);
}

function showtask() {
    lt.innerHTML = localStorage.getItem("data");
}

showtask();
