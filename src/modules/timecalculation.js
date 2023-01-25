const getTimeSpent = (firstTime, secondTime) => {
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
  const hourModifier = `${convertedTime[0] > 1 ? "hrs" : "hr"}`;
  const minModifier = `${convertedTime[1] > 1 ? "mins" : "min"}`;
  if (convertedTime[0] > 0) {
    if (convertedTime[1] > 0) {
      return `${convertedTime[0]}  ${hourModifier} ${convertedTime[1]} ${minModifier}`;
    }
    return `${convertedTime[0]} ${hourModifier}`;
  }

  if (convertedTime[1] > 0) {
    return `${convertedTime[1]} ${minModifier}`;
  }
};

function convertDate(date) {
  // converts date to conform to format of date input field
  date = new Date(date);
  let month =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  date = `${date.getFullYear()}-${month}-${date.getDate()}`;
  return date;
}
export {
  validateTimeInputs,
  validateDateInputs,
  getTimeSpent,
  convertTime,
  convertTimeToString,
  convertDate,
};
