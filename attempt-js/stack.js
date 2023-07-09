class Stack {
    constructor() {
      this.items = [];
    }
  
    push(element) {
      this.items.push(element);
    }
  
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.pop();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[this.items.length - 1];
    }
  
    size() {
      return this.items.length;
    }
  
    clear() {
      this.items = [];
    }
  }
class DoubleQueueStack {
    constructor(stackSize, firstQueueSize, secondQueueSize) {
      this.stackSize = stackSize;
      this.firstQueueSize = firstQueueSize;
      this.secondQueueSize = secondQueueSize;
  
      this.stack = new Array(stackSize).fill(null);
      this.firstQueueFront = 0;
      this.firstQueueRear = 0;
      this.secondQueueFront = stackSize - 1;
      this.secondQueueRear = stackSize - 1;
    }
  
    enqueueToFirstQueue(element) {
      if (this.firstQueueRear < this.firstQueueSize) {
        this.stack[this.firstQueueRear] = element;
        this.firstQueueRear++;
      }
    }
  
    enqueueToSecondQueue(element) {
      if (this.secondQueueRear >= this.stackSize - this.secondQueueSize) {
        this.stack[this.secondQueueRear] = element;
        this.secondQueueRear--;
      }
    }
  
    dequeueFromFirstQueue() {
      if (this.firstQueueFront < this.firstQueueRear) {
        const element = this.stack[this.firstQueueFront];
        this.stack[this.firstQueueFront] = null;
        this.firstQueueFront++;
        return element;
      }
      return null;
    }
  
    dequeueFromSecondQueue() {
      if (this.secondQueueFront > this.secondQueueRear) {
        const element = this.stack[this.secondQueueFront];
        this.stack[this.secondQueueFront] = null;
        this.secondQueueFront--;
        return element;
      }
      return null;
    }

    mainstack(){
        return this.stack
    }

    size(){
        return this.stack.length
    }

    inindex(index){
        return this.stack[index];
    }

    getfirstQueueFront(){
        return this.firstQueueFront
    }
    getfirstQueueRear(){
        return this.firstQueueRear
    }
    getsecondQueueFront(){
        return this.secondQueueFront
    }
    getsecondQueueRear(){
        return this.secondQueueRear
    }
  }
  
  
  
  // Example usage:
  const stack = new DoubleQueueStack(15,7, 6);
  
  stack.enqueueToFirstQueue('A');
  stack.enqueueToSecondQueue('X');

  console.log(stack.mainstack())

  stack.enqueueToFirstQueue('B');
  stack.enqueueToSecondQueue('E');
  stack.enqueueToSecondQueue('F');
  stack.enqueueToSecondQueue('Y');


  stack.enqueueToSecondQueue('Z');
  stack.enqueueToFirstQueue('C');

  console.log(stack.mainstack())



  
  
// //   console.log(stack.dequeueFromFirstQueue()); // Output: A
//   console.log(stack.dequeueFromFirstQueue()); // Output: B
// //   console.log(stack.dequeueFromFirstQueue()); // Output: C
  
//   console.log(stack.dequeueFromSecondQueue()); // Output: X
// //   console.log(stack.dequeueFromSecondQueue()); // Output: Y
// //   console.log(stack.dequeueFromSecondQueue()); // Output: Z

stack.enqueueToFirstQueue('b');


console.log(stack.size())
console.log(stack.inindex(1))


stack.dequeueFromSecondQueue();


for (let index =0; index < stack.size(); index++){
    if (stack.inindex(index)=== null){
        document.getElementById("elem"+(index+1)).innerHTML="<span>"+index+"</span>NONE"
    }
    else{
        document.getElementById("elem"+(index+1)).innerHTML="<span>"+index+"</span>"+stack.inindex(index)
    }
    // document.getElementById("elem"+(index+1)).innerHTML="Hi";

}


document.getElementById("elem"+(stack.getfirstQueueFront()+1)).parentElement.style.background = "#ff0000";
document.getElementById("elem"+(stack.getsecondQueueFront()+1)).parentElement.style.background = "#ff0000";
document.getElementById("elem"+(stack.getfirstQueueRear())).parentElement.style.background = "#0ef";
document.getElementById("elem"+(stack.getsecondQueueRear()+2)).parentElement.style.background = "#0ef";