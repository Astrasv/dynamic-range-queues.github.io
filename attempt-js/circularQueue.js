function initializeArray(n, m) {
  const array = [];

  for (let i = n; i <= m; i++) {
    array.push(i);
  }

  return array;
}

function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize).map(item => [item, 0]);
    res.push(chunk);
  }
  return res;
}





class MultipleQueue {
  constructor(queueCount) {
    this.queueCount = queueCount;
    this.mainarr=new Array(20).fill(null);
    this.indarr=initializeArray(0,19)
    this.queueCapacity = 20/queueCount; // Set a common capacity for all queues
    this.subindarr=spliceIntoChunks(this.indarr,this.queueCapacity)
    this.array = new Array(queueCount * this.queueCapacity).fill(null);
    this.initialFront = this.subindarr.flatMap(chunk => chunk[0][0]);
    this.frontIndices = this.subindarr.flatMap(chunk => chunk[0][0]);
    this.rearIndices = this.subindarr.flatMap(chunk => chunk[0][0]);
    this.queueSizes = new Array(queueCount).fill(0);
  }

  enqueue(value, queueIndex) {
    if (queueIndex>(this.queueCount-1)){
      alert("You have entered the wrong queue number");
    }
    else{
      const queueSize = this.queueSizes[queueIndex];
      const rearIndex = (this.frontIndices[queueIndex] + queueSize) % this.queueCapacity;
      const arrayIndex = queueIndex * this.queueCapacity + rearIndex;

      //Update used(1) or not used(0) in subindarr
      for (let i = 0; i < this.subindarr.length; i++) {
        for (let j = 0; j < this.subindarr[i].length; j++) {
          if (this.subindarr[i][j][0] === arrayIndex){
            this.subindarr[i][j][1]=1;
          }
        }
      }

      if (queueSize === this.queueCapacity) {
        alert(`Queue ${queueIndex} is full. Cannot enqueue ${value}`);
        return;
      }

      this.array[arrayIndex] = value;
      this.rearIndices[queueIndex]=arrayIndex;
      this.queueSizes[queueIndex]++;
      
    }
    
  }

  dequeue(queueIndex) {
    if (queueIndex > (this.queueCount - 1)) {
      alert("You have entered the wrong queue number");
    } 
    else {
      const queueSize = this.queueSizes[queueIndex];
  
      if (queueSize === 0) {
        alert(`Queue ${queueIndex} is empty. Cannot dequeue.`);
        return;
      }
  
      const frontIndex = this.frontIndices[queueIndex];
      const arrayIndex = (queueIndex * this.queueCapacity) + (frontIndex - this.initialFront[queueIndex]);
      const value = this.array[arrayIndex];
  
      this.array[arrayIndex] = null;
      this.frontIndices[queueIndex] = ((frontIndex + 1 - this.initialFront[queueIndex]) % this.queueCapacity) + this.initialFront[queueIndex];
      this.queueSizes[queueIndex]--;

      //Update used(1) or not used(0) in subindarr
      for (let i = 0; i < this.subindarr.length; i++) {
        for (let j = 0; j < this.subindarr[i].length; j++) {
          if (this.subindarr[i][j][0] === arrayIndex){
            this.subindarr[i][j][1]=0;
          }
        }
      }
  
      return value;
    }
  }
  
  printfrontind(){
    return this.frontIndices
  }

  printrearind(){
    return this.rearIndices
  }

  printqueuesizes(){
    return this.queueSizes
  }

  printarr(){
    return this.array
  }

  printindarr(){
    return this.subindarr
  }
}

const multipleQueue = new MultipleQueue(4);




 
multipleQueue.enqueue('A', 0);
multipleQueue.enqueue('C', 0);
multipleQueue.dequeue(0);
multipleQueue.dequeue(0);
multipleQueue.enqueue('E',0);
multipleQueue.enqueue('F',0);
multipleQueue.enqueue('G',0);
multipleQueue.dequeue(0);
multipleQueue.enqueue('A', 0);
multipleQueue.enqueue('C', 0);
multipleQueue.enqueue('I', 0);


multipleQueue.enqueue('A',1);
multipleQueue.enqueue('C',1);
multipleQueue.dequeue(1);
multipleQueue.enqueue('E',1);
multipleQueue.enqueue('F',1);
multipleQueue.enqueue('G',1);


multipleQueue.enqueue('A',2);
multipleQueue.enqueue('C',2);
multipleQueue.dequeue(2);
multipleQueue.enqueue('E',2);
multipleQueue.enqueue('F',2);
multipleQueue.enqueue('G',2);

multipleQueue.enqueue('A',3);
multipleQueue.enqueue('C',3);
multipleQueue.dequeue(3);
multipleQueue.enqueue('E',3);
multipleQueue.enqueue('F',3);
multipleQueue.enqueue('G',3);


console.log("Main array");
console.log(multipleQueue.printarr())

console.log("Index array")
console.log(multipleQueue.printindarr())

console.log("Front pointers")
console.log(multipleQueue.printfrontind())

console.log("Rear pointers")
console.log(multipleQueue.printrearind())

console.log("Queue sizes")
console.log(multipleQueue.printqueuesizes())

