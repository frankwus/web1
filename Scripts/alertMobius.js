$(document).ready(function () {

    $('#TargetAlertStartDate').prop('readOnly', true);
    $('#TargetAlertEndDate').prop('readOnly', true);
    $('#StopAlertStartDate').prop('readOnly', true);
    $('#StopAlertEndDate').prop('readOnly', true);

    GetBusinessUnits();

    StartDatePicker();

    HideStopAlertOnNotifyAlertType();

    ValidateStopAlert();

    enableDisableQuantity();

    savePartialFillValidation();

    ShowStopAlertSection();
})


function GetBusinessUnits() {
    $('#ClientId').on('change', function () {
        $('#BussinessUnitId').find('option:gt(0)').remove();
        $.ajax({
            url: '/Admin/Alert/GetBusinessUnitsForClient',
            type: 'GET',
            data: { 'clientId': $(this).val() },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.buzListData != "" && data.buzListData != 'undefined') {
                    $.each(data, function (val, text) {
                        $('#BussinessUnitId').append($('<option></option>').val(text.Value).html(text.Text))
                    });
                    if (data.length == 1) {
                        $('#BussinessUnitId :nth-child(2)').prop('selected', true);
                        $('#BussinessUnitId').change();
                    }
                }
            },
            error: function (exception) {
                alert('Failed to load business units:' + exception);
            }
        });
    })
}

function StartDatePicker() {
    $('.Startpicker').datepicker({
        showOn: "button",
        buttonImage: "/Administration/Content/images/calendar.png",
        buttonImageOnly: "true",
        buttonText: "Open the calendar",
        changeMonth: true,
        changeYear: true,
        dateFormat: 'mm/dd/yy',
        minDate: 0
    });
}

function HideStopAlertOnNotifyAlertType() {
    $('#TargetAlertTypeId').on('change', function () {
        if ($(this).val() == 'Notify') {
            $('#StopAlertSection').hide();
            $('#IsNoStopAlert').val(true);
            if ($('#addStopAlert').length) {
                $('#addStopAlert').hide();
                $('#StopAlertSectionHidden').hide()
            }
        }
        else {
            $('#StopAlertSection').show();
            if ($('#addStopAlert').length) {
                $('#addStopAlert').show();
                $('#addStopAlert').val('Add Stop Alert');
            }
        }
    });

    if ($('#TargetAlertTypeId').val() == 'Notify') {
        $('#StopAlertSection').hide();
        if ($('#addStopAlert').length) {
            $('#addStopAlert').hide();
            $('#StopAlertSectionHidden').hide()
        }
    }
    else {
        $('#StopAlertSection').show();
        if ($('#addStopAlert').length) {
            $('#addStopAlert').show();
            //$('#StopAlertSectionHidden').show()
        }
    }
}

