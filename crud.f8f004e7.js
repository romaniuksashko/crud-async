let e=document.querySelector("tbody"),t=document.getElementById("get-students-btn"),n=document.getElementById("add-student-form"),l=null;function s(){return fetch("http://localhost:3000/students").then(e=>e.json())}function o(t){e.innerHTML=t.map(({id:e,name:t,age:n,course:l,skills:s,email:o,isEnrolled:a})=>`<tr id="${e}">
          <td class="item-id">${e}</td>
          <td class="item-name">${t}</td>
          <td class="item-age">${n}</td>
          <td class="item-course">${l}</td>
          <td class="item-skills">${s}</td>
          <td class="item-email">${o}</td>
          <td class="item-is-enrolled">${a}</td>
          <td>
            <button type="button" data-action="edit">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button type="button" data-action="delete">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
          </td>
        </tr>`).join("")}t.addEventListener("click",()=>{s().then(e=>o(e))}),n.addEventListener("submit",e=>{e.preventDefault();let t=e.currentTarget.elements;console.log(t);let a={name:t.name.value.trim(),age:t.age.value.trim(),course:t.course.value.trim(),skills:t.skills.value.trim(),email:t.email.value.trim(),isEnrolled:t.isEnrolled.checked};if(console.log(a),null===l)fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(e=>e.json()).then(e=>{n.reset(),s().then(e=>o(e))});else{var u;(u=l,fetch(`http://localhost:3000/students/${u}`,{method:"PUT",body:JSON.stringify(a),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(e=>e.json())).then(e=>{l=0,n.reset(),s().then(e=>o(e))})}}),e.addEventListener("click",e=>{let t=e.target.dataset.action;if(!t)return;let a=e.target.closest("tr"),u=a.id;"delete"===t&&fetch(`http://localhost:3000/students/${u}`,{method:"DELETE"}).then(e=>e.json()).then(()=>s()).then(e=>o(e)),"edit"===t&&(l=u,n.elements.name.value=a.querySelector(".item-name").textContent,n.elements.age.value=a.querySelector(".item-age").textContent,n.elements.course.value=a.querySelector(".item-course").textContent,n.elements.skills.value=a.querySelector(".item-skills").textContent,n.elements.email.value=a.querySelector(".item-email").textContent,n.elements.isEnrolled.checked="true"===a.querySelector(".item-is-enrolled").textContent)});
//# sourceMappingURL=crud.f8f004e7.js.map
