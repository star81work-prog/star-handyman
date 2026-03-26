// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Open booking popup
function openBooking(service){
  document.getElementById("bookingPopup").style.display="block";
  document.getElementById("serviceTitle").innerText=service;
  document.getElementById("hiddenService").value=service;
}

// Close booking popup
function closeBooking(){
  document.getElementById("bookingPopup").style.display="none";
}

// Submit booking to Google Sheets
function submitBooking(e){
  e.preventDefault();
  const scriptURL = "https://script.google.com/macros/s/AKfycbwKTJHPR-rxrB68bl_nJoe4R56uBHxfLobiH9lIPbwxKMzjQScZHHA3tN2Imhvt7DsSag/exec";
  const form = e.target;
  const formData = new FormData(form);

  fetch(scriptURL, {method:"POST", body:formData})
    .then(res=>res.text())
    .then(response=>{
      document.getElementById("confirmationMessage").style.display="block";
      setTimeout(()=>{
        closeBooking();
        document.getElementById("confirmationMessage").style.display="none";
        form.reset();
      },2000);
    })
    .catch(error=>{
      console.error("Error!", error);
      alert("There was an error submitting your booking.");
    });
}