import { Injectable } from '@angular/core';

@Injectable()
export class ChartsService {
    xAxisData = [];
    data1 = [];
    data2 = [];
    datahora: Array<string> = [];
    datap: Array<Float32Array> = [];
    constructor() {
        for (var i = 0; i < 100; i++) {
            this.xAxisData.push('Type ' + i);
            this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
    }

    PieOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['Example1', 'Example2', 'Example3']
        },
        roseType: 'angle',
        series: [
            {
                name: 'PieChart',
                type: 'pie',
                radius: [0, '50%'],
                data: [
                    { value: 235, name: 'Example1' },
                    { value: 210, name: 'Example2' },
                    { value: 162, name: 'Example3' }
                ]
            }
        ]
    }

    LineOption = {
        xAxis: {
            type: 'category',
            data: this.datahora
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.datap,
            type: 'line',
            smooth: true
        }]
    };

    BarOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    AnimationBarOption = {
        legend: {
            data: ['Example data1', 'Example data2'],
            align: 'left'
        },
        /* toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        }, */
        tooltip: {},
        xAxis: {
            data: this.xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: 'Example data1',
            type: 'bar',
            data: this.data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'Example data2',
            type: 'bar',
            data: this.data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

    getBarOption() {
        return this.BarOption;
    }
    getLineOption() {
        console.log("entra")
        var pathname = window.location.pathname;
        var id = pathname.split("/").pop(); 
        fetch('http://127.0.0.1:3000/pluviogramaSeriedetiempo/' + id)
        .then(texto => texto.json())
        .then(datos => {
        console.log("entra")
        for (let dic of datos["data"]) {
            console.log(dic[1].toFixed(2))
            console.log(dic[0].toFixed(2))
            this.datahora.push(dic[1].toFixed(2))
            this.datap.push(dic[0].toFixed(2))
        }
        });
        return this.LineOption;
    }
    getPieOption() {
        return this.PieOption;
    }
    getAnimationBarOption() {
        return this.AnimationBarOption;
    }
}
