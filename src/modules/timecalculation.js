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
      if (hoursDifference > 0) {
        return `${hoursDifference}  ${hoursDifference > 1 ? "hrs" : "hr"}`;
      }
      return "";
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

export { getTimeSpent };
export { validateTimeInputs };
