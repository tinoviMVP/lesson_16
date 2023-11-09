
let listStudents = [
    {
        name: 'Илья',
        surname: "Иванов",
        lastname: "Олегович",
        birthday: new Date(1994, 5, 12),
        course: "Фронтенд",
        start: "43"
    },
    {
        name: 'Оля',
        surname: "Иванова",
        lastname: "Костина",
        birthday: new Date(1991, 9, 22),
        course: "Фронтенд",
        start: "43"
    },
    {
        name: 'Николай',
        surname: "Югай",
        lastname: "Иванов",
        birthday: new Date(2000, 7, 2),
        course: "Фронтенд",
        start: "43",
    }
]
function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

function $getNewStudentTR(studObj){
    const $tr = document.createElement("tr")
    const $tdFIO = document.createElement("td")
    const $tdBirthday = document.createElement("td")
    const $tdcourse = document.createElement("td")
    const $tdStart = document.createElement("td")
    const $tdDelete = document.createElement("td")
    const $btnDelete = document.createElement("button")

    $btnDelete.classList.add("btn", "btn-danger", "w-100")
    $btnDelete.textContent= "Удалить"

    $tdFIO.textContent = `${studObj.lastname} ${studObj.name} ${studObj.surname}`
    $tdBirthday.textContent = formatDate(studObj.birthday)
    $tdcourse.textContent = studObj.course
    $tdStart.textContent = studObj.start

    $btnDelete.addEventListener("click", async function(){
        await serverDeleteStudent(studObj.id)
        $tr.remove()
    })

    $tdDelete.append($btnDelete)
    $tr.append($tdFIO, $tdBirthday, $tdcourse, $tdStart, $tdDelete)
    return $tr
}


function render(arr) {
    let copyArr = [...arr]

    const $studTable = document.getElementById("stud-table")

    $studTable.innerHTML = ''
    for (const studObj of copyArr) {
        const $newTr = $getNewStudentTR(studObj)
        $studTable.append($newTr)
    }
}

render(listStudents)

document.getElementById("add-form").addEventListener("submit", function (event) {
    event.preventDefault()

    let newStudentObj = {
        name: document.getElementById("name-inp").value,
        surname: document.getElementById("surname-inp").value,
        lastname: document.getElementById("lastname-inp").value,
        birthday: new Date(document.getElementById("birthday-inp").value),
        course: document.getElementById("course-inp").value,
        start: document.getElementById("start-inp").value,
    }

    listStudents.push(newStudentObj)
    render(listStudents)

})