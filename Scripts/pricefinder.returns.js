$(document).ready(function () {
    $('#btnCalculate').click(function () {
        // Parse inputs
        var returns = $("#hiddenReturns").val();
        //var range = $("#range").val();
        var iterations = $("#iterations").val();
        var size = $("#size").val();
        var percentile = $("#percentile").val();
        var slice = $("#slice").val();

        var weightsList = [];
        $("#weightsInput :input").each(function () {
            var input = $(this);
            var instrument = input.attr('id').split("__")[0];
            var contractMonth = input.attr('id').split("__")[1];
            weightsList.push({
                instrument: instrument,
                contractMonth: contractMonth,
                weight: input.val()
            });
        });

        $("#spanErrorMessage").text("");
        //showLoader();
        $('#divCalcSummary').css('opacity', '0.5');

        // TODO: Add validation

        $.ajax({
            type: "POST",
            data: { weightsList: JSON.stringify(weightsList), iterations: iterations, percentile: percentile, size: size, slice: slice, returns: returns },
            url: "/PriceFinder/GetReturnsCalc",
            success: function (data) {

                $('#divCalcSummary').html("");
                $('#errorDiv').html("");
                $("#spanErrorMessage").text("");
                $('#divCalcSummary').html(data);
                $('#divReturnCriteria').show();

                hideLoader();
                $('#divCalcSummary').css('opacity', '1');
            },
            error: function (error) {
                hideLoader();
                $('#divCalcSummary').html(error);
                $('#divCalcSummary').css('opacity', '1');
            }
        });
    });
});