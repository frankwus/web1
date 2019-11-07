function GetBusinessUnits() {
    $('#ClientId').on('change', function () {
        $('#BusinessUnitId').find('option:gt(0)').remove();
        $('#loadingDiv').addClass('ajax-processing');
        $.ajax({
            url: '/Admin/BusinessUnit/GetBusinessUnitsForClient',
            type: 'GET',
            data: { 'clientId': $(this).val() },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.buzListData != "" && data.buzListData != 'undefined') {
                    $.each(data, function (val, text) {
                         $('#BusinessUnitId').append($('<option></option>').val(text.Value).html(text.Text))
                    });
                    if (data.length == 1) {
                        $('#BusinessUnitId :nth-child(2)').prop('selected', true);
                        $('#BusinessUnitId').change();
                    }
                }
                $('#loadingDiv').removeClass('ajax-processing');
            },
            error: function (exception) {
                $('#loadingDiv').hide();
                alert('Failed to load business units:' + exception);
            }
        });
    })
}


$(document).ready(function () {
    GetBusinessUnits();
    // For Serach in dropdown JS Start
    if (!navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/)) {
        $("select").searchable();
        $("select").each(function () {
            $(this).parent().addClass("select-wrapper");
            $(".select-wrapper select").addClass("dynamic-select");
        });
    }
    // For Serach in dropdown JS End

})
