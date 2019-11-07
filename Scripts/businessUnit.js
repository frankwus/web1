var isInitiatingGrid = true;
var selectedIds = [];

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

function ClearFilters() {
    $('select[id^="ClientId"]').find('option:first').attr('selected', 'selected');
    $('select[id^="BusinessUnitId"]').find('option:first').attr('selected', 'selected');
    $("#IsIncludeInactive").prop('checked', false);
    RefreshGrid();
}

function RefreshGrid() {
    var grid = $('#BusinessUnits-grid').data('tGrid');
    grid.currentPage = 1; //new search. Set page size to 1
    grid.ajaxRequest();
}

function BusinessUnits_onLoad() {
    var grid = $("#BusinessUnits-grid").data("tGrid");

    if (isInitiatingGrid) {
        var options = localStorage["BusinessUnits-grid"];
        if (options) {
            options = JSON.parse(options);

            grid.currentPage = options.currentPage;
            grid.pageSize = options.pageSize;
        }

        isInitiatingGrid = false;
    }
}


function BusinessUnits_dataBound() {
    var grid = $("#BusinessUnits-grid").data("tGrid");
    localStorage["BusinessUnits-grid"] = JSON.stringify({ currentPage: grid.currentPage, pageSize: grid.pageSize, filterExpr: grid.filterBy, sortExpr: grid.sortExpr() });

}


function onDataBound(e) {
    localStorage.setItem('selectedIds', selectedIds);
    $('#BusinessUnits-grid input[type=checkbox][id!=mastercheckbox]').each(function () {
        var currentId = $(this).val();
        var checked = jQuery.inArray(currentId, selectedIds);
        //set checked based on if current checkbox's value is in selectedIds.
        $(this).attr('checked', checked > -1);
    });

    updateMasterCheckbox();
}

function updateMasterCheckbox() {
    var numChkBoxes = $('#BusinessUnits-grid input[type=checkbox][id!=mastercheckbox]').length;
    var numChkBoxesChecked = $('#BusinessUnits-grid input[type=checkbox][checked][id!=mastercheckbox]').length;
    $('#mastercheckbox').attr('checked', numChkBoxes == numChkBoxesChecked && numChkBoxes > 0);
}

function ajaxRequestHandler(url, ajaxRequestType, sentdata, successcallback, failurecallback) {
    $.ajax(
    {
        type: ajaxRequestType,
        url: url,
        data: sentdata,
        beforeSend: function () {
            $("#loadingDiv").addClass('ajax-processing');
        },
        success: successcallback,
        error: failurecallback,
        dataType: 'application/json',
        traditional: true,
        complete: function () {
            $("#loadingDiv").removeClass('ajax-processing');
            $('#mastercheckbox').attr('checked', false);
            RefreshGrid();
        }
    });
}

function ActivateDeactivateAll() {
    $('#btnActivate, #btnDeactivate').on('click', function () {

        if (selectedIds.length == 0) {
            $('<div title="Warning" style="z-index:20000 !important;"></div>').dialog({
                open: function (event, ui) {
                    $(this).html('<span>Please select at least one business unit.</span>');
                },
                modal: true,
                width: 350,
                height: 150,
                buttons: {
                    'Ok': function () {
                        $(this).dialog('close');
                    }
                }
            });
            $(".ui-dialog-titlebar-close").hide();

            return;
        }

        if ($(this).attr('id') == 'btnActivate') {
            $('<div title="Are You Sure?"></div>').dialog({
                open: function (event, ui) {
                    $(this).html("Activate the business unit(s).");
                },
                modal: true,
                width: 300,
                height: 200,

                buttons: {
                    'No, Cancel': function () {
                        $(this).dialog('close');
                    },
                    'Yes, Activate': function () {
                        $(this).dialog('close');

                        var url = '/Admin/BusinessUnit/ActivateDeactivateAllBusinessUnitd';
                        var sentData = { 'selectedIds': selectedIds.join(), 'isActivate': true };
                        ajaxRequestHandler(url, 'POST', sentData, null, null);
                        selectedIds = [];
                    }
                }
            });
        }
        else {
            $('<div title="Are You Sure?"></div>').dialog({
                open: function (event, ui) {
                    $(this).html("Deactivate the business unit(s).");
                },
                modal: true,
                width: 300,
                height: 200,

                buttons: {
                    'No, Cancel': function () {
                        $(this).dialog('close');
                    },
                    'Yes, Deactivate': function () {
                        $(this).dialog('close');
                        var url = '/Admin/BusinessUnit/ActivateDeactivateAllBusinessUnitd';
                        var sentData = { 'selectedIds': selectedIds.join(), 'isActivate': false };
                        ajaxRequestHandler(url, 'POST', sentData, null, null);
                        selectedIds = [];
                    }
                }
            });
        }

        $(".ui-dialog-titlebar-close").hide();
    });
}

