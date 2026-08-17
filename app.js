const subjectsContainer = document.getElementById("subjects-container");
const addSubjectButton = document.getElementById("add-subject-btn");
const calculateButton = document.getElementById("calculate-btn");
const totalCreditsElement = document.getElementById("total-credits");
const cgpaElement = document.getElementById("cgpa");
const errorMessage = document.getElementById("error-message");


// Add a new subject row
addSubjectButton.addEventListener("click", function () {

    const subjectRow = document.createElement("div");

    subjectRow.className = "subject-row";

    subjectRow.innerHTML = `
        <input
            type="text"
            class="subject-name"
            placeholder="Subject name"
        >

        <input
            type="number"
            class="credits"
            placeholder="Credits"
            min="1"
            step="1"
        >

        <select class="grade">
            <option value="">Grade</option>
            <option value="10">A+</option>
            <option value="9">A</option>
            <option value="8">B+</option>
            <option value="7">B</option>
            <option value="6">C</option>
            <option value="5">D</option>
            <option value="0">F</option>
        </select>

        <button
            type="button"
            class="delete-btn"
            onclick="deleteSubject(this)"
        >
            Delete
        </button>
    `;

    subjectsContainer.appendChild(subjectRow);
});


// Delete a subject
function deleteSubject(button) {

    const subjectRows =
        document.querySelectorAll(".subject-row");

    if (subjectRows.length === 1) {
        errorMessage.textContent =
            "At least one subject is required.";

        return;
    }

    button.parentElement.remove();

    errorMessage.textContent = "";
}


// Calculate CGPA
calculateButton.addEventListener("click", function () {

    errorMessage.textContent = "";

    const subjectRows =
        document.querySelectorAll(".subject-row");

    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const row of subjectRows) {

        const subjectName =
            row.querySelector(".subject-name").value.trim();

        const credits =
            Number(row.querySelector(".credits").value);

        const grade =
            row.querySelector(".grade").value;

        // Validate subject name
        if (subjectName === "") {

            errorMessage.textContent =
                "Please enter a subject name.";

            return;
        }

        // Validate credits
if (!Number.isFinite(credits) || credits <= 0) {

    errorMessage.textContent =
        "Credits must be greater than zero.";

    return;
}

if (!Number.isInteger(credits)) {

    errorMessage.textContent =
        "Credits must be a whole number.";

    return;
}

if (credits > 10) {

    errorMessage.textContent =
        "Credits cannot be greater than 10.";

    return;
}

        // Validate grade
        if (grade === "") {

            errorMessage.textContent =
                "Please select a grade.";

            return;
        }

        const gradePoint = Number(grade);

        totalCredits += credits;

        totalGradePoints +=
            credits * gradePoint;
    }

    // Prevent division by zero
    if (totalCredits === 0) {

        errorMessage.textContent =
            "Total credits cannot be zero.";

        return;
    }

    const cgpa =
        totalGradePoints / totalCredits;

    totalCreditsElement.textContent =
        totalCredits;

    cgpaElement.textContent =
        cgpa.toFixed(2);
});