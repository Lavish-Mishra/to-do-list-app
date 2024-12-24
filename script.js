const inputbox = document.getElementById("input");
const listcontainer = document.getElementById("list-container");


function addTask() {
    const numOfLis = document.querySelectorAll("li").length;
    if (inputbox.value === ''){
        alert("You must write something");
    }
    else{
        var datas = JSON.parse(localStorage.getItem('data'));
        var i;
        var v=false;
        if(datas === null){
            v=false;    
        }
        else{
            for(i=0; i < datas.length; i++) {
                if(inputbox.value == datas[i][0]){
                    if(datas[i][1] == false) {
                        v = true;
                        break;
                    }
                }
            }
        }

        if(v) {
            alert("Task is already listed!");
        }
        else{
            let li = document.createElement("li");
            li.classList.add("checkbox-wrapper");

            let li_input = document.createElement("input");
            li_input.type = "checkbox";
            li_input.classList.add("checkbox");
            li_input.id = numOfLis + 1;
            li_input.name = "r";
            li_input.value = inputbox.value;
            li_input.onchange = function() {
                var c_data = JSON.parse(localStorage.getItem('data'));
                var i;
                for(i=0; i < c_data.length; i++) {
                    if(inputbox.value == c_data[i][0]){
                        if(c_data[i][1] == false) {
                            c_data[i][1] = true;
                            break;
                        }
                        else{
                            c_data[i][1] = false;
                            break;
                        }
                    }
                }
                let string = JSON.stringify(c_data);
                localStorage.setItem("data",string); 
            };
            
            let li_label = document.createElement("label");
            li_label.htmlFor = numOfLis + 1;
            li_label.classList.add("labels");
            li_label.innerHTML = inputbox.value;
            

            let span = document.createElement("button");        
            span.innerHTML = "\u00d7";
            span.classList.add("li_button");
            span.onclick = function() {
                var pli = this.parentElement;
                pli.remove();
                saveData();
            };
            
            li.appendChild(li_input);
            li.appendChild(li_label);
            
            li.appendChild(span);
            listcontainer.appendChild(li);
            saveData();
        }
    } 
    inputbox.value = "";
}


function saveData(){
    var labels = document.getElementsByClassName("checkbox");
    var data = [];
    var i;
    for(i=0; i < labels.length; i++) {   
        var dat = [];
        var st = labels[i].value;
        console.log(st);
        dat.push(st,labels[i].checked);
        data.push(dat);
    }
    
    let string = JSON.stringify(data);
    localStorage.setItem("data",string);   
}

function displayTask() {
    var arr = JSON.parse(localStorage.getItem('data'));
    if(arr===null){
        true;
    }
    else{
        var i;
        for(i=0; i < arr.length; i++) {
            let li = document.createElement("li");
            li.classList.add("checkbox-wrapper");

            let li_input = document.createElement("input");
            li_input.type = "checkbox";
            li_input.classList.add("checkbox");
            li_input.id = i + 1;
            li_input.name = "r";
            li_input.value = arr[i][0];
            li_input.checked = arr[i][1];

            li_input.onchange = function() {
                var c_data = JSON.parse(localStorage.getItem('data'));
                var i;
                for(i=0; i < c_data.length; i++) {
                    if(li_input.value == c_data[i][0]){
                        if(c_data[i][1] == false) {
                            c_data[i][1] = true;
                            break;
                        }
                        else{
                            c_data[i][1] = false;
                            break;
                        }
                    }
                }
                let string = JSON.stringify(c_data);
                localStorage.setItem("data",string); 
            };

            let li_label = document.createElement("label");
            li_label.htmlFor = i + 1;
            li_label.classList.add("labels");
            li_label.innerHTML = arr[i][0];

            let span = document.createElement("button");        
            span.innerHTML = "\u00d7";
            span.classList.add("li_button");
            span.onclick = function() {
                var pli = this.parentElement;
                pli.remove();
                saveData();
            };
            
            li.appendChild(li_input);
            li.appendChild(li_label);
            
            li.appendChild(span);
            listcontainer.appendChild(li);
        }
        saveData();
    }
    
}
displayTask();