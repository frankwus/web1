$(document).ready(function () {
    enableDisableQuantity();
});

function enableDisableQuantity() {
    $(document).on('change', '#IsPartialFill', function () {
        if (this.checked) {
            $('input[id="Quantity"]').css('background-color', '#ffffff !important');
            $('input[id="Quantity"]').removeAttr('disabled');
        }
        else {
            $('input[id="Quantity"]').css('background-color', '#e9e9e9 !important');
            $('input[id="Quantity"]').addAttr('disabled');
        }
    });
}