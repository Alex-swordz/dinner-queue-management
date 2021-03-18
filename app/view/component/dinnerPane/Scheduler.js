//TaskSettings = [{peopleNum,maxTaskNum}];
//peopleNum表示几人桌,maxTaskNum表示这家店有多少个这样的桌子
const letterStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const moment = require('moment');
//从数组中随机取出元素,N不能大于数组的长度
function getRandomArrayElements(arr, N) {
  let indexArray = [];
  arr = arr || [];
  N = N || 0;
  if (arr.length === 0) {
    return [];
  }
  let max = arr.length - 1;
  let min = 0;
  for (let i = 0; i < N; i++) {
    let randomIndex = parseInt(Math.random() * (max - min + 1)) + min; //取随机数组索引值
    while (indexArray.includes(randomIndex)) {
      randomIndex = parseInt(Math.random() * (max - min + 1)) + min;
    }
    indexArray.push(randomIndex);
  }

  let randomArray = indexArray.map(index => arr[index]);
  return randomArray;
}

class Scheduler {
  constructor(TaskSettings) {
    if ((TaskSettings||[]).length > 0) {
      this.taskMapper = {};
      for (const item of TaskSettings) {
        let { peopleNum, maxExecutingNum } = item;
        if (peopleNum <= 0) {
          continue;
        }
        let taskObj = {
          tasks: [],
          taskIdMapper: [],
          executingTasks: [],
          maxTaskNum: maxExecutingNum,
          peopleNum: peopleNum,
          idList: []
        };

        let letter = letterStr.substr(peopleNum-1,1);
        for (let i = 1; i <= maxExecutingNum; i++) {
          let idStr = letter + (i.toString().length<2 ? '0'+i : i);
          taskObj.idList.push(idStr);
        }
        this.taskMapper['peopleNum_'+peopleNum] = taskObj;
      }
    } else {
      this.tasks = []; //待执行的任务
      this.executingTasks = []; //正在执行的任务数
      this.maxTaskNum = maxTaskNum;  //最大执行任务数
    }
  }

  getTaskId(idList){
    let taskId = (getRandomArrayElements(idList, 1))[0];
    idList.splice(idList.findIndex(id => id === taskId), 1);

    return taskId;
  }

  generateTask(promiseMaker, peopleNum){
    let taskObj = this.taskMapper['peopleNum_'+peopleNum];
    //从生成的数据中随机拿一个id编号出来
    let taskId = this.getTaskId(taskObj.idList);

    return {
      id: taskId,
      peopleNum: peopleNum,
      promise: promiseMaker
    };
  }

  add(promiseMaker, peopleNum) {
    let task = this.generateTask(promiseMaker, peopleNum);
    let taskObj = this.taskMapper['peopleNum_'+peopleNum];

    if (taskObj.executingTasks.length < taskObj.maxTaskNum) {
      this.run(task, peopleNum);
    } else {
      let i=0;
      while (taskObj.taskIdMapper[i]) {
        i++;
      }
      taskObj.taskIdMapper[i] = 1;
      let newIndex = i;

      let newTaskId = 'Z' + letterStr[peopleNum-1] + (
        newIndex.toString().length === 1 ? '0'+newIndex : newIndex);
      task.id = newTaskId;
      taskObj.tasks.push(task);
    }

    return task.id;
  }

  run(task, peopleNum) {
    let taskObj = this.taskMapper['peopleNum_'+peopleNum];
    let arrayLength = taskObj.executingTasks.push(task);
    let index = arrayLength - 1;
    task.promise(peopleNum, task.id).then(() => {
      this.finishRun(index, task, taskObj);
    })
  }

  finishRun(runTaskIndex, runTask, taskObj) {
    taskObj.executingTasks.splice(runTaskIndex, 1);
    //归还id编号
    taskObj.idList.push(runTask.id);
    if (taskObj.tasks.length > 0) {
      let newTask = taskObj.tasks.shift();
      let taskId = newTask.id;
      let i = Number(taskId.substr(2));
      taskObj.taskIdMapper[i] = 0;
      newTask.id = this.getTaskId(taskObj.idList);
      this.run(newTask, newTask.peopleNum);
    }
  }

  getPeopleNumByDeskId(deskId) {
    let deskLetterNum = deskId[0] !== 'Z' ? deskId[0] : deskId[1];
    return letterStr.indexOf(deskLetterNum) + 1;
  }

  remove(deskId) {
    let peopleNum = this.getPeopleNumByDeskId(deskId);
    if (peopleNum <= 0) {
      return;
    }
    let taskObj = this.taskMapper['peopleNum_'+peopleNum];
    let executingIndex = taskObj.executingTasks.findIndex(item => item.id === deskId);
    if (executingIndex >= 0) {
      this.finishRun(executingIndex, { id: deskId }, taskObj);
    }
  }

  //获取现在排在前面的桌子数目
  show(deskId){
    let peopleNum = this.getPeopleNumByDeskId(deskId);
    if (peopleNum <= 0) {
      return null;
    }

    let taskObj = this.taskMapper['peopleNum_'+peopleNum];
    if (!taskObj) {
      return null;
    }

    let index = taskObj.tasks.findIndex(item => item.id === deskId);
    let executingIndex = taskObj.executingTasks.findIndex(item => item.id === deskId);
    let executingTaskNum = taskObj.executingTasks.length;
    // console.log(`您的${peopleNum}人桌编号为${deskId},有${executingTaskNum}桌在吃`);
    // console.log(`排在您前面的还有${index}桌`);
    let isExist = index >=0 || executingIndex >=0;

    return {
      peopleNum: peopleNum,
      preTaskNum: index,
      isExist: isExist,
      executingTaskNum: executingTaskNum,
      executingIndex: executingIndex
    };
  }

  //获取任务映射管理数据
  getTaskMapper() {
    return this.taskMapper;
  }
}

export default Scheduler;