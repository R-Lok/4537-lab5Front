document.getElementById('append').textContent = appendButtonText
document.getElementById('submit-input').textContent = submitButtonText
document.getElementById('input-area').placeholder = textareaPlaceholder

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