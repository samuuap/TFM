// Crea un nuevo mapa Leaflet
var map = L.map('map').setView([39.5, -98.35], 4);

// Agrega una capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crea un grupo de marcadores para agrupar los marcadores cercanos
var markerCluster = L.markerClusterGroup();
// Agrega el grupo de marcadores al mapa
markerCluster.addTo(map);

// Coordenadas y descripciones de los estados de EE.UU.
var us_states_coords = {
    "Alabama": {"lat": 32.8067, "lon": -86.7911, "desc": "Conocido por su papel en la Guerra Civil y el Movimiento por los Derechos Civiles.","code":"AL"},
    "Alaska": {"lat": 61.3707, "lon": -152.4044, "desc": "El estado más grande de EE.UU., famoso por su naturaleza y vida salvaje.","code":"AK"},
    "Arizona": {"lat": 33.7298, "lon": -111.4312, "desc": "Hogar del Gran Cañón y conocido por su clima desértico.","code":"AZ"},
    "Arkansas": {"lat": 34.9697, "lon": -92.3731, "desc": "Famoso por sus parques y áreas naturales, incluyendo Hot Springs.","code":"AR"},
    "California": {"lat": 36.1162, "lon": -119.6816, "desc": "Conocido por Hollywood, Silicon Valley y sus diversas geografías.","code":"CA"},
    "Colorado": {"lat": 39.0598, "lon": -105.3111, "desc": "Hogar de las Montañas Rocosas y famoso por su industria de esquí.","code":"CO"},
    "Connecticut": {"lat": 41.5978, "lon": -72.7554, "desc": "Uno de los trece estados originales, conocido por sus instituciones educativas.","code":"CT"},
    "Delaware": {"lat": 39.3185, "lon": -75.5071, "desc": "El primer estado en ratificar la Constitución de EE.UU.","code":"DE"},
    "Florida": {"lat": 27.7663, "lon": -81.6868, "desc": "Famoso por sus playas, parques temáticos y clima cálido.","code":"FL"},
    "Georgia": {"lat": 33.0406, "lon": -83.6431, "desc": "Conocido por su historia en la Guerra Civil y su industria del melocotón.","code":"GA"},
    "Hawaii": {"lat": 21.0943, "lon": -157.4983, "desc": "Un archipiélago en el Pacífico, famoso por sus paisajes y cultura única.","code":"HI"},
    "Idaho": {"lat": 44.2405, "lon": -114.4788, "desc": "Conocido por sus vastas áreas naturales y producción de papas.","code":"ID"},
    "Illinois": {"lat": 40.3495, "lon": -88.9861, "desc": "Hogar de Chicago, una de las ciudades más grandes de EE.UU.","code":"IL"},
    "Indiana": {"lat": 39.8494, "lon": -86.2583, "desc": "Conocido por la carrera de autos Indianápolis 500.","code":"IN"},
    "Iowa": {"lat": 42.0115, "lon": -93.2105, "desc": "Un estado agrícola, conocido por su producción de maíz.","code":"IA"},
    "Kansas": {"lat": 38.5266, "lon": -96.7265, "desc": "Famoso por sus vastas llanuras y paisajes agrícolas.","code":"KS"},
    "Kentucky": {"lat": 37.6681, "lon": -84.6701, "desc": "Conocido por el Derby de Kentucky y su bourbon.","code":"KY"},
    "Louisiana": {"lat": 31.1695, "lon": -91.8678, "desc": "Famoso por Nueva Orleans, el jazz y su cocina cajún y criolla.","code":"LA"},
    "Maine": {"lat": 44.6939, "lon": -69.3819, "desc": "Conocido por sus costas rocosas y mariscos, especialmente la langosta.","code":"ME"},
    "Maryland": {"lat": 39.0639, "lon": -76.8021, "desc": "Hogar del puerto de Baltimore y conocido por su historia colonial.","code":"MD"},
    "Massachusetts": {"lat": 42.2302, "lon": -71.5301, "desc": "Uno de los trece estados originales, conocido por Boston y su historia revolucionaria.","code":"MA"},
    "Michigan": {"lat": 43.3266, "lon": -84.5361, "desc": "Rodeado por los Grandes Lagos, conocido por su industria automotriz.","code":"MI"},
    "Minnesota": {"lat": 45.6945, "lon": -93.9002, "desc": "Conocido por sus lagos y parques naturales, y como la tierra de los 10,000 lagos.","code":"MN"},
    "Mississippi": {"lat": 32.7416, "lon": -89.6787, "desc": "Famoso por su música blues y su historia en la Guerra Civil.","code":"MS"},
    "Missouri": {"lat": 38.4561, "lon": -92.2884, "desc": "Hogar de Gateway Arch en St. Louis y conocido por su música y barbacoa.","code":"MO"},
    "Montana": {"lat": 46.9219, "lon": -110.4544, "desc": "Conocido por sus paisajes montañosos y áreas naturales como el Parque Nacional de Yellowstone.","code":"MT"},
    "Nebraska": {"lat": 41.1254, "lon": -98.2681, "desc": "Conocido por sus vastas llanuras y paisajes agrícolas.","code":"NE"},
    "Nevada": {"lat": 38.3135, "lon": -117.0554, "desc": "Hogar de Las Vegas, conocida por su industria de casinos y entretenimiento.","code":"NV"},
    "New Hampshire": {"lat": 43.4525, "lon": -71.5639, "desc": "Conocido por sus paisajes naturales y la primera primaria en el ciclo electoral presidencial.","code":"NH"},
    "New Jersey": {"lat": 40.2989, "lon": -74.521, "desc": "Conocido por su industria y playas en la costa del Atlántico.","code":"NJ"},
    "New Mexico": {"lat": 34.8405, "lon": -106.2485, "desc": "Famoso por su cultura nativa americana y paisajes desérticos.","code":"NM"},
    "New York": {"lat": 42.1657, "lon": -74.9481, "desc": "Hogar de la ciudad de Nueva York, un centro mundial de cultura y finanzas.","code":"NY"},
    "North Carolina": {"lat": 35.6301, "lon": -79.8064, "desc": "Conocido por sus playas en el Atlántico y su industria tecnológica en Research Triangle.","code":"NC"},
    "North Dakota": {"lat": 47.5289, "lon": -99.784, "desc": "Famoso por sus paisajes de pradera y la producción de petróleo.","code":"ND"},
    "Ohio": {"lat": 40.3888, "lon": -82.7649, "desc": "Conocido por su industria y el Salón de la Fama del Rock and Roll en Cleveland.","code":"OH"},
    "Oklahoma": {"lat": 35.5653, "lon": -96.9289, "desc": "Conocido por su historia nativa americana y su industria petrolera.","code":"OK"},
    "Oregon": {"lat": 44.572, "lon": -122.0709, "desc": "Famoso por sus paisajes naturales, incluyendo bosques, montañas y la costa del Pacífico.","code":"OR"},
    "Pennsylvania": {"lat": 40.5908, "lon": -77.2098, "desc": "Uno de los trece estados originales, conocido por Filadelfia y su historia revolucionaria.","code":"PA"},
    "Rhode Island": {"lat": 41.6809, "lon": -71.5118, "desc": "El estado más pequeño de EE.UU., conocido por sus costas y arquitectura colonial.","code":"RI"},
    "South Carolina": {"lat": 33.8569, "lon": -80.945, "desc": "Conocido por su historia en la Guerra Civil y sus playas en Myrtle Beach.","code":"SC"},
    "South Dakota": {"lat": 44.2998, "lon": -99.4388, "desc": "Hogar del Monte Rushmore y conocido por sus paisajes de pradera.","code":"SD"},
    "Tennessee": {"lat": 35.7478, "lon": -86.6923, "desc": "Famoso por su música country y el Parque Nacional Great Smoky Mountains.","code":"TN"},
    "Texas": {"lat": 31.0545, "lon": -97.5635, "desc": "El segundo estado más grande de EE.UU., conocido por su cultura y economía diversa.","code":"TX"},
    "Utah": {"lat": 40.15, "lon": -111.8624, "desc": "Conocido por sus parques nacionales y la sede de la Iglesia de Jesucristo de los Santos de los Últimos Días.","code":"UT"},
    "Vermont": {"lat": 44.0459, "lon": -72.7107, "desc": "Famoso por sus paisajes rurales y producción de jarabe de arce.","code":"VT"},
    "Virginia": {"lat": 37.7693, "lon": -78.1699, "desc": "Uno de los trece estados originales, conocido por su historia colonial y revolucionaria.","code":"VA"},
    "Washington": {"lat": 47.4009, "lon": -121.4905, "desc": "Hogar de Seattle y conocido por su industria tecnológica y paisajes naturales.","code":"WA"},
    "West Virginia": {"lat": 38.4912, "lon": -80.9545, "desc": "Conocido por sus montañas y actividades al aire libre como el senderismo y la escalada.","code":"WV"},
    "Wisconsin": {"lat": 44.2685, "lon": -89.6165, "desc": "Famoso por su industria lechera y producción de queso.","code":"WI"},
    "Wyoming": {"lat": 42.756, "lon": -107.3025, "desc": "Conocido por sus paisajes naturales y el Parque Nacional de Yellowstone.","code":"WY"},
};


