var form = document.getElementById("resumeForm");
var resumeDisplayElement = document.getElementById("rusume");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("dowmload-pdf");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var nameElement = document.getElementById('name').value;
    var emailElement = document.getElementById('email').value;
    var phoneElement = document.getElementById('phone').value;
    var educationElement = document.getElementById('education').value;
    var experienceElement = document.getElementById('experience').value;
    var skillsElement = document.getElementById('skills').value;
    //save from data in localstorage with the username as the key
    var resumeData = {
        nameElement: nameElement,
        emailElement: emailElement,
        phoneElement: phoneElement,
        educationElement: educationElement,
        experienceElement: experienceElement,
        skillsElement: skillsElement
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n    <h2>Editable Resume</h2>\n    <h3>Personal Information</h3>\n    <p>Name:<span contenteditable=\"true\">".concat(nameElement, "</span></p>\n     <p>Email:<span contenteditable=\"true\">").concat(emailElement, "</span></p>\n      <p>Phone:<span contenteditable=\"true\">").concat(phoneElement, "</span></p>\n\n      <h3>Educatiion</h3>\n      <p contenteditable=\"true\">").concat(educationElement, "</p>\n\n      <h3>Experience</h3>\n     <p contenteditable=\"true\">").concat(experienceElement, "</p>\n\n     <h3>Skills</h3>\n     <p contenteditable=\"true\">").concat(skillsElement, "</p>\n\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //  Display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle pdf download
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
//  prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.nameElement;
            document.getElementById('email').value = resumeData.emailElement;
            document.getElementById('phone').value = resumeData.phoneElement;
            document.getElementById('education').value = resumeData.educationElement;
            document.getElementById('skills').value = resumeData.skillsElement;
        }
        ;
    }
    ;
});
