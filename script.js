$('#run').click(function() {
    var b64 = btoa($('#index.html').val())
    $('#result').attr('src', b64)
})