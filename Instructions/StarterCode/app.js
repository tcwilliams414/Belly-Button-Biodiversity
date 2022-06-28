// All selected changes will be in the optionChanged function referenced from html page

function optionChanged(e) {
    d3.json("samples.json").then (function (data){
        console.log(data);
        let dropdownMenu = d3.select("#selDataset");
    // Assign the value of dropdown menu option
        let subject = dropdownMenu.property("value");
        buildPage(data,subject)
    })
}


d3.json("samples.json").then(function(data) {
    // console.log(data.names);
        let patientId = data.names;
        
    for (i=0; i<patientId.length; i++){
        let dropdown = d3.select ("#selDataset");

        namesList = dropdown.append("option");
        namesList.text(patientId[i])
        var subject = namesList.attr('value', patientId[i])
    }

    // d3.select("#selDataset").on("change", optionChanged());
    buildPage(data, patientId[0], int =true);
});



// add all other function needed to build the page on selected patient in buildPage function

function buildPage( data, subject) {
    
    // Define metadata and samples for selected subject
    console.log(data.metadata)
    let metadata = data.metadata.filter(m =>m.id ===parseInt(subject));
        let board = d3.select("#sample-metadata");
    let metadatastring = "";
    for (let i =0; i<metadata.length; i++){
        console.log(metadata[i])
    Object.entries(metadata[i]).forEach(([key, value]) => {
        metadatastring += `<p> ${key}: ${value} </p>`
    });
    board.html(metadatastring);
    };


    let samples = data.samples.filter(s => s.id ===subject);
    for (let i =0; i <samples.length; i++) {
    let samplesLength = samples [i].otu_ids.map(d =>(d))
    // console.log(samples[i]. otu_ids)
        console.log(samplesLength)
    values = samplesLength.map((d) => d).sort((a,b) => b-a).slice(0,10)
    top10 = samplesLength.filter((d) => values.includes(d));
        console.log(top10)

      samples_values = samples.map(s => s.sample_values);
      console.log(samples_values)
      
    // Create labels needed for horizontal bar graph and bubble chart
     otu_labels = samples.map(s => s.otu_labels);
     let otu_label_10 = otu_labels[0].slice(0,10).reverse()
     otu_ids = samples.map(s => s.otu_ids)
     sample_values_10 = samples_values[0].slice(0,10).reverse()
     otu_ids_10 = otu_ids[0].slice(0,10).reverse().map(id => `OTU ${id}`);

    //  Create horizontal bar graph
    let htrace = {
    type: 'bar',
    x: sample_values_10,
    y: otu_ids_10,
    orientation: 'h'
    }
    // Create layout w/title for horizontal bar graph
        var layout = {
         title: "Top OTU per Patient"
        }
        let htrace1= [htrace];
        Plotly.newPlot('bar', htrace1, layout)
    };

// Create bubble chart and call "bubble" for plot to appear
let btrace = {
x: otu_ids[0],
y:samples_values[0],
text: otu_labels[0],
mode: "markers",
marker :{
size: samples_values[0],
color: otu_ids[0],
}
    };

        let btrace1 = [btrace];
        Plotly.newPlot('bubble', btrace1)
};









