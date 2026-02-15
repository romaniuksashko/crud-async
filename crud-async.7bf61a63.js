let t=document.querySelector("tbody"),e=document.getElementById("get-students-btn"),n=document.getElementById("add-student-form"),a=null;async function l(){let t=await fetch("http://localhost:3000/students");if(!t.ok)throw Error("Failed!");return t.json()}async function s(t){let e={method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json; charset=UTF-8"}},n=await fetch("http://localhost:3000/students",e);if(!n.ok)throw Error("Failed!");return n.json()}async function i(t,e){let n={method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}},a=await fetch(`http://localhost:3000/students/${t}`,n);if(!a.ok)throw Error("Failed!");return a.json()}async function o(t){let e=await fetch(`http://localhost:3000/students/${t}`,{method:"DELETE"});if(!e.ok)throw Error("Failed!");return e.json()}function r(e){t.innerHTML=e.map(({id:t,name:e,age:n,course:a,skills:l,email:s,isEnrolled:i})=>`<tr id="${t}">
          <td class="item-id">${t}</td>
          <td class="item-name">${e}</td>
          <td class="item-age">${n}</td>
          <td class="item-course">${a}</td>
          <td class="item-skills">${l}</td>
          <td class="item-email">${s}</td>
          <td class="item-is-enrolled">${i}</td>
          <td>
            <button type="button" data-action="edit">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button type="button" data-action="delete">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
          </td>
        </tr>`).join("")}e.addEventListener("click",async()=>{r(await l())}),n.addEventListener("submit",async t=>{t.preventDefault();let e=t.currentTarget.elements,o={name:e.name.value.trim(),age:e.age.value.trim(),course:e.course.value.trim(),skills:e.skills.value.trim(),email:e.email.value.trim(),isEnrolled:e.isEnrolled.checked};null===a?(await s(o),n.reset(),r(await l())):(await i(a,o),n.reset(),r(await l()),a=null)}),t.addEventListener("click",async t=>{let e=t.target.dataset.action;if(!e)return;let s=t.target.closest("tr"),i=s.id;"delete"===e&&(await o(i),r(await l())),"edit"===e&&(a=i,n.elements.name.value=s.querySelector(".item-name").textContent,n.elements.age.value=s.querySelector(".item-age").textContent,n.elements.course.value=s.querySelector(".item-course").textContent,n.elements.skills.value=s.querySelector(".item-skills").textContent,n.elements.email.value=s.querySelector(".item-email").textContent,n.elements.isEnrolled.checked="true"===s.querySelector(".item-is-enrolled").textContent)});
//# sourceMappingURL=crud-async.7bf61a63.js.map