function ActivateOrDeactivate(businessUnitId, businessUnitName, isActivate) {

    if (isActivate == 'true') {
        $('<div title="Are You Sure?"></div>').dialog({
            open: function (event, ui) {
                $(this).html("Deactivate the business unit " + businessUnitName + ".");
            },
            modal: true,
            width: 300,
            height: 200,

            buttons: {
                'No, Cancel': function () {
                    $(this).dialog('close');
                },
                'Yes, Deactivate': function () {
                    $(this).dialog('close');
                    window.location = "/Admin/BusinessUnit/ActivateDeactivateBusinessUnit?businessUnitId=" + businessUnitId;
                }
            }
        });
    }
    else {
        $('<div title="Are You Sure?"></div>').dialog({
            open: function (event, ui) {
                $(this).html("Activate the business unit " + businessUnitName + ".");
            },
            modal: true,
            width: 300,
            height: 200,

            buttons: {
                'No, Cancel': function () {
                    $(this).dialog('close');
                },
                'Yes, Activate': function () {
                    $(this).dialog('close');
                    window.location = "/Admin/BusinessUnit/ActivateDeactivateBusinessUnit?businessUnitId=" + businessUnitId;
                }
            }
        });
    }

    $(".ui-dialog-titlebar-close").hide();
}


function AddBusinessUnit() {
    $('#btnAddBusinessUnit').on('click', function () {
        window.location = "/BusinessUnit/Create?clientId=" + $('#ClientId').val() + "&businessUnitId=" + $('#BusinessUnitId').val();
    })
}


$(document).ready(function () {
    GetBusinessUnits();
    ActivateDeactivateAll();
    AddBusinessUnit();

    $("#ClientId").change(function () {
        $("#BusinessUnits-grid").data("tGrid").rebind();
    });

    // For Serach in dropdown JS Start
    if (!navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/)) {
        $("select").searchable();
        $("select").each(function () {
            $(this).parent().addClass("select-wrapper");
            $(".select-wrapper select").addClass("dynamic-select");
        });
    }
    // For Serach in dropdown JS End


    $("#IsIncludeInactive").change(function () {
        $("#BusinessUnits-grid").data("tGrid").rebind();
    });

    $("#BusinessUnitId").change(function () {
        $("#BusinessUnits-grid").data("tGrid").rebind();
    });

    //grid chekcbox

    $('#mastercheckbox').click(function () {
        $('.checkboxGroups').attr('checked', $(this).is(':checked')).change();
    });

    //wire up checkboxes.
    $('#BusinessUnits-grid').on('change', 'input[type=checkbox][id!=mastercheckbox]', function (e) {
        var $check = $(this);
        if ($check.is(":checked") == true) {
            var checked = jQuery.inArray($check.val(), selectedIds);
            if (checked == -1) {
                //add id to selectedIds.
                selectedIds.push($check.val());
            }
        }
        else {
            var checked = jQuery.inArray($check.val(), selectedIds);
            if (checked > -1) {
                //remove id from selectedIds.
                selectedIds = $.grep(selectedIds, function (item, index) {
                    return item != $check.val();
                });
            }
        }
        updateMasterCheckbox();
    });
    //end grid checkbox
})