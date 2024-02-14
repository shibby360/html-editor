var saveFileHandle
$('#run').click(function(ev) {
  $('#result').attr('srcdoc', editor.getValue())
})
var editor = ace.edit('indexhtml', {
  mode: "ace/mode/html",
  wrap: true,
  theme: 'ace/theme/monokai'
})
$('#openfilepicker').click(function(ev) {
  var conf = confirm('This will overwrite your current code. Continue?')
  if(!conf) {return}
  var filePick = showOpenFilePicker({
    types: [
      {
        description: "HTML files",
        accept: {
          "text/*": [".html"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  })
  filePick.then(function(fileHandleLst) {
    var fileHandle = fileHandleLst[0]
    var fileprom = fileHandle.getFile()
    fileprom.then(function(file) {
      var fr = new FileReader();
      fr.readAsText(file);
      fr.onloadend = function() {
        editor.setValue(fr.result)
      }
      saveFileHandle = fileHandle
      var permsprom = saveFileHandle.requestPermission({ mode: "readwrite" })
      $('#savebtn').show()
      $('#filename').text(file.name)
    })
  })
})
$('#savebtn').click(async function(ev) {
  $(document.body).css('cursor', 'wait')
  var writable = await saveFileHandle.createWritable()
  await writable.write(editor.getValue())
  await writable.close()
  console.log('finished saving')
  $(document.body).css('cursor', 'default')
})
$('#save-cr').click(function(ev) {
  const link = document.createElement("a");
  const downloadfile = new Blob([editor.getValue()], { type: 'text/html' });
  link.href = URL.createObjectURL(downloadfile);
  link.download = prompt('save file as(.html not needed)?: ') + '.html';
  link.click();
  URL.revokeObjectURL(link.href);
})
$('#opennewtab').click(function(ev) {
  var newtab = window.open()
  newtab.document.write(editor.getValue())
})
// var auth2 = gapi.auth2.getAuthInstance();
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}