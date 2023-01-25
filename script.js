function sticky(){

    window.onscroll = function() {myFunction()};
    
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } 
        else {
            navbar.classList.remove("sticky");
        }
    }
}

const form = document.getElementById("issue-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const issueId = Math.floor(Math.random() * 100);
    const description = document.getElementById("description").value;
    const severity = document.getElementById("severity").value;
    const assignedTo = document.getElementById("assigned-to").value;
    var today = new Date();
    const issueDetails = {
        issueId: issueId,
        date: today.toLocaleString("en-US"),
        description: description,
        severity: severity,
        assignedTo: assignedTo
    }

    createCard(issueDetails);
    clearForm();
    scroll();
})


function createCard(issueDetails) {
    const issueCard = document.createElement("div");
    issueCard.classList.add('issue-card');
    issueCard.innerHTML = `
    <p class="card-text"><b>Issue ID:</b> ${issueDetails.issueId}</p>
            <div class="open"> <b>Status:</b> Open <br><br> <b>Issue Added on: </b> <br>${issueDetails.date}</div>
            
            <p class="card-text"> <b>Description:</b> ${issueDetails.description}</p>
            <p class="card-text"><b>Severity:</b> ${issueDetails.severity}</p>
            <p class="card-text"> <b>Assigned to:</b> ${issueDetails.assignedTo}</p>\
            <br>
            <div class="action-palette">
                <div class="prev-btn">Prev</div>
                <div class="close">Close</div>
                <div class="delete">Delete</div>
                <div class="next-btn">Next</div>
            </div>`;

    const newState = document.getElementById("new-state");
    newState.appendChild(issueCard);
   
    deleteCard(issueCard);
    closeIssue(issueCard);

    let prevBtn = issueCard.querySelector(".prev-btn");
    let nextBtn = issueCard.querySelector(".next-btn");
    const devState = document.getElementById("development-state");
    const testState = document.getElementById("test-state");
    const doneState = document.getElementById("done-state");
    prevBtn.style.display = "none";
    prevBtn.addEventListener("click", () => {
        if (doneState.contains(issueCard)) {
            doneState.removeChild(issueCard);
            testState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Testing <br><br> <b>Issue added on: </b><br> ${issueDetails.date}`;
            nextBtn.style.display = "block";
        } else if (testState.contains(issueCard)) {
            testState.removeChild(issueCard);
            devState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Indevelopment <br><br> <b>Issue added on: </b><br> ${issueDetails.date}`;
        } else if (devState.contains(issueCard)) {
            devState.removeChild(issueCard);
            newState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Open <br><br> <b>Issue Added on: </b> <br>${issueDetails.date}`;
            prevBtn.style.display = "none";
        }
    });

    nextBtn.addEventListener("click", () => {
        if (newState.contains(issueCard)) {
            newState.removeChild(issueCard);
            devState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Indevelopment <br><br> <b>Issue added on: </b><br> ${issueDetails.date}`;
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else if (devState.contains(issueCard)) {
            devState.removeChild(issueCard);
            testState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Testing <br><br> <b>Issue added on: </b><br> ${issueDetails.date}`;
        } else if (testState.contains(issueCard)) {
            nextBtn.style.display = "none";
            testState.removeChild(issueCard);
            doneState.appendChild(issueCard);
            issueCard.querySelector('.open').innerHTML=`<b>Status:</b> Issue Solved <br><br> <b>Issue added on: </b><br> ${issueDetails.date}`;
        }

    });

}


function deleteCard(issueCard) {
    const deleteBtn = issueCard.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
        issueCard.remove();
    });
}

function closeIssue(issueCard){
    const closeBtn = issueCard.querySelector(".close");
    closeBtn.addEventListener("click",()=>{

        const closeBtn = issueCard.querySelector('.close');
        let prevBtn = issueCard.querySelector(".prev-btn");
        let nextBtn = issueCard.querySelector(".next-btn");
        closeBtn.remove();
        prevBtn.remove();
        nextBtn.remove();
        issueCard.querySelector('.open').innerHTML="Status: <s>Closed</s>";
        
    })
}

function clearForm() {
    document.getElementById("description").value = "";
    document.getElementById("severity").value = "";
    document.getElementById("assigned-to").value = "";
}

function scroll() {
    var elem = document.getElementById("current-issues");
    elem.scrollIntoView();
}

