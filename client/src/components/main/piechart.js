import React from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

//const data = [{ "votes": 20, "field": "dog" }, { "votes": 15, "field": "cat" }, { "votes": 5, "field": "other" }];
// function takeds votes if votes total=0; returns no data in pie.

class Piechart extends React.Component {
constructor(props){
    super(props);
    this.setChart = this.setChart.bind(this);
    this.updateChart = this.updateChart.bind(this);

}

componentDidMount(){
    this.setChart();
}
componentDidUpdate (prevProps, prevState) {
    // do not compare props.chart as it gets updated in updateD3()
    if (this.props.currentPoll !== prevProps.currentPoll) {
       
      this.updateChart();
    }
  }


    

    render() {
        return (
            <div className='piechart'>
                <div className='renderedD3'>
                    {this.props.chart}

                </div>



            </div>

        );

    }
    setChart(){

        const width = 450;
        const height = 600;
        const faux = this.props.connectFauxDOM('div', 'chart');
        const r = width / 2;
        const poll= [this.props.currentPoll];
        const votes= poll[0].votes;
        const fields= poll[0].fields;
    
    
        const colors = ["#f26430", "#009ddc", "#6761a8", "#009b72","#2a2d34"];
    
    
        const chart = d3.select(faux)
        .append('svg')
        .attr("width", width)
        .attr("height", height);
        const g= chart.append('g')
        .attr("transform", "translate(" + r + "," + r + ")"); 
    
   
        const path = d3.arc().outerRadius(r).innerRadius(0);
        const label = d3.arc().outerRadius(r - 40).innerRadius(r - 40);
        const pie = d3.pie()
            .value(function (d,i) {
                return d;
            });
        let arc = g.selectAll('.arc')
            .data(pie(votes))
            .enter()
            .append('g')
            .attr('class','arc');
    
        arc.append('path')
            .attr("d", path)
            .attr("fill", function (d, i) { return colors[i]; });

        arc.append('text')
            .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ")"; })
            .attr("dy", "0.35m")
            .attr("fill", "white")
            .text(function (d) {
             
                return d.data;
            });
    
        const legendWidth = 300;
        const legendHeight = 25 * poll[0].fields.length;
        const legendGroup= chart.append('g')
    
        .attr('class','legend');
        console.log(legend);

        const legend= legendGroup.selectAll('g').data(fields).enter().append('g');
    
        legend.append('rect')
           
            .attr("fill", function (d, index) {
                return colors[index];
            })
            .attr("width", function () {
                return legendWidth / 4;
            })
            .attr("height", function () {
                console.log(legendHeight / poll[0].fields.length);
                return legendHeight / poll[0].fields.length
            })
            .attr("y", function (d, index) {
             return ((height)-(legendHeight/poll[0].fields.length*(index+1)));
         })
            .attr("x", function () {
                //legendWidth / 3
                return width-(legendWidth/3);
            });
    
    
        legend
            .append("text")
            .attr("width", 50)
            .attr("height", 50)
            .attr("y", function (d, index) {
                return ((height)-(legendHeight/poll[0].fields.length*(index+.25)));
            })
            .attr("x",function(d,index){
                return width-(legendWidth/1.5);
            })
            .text(function (d,index) {
                console.log(d);
                return d;
            });
    
    
    }
    
    updateChart(){
    
        const width =  450;
        const height = 600;
        const faux = this.props.connectFauxDOM('div', 'chart');
        const r = width / 2;
        const poll= [this.props.currentPoll];
        const votes= poll[0].votes;
        const fields= poll[0].fields;
   
    
    
        const colors = ["#f26430", "#009ddc", "#6761a8", "#009b72","#2a2d34"]
    
    
        const chart = d3.select(faux).select('svg');
        const g= chart.select('g');
        
       
        
    
        const path = d3.arc().outerRadius(r).innerRadius(0);
        const label = d3.arc().outerRadius(r - 40).innerRadius(r - 40);
        const pie = d3.pie()
            .value(function (d,i) {
                return d;
            });
         
           
            let arc = g.selectAll('.arc')
            .data(pie(votes));
            

                   arc.exit().remove();  

        
         
     
     arc.select('g')
     .attr('class','arc');

 arc.select('path')
     .attr("d", path)
     .attr("fill", function (d, i) { return colors[i]; });

 arc.select('text')
     .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ")"; })
     .attr("fill", "black")
     .text(function (d) {
      
         return d.data;
     });
            
     let newarc=arc.enter()
            .append('g')
            .attr('class','arc');

            newarc.append('path')
            .attr("d", path)
            .attr("fill", function (d, i) { return colors[i]; });

        newarc.append('text')
            .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ")"; })
          
            .attr("fill", "black")
            .text(function (d) {
          
                 return d.data;
             });






                     newarc.merge(arc).transition().duration(500);
          
          
            

        const legendWidth = 300;
        const legendHeight = 25 * poll[0].fields.length;
        const legendGroup = chart.select('.legend').selectAll('g');
           console.log(legend);
    

           const legend= legendGroup.data(fields);
  legend.exit().remove();
// 3 points spread 





legend.select('rect')
            .attr("fill", function (d, index) {
                return colors[index];
            })
            .attr("width", function () {
                return legendWidth / 4
            })
            .attr("height", function () {
            
                return legendHeight / poll[0].fields.length
            })
            .attr("y", function (d, index) {
                return ((height)-(legendHeight/poll[0].fields.length*(index+1)));
            })
            .attr("x", function () {
                //legendWidth / 3
                return width-(legendWidth/3);
            });
    
            legend.select('text')
            .attr("width", 50)
            .attr("height", 50)
            .attr("y", function (d, index) {
                return ((height)-(legendHeight/poll[0].fields.length*(index+.25)));
            })
            .attr("x",function(d,index){
                return width-(legendWidth/1.5);
            })
            .text(function (d,index) {
                console.log(d);
                return d;
            });






let legendEnter= legend.enter().append('g');        
        









legendEnter
           .append('rect')
           .attr("fill", function (d, index) {
               return colors[index];
           })
           .attr("width", function () {
               return legendWidth / 4;
           })
           .attr("height", function () {
               console.log(legendHeight / poll[0].fields.length);
               return legendHeight / poll[0].fields.length
           })
           .attr("y", function (d, index) {
            return ((height)-(legendHeight/poll[0].fields.length*(index+1)));
        })
           .attr("x", function () {
               //legendWidth / 3
               return width-(legendWidth/3);
           });

           
    
        legendEnter
            .append("text")
            .attr("width", 50)
            .attr("height", 50)
            .attr("y", function (d, index) {
                return ((height)-((legendHeight/poll[0].fields.length)*(index+.25)));
            })
            .attr("x",function(d,index){
                return width-(legendWidth/1.5);
            })
            .text(function (d,index) {
                console.log(d);
                return d;
            });

    
            
    
            
           legendEnter.merge(legend).transition().duration(500)

           this.props.animateFauxDOM(800);

    }


}



Piechart.defaultProps = {
    chart: 'loading',

}

export default withFauxDOM(Piechart);