// Definir la función showData
var currentPopup = null;
var accidentesData = null;
var prediccionesData = null;

// Leer los datos del archivo CSV accidentes_por_estado.csv
d3.dsv(",", "accidentes_por_estado.csv").then(data => {
    accidentesData = data;
    console.log("Datos de accidentes cargados correctamente:", accidentesData);
}).catch(error => {
    console.error("Error al cargar el archivo de accidentes:", error);
});

// Leer los datos del archivo CSV dataset_con_predicciones_redondeado.csv
d3.dsv(",", "dataset_con_predicciones_redondeado.csv").then(data => {
    prediccionesData = data;
    console.log("Datos de predicciones cargados correctamente:", prediccionesData);
}).catch(error => {
    console.error("Error al cargar el archivo de predicciones:", error);
});

// Función para mostrar los datos según el estado, mes y año seleccionados
function showData(stateCode, month, year) {
    if (!accidentesData) return;
    
    // Filtrar los datos según el estado, mes y año seleccionados
    const filteredData = accidentesData.filter(d => d.State === stateCode && +d.Month === +month && +d.Year === +year);
    
    // Mostrar los datos filtrados en el popup actual
    if (currentPopup) {
        currentPopup.setContent(generatePopupContent(stateCode, month, year, filteredData));
    }
}

