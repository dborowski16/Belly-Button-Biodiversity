// // Use D3 to select the dropdown menu
// var dropdownMenu = d3.select("#selDataset");
// // Assign the value of the dropdown menu option to a variable
// // var dataset = dropdownMenu.node().value;
// var dataset = dropdownMenu.selectAll('names').data(samples);
// function getPlots(id) {

    d3.json("samples.json").then(sampleData => {
        console.log(sampleData)

        var ids = sampleData.samples[0].otu_ids;
        console.log(ids)

        var values = sampleData.samples[0].sample_values;
        console.log(values)

        var labels = sampleData.samples[0].otu_labels;
        console.log(labels)

        var otuTop10 = sampleData.samples[0].sample_values.slice(0,10).reverse();
        console.log(otuTop10)

        var idTop10 = (sampleData.samples[0].otu_ids.slice(0,10)).map(d => "OTU " + d);
        console.log(idTop10)

        var nameTop10 = sampleData.samples[0].otu_labels.slice(0,10);
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

    });
// };

    var select = d3.select('#selDataset');

    d3.json("samples.json").then(data => {
        data.names.forEach(name => {
            select.append("option").text(name).property("value");
        });
    });


