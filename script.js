let gradeData = [];


/* =========================
   성적 데이터 불러오기
========================= */

fetch("grades.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("grades.json을 불러오지 못했습니다.");
        }

        return response.json();

    })
    .then(data => {

        gradeData = data;

    })
    .catch(error => {

        console.error(error);

    });



/* =========================
   조회 버튼
========================= */

document
    .getElementById("searchButton")
    .addEventListener("click", searchGrade);



/* =========================
   성적 조회
========================= */

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

    const report =
        document.getElementById("report");


    errorMessage.textContent = "";


    /* 입력 확인 */

    if (
        gradeCode === "" ||
        studentId === "" ||
        studentName === "" ||
        password === ""
    ) {

        errorMessage.textContent =
            "모든 정보를 입력해주세요.";

        report.style.display = "none";

        return;
    }


    /* 데이터 대조 */

    const student = gradeData.find(item =>

        item.gradeCode === gradeCode &&
        item.studentId === studentId &&
        item.name === studentName &&
        item.password === password

    );


    /* 일치하지 않음 */

    if (!student) {

        errorMessage.textContent =
            "입력한 정보가 일치하지 않습니다.";

        report.style.display = "none";

        return;
    }


    /* 조회 성공 */

    report.style.display = "block";


    /* 기존 내용 초기화 */

    document.getElementById("reportDate").textContent = "";

    document.getElementById("schoolYear").textContent = "";

    document.getElementById("semester").textContent = "";

    document.getElementById("grade").textContent = "";

    document.getElementById("examName").textContent = "";

    document.getElementById("className").textContent = "";

    document.getElementById("studentNumber").textContent = "";

    document.getElementById("studentNameResult").textContent = "";

    document.getElementById("subjectList").innerHTML = "";

    document.getElementById("average").textContent = "";


    /*
        타자기 출력 시작
    */

    typeText(
        document.getElementById("reportDate"),
        student.date,
        35,

        () => {

            typeText(
                document.getElementById("schoolYear"),
                student.schoolYear,
                35,

                () => {

                    typeText(
                        document.getElementById("semester"),
                        student.semester,
                        35,

                        () => {

                            typeText(
                                document.getElementById("grade"),
                                student.grade,
                                35,

                                () => {

                                    typeText(
                                        document.getElementById("examName"),
                                        student.examName,
                                        35,

                                        () => {

                                            typeText(
                                                document.getElementById("className"),
                                                student.className,
                                                35,

                                                () => {

                                                    typeText(
                                                        document.getElementById("studentNumber"),
                                                        student.number,
                                                        35,

                                                        () => {

                                                            typeText(
                                                                document.getElementById("studentNameResult"),
                                                                student.name,
                                                                45,

                                                                () => {

                                                                    typeSubjects(
                                                                        student.subjects,
                                                                        0,

                                                                        () => {

                                                                            typeText(
                                                                                document.getElementById("average"),
                                                                                student.average,
                                                                                45
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



/* =========================
   글자 하나씩 출력
========================= */

function typeText(
    element,
    text,
    speed,
    callback
) {

    element.classList.add("typing");

    let index = 0;

    text = String(text);


    function type() {

        if (index < text.length) {

            element.textContent +=
                text[index];

            index++;

            setTimeout(type, speed);

        }

        else {

            element.classList.remove("typing");

            if (callback) {
                callback();
            }

        }

    }


    type();

}



/* =========================
   과목 출력
========================= */

function typeSubjects(
    subjects,
    index,
    callback
) {

    if (index >= subjects.length) {

        if (callback) {
            callback();
        }

        return;
    }


    const subject =
        subjects[index];


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


    /* 과목명 */

    typeText(
        nameCell,
        subject.name,
        45,

        () => {

            /* 점수 */

            typeText(
                scoreCell,
                subject.score,
                45,

                () => {

                    /* 다음 과목 */

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
