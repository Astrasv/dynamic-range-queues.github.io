function initializeArray(n, m) { //initializes array from 0-19
    const array = [];
    for (let i = n; i <= m; i++) {
      array.push(i);
    }
  
    return array;
}
  
function overallSize(chunkarr){ //checks all the non null spaces spots in the array
  var sizeCheck =chunkarr.flat(); 
  var size = 0;
  for (let index = 0; index < sizeCheck.length; index++) {
    if (sizeCheck[index] !== null){
      size++;
    }      
  }
  return size
}
  
function inidividualSize(arr){ //individual non null size of the array
  var size=0
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] !== null){
      size++;    
    }
  }
  return size
}
  
function spliceIntoChunks(arr, chunkSize) { //gets the range of each sepearte chunk(Queue)
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk);
  }
  return res;
}
  
function removeFirstNull(chunks){ //traverses the full queue and finds the next null value to input value
  var flag = 1;
  var queueNumber=0;
  loop1:
    for (let i = 0; i < chunks.length; i++) {
      loop2:
        for (let j = 0; j < chunks.length; j++) {
          if (chunks[i][j] === null){
            flag = 0;
            chunks[i].splice(j,1);
            queueNumber = i
            break loop1;
          }
        }    
    }
  if (flag === 1){
    alert("The whole array is full");
  }
  return queueNumber; //if the array is full, then alert
}
  
function firstNullQueueNum(chunks){ //was used for debugging to check if array is full and alert
  var flag = 1;
  var queueNumber=0;
  loop1:
    for (let i = 0; i < chunks.length; i++) {
      loop2:
        for (let j = 0; j < chunks.length; j++) {
          if (chunks[i][j] === null){
            flag = 0;
            chunks[i].splice(j,1);
            queueNumber = i
            break loop1;
          }
        }    
    }
  if (flag === 1){
    alert("The whole array is full");
  }
  return queueNumber; 
  
}
  
  
  
class MultipleQueue{
  constructor(queuecount){
    this.queuecount = queuecount;
    this.mainarr = new Array(20).fill(null)
    this.initialQueuesize = 20/this.queuecount
    this.queueSizearrdum = new Array(this.queuecount).fill(this.initialQueuesize)
    this.queueSizearr = new Array(this.queuecount).fill(0)
    this.chunkarr = spliceIntoChunks(this.mainarr,this.initialQueuesize);
  }

  // Checking queue size for all queues (helps in debugging)
  showQueuesize(){
    return this.queueSizearr;
  }


  enqueue(queueIndex, elem) {
    var valarr = this.chunkarr[queueIndex];
    var pointerindex = 0;
  
    for (let i = 0; i < queueIndex; i++) {
      pointerindex += this.queueSizearr[i];
    }
  
    pointerindex += inidividualSize(this.chunkarr[queueIndex]);
  
    //Takes extra space only if the queue exceeds initial equal split queue size
    if (inidividualSize(valarr) >= this.queueSizearrdum[queueIndex]) {
      valarr.push(elem);
      this.queueSizearr[queueIndex]++;
      this.queueSizearrdum[removeFirstNull(this.chunkarr)]--; //Taking memory space of adjacent queue

      //Calculate equivalenl flattened array index for color schemes
      pointerindex = this.calculateFlattenedIndex(queueIndex, this.queueSizearr[queueIndex] - 1); 
    } 
    else {
      for (let index = 0; index < valarr.length; index++) {
        if (valarr[index] === null) {
          this.queueSizearr[queueIndex]++;
          valarr[index] = elem;
          pointerindex = this.calculateFlattenedIndex(queueIndex, index);
          break;
        }
      }
    }
  
    return pointerindex;
  }
  
  calculateFlattenedIndex(queueIndex, indexInQueue) {
    var flattenedIndex = 0;
    for (let i = 0; i < queueIndex; i++) {
      flattenedIndex += this.queueSizearrdum[i];
    }
    flattenedIndex += indexInQueue;
    return flattenedIndex;
  }

