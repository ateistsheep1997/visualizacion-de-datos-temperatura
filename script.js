const data = {
    'ciudad1': [
        { fecha: '2023-01-01', temperatura: 20 },
        { fecha: '2023-01-02', temperatura: 21 },
        { fecha: '2023-01-03', temperatura: 19 },
    ],
    'ciudad2': [
        { fecha: '2023-01-01', temperatura: 15 },
        { fecha: '2023-01-02', temperatura: 16 },
        { fecha: '2023-01-03', temperatura: 14 },
    ],
    'ciudad3': [
        { fecha: '2023-01-01', temperatura: 25 },
        { fecha: '2023-01-02', temperatura: 24 },
        { fecha: '2023-01-03', temperatura: 26 },
    ]
};

function drawChart(city) {
    // Verificar si la ciudad existe en los datos
    if (!data[city]) {
        console.error(`Ciudad no encontrada: ${city}`);
        return;
    }

    // Limpiar el gráfico existente y crear un nuevo SVG
    const svg = d3.select('#chart').html('').append('svg')
        .attr('width', 600)
        .attr('height', 400);

    const cityData = data[city];

    // Escalas de los ejes X y Y
    const xScale = d3.scaleBand()
        .domain(cityData.map(d => d.fecha))
        .range([0, 600])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(cityData, d => d.temperatura)])
        .range([400, 0]);

    // Crear las barras del gráfico
    svg.selectAll('.bar')
        .data(cityData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.fecha))
        .attr('y', d => yScale(d.temperatura))
        .attr('width', xScale.bandwidth())
        .attr('height', d => 400 - yScale(d.temperatura))
        .attr('fill', 'steelblue');
}

// Listener para el cambio en la selección de ciudad
document.getElementById('city-select').addEventListener('change', (event) => {
    drawChart(event.target.value);
});

// Dibuja el gráfico inicial
drawChart('ciudad1');