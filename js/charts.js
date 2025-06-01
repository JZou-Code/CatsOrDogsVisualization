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

(function () {
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
    const catsData = [ 0, 1, 2, 4, 5,  8,  8, 8, 11, 16, 15, 22].map(v => -v);
    const dogsData = [ 1, 2, 1, 2, 4, 34, 21, 8, 10,  1, 10,  6];

    // 布局参数
    const topGap = 60;
    const bottomGap = 60;
    const leftGap = '5%';
    const rightGap = '5%';
    const plotH = h - topGap - bottomGap;
    const step = plotH / categories.length;
    const iconSize = 30;
    const hoverSize = 35;

    const NORMAL_FS = 14;
    const HOVER_FS = 20;

    const option = {
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicOut',
        legend: {},
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
                label: {show: true, position: 'left', formatter: p => Math.abs(p.value) + '%'},
                emphasis: {
                    // 鼠标 hover 到某根柱子时生效
                    itemStyle: {
                        // 你可以在这里“放大”的视觉效果：
                        // 1) 改颜色、更鲜艳：
                        color: '#F5A9B8',
                        // 2) 加边框，看起来更粗：
                        borderColor: '#F5A9B8',
                        borderWidth: 5
                    }
                }
            },
            {
                name: 'Dogs', type: 'bar', barWidth: 16,
                data: dogsData, xAxisIndex: 2, yAxisIndex: 2,
                itemStyle: {color: '#a7d2fa'},
                label: {show: true, position: 'right', formatter: '{c}%'},
                emphasis: {
                    itemStyle: {
                        color: '#a7d2fa',
                        borderColor: '#a7d2fa',
                        borderWidth: 5
                    }
                }
            }
        ],
        graphic: (
            categories.flatMap((cat, idx) => {
                const y = topGap + idx * step;
                return [
                    {
                        id: `cat-icon-${idx}`,
                        type: 'image',
                        left: '32%',
                        top: `${y - iconSize / 2 + 13}px`,
                        style: {
                            image: catIcons[idx],
                            width: iconSize,
                            // height: iconSize
                        }
                    },
                    {
                        id: `text-${idx}`,
                        type: 'text',
                        left: 'center',
                        top: `${y - iconSize / 2 + 20}px`,
                        style: {
                            text: cat,
                            textAlign: 'center',
                            textVerticalAlign: 'middle',
                            fontSize: NORMAL_FS,
                            fill: '#333'
                        }
                    },
                    {
                        id: `dog-icon-${idx}`,
                        type: 'image',
                        right: '32%',
                        top: `${y - iconSize / 2 + 13}px`,
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


    chart.on('mouseover', params => {
        if (params.componentType === 'series') {
            const idx = params.dataIndex;
            const id = params.seriesName === 'Cats'
                ? `cat-icon-${idx}`
                : `dog-icon-${idx}`;
            const textId = `text-${idx}`
            // 放大、加阴影或提亮
            chart.setOption({
                graphic: [{
                    id,
                    style: {
                        width: hoverSize,
                    }
                }, {
                    id: textId,
                    style: {
                        // fontSize: HOVER_FS,
                    },
                    scale: [1.2, 1.2]
                }]
            });
        }
    });

    chart.on('mouseout', params => {
        if (params.componentType === 'series') {
            const idx = params.dataIndex;
            const id = params.seriesName === 'Cats'
                ? `cat-icon-${idx}`
                : `dog-icon-${idx}`;
            const textId = `text-${idx}`

            // 复原
            chart.setOption({
                graphic: [{
                    id,
                    style: {
                        width: iconSize,
                    }
                },
                    {
                        id: textId,
                        style: {
                            // fontSize: NORMAL_FS,
                        },
                        scale: [1, 1]
                    }]
            });
        }
    });

    // option.animationDurationUpdate = 1000;      // 过渡
    // option.animationEasingUpdate = 'cubicOut';

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

// (function (){
//     const categories = [
//         'Companionship / love / affection',
//         "I've had this type of pet in the past",
//         'Relaxation',
//         'They needed a home / adopted us',
//         'Encourage exercise',
//         'Pest control (e.g., hunt mice)',
//         'Inherited from a friend / family member / neighbour',
//         'To breed / enter competitions / as a hobby',
//         'Fun for the children',
//         'Education / responsibility for children',
//         "It was someone else's decision",
//         'Security',
//         "It's a working animal",
//         'They were a gift',
//         'Other'
//     ];
//
//     const dataCat = [68, 56, 20, 37, 1, 11, 14, 0, 14, 6, 9, 0, 0, 4, 4];
//     const dataDog = [77, 39, 22, 22, 36, 0, 8, 1, 16, 9, 12, 20, 4, 2, 4];
//
//     function toPieData(values) {
//         return values.map((v, i) => ({
//             name: categories[i],
//             value: v
//         }));
//     }
//
//     const option = {
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}%'
//         },
//         color: [
//             '#b77a7a', '#b7927a', '#b7ab7a', '#abb77a', '#92b77a',
//             '#7ab792', '#7ab7ab', '#7ab7b7', '#7aabb7', '#7a92b7',
//             '#927ab7', '#b17ab7', '#b77ab1', '#b77a92', '#b77a7a'
//         ],
//         legend: {
//             type: 'scroll',
//             orient: 'vertical',
//             left: 10,
//             top: 60,
//             data: categories,
//             itemWidth: 10,
//             itemHeight: 10,
//             textStyle: {fontSize: 10}
//         },
//         series: [
//             {
//                 name: 'Cats',
//                 type: 'pie',
//                 radius: ['10%', '30%'],
//                 center: ['70%', '55%'],
//                 label: {
//                     show: false,
//                     formatter: '{b}\n{d}%',
//                     fontSize: 12
//                 },
//                 labelLine: {
//                     length: 6,
//                     length2: 12
//                 },
//                 data: toPieData(dataCat)
//             },
//             {
//                 name: 'Dogs',
//                 type: 'pie',
//                 radius: ['50%', '70%'],
//                 center: ['70%', '55%'],
//                 label: {
//                     show: false,
//                     formatter: '{b}\n{d}%',
//                     fontSize: 12
//                 },
//                 labelLine: {
//                     length: 6,
//                     length2: 12
//                 },
//                 data: toPieData(dataDog)
//             }
//         ]
//     };
//
//     const chart = echarts.init(document.querySelector('#reasonChart'));
//     chart.setOption(option);
//     window.addEventListener('resize', () => chart.resize());
// })();

// Reason part
// const $cat = $('#catChart');
// const $dog = $('#dogChart');
// const $full = $('#fullChart');
//
// const $iconCats = $('#iconCats');
// const $iconDogs = $('#iconDogs');
//
// const $icons = $('#reasonChartContainer .icon');
//
// $icons.on('mouseout', ()=>{
//     $cat.fadeTo(1000,0);
//     $dog.fadeTo(1000,0);
//     $full.fadeTo(1000,1)
// })
//
// $iconCats[0].addEventListener('mouseenter', () => {
//     $cat.fadeTo(1000, 1);
//     $full.fadeTo(1000, 0);
// })
//
// $iconDogs.on('mouseenter', () => {
//     $dog.fadeTo(1000, 0);
//     $full.fadeTo(1000, 0);
// })


(function () {
    const chart = echarts.init(document.querySelector('#barChart'));

    const rawData = [
        {name: 'Time commitment', word: 'Time', value: 49, itemStyle: {color: '#debe89'}},
        {name: 'Having a pet is expensive', word: 'Cost', value: 48, itemStyle: {color: '#845b74'}},
        {name: 'Too much responsibility', word: 'Responsibility', value: 36, itemStyle: {color: '#ae6357'}},
        {
            name: 'They are messy(e.g. shedding of fur,tracking dirt into house)',
            word: 'Messy',
            value: 29,
            itemStyle: {color: '#726e4b'}
        },
        {name: 'Sadness when the pet passes away', word: 'Loss', value: 20, itemStyle: {color: '#516982'}},
        {name: 'Animal Safety', word: 'Safety', value: 14, itemStyle: {color: '#8b775c'}},
        {
            name: 'I’m worried about potential impact on native species',
            word: 'Species Impact',
            value: 17,
            itemStyle: {color: '#9f6076'}
        },
        {name: 'Odour', word: 'Odour', value: 16, itemStyle: {color: '#9b9b5e'}},
        {name: 'Away from home often/like to travel', word: 'Travel', value: 11, itemStyle: {color: '#457277'}},
        {name: 'I do not like pets', word: 'Dislike', value: 10, itemStyle: {color: '#615277'}},
        {name: 'Other', word: 'Other', value: 13, itemStyle: {color: '#548267'}},
        {name: 'They are noisy(e.g. barking, meowing)', word: 'Noise', value: 11, itemStyle: {color: '#67845b'}},
        {
            name: 'Personal safety issues(e.g. bites, scratches, disease)',
            word: 'Safety Issues',
            value: 6,
            itemStyle: {color: '#7b7b7b'}
        },
        {
            name: 'Not suitable/allowed where I live(e.g. apartment, retirement home)',
            word: 'Restrictions',
            value: 6,
            itemStyle: {color: '#907353'}
        },
        {
            name: 'I\'m worried about impact on global environment',
            word: 'Env.Impact',
            value: 5,
            itemStyle: {color: '#79749d'}
        }
    ];


    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
            appendToBody: true,
            formatter: function (params) {
                // params.name → Time commitment
                // params.value → 49
                return `
        <div style="
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          font-family: sans-serif;
          min-width: 140px;
        ">
          <div style="
            background: #333;
            color: #fff;
            padding: 8px 12px;
            font-weight: bold;
            font-size: 14px;
          ">
            ${params.name}
          </div>
          <div style="
            background: #fff;
            color: #333;
            padding: 6px 12px;
            font-size: 13px;
          ">
            Percentage(%) ${params.value}
          </div>
        </div>
      `;
            }
        },
        series: [
            {
                type: 'treemap',
                roam: false,
                nodeClick: false,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                leafDepth: 1,
                label: {
                    show: true,
                    // formatter: '{b}',
                    formatter: (params) => {
                        return params.data.name
                    },
                    color: '#fff',
                    width:100,
                    overflow: 'break',
                    lineOverflow: 'break',
                    ellipsis: '...',
                    fontSize: 18
                },
                upperLabel: {
                    show: false
                },
                breadcrumb: {
                    show: false
                },

                colorMappingBy: 'index',
                itemStyle: {
                    gapWidth: 2,
                },
                data: rawData
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
})();