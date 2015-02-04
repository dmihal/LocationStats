var worker = new Worker('workers/master.js');
worker.addEventListener('message', function(e) {
  if (actions[e.data.cmd]){
    actions[e.data.cmd](e.data)
  }
});
var actions = {
  status: function(data){
    document.querySelector("#status").innerText += data.msg + '\n';
  },
  progress: function(data){
    document.querySelector("#task").innerText = data.task;
    document.querySelector("#progress progress").value = data.val;
    document.querySelector("#progress progress").max = data.max;
  }
}

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
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

  // Read in the image file as a data URL.
  //reader.readAsDataURL(f);
};


document.getElementById('files').addEventListener('change', handleFileSelect, false);