  dequeue(queueIndex){
    var valarr= this.chunkarr[queueIndex]
    if (inidividualSize(valarr) === 0){
    this.queueSizearr[queueIndex]++;
    alert(`Queue ${queueIndex} is empty`)
    }

    var dequeueElem = this.chunkarr[queueIndex][0];

    // Instead of using front rear pointer, we swap all values with previous variable
    valarr.shift();

    if (inidividualSize(valarr)<=this.initialQueuesize){ 
      valarr.push(null) 
    }

    this.queueSizearr[queueIndex]--;
    return dequeueElem 
  }

  showDum(){
    return this.queueSizearrdum;
  }

  arrflat(){
    return this.chunkarr.flat()
  }

  //Used in calculating flattened index
  prevchunksum(i){
      var sum =0;
      var count = 0
      for (let index = 0; index < i; index++) { 
          sum += this.chunklen(index)
          count++
      }
      return sum/count;
  }

  //Caluclate length of each chunk
  chunklen(i){
    return this.chunkarr[i].length
  }
  
}
  
  
  
// Globalized output array 
var oparr;
  
function totalNumberofQs() {
  // Initialize total number of queues which is a factor of 20 (1, 2, 4, 5 ...)
  var numberofqueue = parseInt(document.getElementById("totalqueueval").value);
  if (20%numberofqueue != 0 ){
    alert("Enter value so that 20 is equally split");
  }
  else {
    oparr = new MultipleQueue(numberofqueue);
    alert(`Multiple Queue initialised with queue count ${numberofqueue}`);
    updateListElements(oparr.chunkarr);  
    // Updates the entire state of the program by using the 2D array backend.
    // It is a refresh point.
  }
}
  
// Add event listener to the "Number of queues" anchor tag
document.getElementById("totalqueue").addEventListener("click", totalNumberofQs);
  
// Color scheme used for visual splitting of main array into multiple queues 
const colors = [
  "#FF7F50",     
  "#FFD700",     
  "#FF69B4",      
  "#7FFFD4",     
  "#00BFFF",      
  "#800080",     
  "#FF4500",      
  "#32CD32",      
  "#FF1493",      
  "#00CED1"      
];
  
function updateListElements(arr) {
  /* 
  Function which acts as a refresh point. 
  */

  const listItems = document.getElementsByClassName("elem");

  // Debugging using logs
  console.log(oparr.chunkarr);
  console.log(oparr.showQueuesize());
  console.log(oparr.showDum());

  
  const queuecount = 20/document.getElementById("totalqueueval").value
  for (let i = 0; i < oparr.queuecount; i++) {
      for (let j = 0; j < oparr.chunklen(i); j++) {
          var index;
          // Formula to calculate index in flattened 2D array into 1D array and
          if (i === 0){
              index = j + (i*queuecount);
          }
          else{
              index = j + (i*oparr.prevchunksum(i));
          }

          // If item is not null, then default value is None else actual array value
          const item = arr[i][j] !== null ? arr[i][j] : 'None';

          // Injecting HTML code using js (color scheme)
          listItems[index].style = `--clr:${colors[i]};--i:${index}`
          listItems[index].innerHTML = `<a href="#" id="elem${index}" >${item}</a>`;
      }
  }
}
  
  
  
function enqueueMain() {
  // Targets the queuenoval input element 
  const queueNumInput = document.getElementById('queuenoval').value-1;
  const elem = document.getElementById('elemval').value; 

  // Validating user input
  if (elem === ''){
    alert("Enter element to enqueue");
  }

  else{
    oparr.enqueue(queueNumInput, elem);
    updateListElements(oparr.chunkarr);  // Refresh point
  }

}

function dequeueMain() {
  // Targets the totalqueueval input element
  const queueNumInput = document.getElementById('queuenoval').value-1;
  const dequeuedElem = oparr.dequeue(queueNumInput);  // For alert
  updateListElements(oparr.chunkarr);  // Refresh point

  if (dequeuedElem !== undefined) {
    alert(`Dequeued element: ${dequeuedElem}`);
  }
}
  
// Update list elements when the page loads
window.addEventListener('DOMContentLoaded', function () {
  updateListElements(oparr.chunkarr);
});
  

  
  