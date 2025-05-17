const catsBtn = document.querySelector('#catsBtn');
const dogsBtn = document.querySelector('#dogsBtn');

(function () {
    const raw = geo;

    const regionMap = {
        Auckland: 'Auckland',
        Canterbury: 'Canterbury',
        Wellington: 'Wellington',
        Northland: 'Rest of North Island',
        Waikato: 'Rest of North Island',
        'Bay of Plenty': 'Rest of North Island',
        'Gisborne District': 'Rest of North Island',
        "Hawke's Bay": 'Rest of North Island',
        Taranaki: 'Rest of North Island',
        'Manawatu-Wanganui': 'Rest of North Island',
        'Tasman District': 'Rest of South Island',
        'Nelson City': 'Rest of South Island',
        'Marlborough District': 'Rest of South Island',
        'West Coast': 'Rest of South Island',
        Otago: 'Rest of South Island',
        Southland: 'Rest of South Island'
    };

    const merged = {};
    raw.features.forEach(feat => {
        const name = feat.properties.name;
        const group = regionMap[name];
        if (!merged[group]) {
            merged[group] = feat;
        } else {
            merged[group] = turf.union(merged[group], feat);
        }
    });

    const fiveZoneGeo = {
        type: 'FeatureCollection',
        features: Object.keys(merged).map(groupName => {
            const f = merged[groupName];
            f.properties = {name: groupName};
            return f;
        })
    };

    echarts.registerMap('NZRegions', fiveZoneGeo);

    const dataDogs = [
        {name: 'Auckland', value: 24, baseSize: 627, itemStyle: {areaColor: '#CAE8C2FF'}},
        {name: 'Canterbury', value: 30, baseSize: 238, itemStyle: {areaColor: '#B2CCE1FF'}},
        {name: 'Wellington', value: 29, baseSize: 295, itemStyle: {areaColor: '#FCD7A4FF'}},
        {name: 'Rest of North Island', value: 38, baseSize: 666, itemStyle: {areaColor: '#DCCAE2FF'}},
        {
            name: 'Rest of South Island', value: 36, baseSize: 232, itemStyle: {areaColor: '#F9B4ADFF'},
            label: {
                show: true,
                offset: [-30, 30],
                formatter: '{c}%'
            }
        }
    ];

    const dataCats = [
        {name: 'Auckland', value: 35, baseSize: 627, itemStyle: {areaColor: '#CAE8C2FF'}},
        {name: 'Canterbury', value: 44, baseSize: 238, itemStyle: {areaColor: '#B2CCE1FF'}},
        {name: 'Wellington', value: 41, baseSize: 295, itemStyle: {areaColor: '#FCD7A4FF'}},
        {name: 'Rest of North Island', value: 46, baseSize: 666, itemStyle: {areaColor: '#DCCAE2FF'}},
        {
            name: 'Rest of South Island', value: 36, baseSize: 232, itemStyle: {areaColor: '#F9B4ADFF'},
            label: {
                show: true,
                offset: [-30, 30],
                formatter: '{c}%'
            }
        }
    ];

    const chart = echarts.init(document.getElementById('regionMap'));
    const option = {
        tooltip: {
            trigger: 'item', formatter: params => {
                return `
          ${params.name}: ${params.value}%<br/>
          Base Size: ${params.data.baseSize}
        `;
            }
        },
        series: [{
            type: 'map',
            map: 'NZRegions',
            roam: false,
            label: {show: true, formatter: '{c}%'},
            emphasis: {
                // label: {show: true, position:'outside'},
                itemStyle: {areaColor: 'orange'}
            },
            data: dataCats
        }]
    };
    chart.setOption(option);

    const legend = document.querySelector('#regionLegend');
    dataCats.forEach(d => {
        const box = document.createElement('div');
        const name = document.createElement('div');

        box.classList.add('box');
        box.style.backgroundColor = d.itemStyle.areaColor;

        name.textContent = d.name
        name.classList.add('legendItem')

        legend.append(box, name)
    })

    catsBtn.onclick = () => {
        chart.setOption({series: [{data: dataCats}]});
        dogsBtn.classList.remove('active');
        catsBtn.classList.add('active');
    };
    dogsBtn.onclick = () => {
        chart.setOption({series: [{data: dataDogs}]});
        catsBtn.classList.remove('active');
        dogsBtn.classList.add('active');
    };
    window.addEventListener('resize', () => chart.resize());
})();
