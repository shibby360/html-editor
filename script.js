var saveFileHandle
$('#run').click(function(ev) {
  console.log($('#indexhtml').val())
  $('#result').attr('srcdoc', editor.getValue())
})
var editor = ace.edit('indexhtml', {
  mode: "ace/mode/html",
  wrap:true,
  theme:'ace/theme/monokai'
})
$('#openfilepicker').click(function(ev) {
  var filePick = showOpenFilePicker()
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
    })
  })
})
$('#savebtn').click(function(ev) {
  fileHandle.requestPermission({ mode: "readwrite" });
})
var auth2 = gapi.auth2.getAuthInstance();
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}