// Función para generar contenido del popup
function generatePopupContent(stateCode, month, year, filteredData) {
    var stateName = Object.keys(us_states_coords).find(key => us_states_coords[key].code === stateCode);
    var loc = us_states_coords[stateName];
    var html = `
        <h4>${stateName}</h4>
        <p>${loc.desc}</p>
        <label for='month_${loc.code}'>Selecciona un mes:</label>
        <select id='month_${loc.code}' name='month' onchange='showData("${loc.code}", this.value, "2022")'>
            <option value=''></option>
            <option value='8' ${month === '8' ? 'selected' : ''}>Agosto 2022</option>
            <option value='9' ${month === '9' ? 'selected' : ''}>Septiembre 2022</option>
            <option value='10' ${month === '10' ? 'selected' : ''}>Octubre 2022</option>
            <option value='11' ${month === '11' ? 'selected' : ''}>Noviembre 2022</option>
            <option value='12' ${month === '12' ? 'selected' : ''}>Diciembre 2022</option>
            <option value='1' ${month === '1' ? 'selected' : ''}>Enero 2023</option>
        </select>
    `;

    if (filteredData && filteredData.length > 0) {
        // Construir la tabla de severidades
        html += `<h5>Severidades:</h5><table><thead><tr><th>Severity 1</th><th>Severity 2</th><th>Severity 3</th><th>Severity 4</th></tr></thead><tbody>`;
        filteredData.forEach(d => {
            var severity1 = parseInt(d["Severity 1"]);
            var severity2 = parseInt(d["Severity 2"]);
            var severity3 = parseInt(d["Severity 3"]);
            var severity4 = parseInt(d["Severity 4"]);

            html += `<tr>
                        <td><a href='#' onclick='showBarChart("${stateCode}", ${month}, ${year}, 1)'>${severity1}</a></td>
                        <td><a href='#' onclick='showBarChart("${stateCode}", ${month}, ${year}, 2)'>${severity2}</a></td>
                        <td><a href='#' onclick='showBarChart("${stateCode}", ${month}, ${year}, 3)'>${severity3}</a></td>
                        <td><a href='#' onclick='showBarChart("${stateCode}", ${month}, ${year}, 4)'>${severity4}</a></td>
                    </tr>`;
        });
        html += `</tbody></table>`;
    } else {
        html += `<p>No hay datos disponibles para esta selección.</p>`;
    }

    html += `<div id="barChart" style="width: 100%; height: 300px;"></div>`; // Div para el gráfico de barras

    return html;
}

// Función para mostrar el gráfico de barras
function showBarChart(stateCode, month, year, severity) {
    if (!prediccionesData) return;

    // Filtrar los datos según el estado, mes, año y severidad seleccionados
    const filteredData = prediccionesData.filter(d => d.State === stateCode && +d.Month === +month && +d.Severity === severity);

    // Agrupar los datos por hora
    const dataByHour = d3.nest()
        .key(d => d.Hour)
        .rollup(v => v.length)
        .entries(filteredData)
        .sort((a, b) => d3.ascending(+a.key, +b.key)); // Ordenar las horas
        

    // Crear el gráfico de barras usando D3.js
    const svg = d3.select("#barChart").html("").append("svg")
        .attr("width", 350) // Ancho ajustado a 600 pixels
        .attr("height", 300),
          margin = {top: 20, right: 20, bottom: 30, left: 20},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1).domain(dataByHour.map(d => d.key));
    const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, d3.max(dataByHour, d => d.value)]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10));

    g.selectAll(".bar")
        .data(dataByHour)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue"); // Cambiar el color de las barras a azul

    // Agregar etiquetas de valor encima de las barras si se desea
    // g.selectAll(".text")
    //   .data(dataByHour)
    //   .enter()
    //   .append("text")
    //   .attr("class", "label")
    //   .attr("x", d => x(d.key) + x.bandwidth() / 2)
    //   .attr("y", d => y(d.value) - 5)
    //   .attr("text-anchor", "middle")
    //   .text(d => d.value);

}

// Agrega un marcador para cada estado
for (var state in us_states_coords) {
    var loc = us_states_coords[state];
    var marker = L.marker([loc.lat, loc.lon]).addTo(markerCluster);
    marker.bindPopup(generatePopupContent(loc.code, '', '2022'));
    marker.on('click', function(e) {
        currentPopup = e.target.getPopup();
    });
}