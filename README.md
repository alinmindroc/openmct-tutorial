#### Telemetry:
Currently the telemetry data is gnerated randomly and read from a history server:
http://localhost:8081/telemetry/prop.alt?start=1512838170663&end=1512839070663  
The start and end parameters are set automatically by openMCT's widgets.  
The history server gets data from the object defined in spacecraft.js. Data is generated randomly ight now.  
  
#### Google maps:
The Google Maps widget reads data from the /static/map/data.json file.  
TODO: find way to differentiate latest point from the others.

#### Camera:
The camera widget shows the static/images/crt_img.png file. The image is updated every 5 seconds.
Historical images should be saved with different file names in the static/images/all_images directory.  


Currently the widgets in the extra directory are not persisted in any config file. The widgets are saved in the local storage of the browser. This local storage string recreates the gps and camera widgets:

key:  
```
mct
```
value:  
```
{"3b461700-540b-43d3-8d9b-18e73eb8e52c":{"name":"GPS tracking","type":"example.page","url":"http://localhost:8080/static/map/index.html","modified":1512832024502,"location":"mine","persisted":1512832024502},"mine":{"name":"Extra","type":"folder","composition":["3b461700-540b-43d3-8d9b-18e73eb8e52c","43140f82-6924-4e25-b360-35ad97dfa192"],"location":"ROOT","modified":1512839334149,"persisted":1512839334149},"b2daedca-9d2f-4f4c-9efc-20a1c42bb5c7":{"name":"Images","type":"example.page","location":"mine","modified":1512832053044,"url":"http://localhost:8080/static/images/index.html","persisted":1512832053044},"43140f82-6924-4e25-b360-35ad97dfa192":{"name":"Camera","type":"example.page","url":"http://localhost:8080/static/images/index.html","modified":1512836129437,"location":"mine","persisted":1512836129437},"0a240ff0-912e-40e0-959d-8a2a24263402":{"clockFormat":["YYYY/MM/DD hh:mm:ss","clock12"],"timezone":"UTC","name":"wtf","type":"clock","location":"mine","modified":1512836539897,"persisted":1512836539897},"f869fe01-0f73-480f-9572-f65a9bd65ec7":{"clockFormat":["YYYY/MM/DD hh:mm:ss","clock12"],"timezone":"UTC","name":"wtf","type":"clock","modified":1512836539922,"location":"mine","persisted":1512836539922}}
```
