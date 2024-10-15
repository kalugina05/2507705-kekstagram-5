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
