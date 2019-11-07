var isInitiatingGrid = true;

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
    var grid = $('#Accounts-grid').data('tGrid');
    grid.currentPage = 1; //new search. Set page size to 1
    grid.ajaxRequest();
}

function Accounts_onLoad() {
    var grid = $("#Accounts-grid").data("tGrid");

    if (isInitiatingGrid) {
        var options = localStorage["Accounts-grid"];
        if (options) {
            options = JSON.parse(options);

            grid.currentPage = options.currentPage;
            grid.pageSize = options.pageSize;
        }

        isInitiatingGrid = false;
    }
}


function Accounts_dataBound() {
    var grid = $("#Accounts-grid").data("tGrid");
    localStorage["Accounts-grid"] = JSON.stringify({ currentPage: grid.currentPage, pageSize: grid.pageSize, filterExpr: grid.filterBy, sortExpr: grid.sortExpr() });

}

function AddAccount() {
    $('#btnAddAccount').on('click', function () {
        window.location = "/BusinessUnit/CreateAccount?clientId=" + $('#ClientId').val() + "&businessUnitId=" + $('#BusinessUnitId').val();
    })
}


$(document).ready(function () {
    GetBusinessUnits();
    AddAccount();

    // For Serach in dropdown JS Start
    if (!navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/)) {
        $("select").searchable();
        $("select").each(function () {
            $(this).parent().addClass("select-wrapper");
            $(".select-wrapper select").addClass("dynamic-select");
        });
    }
    // For Serach in dropdown JS End

    $("#ClientId").change(function () {
        $("#Accounts-grid").data("tGrid").rebind();
    });

    $("#BusinessUnitId").change(function () {
        $("#Accounts-grid").data("tGrid").rebind();
    });

    $("#IsIncludeInactive").change(function () {
        $("#Accounts-grid").data("tGrid").rebind();
    });
})