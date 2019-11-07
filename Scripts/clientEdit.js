var fileError = '';
function onSelect(e) {
    // Array with information about the uploaded files
    var files = e.files;

    $(files).each(function (index) {
        var extension = $(this)[0].extension;
        var validFileTypes = $('#ValidFileType').val().toLowerCase().split(',');
        if ($.inArray(extension.toLowerCase(), validFileTypes) == -1) {
            $("#FileErrorMessage").text("Please upload " + validFileTypes + " file.");
            fileError = 'Error'
        }
        else {
            $("#FileErrorMessage").text("");
            fileError = '';
        }
    });

}

$(document).ready(function () {
    $("#file").closest(".t-upload-button").find("span").text("Choose file.");

    $('#btnSubmit').on('click', function (e) {
        if ($('#Id').val() == "0" && $('.t-upload-files').length == 0) {
            $("#FileErrorMessage").text("Please select Term Sheet.");
            fileError = 'Error';
        }
        else {
            $("#FileErrorMessage").text("");
            fileError = '';
        }

        if (fileError == 'Error') {
            e.preventDefault();
        }

       
    })
});