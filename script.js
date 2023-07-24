const timeElement = document.getElementById('displayTime'); // this gets the diaplay time elemt for displaying current time
const hourElement = document.getElementById('selectHrs'); // this is used to get the user input for hrs
const minsElement = document.getElementById('selectMins'); // this is used to get the user input for mins
const secsElement = document.getElementById('selectsecs'); // this is used to get the user input for secs
const selectAMPM = document.getElementById('selectAMPM'); // this is used to get the user input for meridian
const submitAlarm = document.getElementById('submitAlarm') // this is used to set the alarm
const tasksList = document.getElementById('list'); // this is to display the created alarms on DOM
const appName = document.getElementById('appName'); //getting appname div to add event listenres of mouse over and out
let alarmLists = [] //this is to store created alarms data


function displayTimes(){ // To display time on UI
    setInterval(function(){
        const date = new Date().toLocaleTimeString();
        var arr = date.split(" "); //splitting the date to seperate TIME and AM/PM
        var time = arr[0].split(":"); //Further splitting time into hours minutes seconds

        timeElement.querySelector('h1').innerText = addZero(time[0])+":"+time[1]+":"+time[2]+" "+arr[1] //Updating the time every seconds to the home page
    },100)
}


function addZero(cur){ //this functions helps in adding zero to the time if hours/minutes are less than double digit value
    if (cur.length>2){ return "100"} //this handles if we give very high number as more than 2 digit ex: if we give mins/hr/secs as 123, which is not a valid time
    if(cur.length == 2){return cur} //this handles for predefined values, so that no extra zeros are added
    return (cur < 10) ? "0" + cur : cur; // this handles for single digits
}


function isTime(ele){ //this checks the whether alarm clock time has reached or not
    let currentTimeAMPM = new Date().toLocaleTimeString(); //this gets the current running time, used to compare for set alarm time
    if (currentTimeAMPM.length == 10){
        currentTimeAMPM = "0"+currentTimeAMPM
    }
    if (ele.time == currentTimeAMPM){
        return true
    }
    return false
}


function checkAlarm(){ //this will be checking the isTime() for every alarm created
    setInterval(function(){
        for(let j of alarmLists){
            if(isTime(j)){ //if settted alarm clock has reached its time then alert() is called
                alert(`${j.hr}:${j.mn}:${j.sec} ${j.mer} has reached`) 
            }
        }
    },1)
}


function addingAlarmToElement(list){ //Each alarm is added to the DOM by creating new <li> element
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
        <p>${list.hr}:${list.mn}:${list.sec} ${list.mer}</p>
        </div>
        <div class="deleteDiv">
        <img src="./css/assets/bin.png" class="delete" data-id="${list.id}"/>
        </div>
        `;
    tasksList.append(li); //adding created <li> element to the <ul> element
}


function renderAlarmList(){ //for rendering of each created alarm so that its displayed on UI
    tasksList.innerHTML = '';//we are removing created <li> each time so that no duplicates are rendered on UI
    for(let i=0 ; i<alarmLists.length; i++){
        addingAlarmToElement(alarmLists[i])
    }
    document.getElementById('count').innerHTML= alarmLists.length // this is just to see how many laarms are created
}


function addToList(data){ //each time new alarm clock is created its pushed to the alarmLists array
    alarmLists.push(data)
    renderAlarmList()
}


function getTimevalue(){ //this is to take user input and convert it to the object as required
    var hr = addZero(hourElement.value);
    var mn = addZero(minsElement.value);
    var sec = addZero(secsElement.value);
    var mer = selectAMPM.value;
    
    // if condition only works if we give correct user input time or else it says to enter time correctly
    if (Number(hr)<=12 && Number(hr)>=1 && Number(mn)<=59 && Number(mn)>=0 && Number(sec)<=59 && Number(sec)>=0){
        return {hr,mn,sec,mer,time:`${hr}:${mn}:${sec} ${mer}`,id:Date.now()};//creating an object and returning the object
    }
    alert('Enter correct time');
    return 
}


function createAlarm(){// this is a click handler function for "set alarm"
    var data = getTimevalue();// this gets the user input data as object

    if (data){ //if we get valid data we send the data to addToList function.
        addToList(data);
    }
    else{
        console.log('Enter time correctly')
    }
}


function deleteAlarm(taskId){ // this is a click handler function for 'delete alarm'
    //for each ele in 'alarmLists' array we apply filter which return a new array/list not cotaing the element which we clicked
    const newTask = alarmLists.filter(function(eachele){
        return eachele.id !== taskId
    })
    alarmLists = newTask;
    renderAlarmList(); // we render it again bcoz so deletion is shown on UI
}


function handleClickListener(){ //click handler function
    submitAlarm.addEventListener('click',function(){ //for 'set alarm'
        createAlarm()
    })
    document.addEventListener('click',function(e){ //for 'delete alarm'
        const target = e.target;
        //console.log(target);
        if (target.className === 'delete'){
            deleteAlarm(Number(target.dataset.id));
            return;
        }
    })
}

appName.addEventListener('mouseover',function(){ //adding a class '.fa-bell' when overed over appname
    let i = document.querySelector(".fa-bell");
    i.classList.add('fa-shake')
})
appName.addEventListener('mouseout',function(){ //removing a class '.fa-bell' when overed out of appname
    let i = document.querySelector(".fa-bell");
    i.classList.remove('fa-shake')
})

displayTimes() //to display time on UI
handleClickListener();//calling event handlers
checkAlarm()//calling  function whether alarms can go on or not