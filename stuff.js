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

// add a button to the stage that adds a yellow box
var button = new Konva.Text({
    x: 50,
    y: 50,
    width: 120,
    height: 50,
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'black',
    text: 'Add a yellow box',
});

button.on ('click', function () {
    layer.add(newYellowBox(rectX, rectY));
});

    
//var box = newYellowBox(rectX, rectY);        
//var box2 = newYellowBox(rectX+50,rectY+100);

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
        console.log("mouse over");
    });
    box.on('mouseout', function () {
        document.body.style.cursor = 'default';
        console.log("mouse out");
    });
};

//styleBox(box);
//styleBox(box2);
styleBox(button)

//layer.add(box);
//layer.add(box2);
layer.add(button);
//layer.add(simpleText);
stage.add(layer);