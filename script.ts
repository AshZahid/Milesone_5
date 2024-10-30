
const form = document.getElementById("resumeForm") as HTMLFormElement
const resumeDisplayElement = document.getElementById("rusume") as HTMLDivElement
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("dowmload-pdf") as HTMLButtonElement;

form.addEventListener('submit', (event: Event) => {
       event.preventDefault();


        const username = (document.getElementById("username") as HTMLInputElement).value;  
    const nameElement = (document.getElementById('name') as HTMLInputElement).value;
    const emailElement = (document.getElementById('email') as HTMLInputElement).value;
    const phoneElement = (document.getElementById('phone') as HTMLInputElement).value
    const educationElement = (document.getElementById('education') as HTMLTextAreaElement).value
    const experienceElement = (document.getElementById('experience') as HTMLTextAreaElement).value
    const skillsElement = (document.getElementById('skills') as HTMLTextAreaElement).value;

    //save from data in localstorage with the username as the key
    const resumeData ={
      nameElement,
      emailElement,
      phoneElement,
      educationElement,
      experienceElement,
      skillsElement
    };
     localStorage.setItem(username, JSON.stringify(resumeData));

    const resumeHTML = `
    <h2>Editable Resume</h2>
    <h3>Personal Information</h3>
    <p>Name:<span contenteditable="true">${nameElement}</span></p>
     <p>Email:<span contenteditable="true">${emailElement}</span></p>
      <p>Phone:<span contenteditable="true">${phoneElement}</span></p>

      <h3>Educatiion</h3>
      <p contenteditable="true">${educationElement}</p>

      <h3>Experience</h3>
     <p contenteditable="true">${experienceElement}</p>

     <h3>Skills</h3>
     <p contenteditable="true">${skillsElement}</p>

    `;

    // Display the generated resume
      resumeDisplayElement.innerHTML = resumeHTML;

      // Generate a shareable URL with the username
   const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

  //  Display the shareable link
  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
});

  // Handle pdf download
 downloadPdfButton.addEventListener("click", () => {
   window.print();
 });

//  prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () =>{
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username")


 if(username){
       const savedResumeData = localStorage.getItem(username);
       if(savedResumeData) {
        const resumeData = JSON.parse(savedResumeData);
        (document.getElementById('username') as HTMLInputElement).value = username;
        (document.getElementById('name') as HTMLInputElement).value = resumeData.nameElement;
        (document.getElementById('email') as HTMLInputElement).value = resumeData.emailElement;
        (document.getElementById('phone') as HTMLInputElement).value = resumeData.phoneElement;
        (document.getElementById('education') as HTMLInputElement).value = resumeData.educationElement;
        (document.getElementById('skills') as HTMLInputElement).value = resumeData.skillsElement;
       };
 };

});