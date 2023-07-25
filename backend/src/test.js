let input_array =  [
  { "id": 1, "textTask": "Shopping", "priority": 5, "duree": 30 },
  { "id": 2, "textTask": "Cleaning", "priority": 3, "duree": 60 },
  { "id": 3, "textTask": "Work", "priority": 8, "duree": 120 },
  { "id": 4, "textTask": "Exercise", "priority": 2, "duree": 45 },
  { "id": 5, "textTask": "Leisure", "priority": 6, "duree": 90 },
  { "id": 6, "textTask": "Communication", "priority": 4, "duree": 15 },
  { "id": 7, "textTask": "Meeting", "priority": 7, "duree": 60 },
  { "id": 8, "textTask": "Finance", "priority": 5, "duree": 30 },
  { "id": 9, "textTask": "Planning","duree": 180, "start_at": "09:00" },
  { "id": 10, "textTask": "Project", "priority": 6, "duree": 120 },
  { "id": 11, "textTask": "Fitness", "priority": 3, "duree": 60 },
  { "id": 12, "textTask": "Presentation", "priority": 8, "duree": 90 },
  { "id": 13, "textTask": "Pet Care", "priority": 2, "duree": 30 },
  { "id": 14, "textTask": "Education", "priority": 7, "duree": 120 },
  { "id": 15, "textTask": "Cooking", "priority": 5, "duree": 45 },
  { "id": 16, "textTask": "Writing", "priority": 6, "duree": 60 },
  { "id": 17, "textTask": "Social", "priority": 4, "duree": 30 },
  { "id": 18, "textTask": "Organization", "priority": 8, "duree": 90 },
  { "id": 19, "textTask": "Laundry", "priority": 3, "duree": 45 },
  { "id": 20, "textTask": "Webinar", "priority": 7, "duree": 60 },
  { "id": 21, "textTask": "Gifts", "priority": 6, "duree": 30 },
  { "id": 22, "textTask": "Research", "priority": 5, "duree": 60 },
  { "id": 23, "textTask": "Hobbies", "priority": 4, "duree": 45 },
  { "id": 24, "textTask": "Lunch", "priority": 7, "duree": 30 },
  { "id": 25, "textTask": "Car Maintenance", "priority": 8, "duree": 60 },
  { "id": 26, "textTask": "Programming", "priority": 6, "duree": 120 },
  { "id": 27, "textTask": "Nature", "priority": 3, "duree": 45 },
  { "id": 28, "textTask": "Learning", "priority": 7, "duree": 90 },
  { "id": 29, "textTask": "Rent", "priority": 5, "duree": 30 },
  { "id": 30, "textTask": "Recipes", "priority": 9, "duree": 60 },
  { "id": 31, "textTask": "meeting", "duree": 30, "start_at": "11:00" },

]

let START_TASKS = "08:00" 
let END_TASKS = "17:00"
let TASKS = input_array;
let OUTPUT = [];
let NEXT_DAY_TASKS = [];



function convert_to_minutes(time) {
  let [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function convert_to_time_format(duree) {
  let hours = String(Math.floor(duree / 60));
  let minutes = String(duree % 60);
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}

function solve() {
  let booked_time = [["12:00", "13:00"]];
  for (let task of TASKS) {
    if ("start_at" in task) {
      let start_time = task["start_at"];

      let end_time = convert_to_time_format(
        convert_to_minutes(start_time) + task["duree"]
      );
      booked_time.push([start_time, end_time]);
      
      task["end_at"] = end_time;
      OUTPUT.push(task);
    }
  }

  TASKS = TASKS.filter((task) => !("start_at" in task));

  booked_time.sort(
    (time1, time2) =>
      convert_to_minutes(time1[0]) - convert_to_minutes(time2[0])
  );

  let available_time = [];
  let next_starting_available_time = START_TASKS;

  for (let i = 0; i < booked_time.length; i++) {
    if (
      convert_to_minutes(next_starting_available_time) < convert_to_minutes(booked_time[i][0])
    ) {
      available_time.push([
        next_starting_available_time,
        booked_time[i][0],
      ]);
    }
    next_starting_available_time = booked_time[i][1];
  }
  if (next_starting_available_time < END_TASKS) {
    available_time.push([next_starting_available_time, END_TASKS]);
  }

  TASKS.sort((task1, task2) => task1["priority"] - task2["priority"]);

  for (let task of TASKS) {
    for (let time of available_time) {
      if (
        convert_to_minutes(time[1]) - convert_to_minutes(time[0]) >= task["duree"]
      ) {
        task["start_at"] = time[0];
        task["end_at"] = convert_to_time_format(
          convert_to_minutes(task["start_at"]) + task["duree"]
        );
        OUTPUT.push(task);
        time[0] = task["end_at"];
        break;
      }
    }
    if (!task["start_at"]) {
      NEXT_DAY_TASKS.push(task);
    }
  }
  OUTPUT.sort(
    (task1, task2) =>
      convert_to_minutes(task1["start_at"]) -
      convert_to_minutes(task2["start_at"])
  );

  console.log(OUTPUT);
}

solve();
