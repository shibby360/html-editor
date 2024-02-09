$('#run').click(function(ev) {
  console.log($('#indexhtml').val())
  $('#result').attr('srcdoc', editor.getValue())
})
var editor = ace.edit('indexhtml', {
  mode: "ace/mode/html",
  wrap:true,
  theme:'ace/theme/monokai'
})
$('#openfile').change(function(ev) {
  function receivedText() {
    editor.setValue(fr.result)
  }
  var fr = new FileReader()
  fr.onload = receivedText
  fr.readAsText(ev.target.files[0])
})
var auth2 = gapi.auth2.getAuthInstance();
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}