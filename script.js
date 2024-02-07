$('#run').click(function() {
    var b64 = btoa($('#index.html').val())
    $('#result').attr('src', 'data:text/html;base64,' + b64)
})