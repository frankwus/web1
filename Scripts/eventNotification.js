var selectedBusinessUnitsForTrades = [];
var selectedBusinessUnitsForFinancialConfirmation = [];
var selectedBusinessUnitsForPhysicalConfirmation = [];
var selectedBusinessUnitsForInvoice = [];
var selectedBusinessUnitsForContracts = [];
var selectedBusinessUnitsForFileUploads = [];
var selectedBusinessUnitsForAlerts = [];
var selectedBusinessUnitsForRisks = [];
var selectedBusinessUnitsForSystem = [];

$(document).ready(function () {


    //collapsible row
    $(".colIcon").on('click', function () {
        if ($(this).hasClass('fa-plus-circle')) {
            $(this).removeClass('fa-plus-circle');
            $(this).addClass('fa-minus-circle');
            $(this).closest('tr').addClass('expand');
        }
        else if ($(this).hasClass('fa-minus-circle')) {
            $(this).removeClass('fa-minus-circle');
            $(this).addClass('fa-plus-circle');
            $(this).closest('tr').removeClass('expand');
        }
    });


    var phoneNumber = $('#userPhoneNumber').val();
    var CountryMobileCode = $('#userCountryMobileCode').val();

    if (!phoneNumber) {
        $(".notificationTable td:nth-child(2)").css("background-color", "#e8e8e8");
        $('[id^=checkSMS]').on('change', function () {

            if (this.checked) {
                $('<div title="Warning" style="z-index:20000 !important;"></div>').dialog({
                    open: function (event, ui) {
                        //$(this).html('<span style="font-size:15px !important;color:black !important;">SMS messaging is not allowed without a contact number. Please enter your contact number in your <a href="/Admin/PublicUser/Profile?updatePhoneNumber" class="profileLink">Risknet Profile</a>.</span>');
                        $(this).html('<div class="sms-input-wrapper"><div class="font-14">SMS messaging is not allowed without a contact number. Please enter your Contact Number : <input id="txtCountryMobileCode"type="text" disabled class="countryCode valid sms-input" value="' + CountryMobileCode + '"><input id="txtContactNumber" type="text" class="sms-input" maxlength="10"></div><span class="field-validation-error"><span id="lblMsg">Please enter Contact Number.</span></span></div>');
                        $('#lblMsg').hide();
                    },
                    modal: true,
                    width: 600,
                    height: 200,
                    buttons: {
                        'Maybe Later': function () {
                            $('[id^=checkSMS]').removeAttr('checked');
                            $(this).dialog('close');
                            $(this).dialog("destroy");
                        },
                        'Update Phone': function () {
                            $('#lblMsg').hide();
                            var CountryCode = $('#txtCountryMobileCode').val();
                            var PhoneNumber = $('#txtContactNumber').val();
                            if (PhoneNumber != null && PhoneNumber != "") {
                                $(this).dialog('close');
                                $(this).dialog("destroy");
                                UpdateMobileNumber(CountryCode, PhoneNumber);
                            }
                            else {
                                $('#lblMsg').show();
                            }
                        }
                    }
                });
                $(".ui-dialog-titlebar-close").hide();
            }

        });
    }
    else {
        $(".notificationTable td:nth-child(2)").removeAttr("style");
    }


    function UpdateMobileNumber(CountryCode, PhoneNumber) {
        $.ajax({
            url: "UpdatePhoneNumber",
            type: 'POST',
            sync: true,
            data: JSON.stringify({ 'phoneNumber': PhoneNumber, 'countryCode': CountryCode }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data) {
                    $('<div title="Success" style="z-index:20005 !important;"></div>').dialog({
                        open: function (event, ui) {
                            $(this).html('<span style="font-size:15px !important;color:black !important;">Phone Number updated successfully.</span>');
                        },
                        modal: true,
                        width: 300,
                        height: 180,
                        buttons: {
                            'Ok': function () {
                                $(this).dialog('close');
                                window.location.href = window.location.href;
                            }
                        }
                    });
                    $(".ui-dialog-titlebar-close").hide();
                }
                else {
                    $('<div title="Success" style="z-index:20005 !important;"></div>').dialog({
                        open: function (event, ui) {
                            $(this).html('<span style="font-size:15px !important;color:black !important;">Not Saved.</span>');
                        },
                        modal: true,
                        width: 300,
                        height: 180,
                        buttons: {
                            'Ok': function () {
                                $(this).dialog('close');
                            }
                        }
                    });
                    $(".ui-dialog-titlebar-close").hide();
                }
            },
            error: function (exception) {
                alert('Exeption:' + exception);
            }
        });
    }

    tradeAllMultiSelectedValue();
    financialConfirmationAllMultiSelectedValue();
    physicalConfirmationAllMultiSelectedValue();
    invoiceAllMultiSelectedValue();
    contractAllMultiSelectedValue();
    fileUploadsAllMultiSelectedValue();
    alertMultiSelectedValue();
    riskMultiSelectedValue();
    systemMultiSelectedValue();

    if ($('#checkEmailFinancialConfirmation').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkEmailFinancialConfirmation').prop('checked', true);

    if ($('#checkEmailPhysicalConfirmation').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkEmailPhysicalConfirmation').prop('checked', true);

    if ($('#checkSMSTrade').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkSMSTrade').prop('checked', true);

    if ($('#checkEmailTrade').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkEmailTrade').prop('checked', true);

    if ($('#checkSMSFinancialConfirmation').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkSMSFinancialConfirmation').prop('checked', true);

    if ($('#checkSMSPhysicalConfirmation').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkSMSPhysicalConfirmation').prop('checked', true);

    if ($('#checkSMSInvoice').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkSMSInvoice').prop('checked', true);

    if ($('#checkSMSContract').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkSMSContract').prop('checked', true);

    if ($('#checkEmailContract').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkEmailContract').prop('checked', true);

    if ($('#checkEmailInvoice').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkEmailInvoice').prop('checked', true);

    if ($('#checkSMSFile').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkSMSFile').prop('checked', true);

    if ($('#checkEmailFile').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkEmailFile').prop('checked', true);

    if ($('#checkEmailAlert').parent().siblings().find('input:checkbox:checked').length == 6)
        $('#checkEmailAlert').prop('checked', true);

    if ($('#checkSMSAlert').parent().siblings().find('input:checkbox:checked').length == 6)
        $('#checkSMSAlert').prop('checked', true);

    if ($('#checkSMSRisk').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkSMSRisk').prop('checked', true);

    if ($('#checkEmailRisk').parent().siblings().find('input:checkbox:checked').length == 2)
        $('#checkEmailRisk').prop('checked', true);

    if ($('#checkSMSSystem').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkSMSSystem').prop('checked', true);

    if ($('#checkEmailSystem').parent().siblings().find('input:checkbox:checked').length == 1)
        $('#checkEmailSystem').prop('checked', true);

    $('#checkSMSFinancialConfirmation, #checkSMSPhysicalConfirmation, #checkSMSTrade, #checkEmailTrade, #checkSMSConfirmation, #checkEmailFinancialConfirmation, #checkEmailPhysicalConfirmation, #checkSMSInvoice, #checkEmailInvoice, #checkSMSContract, #checkEmailContract, #checkEmailAlert, #checkSMSAlert, #checkEmailFile, #checkSMSFile, #checkSMSRisk, #checkEmailRisk, #checkSMSSystem, #checkEmailSystem').on('change', function () {
        if ($(this).prop('checked') == true) {
            //$(this).siblings().find('input:checkbox').prop('checked', true);
            $(this).parent().parent('.trRow').children().find('input:checkbox').prop('checked', true);
        } else {
            $(this).parent().parent('.trRow').children().find('input:checkbox').prop('checked', false);
        }
    });

    $('input.child:checkbox').on('change', function () {
        if ($(this).prop('checked') == false) {
            $(this).parent().parent().find('.master').prop('checked', false);
        }

        else {
            if ($(this).attr('id').indexOf("Alert") < 0 && $(this).parent().parent().find('.child:checked').length == 2) {
                $(this).parent().parent().find('.master').prop('checked', true);
            }

            else if ($(this).attr('id').indexOf("Alert") > 0 && $(this).parent().parent().find('.child:checked').length == 6) {
                $(this).parent().parent().find('.master').prop('checked', true);
            }

            //Temporary as bill had hidden some fields in UI
            if ((($(this).attr('id') == 'checkSMSInvoiceDocumentUploaded') || ($(this).attr('id') == 'checkEmailInvoiceDocumentUploaded')
                || ($(this).attr('id') == 'checkSMSContractDocumentUploaded') || ($(this).attr('id') == 'checkEmailContractDocumentUploaded')
                || ($(this).attr('id') == 'checkSMSFileUploaded') || ($(this).attr('id') == 'checkEmailFileUploaded'))
                && $(this).parent().parent().find('.child:checked').length == 1) {
                $(this).parent().parent().find('.master').prop('checked', true);
            }
        }
    });

    $('#btnSaveNotification:enabled').on('click', function () {
        saveNotification();
    });

});

function saveNotification() {
    $('#btnSaveNotification').prop('disabled', true);

    var tradeCreateEventNotification = {
        "NotificationEntityType": 0, "IsEmailEnabled": $("#checkEmailTradeEntered").prop("checked"), "IsSMSEnabled": $("#checkSMSTradeEntered").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForTrades == null ? selectedBusinessUnitsForTrades : selectedBusinessUnitsForTrades.join(), "Id": $('#TradeEnteredId').val()
    }

    var tradeEditEventNotification = {
        "NotificationEntityType": 1, "IsEmailEnabled": $("#checkEmailTradeEdit").prop("checked"), "IsSMSEnabled": $("#checkSMSTradeEdit").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForTrades == null ? selectedBusinessUnitsForTrades : selectedBusinessUnitsForTrades.join(), "Id": $('#TradeEditId').val()
    }

    var financialConfirmationDocumentUpload = {
        "NotificationEntityType": 2, "IsEmailEnabled": $("#checkEmailFinancialConfirmationDocumentUploaded").prop("checked"), "IsSMSEnabled": $("#checkSMSFinancialConfirmationDocumentUploaded").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForFinancialConfirmation == null ? selectedBusinessUnitsForFinancialConfirmation : selectedBusinessUnitsForFinancialConfirmation.join(), "Id": $('#FinancialConfirmationDocumentUploadedId').val()
    }

    var financialConfirmationDocumentReadyForSignature = {
        "NotificationEntityType": 3, "IsEmailEnabled": $("#checkEmailFinancialConfirmationReadyForSign").prop("checked"), "IsSMSEnabled": $("#checkSMSFinancialConfirmationReadyForSign").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForFinancialConfirmation == null ? selectedBusinessUnitsForFinancialConfirmation : selectedBusinessUnitsForFinancialConfirmation.join(), "Id": $('#FinancialConfirmationReadyForSignatureId').val()
    }

    var invoiceDocumentUploaded = {
        "NotificationEntityType": 4, "IsEmailEnabled": $("#checkEmailInvoiceDocumentUploaded").prop("checked"), "IsSMSEnabled": $("#checkSMSInvoiceDocumentUploaded").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForInvoice == null ? selectedBusinessUnitsForInvoice : selectedBusinessUnitsForInvoice.join(), "Id": $('#InvoiceDocumentUploadedId').val()
    }

    var invoiceReadyForSignature = {
        "NotificationEntityType": 5, "IsEmailEnabled": $("#checkEmailInvoiceReadyForSign").prop("checked"), "IsSMSEnabled": $("#checkSMSInvoiceReadyForSign").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForInvoice == null ? selectedBusinessUnitsForInvoice : selectedBusinessUnitsForInvoice.join(), "Id": $('#InvoiceReadyForSignatureId').val()
    }

    var contractDocumentUploaded = {
        "NotificationEntityType": 6, "IsEmailEnabled": $("#checkEmailContractDocumentUploaded").prop("checked"), "IsSMSEnabled": $("#checkSMSContractDocumentUploaded").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForContracts == null ? selectedBusinessUnitsForContracts : selectedBusinessUnitsForContracts.join(), "Id": $('#ContractDocumentUploadedId').val()
    }

    var contractDocumentReadyForSign = {
        "NotificationEntityType": 7, "IsEmailEnabled": $("#checkEmailContractReadyForSign").prop("checked"), "IsSMSEnabled": $("#checkSMSContractReadyForSign").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForContracts == null ? selectedBusinessUnitsForContracts : selectedBusinessUnitsForContracts.join(), "Id": $('#ContractReadyForSignatureId').val()
    }

    var contractFileUpload = {
        "NotificationEntityType": 8, "IsEmailEnabled": $("#checkEmailFileUploaded").prop("checked"), "IsSMSEnabled": $("#checkSMSFileUploaded").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForFileUploads == null ? selectedBusinessUnitsForFileUploads : selectedBusinessUnitsForFileUploads.join(), "Id": $('#FileUploadedId').val()
    }

    var alertCreated = {
        "NotificationEntityType": 9, "IsEmailEnabled": $("#checkEmailAlertCreated").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertCreated").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertCreatedId').val()
    }

    var alertCancelled = {
        "NotificationEntityType": 10, "IsEmailEnabled": $("#checkEmailAlertCancelled").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertCancelled").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertCancelledId').val()
    }

    var alertUpdated = {
        "NotificationEntityType": 11, "IsEmailEnabled": $("#checkEmailAlertUpdated").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertUpdated").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertUpdatedId').val()
    }

    var alertFilled = {
        "NotificationEntityType": 12, "IsEmailEnabled": $("#checkEmailAlertFilled").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertFilled").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertFilledId').val()
    }

    var alertPartialFilled = {
        "NotificationEntityType": 13, "IsEmailEnabled": $("#checkEmailAlertPartialFilled").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertPartialFilled").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertPartialFilledId').val()
    }

    var alertTriggered = {
        "NotificationEntityType": 14, "IsEmailEnabled": $("#checkEmailAlertTriggered").prop("checked"), "IsSMSEnabled": $("#checkSMSAlertTriggered").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForAlerts == null ? selectedBusinessUnitsForAlerts : selectedBusinessUnitsForAlerts.join(), "Id": $('#AlertTriggeredId').val()
    }

    var counterPartyRiskExposure = {
        "NotificationEntityType": 15, "IsEmailEnabled": $("#checkEmailCPRiskExposure").prop("checked"), "IsSMSEnabled": $("#checkSMSCPRiskExposure").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForRisks == null ? selectedBusinessUnitsForRisks : selectedBusinessUnitsForRisks.join(), "Id": $('#CPRiskExposureId').val()
    }
    var commodityRiskLimit = {
        "NotificationEntityType": 16, "IsEmailEnabled": $("#checkEmailCommodityRiskLimit").prop("checked"), "IsSMSEnabled": $("#checkSMSCommodityRiskLimit").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForRisks == null ? selectedBusinessUnitsForRisks : selectedBusinessUnitsForRisks.join(), "Id": $('#CommodityRiskLimitId').val()
    }

    var physicalConfirmationDocumentUpload = {
        "NotificationEntityType": 17, "IsEmailEnabled": $("#checkEmailPhysicalConfirmationDocumentUploaded").prop("checked"), "IsSMSEnabled": $("#checkSMSPhysicalConfirmationDocumentUploaded").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForPhysicalConfirmation == null ? selectedBusinessUnitsForPhysicalConfirmation : selectedBusinessUnitsForPhysicalConfirmation.join(), "Id": $('#PhysicalConfirmationDocumentUploadedId').val()
    }

    var physicalConfirmationDocumentReadyForSignature = {
        "NotificationEntityType": 18, "IsEmailEnabled": $("#checkEmailPhysicalConfirmationReadyForSign").prop("checked"), "IsSMSEnabled": $("#checkSMSPhysicalConfirmationReadyForSign").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForPhysicalConfirmation == null ? selectedBusinessUnitsForPhysicalConfirmation : selectedBusinessUnitsForPhysicalConfirmation.join(), "Id": $('#PhysicalConfirmationReadyForSignatureId').val()
    }

    var systemNotification = {
        "NotificationEntityType": 19, "IsEmailEnabled": $("#checkEmailSystemNotification").prop("checked"), "IsSMSEnabled": $("#checkSMSSystemNotification").prop("checked"),
        "BusinessUnitIds": selectedBusinessUnitsForSystem == null ? selectedBusinessUnitsForSystem: selectedBusinessUnitsForSystem.join(), "Id": $('#SystemNotificationId').val()
    }

    var eventNotifModel = [];
    eventNotifModel.push(tradeCreateEventNotification, tradeEditEventNotification, financialConfirmationDocumentUpload, financialConfirmationDocumentReadyForSignature, invoiceDocumentUploaded, invoiceReadyForSignature,
        contractDocumentUploaded, contractDocumentReadyForSign, contractFileUpload, alertCreated, alertCancelled, alertUpdated, alertFilled, alertPartialFilled, alertTriggered, counterPartyRiskExposure, commodityRiskLimit,
        physicalConfirmationDocumentUpload, physicalConfirmationDocumentReadyForSignature, systemNotification);

    var clientUserId = $('#clientUserId').val();

    $.ajax({
        url: "SetEventNotification",
        type: 'POST',
        sync: true,
        data: JSON.stringify({ 'eventNotifModel': eventNotifModel, 'clientUserId': clientUserId }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('<div title="Success" style="z-index:20000 !important;"></div>').dialog({
                open: function (event, ui) {
                    $(this).html('<span style="font-size:15px !important;color:black !important;">Notification saved successfully.</span>');
                },
                modal: true,
                width: 300,
                height: 180,
                buttons: {
                    'Ok': function () {
                        $(this).dialog('close');
                        $('#btnSaveNotification').prop('disabled', false);
                    }
                }
            });
            $(".ui-dialog-titlebar-close").hide();
        },
        error: function (exception) {
            alert('Exeption:' + exception);
        }
    });

};

function getBusinessUnits(element) {
    var allBusinessUnits = $('#allBusinessUnits').val();
    var selectedBusinessUnits = '';
    $(element).each(function (i, selected) {
        var businessUnitName = selected;
        var value = '';

        $.each($.parseJSON(allBusinessUnits), function (idx, obj) {
            if (obj.Text.replace(/\s/g, "") == businessUnitName.replace(/\s/g, "")) {
                //console.log(String(obj.Value));
                value = String(obj.Value);
                return false;;
            }
        });


        selectedBusinessUnits = selectedBusinessUnits + value + ','
    });
    return selectedBusinessUnits.replace(/,\s*$/, "");;
}

function tradeAllMultiSelectedValue() {
    $('#tradeBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForTrades = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForTrades = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForTrades = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForTrades = this.$select.val();
        }
    });
}

function financialConfirmationAllMultiSelectedValue() {
    $('#financialConfirmationBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForFinancialConfirmation = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForFinancialConfirmation = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForFinancialConfirmation = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForFinancialConfirmation = this.$select.val();
        }
    });
}

function physicalConfirmationAllMultiSelectedValue() {
    $('#physicalConfirmationBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForPhysicalConfirmation = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForPhysicalConfirmation = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForPhysicalConfirmation = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForPhysicalConfirmation = this.$select.val();
        }
    });
}

function invoiceAllMultiSelectedValue() {
    $('#invoiceBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForInvoice = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForInvoice = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForInvoice = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForInvoice = this.$select.val();
        }
    });
}

function contractAllMultiSelectedValue() {
    $('#contractBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForContracts = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForContracts = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForContracts = this.$select.val();
            console.log("select-all-nonreq");
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForContracts = this.$select.val();
            console.log("deselect-all-nonreq");
        }
    });
}

function fileUploadsAllMultiSelectedValue() {
    $('#fileUploadBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForFileUploads = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForFileUploads = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForFileUploads = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForFileUploads = this.$select.val();
        }
    });
}

function alertMultiSelectedValue() {
    $('#alertBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForAlerts = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForAlerts = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForAlerts = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForAlerts = this.$select.val();
        }
    });
}

function riskMultiSelectedValue() {
    $('#riskBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForRisks = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForRisks = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForRisks = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForRisks = this.$select.val();
        }
    });
}

function systemMultiSelectedValue() {
    $('#systemBusinessUnits').multiselect({
        includeSelectAllOption: true,
        onInitialized: function (select, container) {
            selectedBusinessUnitsForSystem = this.$select.val();
        },
        onChange: function () {
            selectedBusinessUnitsForSystem = this.$select.val();
        },
        onSelectAll: function () {
            selectedBusinessUnitsForSystem = this.$select.val();
        },
        onDeselectAll: function () {
            selectedBusinessUnitsForSystem = this.$select.val();
        }
    });
}
