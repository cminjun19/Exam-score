/* ==================================================
   성적 데이터
================================================== */

let gradeData = [];


/* ==================================================
   grades.json 불러오기
================================================== */

fetch("grades.json")
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "grades.json을 불러오지 못했습니다."
            );
        }

        return response.json();

    })

    .then(data => {

        gradeData = data;

    })

    .catch(error => {

        console.error(error);

    });


/* ==================================================
   조회 버튼
================================================== */

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchGrade
    );


/* ==================================================
   Enter 키로 조회
================================================== */

document
    .querySelectorAll(".login-box input")
    .forEach(input => {

        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    searchGrade();

                }

            }
        );

    });


/* ==================================================
   성적 조회
================================================== */

function searchGrade() {

    const gradeCode =
        document
            .getElementById("gradeCode")
            .value
            .trim();


    const studentId =
        document
            .getElementById("studentId")
            .value
            .trim();


    const studentName =
        document
            .getElementById("studentName")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const errorMessage =
        document
            .getElementById("errorMessage");


    const report =
        document
            .getElementById("report");


    /* 오류 메시지 초기화 */

    errorMessage.textContent = "";


    /* 모든 정보 입력 여부 */

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


    /* ==================================================
       네 가지 정보 대조

       성적 코드
       학번
       이름
       비밀번호
    ================================================== */

    const student =
        gradeData.find(item =>

            item.gradeCode === gradeCode &&
            item.studentId === studentId &&
            item.name === studentName &&
            item.password === password

        );


    /* ==================================================
       일치하지 않는 경우
    ================================================== */

    if (!student) {

        errorMessage.textContent =
            "입력한 정보가 일치하지 않습니다.";

        report.style.display = "none";

        return;

    }


    /* ==================================================
       조회 성공
    ================================================== */

    errorMessage.textContent = "";

    report.style.display = "block";


    /* ==================================================
       기존 성적표 내용 초기화
    ================================================== */

    document
        .getElementById("reportDate")
        .textContent = "";


    document
        .getElementById("schoolYear")
        .textContent = "";


    document
        .getElementById("semester")
        .textContent = "";


    document
        .getElementById("grade")
        .textContent = "";


    document
        .getElementById("examName")
        .textContent = "";


    document
        .getElementById("className")
        .textContent = "";


    document
        .getElementById("studentNumber")
        .textContent = "";


    document
        .getElementById("studentNameResult")
        .textContent = "";


    document
        .getElementById("subjectList")
        .innerHTML = "";


    document
        .getElementById("average")
        .textContent = "";


    /* ==================================================
       타자기 출력

       출력 순서:

       날짜
       ↓
       학년도
       ↓
       학기
       ↓
       학년
       ↓
       시험
       ↓
       반
       ↓
       번호
       ↓
       성명
       ↓
       과목
       ↓
       평균
    ================================================== */

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


/* ==================================================
   타자기 효과
================================================== */

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

            setTimeout(
                type,
                speed
            );

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


/* ==================================================
   과목 출력
================================================== */

function typeSubjects(
    subjects,
    index,
    callback
) {

    /* 모든 과목 출력 완료 */

    if (index >= subjects.length) {

        if (callback) {

            callback();

        }

        return;

    }


    const subject =
        subjects[index];


    /* 행 생성 */

    const row =
        document.createElement("tr");


    /* 과목명 */

    const nameCell =
        document.createElement("td");


    /* 점수 */

    const scoreCell =
        document.createElement("td");


    row.appendChild(nameCell);

    row.appendChild(scoreCell);


    document
        .getElementById("subjectList")
        .appendChild(row);


    /* 과목명 타이핑 */

    typeText(

        nameCell,

        subject.name,

        45,

        () => {

            /* 점수 타이핑 */

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
