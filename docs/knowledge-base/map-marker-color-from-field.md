---
title: Set Different Colors Dynamically for Markers Based on Field in Map
description: An example on how to dynamically change the colors of the markers based on the field value of the Kendo UI Map.
type: how-to
page_title: Set Different Colors for Markers Based on Field Value | Kendo UI Map
slug: map-marker-color-from-field
tags: map, markers, marker color
ticketid: 1115002
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Map for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Progress Kendo UI</td>  
  <td>version 2017.2.621</td>
 </tr>
</table>

## Description

I have a Kendo UI Map where markers are added dynamically, the data is retrieved from database. The locations are grouped by category for which we added a color to the datasource.

What we need is to use this color to the marker on the Map, based on the field value.


## Solution  

There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds

Although that the markers styles are coming from the selected themes styles, you could try to handle the [markerActivate ](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#events-markerActivate)event (_which will fire after the marker is created_) get reference to the rendered element and manually change its color with jQuery:  

````
markerActivate: function(e) {
   $(e.marker.element.context).css("color", "THE NEW COLOR")
}
````

Following is an example with this approach:

#### Example

```html
<div id="map"></div>
<script>
    $("#map").kendoMap({
        markers: [{
            shape: "pinTarget",
            location: [42, 27],
            colorField: "green"
        },{
            shape: "pinTarget",
            location: [42, 32],
            colorField: "red"
        },{
            shape: "pinTarget",
            location: [42, 38],
            colorField: "#333999"
        }],
        markerActivate: function(e) {
          $(e.marker.element.context).css("color", e.marker.options.colorField)
        }
    });
</script>
````
