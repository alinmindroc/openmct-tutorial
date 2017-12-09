TODO: currently extra directory is only saved in local storage - have to find way to persist it in config file

History server: http://localhost:8081/telemetry/prop.alt?start=1512838170663&end=1512839070663
The start and end parameters are set automatically by openMCT's widgets.  
The history server gets data from the object defined in spacecraft.js. Data is generated randomly ight now.  
  
The Google Maps widget reads data from the /static/map/data.json file.  

The image widget shows the static/images/crt_img.png file. The image is updated every 5 seconds.
Historical images should be saved with different file names in the static/images/all_images directory.  