function ValidateStopAlert() {
    $('form').submit(function (event) {

        if (parseInt($('#ProductId').val()) > 0)
        {
            $('#ProductName').val($("#ProductId option:selected").text())
        }


        // This is to not save alert if hide stop alert button is visible.
        if ($('#StopAlertSectionHidden').length > 0 && !($('#StopAlertSectionHidden').is(":visible"))) {
            $('#HasNoStopAlert').val(true);
        }
        else if ($('#StopAlertSectionHidden').length > 0 && $('#StopAlertSectionHidden').is(":visible")) {
            $('#HasNoStopAlert').val(false);
        }
        else {
            $('#HasNoStopAlert').val(false);
        }

        //end

        var isStartTargetDateSmaller = compareDate($('#TargetAlertStartDate').val(), $('#TargetAlertEndDate').val())
        if (!isStartTargetDateSmaller) {
            event.preventDefault();
            $('#TargetAlertStartDateValid').show();
            $('#TargetAlertStartDateValid').html("<span class='stopAlert-validation-error'>Start date should be smaller than end date.</span>");
        }
        else {
            $('#TargetAlertStartDateValid').hide();
        }

        if (!($('#NoStopAlert').is(':checked'))) {
            

            //Price field validation
            var stopAlertLimitPrice = parseFloat($('#StopAlertLimitPrice').val())
            if (stopAlertLimitPrice <= 0.01 || stopAlertLimitPrice >= 9999999999) {
                $('#StopAlertLimitPriceValid').show();
                $('#StopAlertLimitPriceValid').html("<span class='stopAlert-validation-error'>Value must be between 0.01 and 9999999999.</span>");
            }
            else if (isNaN(stopAlertLimitPrice)) {
                $('#StopAlertLimitPriceValid').show();
                $('#StopAlertLimitPriceValid').html("<span class='stopAlert-validation-error'>Please enter valid price.</span>");
            }

            else if (!($('#StopAlertLimitPrice').val().trim())) {
                $('#StopAlertLimitPriceValid').show();
                $('#StopAlertLimitPriceValid').html("<span class='stopAlert-validation-error'>Please enter value in decimal format.</span>");
            }

            else {
                $('#StopAlertLimitPriceValid').hide();
            }

            var stopAlertQunatity = parseInt($('#StopAlertQuantity').val());
            if (stopAlertQunatity <= 0 || stopAlertQunatity > 999999999) {
                $('#StopAlertQuantityValid').show();
                $('#StopAlertQuantityValid').html("<span class='stopAlert-validation-error'>Value must be between 1 and 999999999.</span>");
            }
            else if (isNaN(stopAlertQunatity)) {
                $('#StopAlertQuantityValid').show();
                $('#StopAlertQuantityValid').html("<span class='stopAlert-validation-error'>Please enter valid quantity.</span>");
            }

            else if (!($('#StopAlertQuantity').val().trim())) {
                $('#StopAlertQuantityValid').show();
                $('#StopAlertQuantityValid').html("<span class='stopAlert-validation-error'>Value is required.</span>");
            }

            else {
                $('#StopAlertQuantityValid').hide();
            }

            //Messaage field validation
            var message = $('#StopAlertMessage').val();
            if (!message.trim()) {
                $('#StopAlertMessageValid').show();
                $('#StopAlertMessageValid').html("<span class='stopAlert-validation-error'>Message field is required.</span>");
            }
            else if (message.length >= 250) {
                $('#StopAlertMessageValid').show();
                $('#StopAlertMessageValid').html("<span class='stopAlert-validation-error'>Message cannot be longer than 250 characters.</span>");
            }
            else {
                $('#StopAlertMessageValid').hide();
            }


            var isStartStopDateSmaller = compareDate($('#StopAlertStartDate').val(), $('#StopAlertEndDate').val())
            if (!isStartStopDateSmaller) {
                event.preventDefault();
                $('#StopAlertStartDateValid').show();
                $('#StopAlertStartDateValid').html("<span class='stopAlert-validation-error'>Start date should be smaller than end date.</span>");
            }
            else {
                $('#StopAlertStartDateValid').hide();
            }


            if ($('#StopAlertLimitPriceValid').is(':visible') || $('#StopAlertMessageValid').is(':visible') || $('#StopAlertQuantityValid').is(':visible')) {
                event.preventDefault();
            }
        }

        if ($('#NoStopAlert').is(':checked')) {
            $('#IsNoStopAlert').val(true);
        }
    })
}

function enableDisableQuantity() {
    $(document).on('change', '#IsPartialFill', function () {
        if (this.checked) {
            $('input[id="Quantity"]').removeAttr('disabled');
            $('input[id="Quantity"]').removeAttr('id');
            $('#keepAlertOpen').show();
        }
        else {
            $('input[name="Quantity"]').attr('disabled', 'disabled');
            $('input[name="Quantity"]').attr('id', 'Quantity');
            $('input[name="Quantity"]').val($('input[id="originalQuantity"]').val());
            $('#keepAlertOpen').hide();
        }
    });
}

function savePartialFillValidation() {
    $(document).on('click', '#btnSavePartialFill', function (event) {

        if ($('#IsPartialFill').is(':checked')) {
            var originalQuantity = parseInt($('input[id="originalQuantity"]').val());
            var changedQuantity = parseInt($('input[name="Quantity"]').val());
            if (originalQuantity <= changedQuantity) {
                event.preventDefault();
                $('<div title="Warning" style="z-index:100000 !important;"></div>').dialog({
                    open: function (event, ui) {
                        $(this).html('<span style="font-size:15px !important;color:black !important;">You have selected "Partial Fill" but either have not updated the quantity or the value of quantity is ' +
                            'greater than original value. Please either update the quantity or uncheck the "Partial Fill" checkbox</span>');
                    },
                    modal: true,
                    width: 400,
                    height: 200,
                    buttons: {
                        'OK': function () {
                            $(this).dialog('close');
                        }
                    }
                });


            }
        }
    })
}


function compareDate(startDate, endDate) {
    if ((new Date(startDate).getTime() > new Date(endDate).getTime())) {
        return false;
    }
    else {
        return true;
    }
}


function ShowStopAlertSection() {
    $('#addStopAlert').on('click', function () {
        if ($('#addStopAlert').val() == 'Hide Stop Alert') {
            $('#StopAlertSectionHidden').hide();
            $('#addStopAlert').val('Add Stop Alert');
            $('#IsNoStopAlert').val(true);
        }
        else {
            $('#StopAlertSectionHidden').show();
            $('#addStopAlert').val('Hide Stop Alert');
            $('#IsNoStopAlert').val(false);
        }
    });
}