/*global chrome*/

import React, {useState, useEffect} from 'react'
import BibleJohn from './Bible/bibleJohn.json';
import BibleMatt from './Bible/bibleMatt.json';
import BibleLuke from './Bible/bibleLuke.json';
import BibleMark from './Bible/bibleMark.json';

// import './css/typewriter.css';
import './css/App.css';
import 'animate.css';

export default function Todo() {
    const [list, setList] = useState([]);
    const [index, setIndex] = useState(0);
    const [val, setVal] = useState("");
    const [bib, setBib] = useState("");
    const [noTask, setnoTask] = useState(false);
    const [dragging, setDragging] = useState("");
    const [draggedOver, setDraggedOver] = useState("");
    
    // useEffect(() => {
    //     chrome.storage.sync.get("list", function(items){
    //         let new_list = [];
    //         let index = 0;
    //         for (const e in items["list"]) {
    //             new_list.push({"id": index, "task": items["list"][e].task});
    //             index++;
    //         }
    //         setList(new_list);
    //         setIndex(new_list.length + 1);
    //     }
    // )}, [])
    useEffect(() => {
        document.getElementById("task").focus();
        chooseBibleVerse();
    }, []) 

    function addTask() {
        if (val === "") {
            setnoTask(true);
            return;
        }
        let new_input = {
            "id": index,
            "task": val
        }
        setIndex(index + 1);
        let new_list = list.concat(new_input);
        setList(new_list);
        setVal("");
        document.getElementById("task").focus();
        setnoTask(false);
        // chrome.storage.sync.set({"list": new_list});
    }

    function handleListItemClick(e, x) {
        const found_id = (ident) => ident.id === x;
        let i = list.findIndex(found_id);
        let new_list = list.slice();
        new_list[i] = {'id': i, 'task': e.target.value};
        setList(new_list);
        // chrome.storage.sync.set({"list": new_list});
    }

    function handleInputChange({target}) {
        setVal(target.value);
    }

    function handleDelete(x) {
        const found_id = (ident) => ident.id === x;
        let i = list.findIndex(found_id);
        const left = list.slice(0, i);
        const right = list.slice(i+1, list.length);
        const new_list = left.concat(right);
        setList(new_list);
        // chrome.storage.sync.set({"list": new_list});
    }

    function chooseBibleVerse() {
        // put all json files into one array 
        var arr_books = [BibleJohn, BibleMatt, BibleMark, BibleLuke];
        // create variables
        let rand, name, num_chapters, ch, num_verses, ver, ver_length;
        // pick a random num/book 
        rand = (Math.floor(Math.random() * arr_books.length));
        // find book's name
        name = arr_books[rand]["book"];
        // find num_chapters of said book
        num_chapters = arr_books[rand]['chapters'].length;
        // choose chapter
        ch = Math.floor(Math.random() * num_chapters);
        // find num_verses of said chapter of said book
        num_verses = arr_books[rand]['chapters'][ch].verses.length;
        // choose random verse
        ver =  Math.floor(Math.random() * num_verses);
        setBib( <h1 className='animate__animated animate__fadeInRight text-center'>{`${name} ${ch+1}:${ver+1}: ${arr_books[rand]["chapters"][ch].verses[ver].text}`}</h1>);
    }

    function handleEnter(e, num) {
        if (e.keyCode === 13 && num == 1) {
            addTask();
        }
        else if (e.keyCode == 13 && num == 0) {
            e.target.blur();
        }
    }

    // function setDrag(x) {
    //     let child = getChildInput(x);
    //     setDragging(parseInt(child.id));
    // }

    // function setDragOver(e, x) {
    //     e.preventDefault();
    //     let child = getChildInput(x);
    //     setDraggedOver(parseInt(child.id));
    // }

    // function compare(x) {
    //     const found_dragging = (ident) => ident.id === dragging;
    //     const found_draggedOver = (ident) => ident.id === draggedOver;
    //     var index1 = list.findIndex(found_draggedOver);
    //     var index2 = list.findIndex(found_dragging);
    //     let new_list = list;
    //     new_list.splice(index1, 1)
    //     new_list.splice(index2, 0, new_list[index2]["task"])
    //     setList(new_list);
    // };

    function getChildInput(x) {
        let parent = document.getElementById(x);
        var children = parent.childNodes;
        return children[1];
    }

  return (
      <div className='container'>
          <div className='left-side'>
              <h1 className='animate__animated animate__fadeInLeft'>Your Todo List</h1>
            <ul className='text-center'>
            {list.map((item) => (
                <div 
                    draggable={true}
                    // onDrag={setDrag(`div${item.id}`)}
                    // onDragOver={e => setDragOver(e, `div${item.id}`)}
                    // onDrop={compare(`div${item.id}`)}
                    className='row individTask'
                    id={`div${item.id}`}
                >
                    <button className='submit-feedback close' type="submit" onClick={() => handleDelete(item.id)}>x</button>
                    <input onKeyDown={e => handleEnter(e, 0)} id = {`${item.id}`} value = {item.task} onChange={e => handleListItemClick(e, item.id)} className = 'taskStyle' key={`task{item.id}`} />
                </div>
            ))}
            </ul>
            </div>
        <div className='right-side'>
            {bib}
            {/* <div className="quote-wrapper">
                <blockquote className="text">
                    <p>{bib}</p>
                    <footer>{bibRef}</footer>
                </blockquote>
            </div> */}
            <div className="field">
                <div className="mainBox">
                    <input 
                        value = {val} 
                        id = "task" 
                        className = "field line addTask" 
                        placeholder = "Type in your task here" 
                        onChange={handleInputChange}
                        onKeyDown={e => handleEnter(e, 1)}
                        autoComplete="off"
                    />
                    <button className='submit-feedback add' type="submit" onClick={addTask}>Add Task!</button>
                    {noTask && <p>You need to type something!</p>}
                </div>
            </div>
            
        </div>
      </div>
    
  )
}
