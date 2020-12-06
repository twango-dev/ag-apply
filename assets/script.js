const baseURL = "https://apply.agentgaming.gg"
const binURL = "https://json.extendsclass.com/bin/e383323c07c1"
const applyURL = "https://agentgaming.gg/apply"
var sessionKey = ""

var socialMap = {
    "social-twitter": false,
    "social-instagram": false,
    "social-youtube": false,
    "social-twitch": false
}

window.onload = function onLoad() {
    const urlParams = new URLSearchParams(window.location.search)
    
    if (urlParams.has('sessionKey')) {
        sessionKey = urlParams.get('sessionKey')
        console.log(`SK Found: ${sessionKey}`)
        validSK(sessionKey, true)
    } else {
        console.warn("No SK. Regenerating...")
        generateSK()
        window.location.href = baseURL + `?sessionKey=${sessionKey}`
    }

    for (let i in socialMap) {
        document.getElementById(i).onclick = function() {
            socialMap[i] = true
        }
    }

    document.getElementById("continue-btn").onclick = function() {
        var allowedContinuation = true;
        for (let i in socialMap) {
            if (!socialMap[i]) { allowedContinuation = false }
        }
        if (allowedContinuation) {
            window.location.href = applyURL + `?token=${sessionKey}`
        } else {
            document.getElementById("err").style.display = "block"
        }
    }
}

function validSK(SK, regen = false, checkJSON = false) {
    if (SK.length != 22) { invalidKey() }

    function invalidKey() {
        console.error(`Invalid SK: ${SK}`)
        if (regen) { generateSK() }
        window.location.href = baseURL + `?sessionKey=${sessionKey}`
        return false
    }

    return true
}

function generateSK() {
    sessionKey = Math.random().toString(36).substring(2, 30) + Math.random().toString(36).substring(2, 30)
    console.log(`New SK: "${sessionKey}"`)
}

function onSubmit() {

}