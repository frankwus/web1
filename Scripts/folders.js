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

    RefreshGrid();
}

function RefreshGrid() {
    var grid = $('#Folders-grid').data('tGrid');
    grid.currentPage = 1; //new search. Set page size to 1
    grid.ajaxRequest();
}

function folders_onLoad() {
    var grid = $("#Folders-grid").data("tGrid");

    if (isInitiatingGrid) {
        var options = localStorage["Folders-grid"];
        if (options) {
            options = JSON.parse(options);

            grid.currentPage = options.currentPage;
            grid.pageSize = options.pageSize;
        }

        isInitiatingGrid = false;
    }
}


function folders_dataBound() {
    var grid = $("#Folders-grid").data("tGrid");
    localStorage["Folders-grid"] = JSON.stringify({ currentPage: grid.currentPage, pageSize: grid.pageSize, filterExpr: grid.filterBy, sortExpr: grid.sortExpr() });

}


function AddFolder() {
    $('#btnAddFolder').on('click', function () {
        window.location = "/BusinessUnit/CreateFolder?clientId=" + $('#ClientId').val() + "&businessUnitId=" + $('#BusinessUnitId').val();
    })
}

$(document).ready(function () {
    GetBusinessUnits();
    AddFolder();

    // For Serach in dropdown JS Start
    if (!navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/)) {
        $("select").searchable();
        $("select").each(function () {
            $(this).parent().addClass("select-wrapper");
            $(".select-wrapper select").addClass("dynamic-select");
        });
    }
    // For Serach in dropdown JS End

    if ($('#BusinessUnitId').val() == 0 || $('#BusinessUnitId').val() == '') {
        $('#btnAddFolder').removeClass("btn-primary").addClass("btn_disabled");
        $('#btnAddFolder').prop('disabled', true);
    }
    else {
        $('#btnAddFolder').addClass("btn-primary").removeClass("btn_disabled");
        $('#btnAddFolder').prop('disabled', false);
    }

    $("#ClientId").change(function () {
        $("#Folders-grid").data("tGrid").rebind();
    });

    $("#BusinessUnitId").change(function () {
        if ($('#BusinessUnitId').val() == 0 || $('#BusinessUnitId').val() == '') {
            $('#btnAddFolder').removeClass("btn-primary").addClass("btn_disabled");
            $('#btnAddFolder').prop('disabled', true);
        }
        else {
            $('#btnAddFolder').addClass("btn-primary").removeClass("btn_disabled");
            $('#btnAddFolder').prop('disabled', false);
        }
        $("#Folders-grid").data("tGrid").rebind();
    });
})