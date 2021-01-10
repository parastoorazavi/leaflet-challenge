# Leaflet Homework - Visualizing Data with Leaflet


![Bar Chart](https://github.com/parastoorazavi/leaflet-challenge/blob/main/Images/1-Logo.png)

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Bonus Part](#bonus_part)

## 🧐 About <a name = "about"></a>
Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## 💻 Getting Started <a name = "getting_started"></a>

**Level 1: Basic Visualization:** <br>

![Bar Chart](https://github.com/parastoorazavi/leaflet-challenge/blob/main/Images/2-BasicMap.png)

Your first task is to visualize an earthquake data set.

### 1. Get your data set

![Bar Chart](https://github.com/parastoorazavi/leaflet-challenge/blob/main/Images/3-Data.png)

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

![Bar Chart](https://github.com/parastoorazavi/leaflet-challenge/blob/main/Images/4-JSON.png)

### 2. Import & Visualize the Data

Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

•	Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

•	Include popups that provide additional information about the earthquake when a marker is clicked.

•	Create a legend that will provide context for your map data.

•	Your visualization should look something like the map above.


## ⏱Bonus Part -	Level 2: More Data: <a name = "bonus_part"></a>

![Bar Chart](https://github.com/parastoorazavi/leaflet-challenge/blob/main/Images/2-BasicMap.png)


**More Data, More Dynamics:** <br>
You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

•	Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels. 

**Incorporate d3-tip:** <br>

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the d3-tip.js plugin developed by Justin Palmer—we've already included this plugin in your assignment directory.

![Bar Chart](https://github.com/parastoorazavi/D3-challenge/blob/main/Images/8-tooltip.gif)

•	Check out David Gotz's example to see how you should implement tooltips with d3-tip.

