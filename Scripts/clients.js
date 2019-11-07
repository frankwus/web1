var isInitiatingGrid = true;

function DownloadTermSheet(name, clientId) {

    $.ajax({
        type: "Get",
        url: "/BusinessUnit/TermSheetExists",
        data: { 'name': name },
        success: function (data) {
            if (data == "true" || data == true) {
                var termSheet = "<form action='/BusinessUnit/DownloadTermSheet?name=" + name + "&clientId=" + clientId + "' method='post'></form>";
                jQuery(termSheet).appendTo('body').submit().remove();
            }
            else {
                alert("Exception: File not found.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}

function clients_onLoad() {
    var grid = $("#Clients-grid").data("tGrid");

    if (isInitiatingGrid) {
        var options = localStorage["Clients-grid"];
        if (options) {
            options = JSON.parse(options);

            grid.currentPage = options.currentPage;
            grid.pageSize = options.pageSize;
        }

        isInitiatingGrid = false;
    }
}


function clients_dataBound() {
    var grid = $("#Clients-grid").data("tGrid");
    localStorage["Clients-grid"] = JSON.stringify({ currentPage: grid.currentPage, pageSize: grid.pageSize, filterExpr: grid.filterBy, sortExpr: grid.sortExpr() });
}