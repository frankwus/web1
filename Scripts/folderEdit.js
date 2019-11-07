var selectedReadPermissionsUserIds = [];
var selectedWritePermissionsUserIds = [];

function onReadUsersDataBound(e) {
    localStorage.setItem('selectedReadPermissionsUserIds', selectedReadPermissionsUserIds);
    $('#ReadPermissions-grid input[type=checkbox][id!=mastercheckbox]').each(function () {
        var currentId = $(this).val();
        var checked = jQuery.inArray(currentId, selectedReadPermissionsUserIds);
        //set checked based on if current checkbox's value is in selectedIds.
        $(this).attr('checked', checked > -1);
    });

    updateReadUsersMasterCheckbox();
}

function updateReadUsersMasterCheckbox() {
    var numChkBoxes = $('#ReadPermissions-grid input[type=checkbox][id!=mastercheckbox]').length;
    var numChkBoxesChecked = $('#ReadPermissions-grid input[type=checkbox][checked][id!=mastercheckbox]').length;
    $('#mastercheckbox').attr('checked', numChkBoxes == numChkBoxesChecked && numChkBoxes > 0);
}


function onWriteUsersDataBound(e) {
    localStorage.setItem('selectedWritePermissionsUserIds', selectedWritePermissionsUserIds);
    $('#WritePermissions-grid input[type=checkbox][id!=writeMastercheckbox]').each(function () {
        var currentId = $(this).val();
        var checked = jQuery.inArray(currentId, selectedWritePermissionsUserIds);
        //set checked based on if current checkbox's value is in selectedIds.
        $(this).attr('checked', checked > -1);
    });

    updateWriteUsersMasterCheckbox();
}

function updateWriteUsersMasterCheckbox() {
    var numChkBoxes = $('#WritePermissions-grid input[type=checkbox][id!=writeMastercheckbox]').length;
    var numChkBoxesChecked = $('#WritePermissions-grid input[type=checkbox][checked][id!=writeMastercheckbox]').length;
    $('#writeMastercheckbox').attr('checked', numChkBoxes == numChkBoxesChecked && numChkBoxes > 0);
}


$(document).ready(function () {
    if ($('#SelectedReadPermissionUsers').val() != "")
        selectedReadPermissionsUserIds = $('#SelectedReadPermissionUsers').val().split(',')

    if ($('#SelectedWritePermissionUsers').val() != "")
        selectedWritePermissionsUserIds = $('#SelectedWritePermissionUsers').val().split(',')

    //Read grid chekcbox

    $('#mastercheckbox').click(function () {
        $('.checkboxGroups').attr('checked', $(this).is(':checked')).change();
    });

    //wire up checkboxes.
    $('#ReadPermissions-grid').on('change', 'input[type=checkbox][id!=mastercheckbox]', function (e) {
        var $check = $(this);
        if ($check.is(":checked") == true) {
            var checked = jQuery.inArray($check.val(), selectedReadPermissionsUserIds);
            if (checked == -1) {
                //add id to selectedIds.
                selectedReadPermissionsUserIds.push($check.val());
            }
        }
        else {
            var checked = jQuery.inArray($check.val(), selectedReadPermissionsUserIds);
            if (checked > -1) {
                //remove id from selectedIds.
                selectedReadPermissionsUserIds = $.grep(selectedReadPermissionsUserIds, function (item, index) {
                    return item != $check.val();
                });
            }
        }
        $('#SelectedReadPermissionUsers').val(selectedReadPermissionsUserIds);
        updateReadUsersMasterCheckbox();
    });

    //Write grid checkbox
    $('#writeMastercheckbox').click(function () {
        $('.writeCheckboxGroups').attr('checked', $(this).is(':checked')).change();
    });

    //wire up checkboxes.
    $('#WritePermissions-grid').on('change', 'input[type=checkbox][id!=writeMastercheckbox]', function (e) {
        var $check = $(this);
        if ($check.is(":checked") == true) {
            var checked = jQuery.inArray($check.val(), selectedWritePermissionsUserIds);
            if (checked == -1) {
                //add id to selectedIds.
                selectedWritePermissionsUserIds.push($check.val());
            }
        }
        else {
            var checked = jQuery.inArray($check.val(), selectedWritePermissionsUserIds);
            if (checked > -1) {
                //remove id from selectedIds.
                selectedWritePermissionsUserIds = $.grep(selectedWritePermissionsUserIds, function (item, index) {
                    return item != $check.val();
                });
            }
        }
        $('#SelectedWritePermissionUsers').val(selectedWritePermissionsUserIds);
        updateWriteUsersMasterCheckbox();
    });
    //end grid checkbox
});

