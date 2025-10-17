// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // TODO 10: Use All Your Filter Functions. Call your apply function(s) here.
  
  // Example combination of filters:
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  applyFilterNoBackground(reddify);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// Global constant for the maximum color value
const MAX_COLOR_VALUE = 255; 

// TODO 1, 2, 3 & 5: Create the applyFilter function here
/**
 
  @param {function(number[]): void} filterFunction 
 */
function applyFilter(filterFunction) { // TODO 5: Accept filterFunction parameter
    
    // TODO 1: Add a Nested Loop
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            
            // TODO 2: Convert to Array
            let pixel = image[i][j];
            let pixelArray = rgbStringToArray(pixel);
            
            // TODO 3 & 5: Apply the filter
         
            filterFunction(pixelArray); 

            // TODO 2: Convert Back to String and Overwrite
            let updatedPixel = rgbArrayToString(pixelArray);
            image[i][j] = updatedPixel;
        }
    }
}


// TODO 9 Create the applyFilterNoBackground function
/**
 

 * @param {function(number[]): void} filterFunction 
 */
function applyFilterNoBackground(filterFunction) {
    
   
    var backgroundColor = image[0][0];

    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
          
            if (image[i][j] !== backgroundColor) {
                
                let pixel = image[i][j];
                let pixelArray = rgbStringToArray(pixel);
                
             
                filterFunction(pixelArray);
                
                let updatedPixel = rgbArrayToString(pixelArray);
                image[i][j] = updatedPixel;
            }
        }
    }
}


// TODO 6: Create the keepInBounds function
/**
 
 @param {number} num 
  @returns {number} 
 */
function keepInBounds(num) {
 
    return num < 0 ? 0 : (num > MAX_COLOR_VALUE ? MAX_COLOR_VALUE : num);
}


// TODO 4: Create reddify filter function
/**

  @param {number[]} pixelArray 
 */
function reddify(pixelArray) {
    pixelArray[RED] = 200;
}


// TODO 7 & 8: Create more filter functions
/**

 * @param {number[]} pixelArray 
 */
function decreaseBlue(pixelArray) {
    let newBlue = pixelArray[BLUE] - 50;
    pixelArray[BLUE] = keepInBounds(newBlue);
}

// TODO 8: Create increaseGreenByBlue filter function
/**

 * @param {number[]} pixelArray 
 */
function increaseGreenByBlue(pixelArray) {
    let newGreen = pixelArray[GREEN] + pixelArray[BLUE];
    pixelArray[GREEN] = keepInBounds(newGreen);
}


// CHALLENGE code goes below here
