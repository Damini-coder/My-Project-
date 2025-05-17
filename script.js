const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const dueDate = document.getElementById("dueDate").value;

  const li = document.createElement("li");
  li.innerHTML = `<span>${title} - Due: ${dueDate}</span>
                  <button onclick="markDone(this)">Done</button>`;
  list.appendChild(li);

  form.reset();
});

function markDone(button) {
  const item = button.parentElement;
  item.classList.toggle("completed");
}
