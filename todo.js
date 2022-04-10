// reset list
// chrome.storage.sync.set({"list": ""});
// chrome.storage.sync.set({"num_elements": 1});

// our current list
let list = document.getElementById("list");
let index = 1;
document.getElementById("add").addEventListener("click", addItem);

// creating an array for the tasks
const arr = [];
chrome.storage.sync.get("list", function(items){
  // push all stored tasks into arr
  // add all stored tasks to the list *displays on screen*
  for (const e of items["list"]) {
    
    // push to arr
    arr.push(e);

    // create an li element and add the task
    var node = document.createElement('li');
    node.id = `${index}`;
    node.appendChild(document.createTextNode(e));

    // create a remove button that connects to task
    var b = document.createElement('button');
    b.innerHTML = 'x';
    b.id = `remove${index}`;
    // b.addEventListener("click", addItem(index));

    // add both to list
    list.appendChild(b);
    list.appendChild(node);

    // increase index
    index++;
  }
});

function addItem() {
    // get task from input
    let answer = document.getElementById("task");

    // create li task
    var node = document.createElement('li');
    node.id = `${index}`;
    node.appendChild(document.createTextNode(answer.value));

    // create a button
    var b = document.createElement('button');
    b.innerHTML = 'x';
    b.id = `remove${index}`;
    // b.addEventListener("click", removeItem(index));
    
    // increment index and change num_elemnts
    index++;
    chrome.storage.sync.set({"num_elements": index})
    
    // append to list and push to array, set array to list
    list.appendChild(b);
    list.appendChild(node);
    arr.push(answer.value);
    chrome.storage.sync.set({"list": arr});
    
}
// function removeItem(x) {
//   let t = document.getElementById(`${x}`);
//   let but = document.getElementById(`remove${x}`);
//   t.parentNode.removeChild(t);
//   but.style.display = "hidden";
//   index--;
// }


// time stuff
let time = document.getElementById("time");
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
chrome.storage.sync.set({"time": today}, () => {
  time.innerHTML = today;
});