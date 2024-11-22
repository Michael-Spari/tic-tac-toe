let fields =[
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init(){
    renderTable();
}
function renderTable() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

let currentPlayer = 'circle';

function handleClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#00B0EF" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 282.74" to="282.74, 0" dur="0.25s" fill="freeze" />
                <animate attributeName="fill" from="none" to="#00B0EF" dur="0.25s" fill="freeze" begin="0.25s" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="#FFC000" stroke-width="15">
                <animate attributeName="stroke-dasharray" from="0, 113.14" to="113.14, 0" dur="0.25s" fill="freeze" />
            </line>
            <line x1="90" y1="10" x2="10" y2="90" stroke="#FFC000" stroke-width="15">
                <animate attributeName="stroke-dasharray" from="0, 113.14" to="113.14, 0" dur="0.25s" fill="freeze" />
            </line>
        </svg>
    `;
}
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return true;
        }
    }
    return false;
}

function drawWinningLine(combination) {
    const contentDiv = document.getElementById('content');
    const table = contentDiv.querySelector('table');
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'white';
    line.style.height = '5px';
    line.style.zIndex = '10';

    const [a, b, c] = combination;
    const cellA = table.rows[Math.floor(a / 3)].cells[a % 3];
    const cellC = table.rows[Math.floor(c / 3)].cells[c % 3];
    const rectA = cellA.getBoundingClientRect();
    const rectC = cellC.getBoundingClientRect();
    const contentRect = contentDiv.getBoundingClientRect();

    const startX = rectA.left + rectA.width / 2 - contentRect.left;
    const startY = rectA.top + rectA.height / 2 - contentRect.top;
    const endX = rectC.left + rectC.width / 2 - contentRect.left;
    const endY = rectC.top + rectC.height / 2 - contentRect.top;

    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.width = `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`;

    contentDiv.appendChild(line);
}

function handleClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}