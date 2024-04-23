function handleFormSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    const email = event.target.email.value;
    const appointmentDetails = {
      name,
      number,
      email
    };
    axios
      .post(
        "http://localhost:3000/add-appointment",
        appointmentDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data.newAppointmentDetail)
    })
      .catch((error) => {
        document.body.innerHTML=document.body.innerHTML+"<h4>Something Went Wrong!</h4>";
        console.log(error);
      });
  
    // Clearing the input fields
    document.getElementById("sub").value="Submit";
    document.querySelector("form").reset();
    
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/get-appointments")
    .then(res =>{
      for(let i=0;i<res.data.allAppointments.length;i++){
        displayUserOnScreen(res.data.allAppointments[i]);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  })

  function displayUserOnScreen(appointmentDetails) {
    const appointmentItem = document.createElement("li");
    appointmentItem.appendChild(
      document.createTextNode(
        `${appointmentDetails.name} - ${appointmentDetails.number} - ${appointmentDetails.email}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    appointmentItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    appointmentItem.appendChild(editBtn);
  
    const appointmentList = document.querySelector("ul");
    appointmentList.appendChild(appointmentItem);
  
    deleteBtn.addEventListener("click", function (event) {
      let id=appointmentDetails.id;
      axios.delete(`http://localhost:3000/delete-appointment/${id}`)
           .then(res => {
            appointmentList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  
    editBtn.addEventListener("click", function (event) {
      
      
      document.getElementById("name").value = appointmentDetails.name;
      document.getElementById("number").value = appointmentDetails.number;
      document.getElementById("email").value = appointmentDetails.email;
      document.getElementById("sub").value="Edit Appointment";
    
      let id=appointmentDetails.id;
      
      axios.delete(`http://localhost:3000/delete-appointment/${id}`)
           .then(res => {
            appointmentList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  }