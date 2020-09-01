window.addEventListener('load', () => UpdateTables())

const UpdateTables = () => {
    UpdateTable(1)
    UpdateTable(2)
}

const UpdateTable = (id) => {
    const table = document.getElementById(`table${id}`)
    const ag = document.getElementById(`ag${id}`).value
    const startingAp = GetStartingAP(ag)

    while (table.firstChild)
        table.removeChild(table.lastChild)

    for (let index = 8; index < 41; index++) {
        let newRow = table.insertRow()

        let apData = newRow.insertCell(0)
        let apText = document.createTextNode(`${index} AP`)
        apData.appendChild(apText)

        let beData = newRow.insertCell(1)
        let beText = document.createTextNode(startingAp >= index ? '-' : GetRequiredTurns(ag, index - startingAp, index - 1, id) + ' turns')
        beData.appendChild(beText)
    }
}

const GetStartingAP = (ag) => {
    let ap = Math.ceil(5 + ag * 1.5)
    if (document.getElementById('extra1').checked)
        ap++
    if (document.getElementById('extra2').checked)
        ap++
    return ap
}

const GetRequiredTurns = (ag, extraAp, currentAp, id) => {
    return parseInt(GetBeRequiredForExtraAp(ag, extraAp) / BePerTurn(currentAp, document.getElementById(`int${id}`).value))
}

const GetBeRequiredForExtraAp = (ag, extraAP) => {
    if (ag % 2)
        return 1600 * (extraAP * extraAP)
    else
        return 400 + 1600 * (extraAP * (extraAP - 1))
}

const BePerTurn = (ap, int) => .143 * int * ap