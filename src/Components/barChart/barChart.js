 

import React, { Component } from 'react';
import { ResponsiveBar } from 'nivo'


const chartWrapper = 
{
  height:"45vh",
  width:"45vh",
  
                
}



class BarChart extends Component {


    getLegendTextures(keys)
    {
        let list = []

        for(let i in keys){
         
            let newEl = {
                "match": {
                    "id": "Python"
                },
                "id": "dots"
            }
            if(i%2===1)
            {
                newEl["id"] = "lines"
            }
            newEl["match"]["id"] = keys[i]
            list.unshift(newEl)
        }
       
        return list
    }

    constructor(props)
    {
      super(props)
      this.state = {
        languages:
        {
          "python":100,
        },
        
      }
    }
  
    render() {
 
        let keys = []
        if(this.props.chartData!==undefined){
            for(let i in this.props.chartData)
            {
                keys.unshift(Object.keys(this.props.chartData[i])[2])
            }
        }
 return (
 <div style = {{height:"40vh",width:"50vh"}}>

        <ResponsiveBar
        data={ this.props.chartData
            }
        keys={keys}
        indexBy="country"
        margin={{
            "top": 50,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        colors="pastel1"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={this.getLegendTextures(keys)}
        borderColor="inherit:darker(1.6)"
       
        axisBottom={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "country",
            "legendPosition": "center",
            "legendOffset": 32
        }}
        axisLeft={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "No. Of Projects",
            "legendPosition": "center",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
        </div>
 )
    }

}

export default BarChart;