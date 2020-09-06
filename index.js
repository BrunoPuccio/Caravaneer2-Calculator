window.addEventListener('load', () => UpdateTables())

const UpdateTables = () => {
    UpdateTable(1)
    UpdateTable(2)
    CompareResults()
}

const UpdateTable = (id) => {
    const table = document.getElementById(`table${id}`)
    const ag = document.getElementById(`ag${id}`).value
    const int = document.getElementById(`int${id}`).value
    const startingAp = GetStartingAP(ag)

    while (table.firstChild)//remove all rows
        table.removeChild(table.lastChild)

    const newRow = table.insertRow()//i know this is not the right way to do it but i am too lazy to be bothered changing it
    const apData = newRow.insertCell(0)
    const apText = document.createTextNode('wanted AP')
    apData.appendChild(apText)
    const turnsData = newRow.insertCell(1)
    const turnsText = document.createTextNode('turns required to reach it')
    turnsData.appendChild(turnsText)
    const beData = newRow.insertCell(2)
    const beText = document.createTextNode('BE per turn')//Battle Experience earned each turn
    beData.appendChild(beText)
    const totalBeData = newRow.insertCell(2)
    const totalBeText = document.createTextNode('BE required to reach it')//Battle Experience required to reach it
    totalBeData.appendChild(totalBeText)

    for (let wantedAp = 7; wantedAp < 41; wantedAp++) {//41 can be increased to see more data
        const newRow = table.insertRow()

        const apData = newRow.insertCell(0)
        const apText = document.createTextNode(`${wantedAp} AP`)
        apData.appendChild(apText)

        const turnsData = newRow.insertCell(1)
        const turnsText = document.createTextNode(startingAp >= wantedAp ? '0' : GetRequiredTurns(ag, wantedAp - startingAp, wantedAp - 1, int) + ' turns')
        turnsData.appendChild(turnsText)

        const beData = newRow.insertCell(2)
        const beText = document.createTextNode(startingAp > wantedAp ? 0 : BePerTurn(wantedAp, int) + ' BE')//Battle Experience earned each turn
        beData.appendChild(beText)

        const totalBeData = newRow.insertCell(2)
        const totalBeText = document.createTextNode(startingAp >= wantedAp ? 0 : parseInt(GetBeRequiredForExtraAp(ag, wantedAp - startingAp)) + ' BE')//Battle Experience required to reach it
        totalBeData.appendChild(totalBeText)
    }
}

const GetStartingAP = (ag) => {
    let ap = Math.ceil(5 + ag * 1.5)//starting ap
    if (document.getElementById('extra1').checked)//extra ap from morale
        ap++
    if (document.getElementById('extra2').checked)//extra ap from low cargo
        ap++
    return ap
}

const CompareResults = () => {
    let table1 = document.getElementById('table1')
    let table2 = document.getElementById('table2')

    if (document.getElementById('ag2').value > document.getElementById('ag1').value) {
        let temp = table1
        table1 = table2
        table2 = temp
    }

    for (let rowPos = 1; rowPos < table1.rows.length; rowPos++) {
        if (parseInt(table1.rows[rowPos].cells[1].innerHTML) > parseInt(table2.rows[rowPos].cells[1].innerHTML))
            table2.rows[rowPos].style = 'background-color: greenyellow'
        else
            table1.rows[rowPos].style = 'background-color: greenyellow'
    }
}

const GetRequiredTurns = (ag, extraAp, currentAp, int) => (GetBeRequiredForExtraAp(ag, extraAp) / BePerTurn(currentAp, int)).toFixed(0)

const GetBeRequiredForExtraAp = (ag, extraAp) => ag % 2 ? 1600 * (extraAp * extraAp) : 400 + 1600 * (extraAp * (extraAp - 1))

const BePerTurn = (ap, int) => (.143 * ap * int).toFixed(3)//need more data on this