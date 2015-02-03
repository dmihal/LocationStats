var worker = new Worker('workers/master.js');

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  worker.postMessage({
    cmd: 'load',
    files: files
  });

  output = [];
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    var reader = new FileReader();
    reader.readAsText(f);
    reader.onloadend = function(){
      readXML(reader.result);
    };
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

  // Read in the image file as a data URL.
  //reader.readAsDataURL(f);
};
function readXML(xmlStr){
  var parser = new window.DOMParser();

  var xml = parser.parseFromString(xmlStr, "text/xml");
  console.log(xml);
};

document.getElementById('files').addEventListener('change', handleFileSelect, false);
