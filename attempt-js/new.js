function initializeArray(n, m) {
  const array = [];

  for (let i = n; i <= m; i++) {
    array.push(i);
  }

  return array;
}

function overallSize(chunkarr){
  var sizeCheck =chunkarr.flat(); 
  var size = 0;
  for (let index = 0; index < sizeCheck.length; index++) {
    if (sizeCheck[index] !== null){
      size++;
    }      
  }
  return size
}

function inidividualSize(arr){
  var size=0
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] !== null){
      size++;    
    }
  }
  return size
}


function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk);
  }
  return res;
}

function removeFirstNull(chunks){
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

function firstNullQueueNum(chunks){
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
  
    if (inidividualSize(valarr) >= this.queueSizearrdum[queueIndex]) {
      valarr.push(elem);
      this.queueSizearr[queueIndex]++;
      this.queueSizearrdum[removeFirstNull(this.chunkarr)]--;
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
    valarr.shift();
    if (inidividualSize(valarr)<=this.initialQueuesize){ valarr.push(null) }
    this.queueSizearr[queueIndex]--;
    return dequeueElem 
  }

  showDum(){
    return this.queueSizearrdum;
  }

  arrflat(){
    return this.chunkarr.flat()
  }

  chunklen(i){
    return this.chunkarr[i].length
  }

}




var oparr;

function totalNumberofQs() {
  var numberofqueue = parseInt(document.getElementById("totalqueueval").value);
  oparr = new MultipleQueue(numberofqueue);
  alert(`Multiple Queue initialised with queue count ${numberofqueue}`)
}


// Add event listener to the "Number of queues" anchor tag
document.getElementById("totalqueue").addEventListener("click", totalNumberofQs);


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
  const listItems = document.getElementsByClassName('elem');
  console.log(oparr.chunkarr);
  console.log(oparr.showQueuesize());
  console.log(oparr.showDum());
  for (let i = 0; i < listItems.length; i++) {
    const queueno = document.getElementById("queuenoval").value
    const index = i + 1;
    const item = arr[i] !== null ? arr[i] : 'None';
    listItems[i].innerHTML = `<a href="#" id="elem${index}"><span>${index - 1}</span>${item}</a>`;
  }
}



function enqueueMain() {
  const listItems = document.getElementsByClassName('elem');
  const queueNumInput = document.getElementById('queuenoval').value;
  const elem = document.getElementById('elemval').value;
  var pointervar = oparr.enqueue(queueNumInput, elem);
  listItems[pointervar].style = `--clr:${colors[queueNumInput]};--i:${pointervar + 1}`
  console.log(pointervar)
  updateListElements(oparr.arrflat());
}

function dequeueMain() {
  const queueNumInput = document.getElementById('queuenoval').value;
  const dequeuedElem = oparr.dequeue(queueNumInput);
  updateListElements(oparr.arrflat());
  if (dequeuedElem !== undefined) {
    alert(`Dequeued element: ${dequeuedElem}`);
  }
}

// Update list elements when the page loads

window.addEventListener('DOMContentLoaded', function () {
  updateListElements(oparr.arrflat());
});


//Queue 1


// oparr.enqueue(0,17);
// oparr.enqueue(0,18);
// oparr.enqueue(0,19);

// console.log(oparr.dequeue(0));
// console.log(oparr.dequeue(0));
// oparr.enqueue(0,17);
// oparr.enqueue(0,18);
// console.log(oparr.dequeue(0));


// // //Queue 2
// oparr.enqueue(1,14);
// oparr.enqueue(1,15);


// oparr.enqueue(1,16);
// oparr.enqueue(1,17);
// oparr.enqueue(1,18);

// oparr.enqueue(2,16);
// oparr.enqueue(2,17);
// oparr.enqueue(2,18);



// // // console.log(oparr.dequeue(1));
// // // console.log(oparr.dequeue(1));
// // // oparr.enqueue(1,17);
// // // oparr.enqueue(1,18);
// // // console.log(oparr.dequeue(1));

// function updateListElements(arr) {
//   const listItems = document.getElementsByClassName('elem');
//   for (let i = 0; i < listItems.length; i++) {
//     const index = i + 1;
//     const item = arr[i] !== null ? arr[i] : 'None';
//     listItems[i].innerHTML = `<a href="#" id="elem${index}"><span>${index - 1}</span>${item}</a>`;
//   }
// }

// function enqueueMain() {
//   const queueNumInput = document.getElementById('queuenoval').value;
//   const elem = document.getElementById('elemval').value;
//   oparr.enqueue(queueNumInput, elem);
//   updateListElements(oparr.arrflat());
// }

// function dequeueMain() {
//   const queueNumInput = document.getElementById('queuenoval').value;
//   const dequeuedElem = oparr.dequeue(queueNumInput);
//   updateListElements(oparr.arrflat());
//   if (dequeuedElem !== undefined) {
//     alert(`Dequeued element: ${dequeuedElem}`);
//   }
// }






// // Update list elements when the page loads
// window.addEventListener('DOMContentLoaded', function () {
//   updateListElements(oparr.arrflat());
// });


