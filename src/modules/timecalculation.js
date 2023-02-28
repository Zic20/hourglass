const getTimeDifference = (firstTime, secondTime) => {
  let startTime = new Date();
  let endTime = new Date();

  startTime.setHours(firstTime.split(":")[0], firstTime.split(":")[1], 0);
  endTime.setHours(secondTime.split(":")[0], secondTime.split(":")[1], 0);

  let hoursDifference = endTime.getHours() - startTime.getHours();
  let minutesDifference = endTime.getMinutes() - startTime.getMinutes();

  if (hoursDifference < 1) {
    if (minutesDifference > 0) {
      return `${minutesDifference}  ${minutesDifference > 1 ? "mins" : "min"}`;
    }
    return "";
  } else {
    if (minutesDifference > 0) {
      if (hoursDifference > 0 && minutesDifference > 0) {
        return `${hoursDifference} ${
          hoursDifference > 1 ? "hrs" : "hr"
        }  ${minutesDifference} ${minutesDifference > 1 ? "mins" : "min"}`;
      }
      return "";
    } else {
      if (minutesDifference < 0) {
        if (hoursDifference > 0) {
          hoursDifference -= 1;
          minutesDifference += 60;
        }
      }

      let hourString = `${
        hoursDifference > 0
          ? hoursDifference + `${hoursDifference > 1 ? "hrs" : "hr"}`
          : ""
      }`;

      let minutesString = `${
        minutesDifference > 0
          ? minutesDifference + `${minutesDifference > 1 ? "mins" : "min"}`
          : ""
      }`;
      return `${hourString} ${minutesString}`;
    }
  }
};

const validateTimeInputs = (startTime, endTime) => {
  let firstTime = new Date();
  let secondTime = new Date();
  firstTime.setHours(startTime.split(":")[0], startTime.split(":")[1], 0);
  secondTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);
  if (firstTime.getHours() > secondTime.getHours()) {
    return false;
  }
  return true;
};

const validateDateInputs = (startDate, endDate) => {
  let firstDate = new Date(startDate);
  let secondDate = new Date(endDate);

  return !firstDate.getMilliseconds() > secondDate.getMilliseconds();
};

const convertTime = (time) => {
  let convertedTime = time.split(":");
  if (convertedTime[0] > 12) {
    return `${convertedTime[0] - 12}:${convertedTime[1]} PM`;
  } else if (convertedTime[0] === "00") {
    return `12:${convertedTime[1]} AM`;
  } else {
    return `${time} AM`;
  }
};

const convertTimeToString = (time) => {
  let convertedTime = time.split(":");
  const modifiedHour = `${convertedTime[0] > 1 ? "hrs" : "hr"}`;
  const modifiedMinute = `${convertedTime[1] > 1 ? "mins" : "min"}`;
  if (convertedTime[0] > 0) {
    if (convertedTime[1] > 0) {
      return `${convertedTime[0]}  ${modifiedHour} ${convertedTime[1]} ${modifiedMinute}`;
    }
    return `${convertedTime[0]} ${modifiedHour}`;
  }

  if (convertedTime[1] > 0) {
    return `${convertedTime[1]} ${modifiedMinute}`;
  }

  return " ";
};

function convertDate(date) {
  date = new Date(date);
  let month =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  date = `${date.getFullYear()}-${month}-${day}`;
  return date;
}

export function totalTime(dataset) {
  // Todo: Complete function for calculating total time for a dataset that contains hours
  let totalHours = 0;
  let totalMinutes = 0;
  dataset.forEach((data) => {
    let time = data.split(":");
    totalHours += +time[0];
    totalMinutes += +time[1];
  });

  if (totalMinutes > 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = Math.abs(totalMinutes / 60);
  }

  return `${totalHours}:${totalMinutes}`;
}

export {
  validateTimeInputs,
  validateDateInputs,
  getTimeDifference,
  convertTime,
  convertTimeToString,
  convertDate,
};
