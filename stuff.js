var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true,

});


stage.on('dragmove', () => {
    const x = stage.x();
    const y = stage.y();
    stage.container().style.backgroundPosition = `${x}px ${y}px`;
});

stage.container().style.backgroundImage = 'url("https://img.freepik.com/premium-vector/squared-notebook-seamless-pattern-grey-grid-texture-school-notebook-mathematics-grid-paper-sheet-vector-illustration-white-background_192280-928.jpg?w=2000")';
stage.container().style.backgroundSize = '50%';
stage.container().style.backgroundRepeat = 'repeat';
stage.container().style.height = '100vh'; 


var layer = new Konva.Layer();
const buttonLayer = new Konva.Layer();


var rectX = stage.width() / 2 - 50;
var rectY = stage.height() / 2 - 25;



class StickyNote extends Konva.Group {
    constructor(config) {
      super(config);
  
      this.rect = new Konva.Rect({
        width: config.width || 150,
        height: config.height || 100,
        fill: config.fill || 'yellow',
        stroke: 'black',
        strokeWeight: 3,
        cornerRadius: 5,
      });
  
      this.text = new Konva.Text({
        text: config.text || '',
        width: config.width || 150,
        height: config.height || 100,
        padding: 10,
        fontSize: 14,
        fontFamily: 'Calibri',
        align: 'center',
        verticalAlign: 'middle',
        lineHeight: 1.2,
      });
  
      this.add(this.rect);
      this.add(this.text);
  
      this.draggable(true);
  
      // Add double-click event listener to make the text editable
      this.on('dblclick', () => {
        this.editText();
      });
    }
  
    // Edit the text
    editText() {
        const textarea = document.createElement('textarea');
        const stageBox = this.getStage().container().getBoundingClientRect();
        const textPosition = this.text.absolutePosition();
      
        const minFontSize = 10; // Set a minimum font size
      
        const adjustFontSize = () => {
          let adjustedFontSize = this.text.fontSize();
          while (this.text.height() > this.rect.height() - this.text.padding() * 2 && adjustedFontSize > minFontSize) {
            adjustedFontSize -= 1;
            this.text.fontSize(adjustedFontSize);
          }
        };
      
        adjustFontSize();
      
        // Set the position and style of the textarea element
        textarea.style.position = 'absolute';
        textarea.style.left = stageBox.left + textPosition.x + 'px';
        textarea.style.width = this.text.width() - this.text.padding() * 2 + 'px';
        textarea.style.height = this.rect.height() - this.text.padding() * 2 + 'px';
        textarea.style.fontSize = this.text.fontSize() + 'px';
        textarea.style.fontFamily = this.text.fontFamily();
        textarea.style.border = 'none';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'auto';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = this.text.lineHeight();
        textarea.style.whiteSpace = 'pre-wrap';
        textarea.style.textAlign = this.text.align();
        textarea.style.color = this.text.fill();
      
        // Add the textarea to the DOM to get its boundingClientRect
        document.body.appendChild(textarea);
        textarea.focus();
      
        // Calculate the vertical alignment for the textarea
        const textareaRect = textarea.getBoundingClientRect();
        const rectHeight = this.rect.height();
        const paddingTopBottom = (rectHeight - textareaRect.height) / 2;
        textarea.style.padding = paddingTopBottom + 'px 0px';
                  
        textarea.value = this.text.text();
        document.body.appendChild(textarea);
        textarea.focus();
      
        const verticalOffset = (this.rect.height() - textarea.clientHeight) / 2;
        textarea.style.top = stageBox.top + textPosition.y + verticalOffset + 'px';
            
        // Hide the text object while editing
        this.text.hide();
        this.getLayer().batchDraw();
      
        // Update the text object and remove the textarea element when the user is done editing
        textarea.addEventListener('blur', () => {
          this.text.text(textarea.value);
          adjustFontSize();
          this.text.show();
          this.getLayer().batchDraw();
          document.body.removeChild(textarea);
        });
      
        // Prevent dragging while editing the text
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            textarea.blur();
          } else if (e.key === 'Escape') {
            textarea.value = this.text.text();
            textarea.blur();
          }
        });
      
        // Adjust the font size while typing
        textarea.addEventListener('input', () => {
          this.text.text(textarea.value);
          adjustFontSize();
        });
      }
      
      
  }
    

  function newStickyNote(x, y) {
    return new StickyNote({
      x: x | 50,
      y: y | 50,
      text: 'text',
      fill: 'yellow',
    });
  };

  const stickyNote = new StickyNote({
    x: 50,
    y: 50,
    text: 'hello world',
    fill: 'yellow',
  });
  
  layer.add(stickyNote);
  



function newYellowBox(x, y) {
        return new Konva.Text({
            x: x,
            y: y,
            width: 100,
            height: 50,
            fill: 'yellow',
            //stroke: 'black',
            text: 'testing',
            //strokeWidth: 3,
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
    text: 'Add a Sticky Note',
});

button.on ('click', function () {
    console.log("trying to add box");
    let x = newStickyNote(rectX, rectY);
    styleBox(x);
    layer.add(x);
});

    

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

styleBox(button)


layer.add(button);
stage.add(layer);


