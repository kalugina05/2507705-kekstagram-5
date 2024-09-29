function lineLength(line, maxLength){
  return (line.length <= maxLength);
}

function isPalindrome (line){
  let editedLine = (line.replaceAll(' ','')).toLowerCase();
  let newLine = '';
  for (let i = editedLine.length - 1; i >= 0; i--){
    newLine += editedLine[i];
  }
  return (editedLine === newLine);
}
