// Create a function to populate the panel with metadata
function panel(id) {
    d3.json("samples.json").then(sampleData => {
        
        var metaData = sampleData.metadata;
        console.log(metaData);

        // Filter the data by selected sample id
        var filtSamp = metaData.filter(sample => sample.id.toString() === id)[0];
        console.log(filtSamp);

        // Select the panel in the html
        var panelData = d3.select('#sample-metadata');

        // Clear the panel upon selection
        panelData.html("");

        // Add panel entries
        Object.entries(filtSamp).forEach(function([key, value]) {
            panelData.append("h4").text(`${key}: ${value}`);
        });
    });
}

// Create a function to build the bar, bubble, and gauge charts
function plots(id) {

    d3.json("samples.json").then(sampleData => {
        console.log(sampleData)
        
        var data = sampleData.samples;
        console.log(data);

        // Filter the data by selected sample id
        var filtSamp = data.filter(sample => sample.id === id)[0];
        console.log(filtSamp);

            // Select the otu ids
            var ids = filtSamp.otu_ids;
            console.log(ids)

            // Select the otu values
            var values = filtSamp.sample_values;
            console.log(values)

            // Select the bacteria types
            var labels = filtSamp.otu_labels;
            console.log(labels)

            // Select the top 10 otu's and reverse the order
            var otuTop10 = filtSamp.sample_values.slice(0,10).reverse();
            console.log(otuTop10)

            // Select the otu labels
            var idTop10 = (filtSamp.otu_ids.slice(0,10)).map(d => "OTU " + d);
            console.log(idTop10)

            // Select the bacteria names for the top 10
            var nameTop10 = filtSamp.otu_labels.slice(0,10);
            console.log(nameTop10)

                // Create trace for horizontal bar chart
                var trace1 = {
                    x: otuTop10,
                    y: idTop10,
                    text: nameTop10,
                    type: "bar",
                    orientation: "h"
                };

                var data = [trace1];

                var layout = {
                    title: " Top 10 OTU per subject",
                    xaxis: { title: "Number of Microbes"},
                    yaxis: { title: "OTU"}                
                };

                // Plot the bar chart
                Plotly.newPlot("bar", data, layout);

                // Create trace for the bubble plot
                var trace2 = {
                    x: ids,
                    y: values,
                    mode: 'markers',
                    marker: {
                        color: ids,
                        size: values
                    },
                    text: labels
                };

                var data2 = [trace2];

                var layout2 = {
                    title: "Type and amount of OTU's",
                    xaxis: { title: "OTU ID"},
                    yaxis: { title: "Number of Microbes"}
                };

                // Plot the bubble plot
                Plotly.newPlot("bubble", data2, layout2);

                // Bring in the meta data
                d3.json("samples.json").then(sampleData => {
        
                    var metaData = sampleData.metadata;
                    console.log(metaData);
            
                    // Filter meta data with selected sample id
                    var filtSamp = metaData.filter(sample => sample.id.toString() === id)[0];
                    console.log(filtSamp);

                    // Create a wash frequency variable for the gauge plot
                    var wash = filtSamp.wfreq;
                    console.log(wash);

                    // Create trace for the gauge plot
                    var data3 = [
                        {
                          domain: { x: [0, 1], y: [0, 1] },
                          value: wash,
                          title: { text: "Wash Frequency per Week" },
                          type: "indicator",
                          mode: "gauge+number",
                          gauge: {
                            axis: { range: [null, 10] },
                            steps: [
                              { range: [0, 1], color: "rgba(0,105,11,.5)"},
                              { range: [1, 2], color: "rgba(10,120,22,.5)"},
                              { range: [2, 3], color: "rgba(14,127,0,.5)"},
                              { range: [3, 4], color: "rgba(110,154,22,.5)"},
                              { range: [4, 5], color: "rgba(170,202,42,.5)"},
                              { range: [5, 6], color: "rgba(202,209,95,.5)"},
                              { range: [6, 7], color: "rgba(210,206,145,.5)"},
                              { range: [7, 8], color: "rgba(232,226,202,.5)"},
                              { range: [8, 9], color: "rgba(240, 230,215,.5)"},
                              { range: [9, 10], color: "rgba(255,255,255,0)"}
                            ],
                          }
                        }
                      ];
                      
                      var layout3 = { width: 450, height: 350, margin: { t: 0, b: 0 } };

                    //   Plot the gauge plot
                      Plotly.newPlot('gauge', data3, layout3);
                });
    });
};

// Create a function to initialize the page with starting charts
function init() {

var select = d3.select('#selDataset');

    // populate the drop down selector with the sample id names
    d3.json("samples.json").then(data => {
        data.names.forEach(name => {
            select.append("option").text(name).property("value");
        });

        // Call the plot and panel functions with the data from the first sample id
        plots(data.names[0]);
        panel(data.names[0]);
    });
};

// Get the value from the drop down selector and call for a change of charts based upon the value selected
d3.select('#selDataset').on('change', updatePlotly);

// Create a function to update the charts and panel
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var id = dropdownMenu.property("value");

    // Call plot and panel functions with selection
    plots(id);
    panel(id);
};

init();


