import { createChart, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../css/chart.css';


const Chart = ((props) => {
    

    const chartContainerRef = useRef()

    useEffect (()=> {


        const chart = createChart(chartContainerRef.current, {
            width: 1200,
            height:703,
            
            
 
            layout: {
                background: {type: ColorType.Solid, color: '#13131F'},
                textColor: '#B8B8C9'
            }, grid: {
                vertLines: {color:'#3A3A3E', visible: true},
                horzLines: {color:'#3A3A3E'}
            },

        });

        

/// SERIES DATA
        const newSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        
        newSeries.setData(props.data);

        chart.applyOptions({
            crosshair: {
                mode: CrosshairMode.Normal,
                color:'red',
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                
            }
        })

/// PRE-SET S&D LEVELS 
        if (props.supplyShow === 'yes'){
            const supply = [props.supply1, props.supply2];
        supply.forEach((price) => {
            newSeries.createPriceLine({
                price: price, // Specify the price level
                color: 'red', // Line color
                lineWidth: 1, // Line width
                lineStyle: LineStyle.Solid, // Optional: Dashed, Solid, etc.
                axisLabelVisible: true, // Show price on the y-axis
                 // Optional: Add a label
            });
        });

        }
        if (props.demandShow === 'yes'){
            const demand = [props.demand1, props.demand2];
        demand.forEach((price) => {
            newSeries.createPriceLine({
                price: price, // Specify the price level
                color: '#5AA53C', // Line color
                lineWidth: 1, // Line width
                lineStyle: LineStyle.Solid, // Optional: Dashed, Solid, etc.
                axisLabelVisible: false, // Show price on the y-axis
                
            });
        });
        }
        

//// HORZ LINE PRIMITIVE 
        let horzLine =[]

        function Run(param){

            if (!param.point) {
                return;
            }
            let price = newSeries.coordinateToPrice(param.point.y);
            newSeries.createPriceLine({
                price: price,
                color:'green',
                lineStyle: LineStyle.Solid,
            })
            horzLine.push(price)
            console.log(horzLine)
        }
        
        
        chart.subscribeDblClick(Run)

        

        

        return () => [chart.remove()]
        


    },[props.supply1, props.supply2, props.demand1, props.demand2, props.supplyShow, props.demandShow, props.data])
    
    

    return (
    <div>
    <div id='draw-tool'><button>Draw Line</button></div>
    <div id='chart' ref={chartContainerRef} style={{height:'100%', margin:'0', padding:'0'}}></div>  
    <div class='splitchartrun'><button>RUN</button></div>
    </div> 
)
})

export default Chart;
