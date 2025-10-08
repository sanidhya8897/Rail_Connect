const trains = { "NDLS-RE-12001": { seats: 2, booked: [] } }; 
const waitlist = [];                                           
const undoStack = [];                                          

function book(trainId, passenger) {
  const t = trains[trainId];
  if (!t) return "train not found";                 
  if (t.booked.length < t.seats) {                         
    t.booked.push(passenger);
    return `booked: ${passenger}`;                           
  } else {
    waitlist.push({ trainId, passenger });                  
    return `waitlisted: ${passenger}`;                     
  }
}

function cancel(trainId, passenger) {
  const t = trains[trainId];
  if (!t) return "train not found";                         
  const i = t.booked.indexOf(passenger);
  if (i === -1) return "not found";                           
  t.booked.splice(i, 1);                                     
  undoStack.push({ type: "cancel", trainId, passenger });      
  if (waitlist.length) {                                      
    const next = waitlist.shift();                             
    if (next.trainId === trainId) t.booked.push(next.passenger);
  }
  return "canceled";                                         
}

function undoLast() {                                      
  const last = undoStack.pop();
  if (!last) return "nothing to undo";                       
  if (last.type === "cancel") {
    const t = trains[last.trainId];
    if (t.booked.length < t.seats) t.booked.push(last.passenger);
    else waitlist.unshift({ trainId: last.trainId, passenger: last.passenger });
    return "undo ok";
  }
  return "unknown op";
}

// demo
console.log(book("NDLS-RE-12001", "Aditi"));   
console.log(book("NDLS-RE-12001", "Ravi"));    
console.log(book("NDLS-RE-12001", "Neha"));    
console.log(cancel("NDLS-RE-12001", "Ravi"));  
console.log(undoLast());                     
