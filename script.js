let rname = document.getElementById("rname");
let name = document.getElementById("name");
let age = document.getElementById("age");
let fname = document.getElementById("fname");
let fSub = document.getElementById("firstSub");
let sSub = document.getElementById("secSub");
let tSub = document.getElementById("thirdSub");
let add_btn = document.getElementById("add-btn");
let update_btn = document.getElementById("up-btn");
let delete_btn = document.getElementById("de-btn");

window.addEventListener("DOMContentLoaded", () => {
  showData();
});

add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let studentObj = {
    Rollnum: Number(rname.value.trim()),
    Name: name.value.trim(),
    sAge: Number(age.value.trim()),
    fatherName: fname.value.trim(),
    Marks: [
      Number(fSub.value.trim()),
      Number(sSub.value.trim()),
      Number(tSub.value.trim()),
    ],
  };
  let data = localStorage.setItem(
    studentObj.Rollnum,
    JSON.stringify(studentObj)
  );
  alert(" Student added successfully");
  showData();
  resetForm();
});

rname.addEventListener("input", (e) => {
  e.preventDefault();
  let roll = rname.value.trim();
  let studentData = localStorage.getItem(roll);
  if (!roll) {
    alert("Please enter a Roll Number to update.");
    return;
  }
  if (studentData) {
    let student = JSON.parse(studentData);
    name.value = student.Name;
    age.value = student.sAge;
    fname.value = student.fatherName;
    fSub.value = student.Marks[0];
    sSub.value = student.Marks[1];
    tSub.value = student.Marks[2];
  } else {
    name.value = "";
    age.value = "";
    fname.value = "";
    fSub.value = "";
    sSub.value = "";
    tSub.value = "";
  }
});

update_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let roll = rname.value.trim();
  let studentData = localStorage.getItem(roll);
  if (!studentData) {
    alert("Student not found!");
    return;
  }
  let upadteStudent = {
    Rollnum: Number(roll),
    Name: name.value.trim(),
    sAge: Number(age.value.trim()),
    fatherName: fname.value.trim(),
    Marks: [
      Number(fSub.value.trim()),
      Number(sSub.value.trim()),
      Number(tSub.value.trim()),
    ],
  };
  localStorage.setItem(roll, JSON.stringify(upadteStudent));
  alert(" Student updated successfully");
  showData();
  resetForm();
});

delete_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let roll = rname.value.trim();
  let student = localStorage.getItem(roll);
  if (!roll) {
    alert("Please enter a Roll Number to delete.");
    return;
  }
  localStorage.removeItem(roll);
  alert("Student deleted successfully");
  showData();
  resetForm();
});

function showData() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);

    try {
      let student = JSON.parse(value);
      if (student && student.Rollnum && student.Name) {
        const marks = student.Marks;
        const average = marks.reduce((acc, val) => acc + val, 0) / marks.length;
        const maxMark = Math.max(...marks);
        const passCount = marks.filter((m) => m >= 33).length;
        const failCount = marks.length - passCount;
        let row = document.createElement("tr");
        row.innerHTML = `
                    <td>${student.Rollnum}</td>
                    <td>${student.Name}</td>
                    <td>${student.sAge}</td>
                    <td>${student.fatherName}</td>
                    <td>${student.Marks[0]}</td>
                    <td>${student.Marks[1]}</td>
                    <td>${student.Marks[2]}</td>
                    <td>${average.toFixed(2)}</td>
                    <td>${maxMark}</td>
                    <td>Pass: ${passCount}, Fail: ${failCount}</td>
                    `;

        tbody.appendChild(row);
      }
    } catch (error) {
      console.warn(`Invalid JSON at key ${key}`);
    }
  }
  resetForm();
}
function resetForm() {
  rname.value = "";
  name.value = "";
  age.value = "";
  fname.value = "";
  fSub.value = "";
  sSub.value = "";
  tSub.value = "";
}
