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

// (function () {
//     const chart = echarts.init(document.querySelector('.popLeft'))
//
//     const option = {
//         parallelAxis: [{
//             dim: 0,
//             name: 'Year',
//             type: 'category',
//             data: ['2011', '2015', '2020', '2024'],
//             axisLine: {
//                 lineStyle: {
//                     color: '#333',
//                     width: 2,
//                 }
//             },
//             axisTick: {
//                 length: 6,
//                 lineStyle: {type: 'dashed'}
//             },
//             axisLabel: {
//                 fontFamily: 'Comic Sans MS, "手写体"',
//                 fontSize: 14
//             }
//         }, {
//             dim: 1,
//             name: '%',
//             type: 'value',
//             axisLabel: {
//                 formatter: v => v + '%',
//                 fontFamily: 'Comic Sans MS'
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: '#333',
//                     width: 2,
//                 }
//             }
//         }],
//         legend: {
//             show: true
//         },
//         series: [{
//             name: 'Cat',
//             type: 'parallel',
//             smooth: true,
//             lineStyle: {
//                 width: 4,
//                 color: 'green',
//                 shadowBlur: 10,
//                 shadowColor: 'rgba(0,0,0,0.2)'
//             },
//             data: [
//                 ['2011', 48],
//                 ['2015', 44],
//                 ['2020', 41],
//                 ['2024', 40]
//             ],
//         }, {
//             name: 'Dog',
//             type: 'parallel',
//             lineStyle: {
//                 width: 4,
//                 color: 'red',
//                 shadowBlur: 10,
//                 shadowColor: 'rgba(0,0,0,0.2)'
//             },
//             data: [
//                 ['2011', 29],
//                 ['2015', 28],
//                 ['2020', 34],
//                 ['2024', 31]
//             ]
//         }
//         ]
//     };
//
//     chart.setOption(option);
//
//     window.addEventListener('resize', () => chart.resize());
//
// })();

(function (){
    const chart = echarts.init(document.querySelector('.sourceMid'));
    const w = chart.getWidth(), h = chart.getHeight();

    // 分类
    const categories = [
        'Hobbyist / enthusiast', 'Bred it myself', 'Veterinarian', 'Neighbour',
        'Pet shop', 'Breeder', 'From private advertisement',
        'Family member', 'Friend', 'Found / stray',
        'Another animal rescue / shelter', 'SPCA'
    ];
    // 各行左右要显示的图标 URL，长度要与 categories 一致
    const catIcons = [
        './assets/icons-svg/1.svg',
        './assets/icons-svg/2.svg',
        './assets/icons-svg/3.svg',
        './assets/icons-svg/4.svg',
        './assets/icons-svg/5.svg',
        './assets/icons-svg/6.svg',
        './assets/icons-svg/7.svg',
        './assets/icons-svg/8.svg',
        './assets/icons-svg/9.svg',
        './assets/icons-svg/10.svg',
        './assets/icons-svg/11.svg',
        './assets/icons-svg/12.svg'
    ];
    const dogIcons = [
        './assets/icons-svg/1.svg',
        './assets/icons-svg/2.svg',
        './assets/icons-svg/3.svg',
        './assets/icons-svg/4.svg',
        './assets/icons-svg/5.svg',
        './assets/icons-svg/6.svg',
        './assets/icons-svg/7.svg',
        './assets/icons-svg/8.svg',
        './assets/icons-svg/9.svg',
        './assets/icons-svg/10.svg',
        './assets/icons-svg/11.svg',
        './assets/icons-svg/12.svg'
    ];

    // 数据
    const catsData = [22, 15, 16, 11, 8, 8, 8, 5, 4, 2, 1, 1].map(v => -v);
    const dogsData = [6, 10, 1, 8, 21, 34, 4, 2, 1, 2, 1, 1];

    // 布局参数
    const topGap = 60;
    const bottomGap = 60;
    const leftGap = '5%';
    const rightGap = '5%';
    const plotH = h - topGap - bottomGap;
    const step = plotH / categories.length;
    const iconSize = 30;

    const option = {
        legend:{},
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                const v = Math.abs(params.value);
                return `${params.seriesName} - ${params.name}: ${v}%`;
            }
        },
        grid: [
            {left: leftGap, right: '70%', top: topGap, bottom: bottomGap}, // Cats
            {left: '30%', right: '30%', top: topGap, bottom: bottomGap}, // 中心分类
            {left: '70%', right: rightGap, top: topGap, bottom: bottomGap} // Dogs
        ],
        xAxis: [
            {type: 'value', gridIndex: 0, show: false, min: -30, max: 0},
            {show: false, gridIndex: 1},
            {type: 'value', gridIndex: 2, show: false, min: 0, max: 40}
        ],
        yAxis: [
            {type: 'category', gridIndex: 0, data: categories, inverse: true, show: false},
            {show: false, gridIndex: 1, data: []},
            {type: 'category', gridIndex: 2, data: categories, inverse: true, show: false}
        ],
        series: [
            {
                name: 'Cats', type: 'bar', barWidth: 16,
                data: catsData, xAxisIndex: 0, yAxisIndex: 0,
                itemStyle: {color: '#F5A9B8'},
                label: {show: true, position: 'left', formatter: p => Math.abs(p.value) + '%'}
            },
            {
                name: 'Dogs', type: 'bar', barWidth: 16,
                data: dogsData, xAxisIndex: 2, yAxisIndex: 2,
                itemStyle: {color: '#a7d2fa'},
                label: {show: true, position: 'right', formatter: '{c}%'}
            }
        ],
        graphic: (
            categories.flatMap((cat, idx) => {
                const y = topGap + idx * step;
                return [
                    {
                        type: 'image',
                        left: '32%',
                        top: `${y - iconSize / 2 + 20}px`,
                        style: {
                            image: catIcons[idx],
                            width: iconSize,
                            // height: iconSize
                        }
                    },
                    {
                        type: 'text',
                        left: 'center',
                        top: `${y - iconSize / 2 + 28}px`,
                        style: {
                            text: cat,
                            textAlign: 'center',
                            textVerticalAlign: 'middle',
                            fontSize: 14,
                            fill: '#333'
                        }
                    },
                    {
                        type: 'image',
                        right: '32%',
                        top: `${y - iconSize / 2 + 20}px`,
                        style: {
                            image: dogIcons[idx],
                            width: iconSize,
                            // height: iconSize
                        }
                    }
                ];
            })
        )
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
})();

