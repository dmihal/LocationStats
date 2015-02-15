function loadJSON(filename)
{
  var request = new XMLHttpRequest();
  request.open('GET', filename, false);
  request.send(null);
  obj = JSON.parse(request.responseText);
  return obj;
}
function unCapitalize(str)
{
  return str.charAt(0).toLowerCase() + str.slice(1);
}
