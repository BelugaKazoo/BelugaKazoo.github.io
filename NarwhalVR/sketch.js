var sizer = 1.01;
var revSizer = 1.005;
var timer = 16;
var f = 0;

var narwhalCount = 0;
var narwhalEntries = [];
var narwhalNames = ["Clive","Alfred","Maxwell","Ainsley"];

var xmlhttp = new XMLHttpRequest();
var url = "entries.json";

xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    getNames(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getNames (data) {
    narwhalEntries = data.Charcthers;
    createNarwhals();
}
function createNarwhals () {
for (var i = 0; i < 17; i++) {
  var sceneEl = document.querySelector('a-scene');
  var grandPar = document.createElement('a-entity');
  var modelEnt = document.createElement('a-entity');
  var parEnt = document.createElement('a-entity');
 // var caughtNarwhalSFX = document.createElement('a-entity');


  sceneEl.appendChild(grandPar);
  grandPar.appendChild(parEnt)
  parEnt.appendChild(modelEnt);
  parEnt.setAttribute("rotation",{y: i*(Math.random() * 360)});

  modelEnt.setAttribute("id","modely"+i);
  modelEnt.setAttribute("modely"+i);
  //modelEnt.setAttribute("gltf-model","#narwhal");
  modelEnt.setAttribute("obj-model","obj:#narwhalobj");

  modelEnt.setAttribute("name",narwhalEntries[i%narwhalEntries.length].name);
  modelEnt.setAttribute("dat",narwhalEntries[i%narwhalEntries.length].name);
  parEnt.setAttribute("sound","src: #pickupSound");
  //caughtNarwhalSFX.setAttribute("id","sound");
  //modelEnt.setAttribute("scale",{x: 0.75, y: 0.75, z: 0.75})
  // modelEnt.object3D.scale.set(0);
 // modelEnt.setAttribute("material","color: #ff69b4");
      modelEnt.setAttribute("material","src: #tex"+i);

  console.log(modelEnt.getAttribute("dat"));
  //modelEnt.setAttribute("material","color: #"+colors[narwhalEntries[i%narwhalEntries.length].color]);
  console.log(colors[narwhalEntries[i%narwhalEntries.length].color]);
  console.log(modelEnt.getAttribute("dat"));
  var animation = document.createElement('a-animation');
  animation.setAttribute("attribute","rotation");
  animation.setAttribute("dur", "100000");
  animation.setAttribute("easing", "linear");
  animation.setAttribute("to","0 360 0");

  animation.setAttribute("repeat","indefinite");
  grandPar.appendChild(animation);
  var text = sceneEl.querySelector('#UItext');

  AFRAME.registerComponent('modely'+i, {
      init: function() {
        var data = this.data;
        var el = this.el;
        el.object3D.position.set(0,f*2.5,-15);
        f++;
        var pressTimer = null;
        var sizeTimer = null;
        var longpress = false;
        var gracePeriod = 0;
        var sceneEl = document.querySelector('a-scene');
        el.addEventListener('mouseleave', function(e) {
          clearInterval(sizeTimer);
          sizeTimer = setInterval(function(){   
            if (el.object3D.scale.x > 1) {
              clearInterval(sizeTimer);
            }
            if (gracePeriod > 100) {
                el.object3D.scale.set(el.object3D.scale.x*revSizer,el.object3D.scale.y*revSizer,el.object3D.scale.z*revSizer);
            }
            else {
                gracePeriod++;
            }
          }, timer);
          console.log('mouse up');          
          sceneEl.appendChild(text);
        }); 
        el.addEventListener('mouseenter', function(e) {
          //el.parentElement.getAttribute("sound").playSound();
            el.parentElement.components.sound.playSound();
          el.appendChild(text);
          text.setAttribute("value", el.getAttribute("dat") + "\n" + el.getAttribute("dat").speed);
        //console.log(el.getAttribute("dat").name);
          gracePeriod = 0;
          longpress = false;
          clearInterval(sizeTimer);
          sizeTimer = setInterval(function(){   
            el.object3D.scale.set(el.object3D.scale.x/sizer,el.object3D.scale.y/sizer,el.object3D.scale.z/sizer);
          }, timer);
          if (el.object3D.scale.x < .1) {
            console.log("long click");
            narwhalCount++;
            var opedia = sceneEl.querySelector('#Narwhalopedia');
            opedia.setAttribute('value',opedia.getAttribute('value') + el.getAttribute('dat').name + "\n");

            var explosion = sceneEl.querySelector('#explosion');
            explosion.setAttribute("position",el.getAttribute("position"));
            el.parentElement.appendChild(explosion);
            console.log(el.getAttribute("position"));
            console.log(explosion.getAttribute("position"));
            el.parentElement.removeChild(el);
            longpress = true;
          }
        });
      }
    });
  }
}
var colors = ["feb5ae","fd5331","fdc58b","e5f4df","a5bfcc"];
//ff69b4"
