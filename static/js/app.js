function init() {buildchart(940);metadata(940);
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let names = data.names;
        let selector = d3.select("#selDataset");
        for(let i =0; i < names.length; i++){selector.append("option").text(names[i]).property("value",names[i])}
    })} 
// calling the data using d3
function buildchart(samples){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let sample = data.samples.filter(sampleobject => sampleobject.id == samples)[0];
        let otu_ids = sample.otu_ids;
        let otu_labels = sample.otu_labels;
        let sample_values = sample.sample_values;
        let bardata = [{y:otu_ids.slice(0,10).map(sampleobject => `otu ${sampleobject}`).reverse(),
        x:sample_values.slice(0,10).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        type:"bar", orientation:"h"}];
        Plotly.newPlot("bar",bardata);
        let bubblechart = [{x:otu_ids,y:sample_values,text:otu_labels,mode:"markers",marker:{size:sample_values,color:otu_ids,colorscale:"Earth"}}];
        let bubblelayout = {xaxis:{title:"OTU ID"}};
        Plotly.newPlot("bubble",bubblechart,bubblelayout);
    })
}
function metadata(samples){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let sample = data.metadata.filter(sampleobject => sampleobject.id == samples)[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        for(key in sample){
            panel.append("h4").text(`${key}: ${sample[key]}`);
        }
    })
}
function optionChanged(sample){buildchart(sample);
metadata(sample)}
init()
