var sizer = 1.01;
var revSizer = 1.005;
var timer = 10;
var f = 0;

var narwhalCount = 0;
var narwhalEntries = [];
var narwhalNames = ["Clive","Alfred","Maxwell","Ainsley"];
var belugeInfect = 3;
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

AFRAME.registerComponent("title", {
          init: function() {
          var el = this.el;

         el.addEventListener('animationend', function(e) {
                    el.setAttribute("position",{ x:0,y: -100,z:0});

      });
   }
});

function getNames (data) {
    narwhalEntries = data.Charcthers;

    createNarwhals();
}
function createNarwhals () {

for (var i = 0; i < 15; i++) {
  var sceneEl = document.querySelector('a-scene');
  var grandPar = document.createElement('a-entity');
  var modelEnt = document.createElement('a-entity');
  var parEnt = document.createElement('a-entity');

  sceneEl.appendChild(grandPar);
  grandPar.appendChild(parEnt)
  parEnt.appendChild(modelEnt);
  parEnt.setAttribute("rotation",{y: i*(Math.random() * 360)});

  modelEnt.setAttribute("id","modely"+i);
  modelEnt.setAttribute("id","modely"+0);
  var randomBeluge = Math.random() >= 0.5;
      modelEnt.setAttribute("modely"+i); 

  if (randomBeluge && belugeInfect > 0) {
    modelEnt.setAttribute("obj-model","obj:#belugeobj");
    modelEnt.setAttribute("name","OH NO!");
    modelEnt.setAttribute("pasta","BELUGA KAZOO!");
    belugeInfect--;
  }
  else {
    modelEnt.setAttribute("name",narwhalEntries[i%narwhalEntries.length].name);
    modelEnt.setAttribute("pasta","Loves to eat " + narwhalEntries[i%narwhalEntries.length].favoritePasta);
    modelEnt.setAttribute("obj-model","obj:#narwhalobj");
  }



  modelEnt.setAttribute("material","src: #tex"+i);

  var animation = document.createElement('a-animation');
  animation.setAttribute("attribute","rotation");
  animation.setAttribute("dur", "100000");
  animation.setAttribute("easing", "linear");
  animation.setAttribute("to","0 360 0");  animation.setAttribute("repeat","indefinite");
  grandPar.appendChild(animation);
  var text = sceneEl.querySelector('#UItext');
  var outline = sceneEl.querySelector('#UIOutline');
  AFRAME.registerComponent('modely'+i, {
      init: function() {
        var data = this.data;
        var el = this.el;
        var collected = false;
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
          //sceneEl.appendChild(text);
                              sceneEl.appendChild(outline);

          outline.setAttribute("position",{ x:0,y: -100,z:0});

        }); 
        el.addEventListener('mouseenter', function(e) {
          //el.parentElement.getAttribute("sound").playSound();
           //el.parentElement.components.sound.playSound();
          el.parentElement.appendChild(text);
                    el.appendChild(outline);

          console.log(el.getAttribute("position").y);
          text.setAttribute("position",{x:0,y: 1.5,z:-3});

        //console.log(el.getAttribute("dat").name);
          gracePeriod = 0;
          longpress = false;
          clearInterval(sizeTimer);
                       text.setAttribute("value", "???");

          if (collected == false) {
            sizeTimer = setInterval(function(){   
              el.object3D.scale.set(el.object3D.scale.x/sizer,el.object3D.scale.y/sizer,el.object3D.scale.z/sizer);
            }, timer);
            if (el.object3D.scale.x < .1 ) {
              console.log("long click");
              collected = true;
              narwhalCount++;
              // var opedia = sceneEl.querySelector('#Narwhalopedia');
              // opedia.setAttribute('value',opedia.getAttribute('value') + el.getAttribute('dat').name + "\n");
              var explosion = sceneEl.querySelector('#explosion');
              explosion.setAttribute("position",el.getAttribute("position"));
              el.parentElement.appendChild(explosion);
              console.log(el.getAttribute("position"));
              console.log(explosion.getAttribute("position"));
           //   el.setAttribute("material","src: #tex"+0);
              console.log(el.getAttribute("material"));
             // el.parentElement.removeChild(el);
              longpress = true;
            }
          }
          else {
            text.setAttribute("value", el.getAttribute("name") + "\n" + el.getAttribute("pasta"));
          }
        });
      }
    });
  }
}
// var colors = ["feb5ae","fd5331","fdc58b","e5f4df","a5bfcc"];

 // var caughtNarwhalSFX = document.createElement('a-entity');

  //modelEnt.setAttribute("gltf-model","#narwhal");

  // parEnt.setAttribute("sound","src: #pickupSound; autoplay: true");
  //caughtNarwhalSFX.setAttribute("id","sound");
  //modelEnt.setAttribute("scale",{x: 0.75, y: 0.75, z: 0.75})
  // modelEnt.object3D.scale.set(0);
 // modelEnt.setAttribute("material","color: #ff69b4");
  //modelEnt.setAttribute("material","src: ");

  //modelEnt.setAttribute("material","color: #"+colors[narwhalEntries[i%narwhalEntries.length].color]);
  //console.log(colors[narwhalEntries[i%narwhalEntries.length].color]);
  // modelEnt.setAttribute("sound","on: click; src: #pickupSound");
