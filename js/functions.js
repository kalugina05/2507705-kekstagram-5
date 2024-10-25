const lineLength = function(line, linelength){
  return line.length <= linelength;
};

lineLength('проверка', 10);

const isPalindrome = function(line){
  const editedLine = (line.replaceAll(' ','')).toLowerCase();
  let newLine = '';
  for (let i = editedLine.length - 1; i >= 0; i--){
    newLine += editedLine[i];
  }
  return (editedLine === newLine);
};

isPalindrome('тОп от');

const isWorkMeeting = function(startWorkingDay, endWorkingDay, startMeeting, meetingTime){
  const timeToMinutes = function(time){
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startWorkingDayInMinutes = timeToMinutes(startWorkingDay);
  const endWorkingDayInMinutes = timeToMinutes(endWorkingDay);
  const startMeetingInMinutes = timeToMinutes(startMeeting);

  const endMeetingInMinutes = startMeetingInMinutes + meetingTime;

  return startMeetingInMinutes >= startWorkingDayInMinutes && endMeetingInMinutes <= endWorkingDayInMinutes;
};

isWorkMeeting('08:00', '17:30', '14:00', 90);
