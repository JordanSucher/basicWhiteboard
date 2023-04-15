var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
var rectX = stage.width() / 2 - 50;
var rectY = stage.height() / 2 - 25;


function newYellowBox(x, y) {
        return new Konva.Rect({
            x: x,
            y: y,
            width: 100,
            height: 50,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 3,
            draggable: true,
        });
    }



    
var box = newYellowBox(rectX, rectY);        
var box2 = newYellowBox(rectX+50,rectY+100);

var simpleText = new Konva.Text({
        x: stage.width() / 2,
        y: 15,
        text: 'Simple Text',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green',
        draggable: true,
    });

// add cursor styling
function styleBox(box) {
    box.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
};

styleBox(box);
styleBox(box2);

layer.add(box);
layer.add(box2);
layer.add(simpleText);
stage.add(layer);