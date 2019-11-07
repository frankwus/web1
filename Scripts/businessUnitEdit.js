function GetBusinessUnits() {
    $('#ClientId').on('change', function () {
        $('#ParentBusinessUnitId').find('option:gt(0)').remove();
        $('#loadingDiv').addClass('ajax-processing');
        $.ajax({
            url: '/Admin/BusinessUnit/GetBusinessUnitsForClient',
            type: 'GET',
            data: { 'clientId': $(this).val() },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.buzListData != "" && data.buzListData != 'undefined') {
                    $.each(data, function (val, text) {
                        //If condition is to stop assigning self parent
                        if (text.Value != $('#id').val()) {
                            $('#ParentBusinessUnitId').append($('<option></option>').val(text.Value).html(text.Text))
                        }
                    });
                    if (data.length == 1) {
                        $('#ParentBusinessUnitId :nth-child(2)').prop('selected', true);
                        $('#ParentBusinessUnitId').change();
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

function GetStateDropdown() {
    $.ajaxSetup({
        async: false
    });

    $.getJSON("/Admin/BusinessUnit/GetState", {
        Country: $('#CountryId').val()
    },
   function (GetStateModel) {
       $("#StateId").empty();
       $.each(GetStateModel, function (i, statedatat) {
           $("#StateId").append('<option value="' + statedatat.Value + '">' +
                statedatat.Text + '</option>');
       });
   });

    if (($('#StateId > option').length == 1 || $('#StateId > option').length == 0)
      && $('#CountryId').val() != "") {
        $('#StateId > option').prop('disabled', true);
        $('#StateId').addClass('disabled-color');
        $("#StateId").append('<option value="' + -1 + '">' +
            '--No States Available--' + '</option>');
    }
    else {
        $('#StateId > option').prop('disabled', false);
        $('#StateId').removeClass('disabled-color');
        $("#StateId option[value='-1']").remove();
        $("#StateId option[value='']").remove();
        if ($('#CountryId').val() == "") {
            $("#StateId").append('<option value="">--Select State--</option>');
        }
    }
}

function ShowPreferenceSetDetails(Id) {
    $(".t-window-title").text("Preference Set Details : Preference Set " + Id);
    $('#PreferenceDetailsDiv').css("text-align", "center");
    $('#PreferenceDetailsDiv').html("<img style ='padding-top:200px;' src='/Administration/Images/ajax-loader.gif' />");
    $('#PreferenceDetails').data('tWindow').restore();
    $('#PreferenceDetails' + ' .t-content').css('height', '400px');
    $('#PreferenceDetails' + ' .t-content').css('width', '400px');
    $('#PreferenceDetails').data("tWindow").center().open();

    $.ajax({
        type: "GET",
        url: "/BusinessUnit/GetPreferenceSetDetails",
        data: { 'preferenceSetId': Id },
        success: function (data) {
            $('#PreferenceDetailsDiv').attr("style", "");
            $('#PreferenceDetailsDiv').html(data);
        },
        error: function (data) {
            $('#PreferenceDetails').data("tWindow").close();
            alert(data);
        }
    });
}

function ConfigureForecast(Id, businessUnitName) {
    $(".t-window-title").text("Configure Forecast : " + businessUnitName);
    $('#forecastConfigureDiv').css("text-align", "center");
    $('#forecastConfigureDiv').html("<img style ='padding-top:200px;' src='/Administration/Images/ajax-loader.gif' />");
    $('#forecastConfigure').data('tWindow').restore();
    $('#forecastConfigure' + ' .t-content').css('height', '400px');
    $('#forecastConfigure' + ' .t-content').css('width', '400px');
    $('#forecastConfigure').data("tWindow").center().open();
   
    $.ajax({
        type: "GET",
        url: "/BusinessUnit/ConfigureForecast",
        data: { 'businessUnitId': Id },
        success: function (data) {
            $('#forecastConfigureDiv').attr("style", "");
            $('#forecastConfigureDiv').html(data);
        },
        error: function (data) {
            $('#forecastConfigure').data("tWindow").close();
            alert(data);
        }
    });
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

    $('#CountryId').change(function () {
        GetStateDropdown();
    });

    $('#btnSaveForecastConfiguration').on('click', function () {
        var Id = $("#id").val();
        var name = $('#BusinessUnitName').val();
        ConfigureForecast(Id, name);
    });

    $("#DefaultUnitId").change(function () {
        var Id = $("#DefaultUnitId").val();
        //debugger;
        if (Id == "0" || Id == "") {
            $('#btnPrefDetails').attr('disabled', 'true');
        }
        else {
            $('#btnPrefDetails').removeAttr('disabled');
        }

    });

    $('#btnPrefDetails').on('click', function () {
        var Id = $("#DefaultUnitId").val();
        ShowPreferenceSetDetails(Id);
    });

    $(document).on('click', '#btnSaveConfigureForecast', function (event) {
        $('#configureForecastError').hide();
        var oldCounterpartytId = $('#OldCounterpartyId').val();
        var oldAccountId = $('#OldAccountId').val();
        var newAccountId = $('#AccountId').val();
        var newCounterpartyId = $('#CounterpartyId').val();

        if (oldAccountId != '' || oldCounterpartytId != '') {
            if ((newAccountId == '' || newCounterpartyId == '') || (newAccountId == undefined || newCounterpartyId == undefined)) {
                event.preventDefault();
                $('#configureForecastError').show();
                $('#configureForecastError').text('Once configured Account and Counterpty cannot be set to null.');
            }
        }

        else if ((newAccountId != '' && newCounterpartyId == '') || (newCounterpartyId != '' && newAccountId == '')) {
            event.preventDefault();
            $('#configureForecastError').show();
            $('#configureForecastError').text('Both counterparty and account needs to be configured.');
        }

    });
});