;(function () {
    const margin = { top: 20, right: 50, bottom: 50, left: 50 }

    const width = 900 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let cpiLine; // create a variable in the outermost scope where we can store the lines we draw
    let label;


    const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style('fill', 'white')

    // const colorScale = d3.scaleOrdinal().range(d3.schemeDark2)
    const xPositionScale = d3.scaleTime().range([0, width])
    const yPositionScale = d3.scaleLinear().range([height, 0])
    const parseDate = d3.timeParse("%Y")
    var formatPercent = d3.format(".0%");



    const line = d3
        .line()
        .x(d => xPositionScale(d.year))
        .y(d => yPositionScale(d.annualpctChange))   

    d3.csv("data/cpi.csv")
        .then(ready)
        .catch(function (error) {
            console.log("Failed with", error)
        })
    
    function ready(datapoints) {
        console.log("ready")
        datapoints.forEach(function (d) {
            d.year = parseDate(d.year)
            d["annualpctChange"] = +d["annualpctChange"]
        })

        // Update the scales
        const extentCPI = d3.extent(datapoints, d => d.annualpctChange)
        yPositionScale.domain(extentCPI).nice()
        xPositionScale.domain(d3.extent(datapoints, d => d.year))

        
        cpiLine = svg.append("path")
            .datum(datapoints) 
            .attr("stroke", "white")
            .attr("fill", "none")
            .attr("d", line)
            .style('stroke-dasharray', 4000) // hiding the lines sneakily
            .style('stroke-dashoffset', 4000);
            // .style("stroke", d3.color("red") );



        const yAxis = d3.axisLeft(yPositionScale).tickFormat(formatPercent);
        svg.append("g")
            .attr("class", "axis y-axis")
            .call(yAxis)



        const xAxis = d3.axisBottom(xPositionScale)
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        label = svg.append('text') // assigning my label to the variable up top
            .text("The first peak of the Great Inflation")
            .attr('x', xPositionScale(parseDate(1970)))
            .attr('y', yPositionScale(0.058))
            .attr('class', 'label hidden');
        
        label2 = svg.append('text') // assigning my label to the variable up top
            .text("The Arab oil embargo catapulted inflation to double digit")
            .attr('x', xPositionScale(parseDate(1974)))
            .attr('y', yPositionScale(0.111))
            .attr('class', 'label hidden');

        label3 = svg.append('text') // assigning my label to the variable up top
            .text("The peak of the Great inflation")
            .attr('x', xPositionScale(parseDate(1980)))
            .attr('y', yPositionScale(0.135))
            .attr('class', 'label hidden');

        label4 = svg.append('text') // assigning my label to the variable up top
            .text("An inflation spike which preceeded a long era of stability")
            .attr('x', xPositionScale(parseDate(1990)))
            .attr('y', yPositionScale(0.054))
            .attr('class', 'label hidden');

        dot = svg.append('circle') // assigning my label to the variable up top
            .attr('cx', xPositionScale(parseDate(1970)))
            .attr('cy', yPositionScale(0.058))
            .attr("r", 3)
            .style("fill", "red")
            .attr('class', 'label hidden');

        dot2 = svg.append('circle') // assigning my label to the variable up top
            .attr('cx', xPositionScale(parseDate(1974)))
            .attr('cy', yPositionScale(0.111))
            .attr("r", 3)
            .style("fill", "red")
            .attr('class', 'label hidden');
        
        dot3 = svg.append('circle') // assigning my label to the variable up top
            .attr('cx', xPositionScale(parseDate(1980)))
            .attr('cy', yPositionScale(0.135))
            .attr("r", 3)
            .style("fill", "red")
            .attr('class', 'label hidden');
            
        dot4 = svg.append('circle') // assigning my label to the variable up top
            .attr('cx', xPositionScale(parseDate(1990)))
            .attr('cy', yPositionScale(0.054))
            .attr("r", 3)
            .style("fill", "red")
            .attr('class', 'label hidden');


        // label2 = svg.append('text') // assigning my label to the variable up top
        // .text("The 1972 ")
        // .attr('x', xPositionScale(parseDate(1980)))
        // .attr('y', yPositionScale(13.5))
        // .attr('class', 'label hidden');

    
    // console.log(cpiLine)

    // do stuff to the chart here
    // depending on what step you are at
    const updateChart = (step_index, direction)=>{

        console.log('we are at step', step_index);

        if(step_index === 0){
            //animating my lines into view
            if(direction==='forward'){
                d3.select("path")
                .transition()
                .duration(2000)
                .style('stroke-dashoffset', 0);
                
            } else{
                cpiLine
                .style('opacity', 1).style('stroke-width', 1)
                .transition()
                .duration(2000)
                .style('stroke-dashoffset', 4000);
            }
            
        }


        if(step_index === 1){
            if(direction==='forward'){
                // lines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-0').raise().style('stroke-width', '2px').style('opacity', 1);
            } else{ //this tells the chart to hide the label if you scroll in the opposite direction.
                // lines.style('opacity', 0.2);
                d3.select('#line-0').raise().style('stroke-width', '2px').style('opacity', 1);
                label.classed('hidden', true);
            }
        }

        if(step_index === 2){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                label.classed('hidden', false);
            } else{
                label.classed('hidden', true);
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                dot.classed('hidden', false);
            } else{
                dot.classed('hidden', true);
            }
        }


        if(step_index === 3){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                label2.classed('hidden', false);
            } else{
                label2.classed('hidden', true);
            }
        }
        if(step_index === 3){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                dot2.classed('hidden', false);
            } else{
                dot2.classed('hidden', true);
            }
        }


        if(step_index === 4){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                label3.classed('hidden', false);
            } else{
                label3.classed('hidden', true);
            }
        }
        if(step_index === 4){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                dot3.classed('hidden', false);
            } else{
                dot3.classed('hidden', true);
            }
        }
        console.log(dot3)

        if(step_index === 5){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                label4.classed('hidden', false);
            } else{
                label4.classed('hidden', true);
            }
        }
        if(step_index === 5){
            if(direction==='forward'){
                // lines.style('opacity', 1).style('stroke-width', 1);
                dot4.classed('hidden', false);
            } else{
                dot4.classed('hidden', true);
            }
        }


    };

    //select the steps
    let steps = d3.select('.yr-container').selectAll('.step');
    // add a listener to the steps that knows when it enters into view
    // using enter-view.js (https://github.com/russellgoldenberg/enter-view)
    // call the update function when we switch to a new step!

    enterView({
        selector: steps.nodes(), // which elements to pay attention to
        offset: 0.2, // the offset says when on the page should the trigger happen. 0.5 == when the top of the element reaches the middle of the page
        enter: el => { // when it enters, do this
            const index = +d3.select(el).attr('data-index'); //get the "data-index" attribute
            updateChart(index, 'forward'); // run the updateChart function, pass it the 'data-index"
        },
        exit: el => { // when it leaves view (aka scrolling backwards), do this
            let index = +d3.select(el).attr('data-index'); // get the index
            index = Math.max(0, index - 1); // subtract one but don't go lower than 0
            updateChart(index, 'back'); // update with the new index
        }
    });

    }   
})()
