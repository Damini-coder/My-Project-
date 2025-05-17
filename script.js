let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let currentFilter = "all";

function renderAssignments() {
    const list = document.getElementById("assignmentList");
    list.innerHTML = "";

    let filtered = assignments.filter(item => {
        if (currentFilter === "done") return item.done;
        if (currentFilter === "pending") return !item.done;
        return true;
    });

    filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    filtered.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "assignment" + (item.done ? " done" : "");
        li.innerHTML = `
            ${item.title} - Due: ${item.dueDate}
            <div class="controls">
                <button class="done-btn" onclick="markDone(${index})">Done</button>
                <button class="edit-btn" onclick="editAssignment(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteAssignment(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });

    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function markDone(index) {
    assignments[index].done = true;
    renderAssignments();
}

function deleteAssignment(index) {
    assignments.splice(index, 1);
    renderAssignments();
}

function editAssignment(index) {
    const newTitle = prompt("Edit title:", assignments[index].title);
    const newDate = prompt("Edit due date (YYYY-MM-DD):", assignments[index].dueDate);

    if (newTitle && newDate) {
        assignments[index].title = newTitle;
        assignments[index].dueDate = newDate;
        renderAssignments();
    }
}

document.getElementById("assignmentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;

    if (title && dueDate) {
        assignments.push({ title, dueDate, done: false });
        renderAssignments();
        document.getElementById("assignmentForm").reset();
    }
});

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderAssignments();
    });
});

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

renderAssignments();
