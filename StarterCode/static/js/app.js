function panel(id) {
    d3.json("samples.json").then(sampleData => {
        
        var metaData = sampleData.metadata;
        console.log(metaData);

        var filtSamp = metaData.filter(sample => sample.id.toString() === id)[0];
        console.log(filtSamp);

        var panelData = d3.select('#sample-metadata');

        panelData.html("");

        Object.entries(filtSamp).forEach(function([key, value]) {
            panelData.append("h4").text(`${key}: ${value}`);
        });
    });
}

function plots(id) {

    d3.json("samples.json").then(sampleData => {
        console.log(sampleData)
        
        var data = sampleData.samples;
        console.log(data);

        var filtSamp = data.filter(sample => sample.id === id)[0];
        console.log(filtSamp);
           
            var ids = filtSamp.otu_ids;
            console.log(ids)

            var values = filtSamp.sample_values;
            console.log(values)

            var labels = filtSamp.otu_labels;
            console.log(labels)

            var otuTop10 = filtSamp.sample_values.slice(0,10).reverse();
            console.log(otuTop10)

            var idTop10 = (filtSamp.otu_ids.slice(0,10)).map(d => "OTU " + d);
            console.log(idTop10)

            var nameTop10 = filtSamp.otu_labels.slice(0,10);
            console.log(nameTop10)

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

                Plotly.newPlot("bar", data, layout);

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

                Plotly.newPlot("bubble", data2, layout2);

                d3.json("samples.json").then(sampleData => {
        
                    var metaData = sampleData.metadata;
                    console.log(metaData);
            
                    var filtSamp = metaData.filter(sample => sample.id.toString() === id)[0];
                    console.log(filtSamp);

                    var wash = filtSamp.wfreq;
                    console.log(wash);

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
                      Plotly.newPlot('gauge', data3, layout3);
                });
    });
};

function init() {

var select = d3.select('#selDataset');

    d3.json("samples.json").then(data => {
        data.names.forEach(name => {
            select.append("option").text(name).property("value");
        });

        plots(data.names[0]);
        panel(data.names[0]);
    });
};

d3.select('#selDataset').on('change', updatePlotly);

function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var id = dropdownMenu.property("value");

    plots(id);
    panel(id);
};

init();


