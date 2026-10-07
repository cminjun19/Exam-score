let gradeData = [];

// 성적 데이터 불러오기
fetch("grades.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("성적 데이터를 불러올 수 없습니다.");
        }

        return response.json();
    })
    .then(data => {
        gradeData = data;
    })
    .catch(error => {
        console.error(error);
    });


const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", searchGrade);


function searchGrade() {

    const gradeCode =
        document.getElementById("gradeCode").value.trim();

    const studentId =
        document.getElementById("studentId").value.trim();

    const studentName =
        document.getElementById("studentName").value.trim();

    const password =
        document.getElementById("password").value;


    const errorMessage =
        document.getElementById("errorMessage");


    // 입력값 확인
    if (!gradeCode || !studentId || !studentName || !password) {

        errorMessage.textContent =
            "모든 정보를 입력해주세요.";

        return;
    }


    // 데이터 대조
    const student = gradeData.find(item =>
        item.gradeCode === gradeCode &&
        item.studentId === studentId &&
        item.name === studentName &&
        item.password === password
    );


    // 일치하지 않을 경우
    if (!student) {

        errorMessage.textContent =
            "입력한 정보가 일치하지 않습니다.";

        document.getElementById("report").style.display = "none";

        return;
    }


    // 오류 메시지 삭제
    errorMessage.textContent = "";


    // 성적표 초기화
    const report =
        document.getElementById("report");

    report.style.display = "block";


    document.getElementById("semester").textContent = "";
    document.getElementById("name").textContent = "";
    document.getElementById("studentNumber").textContent = "";
    document.getElementById("subjectList").innerHTML = "";
    document.getElementById("average").textContent = "";


    // 성적표 출력 시작
    typeText(
        document.getElementById("semester"),
        student.semester,
        40,
        () => {

            typeText(
                document.getElementById("name"),
                student.name,
                40,
                () => {

                    typeText(
                        document.getElementById("studentNumber"),
                        student.studentId,
                        40,
                        () => {

                            typeSubjects(
                                student.subjects,
                                0,
                                () => {

                                    typeText(
                                        document.getElementById("average"),
                                        student.average,
                                        50
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );
}


// 글자를 한 글자씩 출력
function typeText(element, text, speed, callback) {

    element.classList.add("typing");

    let index = 0;

    function type() {

        if (index < text.length) {

            element.textContent += text[index];

            index++;

            setTimeout(type, speed);

        } else {

            element.classList.remove("typing");

            if (callback) {
                callback();
            }
        }
    }

    type();
}


// 과목을 한 줄씩 출력
function typeSubjects(subjects, index, callback) {

    if (index >= subjects.length) {

        if (callback) {
            callback();
        }

        return;
    }


    const subject = subjects[index];

    const row =
        document.createElement("tr");


    const nameCell =
        document.createElement("td");

    const scoreCell =
        document.createElement("td");


    row.appendChild(nameCell);
    row.appendChild(scoreCell);


    document
        .getElementById("subjectList")
        .appendChild(row);


    typeText(
        nameCell,
        subject.name,
        45,
        () => {

            typeText(
                scoreCell,
                String(subject.score),
                45,
                () => {

                    typeSubjects(
                        subjects,
                        index + 1,
                        callback
                    );

                }
            );

        }
    );
}