// (function (){
//     const chart = echarts.init(document.querySelector('.ageContainer'));
//
//     // —— 1. 分类 + 百分比数据 —— //
//     const categories = [
//         'Companionship / love / affection',
//         'Relaxation',
//         'Encourage exercise',
//         'Security',
//         'Other hobby / competition',
//         'They needed a home / adopted us',
//         'Fun for the children',
//         'I’ve had this type of pet in the past',
//         'Pest control (e.g. hunt mice)',
//         'Inherited from a friend / family member',
//         'It was someone else’s decision',
//         'It was a gift'
//     ];
//     const catsPct = [80,65,50,40,35,30,25,20,15,10,5,2];
//     const dogsPct = [90,75,60,50,45,40,30,25,20,15,10,5];
//
//     // —— 2. 构造极坐标下的散点数据 —— //
//     // 外圈 Cats radius = 1.0, 内圈 Dogs radius = 0.8
//     const catsData = categories.map((name,i)=>{
//         const angle = catsPct[i] * 3.6; // 百分比→度
//         return {
//             name,
//             value: [angle, 1.0],
//             symbolSize: 12,
//             itemStyle: { color: '#F5A9B8', opacity: 0.3 },
//             emphasis: { itemStyle: { opacity: 1 } },
//             label: {
//                 show: true,
//                 formatter: '{b}',
//                 position: 'outside',
//                 distance: 20,
//                 rotate: angle - 90,
//                 color: '#F5A9B8',
//                 fontSize: 12
//             }
//         };
//     });
//     const dogsData = categories.map((name,i)=>{
//         const angle = dogsPct[i] * 3.6;
//         return {
//             name,
//             value: [angle, 0.8],
//             symbolSize: 12,
//             itemStyle: { color: '#71C383', opacity: 0.3 },
//             emphasis: { itemStyle: { opacity: 1 } },
//             label: {
//                 show: true,
//                 formatter: '{b}',
//                 position: 'outside',
//                 distance: 20,
//                 rotate: angle - 90,
//                 color: '#71C383',
//                 fontSize: 12
//             }
//         };
//     });
//
//     // —— 3. ECharts 配置 —— //
//     const option = {
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a}<br/>{b}: {@[2]}%'
//         },
//         angleAxis: {
//             type: 'value',
//             startAngle: 90,
//             min: 0,
//             max: 360,
//             clockwise: true,
//             axisLine: { show: false },
//             axisTick: {
//                 show: true,
//                 lineStyle: { color: '#ccc' },
//                 length: 6,
//                 interval: 30
//             },
//             splitLine: {
//                 show: false
//             },
//             axisLabel: {
//                 show: true,
//                 formatter: v => `${v/3.6}%`,
//                 distance: 10
//             }
//         },
//         radiusAxis: {
//             type: 'value',
//             min: 0,
//             max: 1.1,  // 略大于 1.0，留出标签空间
//             show: false
//         },
//         polar: {
//             center: ['50%', '50%'],
//             radius: '80%'
//         },
//         series: [
//             {
//                 name: 'Dogs',
//                 type: 'scatter',
//                 coordinateSystem: 'polar',
//                 data: dogsData,
//                 emphasis: { focus: 'series' }
//             },
//             {
//                 name: 'Cats',
//                 type: 'scatter',
//                 coordinateSystem: 'polar',
//                 data: catsData,
//                 emphasis: { focus: 'series' }
//             }
//         ]
//     };
//
//     chart.setOption(option);
//     window.addEventListener('resize', () => chart.resize());
// })();