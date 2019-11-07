var isInitiatingGrid = true;

function counterparties_onLoad() {
    var grid = $("#Counterparties-grid").data("tGrid");

    if (isInitiatingGrid) {
        var options = localStorage["Counterparties-grid"];
        if (options) {
            options = JSON.parse(options);

            grid.currentPage = options.currentPage;
            grid.pageSize = options.pageSize;
        }

        isInitiatingGrid = false;
    }
}


function counterparties_dataBound() {
    var grid = $("#Counterparties-grid").data("tGrid");
    localStorage["Counterparties-grid"] = JSON.stringify({ currentPage: grid.currentPage, pageSize: grid.pageSize, filterExpr: grid.filterBy, sortExpr: grid.sortExpr() });

}