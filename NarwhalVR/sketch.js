// var html = document.getElementsByTagName('HTML'); html[0].style.position = 'initial'; html[0].style.overflow = 'scroll'; var canvas = document.querySelector('.a-canvas'); canvas.style.top = '1000px';
// document.requestFullscreen();


var sizer = 1.01;
var revSizer = 1.005;
var timer = 16;
var f = 0;
// var rad = -7;

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
for (var i = 0; i < 4; i++) {
   // console.log(narwhalEntries[2]);
  var sceneEl = document.querySelector('a-scene');
  var entity = document.createElement('a-entity');
  var modelEnt = document.createElement('a-entity');

  var newEntity = sceneEl.appendChild(entity);
  var narwhalEnt = entity.appendChild(modelEnt);
  narwhalEnt.setAttribute("id","modely"+i);
  narwhalEnt.setAttribute("modely"+i);
  narwhalEnt.setAttribute("gltf-model","#narwhal");
  //console.log(narwhalEntries);"color: red"
  narwhalEnt.setAttribute("name",narwhalEntries[i%narwhalEntries.length].name);
  narwhalEnt.setAttribute("material","color: #ff69b4");
  console.log(narwhalEnt.getAttribute("gltf-model"));


// (2 * Math.PI * rad )
 // narwhalEnt.setAttribute("name",narwhalNames[i%narwhalNames.length]); narwhalEntries[i%narwhalEntries.length].name
  var animation = document.createElement('a-animation');
  animation.setAttribute("attribute","rotation");
  animation.setAttribute("dur", "100000");
  // animation.setAttribute("fill","forwards");
  animation.setAttribute("easing", "linear");
  animation.setAttribute("to","0 360 0");
  animation.setAttribute("repeat","indefinite");
  newEntity.appendChild(animation);

  var facingAnimation = document.createElement('a-animation');
  facingAnimation.setAttribute("attribute","rotation");
  facingAnimation.setAttribute("dur", "100000");
  facingAnimation.setAttribute("easing", "linear");
  facingAnimation.setAttribute("to","0 -360 0");
  facingAnimation.setAttribute("repeat","indefinite");
  narwhalEnt.appendChild(facingAnimation);

  AFRAME.registerComponent('modely'+i, {
      init: function() {
        var data = this.data;
        var el = this.el;
        el.object3D.position.set(f*2,f*3-2,-7);
        // el.object3D.rotation.set(0,0,180);
        f++;
        var pressTimer = null;
        var sizeTimer = null;
        var longpress = false;
        var gracePeriod = 0;
        var sceneEl = document.querySelector('a-scene');
        el.addEventListener('mouseleave', function(e) {
          // if (pressTimer !== null) {
          //   clearTimeout(pressTimer);
            clearInterval(sizeTimer);
          //   pressTimer = null;
          // }
          // if (longpress) {
          //   return false;
          // }
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
        }); 
        
        el.addEventListener('mouseenter', function(e) {
          console.log("mouse down");
          gracePeriod = 0;
          longpress = false;
            clearInterval(sizeTimer);
            rotate(20);

          sizeTimer = setInterval(function(){   
            el.object3D.scale.set(el.object3D.scale.x/sizer,el.object3D.scale.y/sizer,el.object3D.scale.z/sizer);
          }, timer);
          if (el.object3D.scale.x < .3) {
            console.log("long click");
            narwhalCount++;
            //narwhalNames.push(el.getAttribute('name'));
            var opedia = sceneEl.querySelector('#Narwhalopedia');
            //console.log(opedia);
            opedia.setAttribute('value',opedia.getAttribute('value') + el.getAttribute('name') + "\n");
            var narwhal = sceneEl.querySelector('#'+el.getAttribute('id'));
            narwhal.sceneEl.removeChild(narwhal.parentElement);
            sceneEl.querySelector('#UItext').setAttribute('value',"Narwhal Count: " + narwhalCount);
            longpress = true;
          }
        });
      }
    });
  }
}



// var canvas = document.getElementById('mycanvas');

// var ctx = canvas.getContext('2d');

// canvas.height = 500;
// canvas.width = 700;
// var x = 100;
// function loop() {
// 	x++;
// 	ctx.strokeRect(x,100,50,x);
// requestAnimationFrame(loop);
// console.log(x)

// }
// loop();


/*
r = 7
c = 2 * Math.PI * 7

*/