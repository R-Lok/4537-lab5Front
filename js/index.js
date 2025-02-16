document.getElementById('append').textContent = appendButtonText
document.getElementById('submit-input').textContent = submitButtonText
document.getElementById('input-area').placeholder = textareaPlaceholder

//Set post request for append button
document.getElementById('append').addEventListener('click', async (e)=>{
    e.preventDefault()
    const resultBox = document.getElementById('result')

    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    try {
        const response = await fetch("https://www.fortunedgalab.xyz/lab5/button", requestOptions)
        resultBox.textContent = (await response.json()).status
    } catch(err) {
        resultBox.textContent = networkErrorText
    }
})

document.getElementById('submit-input').addEventListener('click', async (e) => {
    e.preventDefault()

    const query = document.getElementById('input-area').value.trim()

    const requestType = getRequestType(query)
    if(requestType === "GET") {
        send_get(query)
    }
    if(requestType === "POST") {

    } else {
        showInvalidQuery()
    }

})

function getRequestType(query) {
    const q_noncased = query.toLowerCase()

    if(q_noncased.startsWith("select")){
        return "GET"
    } else if (q_noncased.startsWith("insert")) {
        return "POST"
    } else {
        return "INVALID"
    }
}

async function send_get(query) {

    const resultArea = document.getElementById('result')
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

    try {
        const response = await fetch(`https://www.fortunedgalab.xyz/lab5/sql?sql=${query}`, requestOptions)
        if(!response.ok) {
            resultArea.textContent = `Error: ${(await response.json()).status}`
        } else {
            const data = (await response.json()).data
            console.log(data)
            showData(resultArea, data)
        }
    } catch (err) {
        resultArea.textContent = networkErrorText
    }
}

function showData(container, data) {
    container.replaceChildren()
    for(let i = 0; i < data.length; i++) {
        const row = document.createElement('div')
        row.textContent = `${data[i].patientid} || ${data[i].name} || ${data[i].dateOfBirth}`
        container.appendChild(row)
    }
}

function showInvalidQuery() {
    document.getElementById('result').textContent = invalidQueryText
}