// 1. Реалізуйте функцію getStudents для отримання списку всіх студентів(HTTP GET / students) getStudents
// 2. Реалізуйте функцію addStudent для додавання нового студента(HTTP POST / students)
// 3. Реалізуйте функцію updateStudent  для часткового оновлення студента(HTTP PATCH / students / { id })
// 4. Реалізуйте функцію  для deleteStudent видалення студента за його ідентифікатором(HTTP DELETE / students / { id })
// 7. Написати JavaScript - код для обробки подій користувача.
// 7.1.Додати обробники подій для кнопок, щоб вони виконували відповідні HTTP - запити.
// 7.2.При натисканні на кнопку "Отримати студентів"(GET), виконати HTTP - запит GET / students і відобразити отримані дані в таблиці.
// 7.3.Реалізувати форму для додавання нового студента.При натисканні на кнопку "Додати студента"(POST), зібрати дані з полів вводу, сформувати об'єкт з даними  і виконати HTTP-запит POST /students, щоб додати нового студента до бази даних.
// 7.4.Реалізувати можливість оновлення інформації про студента.Для кожного студента в таблиці додати кнопку "Оновити".При натисканні на цю кнопку, виконати HTTP - запит PUT / students /: id, де : id — ідентифікатор фільму, і відправити оновлені дані про студента на сервер.
// 7.5.Додати можливість видалення студента.Для кожного студента в таблиці додати кнопку "Видалити".При натисканні на цю кнопку, виконати HTTP - запит DELETE / students /: id.

const tableBody = document.querySelector("tbody");
const getBtn = document.getElementById("get-students-btn");
const formRef = document.getElementById("add-student-form");

let currentEdit = null;


// Функція для отримання всіх студентів

function getStudents() {
  return fetch("http://localhost:3000/students").then((res) => res.json());
};



function addStudent(student) {
  const options = {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return fetch("http://localhost:3000/students", options).then((res) => res.json());
};

function updateStudent(id, student) {
  const options = {
    method: "PUT",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return fetch(`http://localhost:3000/students/${id}`, options).then((res) => res.json());
};

function deleteStudent(id) {
  return fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};


// Функція для відображення студентів у таблиці

getBtn.addEventListener("click", () => {
  getStudents().then(res => renderStudents(res));
});

function renderStudents(students) {
  const item = students.map(({ id, name, age, course, skills, email, isEnrolled }) => {
    return `<tr id="${id}">
          <td class="item-id">${id}</td>
          <td class="item-name">${name}</td>
          <td class="item-age">${age}</td>
          <td class="item-course">${course}</td>
          <td class="item-skills">${skills}</td>
          <td class="item-email">${email}</td>
          <td class="item-is-enrolled">${isEnrolled}</td>
          <td>
            <button type="button" data-action="edit">Редагувати</button>
            <button type="button" data-action="delete">Видалити</button>
          </td>
        </tr>`
  }).join("");

  tableBody.innerHTML = item;

};

// Функція для додавання нового студента



formRef.addEventListener("submit", (event) => {
  event.preventDefault();

  const elements = event.currentTarget.elements;
  console.log(elements);

  const studentData = {
    name: elements.name.value.trim(),
    age: elements.age.value.trim(),
    course: elements.course.value.trim(),
    skills: elements.skills.value.trim(),
    email: elements.email.value.trim(),
    isEnrolled: elements.isEnrolled.checked
  };

  console.log(studentData);
  

  if (currentEdit === null) {
    addStudent(studentData).then(res => {
      formRef.reset();
      getStudents().then(res => renderStudents(res));
    });
  } else {
    updateStudent(currentEdit, studentData).then(res => {
      currentEdit = 0;
      formRef.reset();
      getStudents().then(res => renderStudents(res));
    });
  };
});

tableBody.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) {
    return;
  };

  const tr = event.target.closest("tr");
  const id = tr.id;

  if (action === "delete") {
    deleteStudent(id).then(() => getStudents()).then(res => renderStudents(res));
  }

  if (action === "edit") {
    currentEdit = id;

    formRef.elements.name.value = tr.querySelector(".item-name").textContent;
    formRef.elements.age.value = tr.querySelector(".item-age").textContent;
    formRef.elements.course.value = tr.querySelector(".item-course").textContent;
    formRef.elements.skills.value = tr.querySelector(".item-skills").textContent;
    formRef.elements.email.value = tr.querySelector(".item-email").textContent;
    formRef.elements.isEnrolled.checked = tr.querySelector(".item-is-enrolled").textContent === "true";
    // console.log(formRef.elements.isEnrolled.checked);
    
  }
});