# Belly-Button-Biodiversity
View the final website at: https://dborowski16.github.io/Belly-Button-Biodiversity/

![Bacteria](https://github.com/dborowski16/Belly-Button-Biodiversity/blob/master/static/Images/bacteria.jpg?raw=true)


This project is set up to explore the Belly Button Diversity dataset through an interactive dashboard.  The dashboard shows the user the amount and type of microbes that are catalogued to colonize human navals.  The dataset reveals that the microbes (also known as operational taxanomical units, OTU's) occur in more than 70% of the subjects tested.

This Belly Button Diversity project was created to be able to explore how to utilize Plot.ly in javascript to create interactive charts on a web page from a given input data set. In this case, a static json file, samples.json.  While the project utilizes a local .json file, the script to bring in the data also takes advantage of the d3 package which can also allow the user to connect to an API url in a json formatas well.  Among the interactive charts that were utilized is a horizontal bar chart, a bubble chart that sizes the bubbles by number of microbes prestent per OTU, and colors them as such, and finally, creates a gauge chart that shows the frequency of washing by subject per week.  You will also see a table populated with the meta data for the subject selected.  The code also provides the user with a dropdown selector to see any of the subject results, updating the charts upon selection.

Website Demo
![Demo](https://github.com/dborowski16/Belly-Button-Biodiversity/blob/master/static/Images/BBD%20demo.gif?raw=true)
