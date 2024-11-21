let fields =[
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,
];

function init(){
    renderTable();
}
function renderTable(){
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            }else if(fields[index] === 'cross'){
                symbol = generateCrossSVG();
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#00B0EF" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 282.74" to="282.74, 0" dur="2s" fill="freeze" />
                <animate attributeName="fill" from="none" to="#00B0EF" dur="2s" fill="freeze" begin="2s" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="#FFC000" stroke-width="15">
                <animate attributeName="stroke-dasharray" from="0, 113.14" to="113.14, 0" dur="2s" fill="freeze" />
            </line>
            <line x1="90" y1="10" x2="10" y2="90" stroke="#FFC000" stroke-width="15">
                <animate attributeName="stroke-dasharray" from="0, 113.14" to="113.14, 0" dur="2s" fill="freeze" />
            </line>
        </svg>
    `;
}