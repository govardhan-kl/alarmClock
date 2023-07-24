# A SET ALARM APP


### General steps to follow while creating a project are

- Thinking about the UI
- Functionality
	- Display TIME on UI
	- Create or Set an Alarm
	- When set alarm time occurs do a alert()
	- Delete the alarm
    - Make count of alarms setted
- Data
	- alarmLists - an array to store set alarm data
	- alarmLists - [{hr, minutes, sec, meridian, time, id}]
- Functions (in code)
    - displayTimes -> To display time on UI
	- addZero -> Adding zero to the time if hours/minutes are less than double digit value
    - addingAlarmToElement -> Each alarm is added to the DOM by creating new li element
    - renderAlarmList -> for rendering of each created alarm so that its displayed on UI
    - addToList -> each time new alarm clock is created its pushed to the alarmLists array
	- getTimevalue -> this is to take user input and convert it to the object as required 
	- createAlarm -> click handler function for "set alarm"
	- deleteAlarm -> click handler function for 'delete alarm'
    - handleClickListener -> calling event handlers
	- checkAlarm -> calling function whether alarms can go on or not
    - isTime -> this checks the whether alarm clock time has reached or not