function SelectedTemplateIDChange(el) {
    if ($(el).val().toString() != '0') {
        GetTemplateFields();
        GetValueForInternal();

        $('select[id^="FilterCriteria"]').find('option:gt(0)').remove();
        $('select[id^="FilterCondition"]').find('option:gt(0)').remove();
        $('input[id^="txtValue"]').val('');
        $('input[id^="FilterText"]').val('');
        $('input[id^="FilterConditionText"]').val('');
        $('input[id^="txtValue"]').datepicker("destroy");
        $('Label[name^="DateTimeFormat"]').hide();
        $('input[id^="txtValueForBetween"]').val('');
        $('input[id^="txtValueForBetween"]').hide();

        $('select[id^="SortCriteria"]').find('option:gt(0)').remove();
        $('select[id^="SortCondition"]').find("option:contains(--Select Condition--)").attr('selected', 'selected');
        $('input[id^="SortText"]').val('');
        $('input[id^="SortConditionText"]').val('');

        $('select[id^="GroupOnCriteria"]').find('option:gt(0)').remove();
        $('select[id^="GroupByCriteria"]').find('option:gt(0)').remove();
        $('select[id^="GroupByCondition"]').find("option:contains(--Select Condition--)").attr('selected', 'selected');
        $('input[id^="GroupOnText"]').val('');
        $('input[id^="GroupByText"]').val('');
        $('input[id^="GroupByConditionText"]').val('');
        $('input[id^="GroupBytxtValue"]').val('');
        $('input[id^="hdnGroupBytxtValue"]').val('');

        $('select[id^="AggCriteria"]').find('option:gt(0)').remove();
        $('select[id^="AggCondition"]').find('option:gt(0)').remove();
        $('input[id^="AggText"]').val('');
        $('input[id^="AggConditionText"]').val('');
        $('input[id^="AggtxtValue"]').val('');
        $('input[id^="hdnAggtxtValue"]').val('');

        $("#AdvancedColumns").empty();
        $("#AdvancedRows").empty();
        $("#AdvancedValues").empty();
    }
}

function GroupOnCriteriaChange(el) {
    var GroupOnCriteria = $(el);
    $('#GroupByErrorMessage').text('');
    var GroupOnText = GroupOnCriteria.prev();
    GroupOnText.val(GroupOnCriteria.find('option:selected').text());
    var GroupByTextbox = GroupOnCriteria.siblings('input[id^="GroupBytxtValue"]');
    GroupByTextbox.val('');
}

function GroupByCriteriaChange(el) {
    $('#GroupByErrorMessage').text('');
    var GroupByText = $(el).siblings('input[id^="GroupByText"]');
    GroupByText.val($(el).find('option:selected').text());
    console.log(GroupByText);
    var GroupByTextbox = $(el).siblings('input[id^="GroupBytxtValue"]');
    GroupByTextbox.val('');
}

function GroupByConditionChange(el) {
    $('#GroupByErrorMessage').text('');
    var GroupByConditionText = $(el).prev();
    GroupByConditionText.val($(el).find('option:selected').val());
    var GroupByTextbox = $(el).siblings('input[id^="GroupBytxtValue"]');
    GroupByTextbox.val('');
    var GroupByCriteria = $(el).siblings('select[id^="GroupByCriteria"]');
    GroupByCriteria.find('option:gt(0)').remove();
    if ($(el).val() != '') {
        var x = document.getElementById("RequestedColumns");
        for (var i = 0; i < x.children.length; i++) {
            var attr = x.children[i].hasAttribute("name");
            if ((x.children[i].getAttribute('value') == 'int' || x.children[i].getAttribute('value') == 'float' || x.children[i].getAttribute('value') == 'bigint') || (($(el).val() == 'MAX' || $(el).val() == 'MIN' || $(el).val() == 'COUNT') && (x.children[i].getAttribute('value') == 'date' || x.children[i].getAttribute('value') == 'datetime'))
                || (($(el).val() == 'COUNT') && (x.children[i].getAttribute('value') != ''))) {
                if (attr != undefined && attr != false) {
                    GroupByCriteria.append($("<option></option>")
                                .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                      .text(x.children[i].innerHTML));
                }
                else {
                    GroupByCriteria.append($("<option></option>")
                              .attr("value", x.children[i].getAttribute('value'))
                             .text(x.children[i].innerHTML));
                }
            }
        }
    }
}

function AggCriteriaChange(el) {
    $('#AggErrorMessage').text('');
    var AggText = $(el).prev();
    AggText.val($(el).find('option:selected').text());
    var AggTextbox = $(el).siblings('input[id^="AggtxtValue"]');
    AggTextbox.val('');
    var AggCondition = $(el).siblings('select[id^="AggCondition"]');
    AggCondition.find('option:gt(0)').remove();
    if ($(el).val() == 'int' || $(el).val() == 'float' || $(el).val() == 'bigint') {
        AggCondition.append($("<option>MAX</option>"));
        AggCondition.append($("<option>MIN</option>"));
        AggCondition.append($("<option>SUM</option>"));
        AggCondition.append($("<option>COUNT</option>"));
        AggCondition.append($("<option>AVG</option>"));
    }
    else if ($(el).val() == 'datetime' || $(el).val() == 'date') {
        AggCondition.append($("<option>MAX</option>"));
        AggCondition.append($("<option>MIN</option>"));
        AggCondition.append($("<option>COUNT</option>"));
    }
    else if ($(el).val() != '') {
        AggCondition.append($("<option>COUNT</option>"));
    }
}

function FilterCriteriaChange(el) {
    $('#FilterErrorMessage').text('');
    var FilterText = $(el).siblings('input[id^="FilterText"]');
    FilterText.val($(el).find('option:selected').text());

    var selectVal = $(el).siblings('select[id^="FilterCondition"]');
    var ValueTextBox = $(el).siblings('input[id^="txtValue"]');
    var DateTimeFormatLabel = $(el).siblings('Label[name^="DateTimeFormat"]');
    var ValueTextBoxForBetween = $(el).siblings('input[id^="txtValueForBetween"]');
    ValueTextBox.val('');
    ValueTextBoxForBetween.val('');
    ValueTextBox.datepicker("destroy");
    ValueTextBoxForBetween.datepicker("destroy");

    selectVal.find('option:gt(0)').remove();
    if ($(el).val() == 'int' || $(el).val() == 'float' || $(el).val() == 'bigint' || $(el).val() == 'money') {
        selectVal.append($("<option>Is equal to</option>"));
        selectVal.append($("<option>Is not equal to</option>"));
        selectVal.append($("<option>Is less than</option>"));
        selectVal.append($("<option>Is less than or equal to</option>"));
        selectVal.append($("<option>Is greater than</option>"));
        selectVal.append($("<option>Is greater than or equal to</option>"));
        selectVal.append($("<option>In</option>"));
        selectVal.append($("<option>Not in</option>"));
        selectVal.append($("<option>Between</option>"));
        ValueTextBox.show();
        //DateTimeFormatLabel.hide();
        ValueTextBox.attr("placeholder", "");
        ValueTextBoxForBetween.hide();
    }
    else if ($(el).val() == 'varchar' || $(el).val() == 'nvarchar' || $(el).val() == 'nchar' || $(el).val() == 'char' || $(el).val() == 'uniqueidentifier') {
        selectVal.append($("<option>Is equal to</option>"));
        selectVal.append($("<option>Is not equal to</option>"));
        selectVal.append($("<option>Starts with</option>"));
        selectVal.append($("<option>Contains</option>"));
        selectVal.append($("<option>Does not contain</option>"));
        selectVal.append($("<option>Ends with</option>"));
        selectVal.append($("<option>In</option>"));
        selectVal.append($("<option>Not in</option>"));
        ValueTextBox.show();
        //DateTimeFormatLabel.hide();
        ValueTextBox.attr("placeholder", "");
        ValueTextBoxForBetween.hide();
    }
    else if ($(el).val() == 'bit') {
        selectVal.append($("<option>Is true</option>"));
        selectVal.append($("<option>Is false</option>"));
        ValueTextBox.hide();
        //DateTimeFormatLabel.hide();
        ValueTextBox.attr("placeholder", "");
    }
    else if ($(el).val() == 'datetime' || $(el).val() == 'date') {
        selectVal.append($("<option>Is equal to</option>"));
        selectVal.append($("<option>Is not equal to</option>"));
        selectVal.append($("<option>Is before</option>"));
        selectVal.append($("<option>Is before or equal to</option>"));
        selectVal.append($("<option>Is after</option>"));
        selectVal.append($("<option>Is after or equal to</option>"));
        selectVal.append($("<option>Between</option>"));
        selectVal.append($("<option>Is today</option>"));
        selectVal.append($("<option>Is greater than or equal to today</option>"));
        selectVal.append($("<option>Is greater than today</option>"));
        selectVal.append($("<option>Is less than or equal to today</option>"));
        selectVal.append($("<option>Is less than today</option>"));
        selectVal.append($("<option>Is in last 7 days</option>"));
        selectVal.append($("<option>Is in next 7 days</option>"));
        selectVal.append($("<option>Is in last 30 days</option>"));
        selectVal.append($("<option>Is in next 30 days</option>"));
        selectVal.append($("<option>Is in the last year</option>"));
        selectVal.append($("<option>Is in the next year</option>"));
        selectVal.append($("<option>Is in the current calendar month</option>"));
        selectVal.append($("<option>Is in the  previous calendar month</option>"));
        selectVal.append($("<option>Is in the next calendar month</option>"));
        ValueTextBox.show();
        ValueTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'mm/dd/yy',
            yearRange: '1995:2025'
        });

        //DateTimeFormatLabel.show();
        ValueTextBox.attr("placeholder", "mm/dd/yyyy");
        ValueTextBoxForBetween.hide();
    }
    else {
        ValueTextBox.show();
        //DateTimeFormatLabel.hide();
        ValueTextBox.attr("placeholder", "");
        ValueTextBoxForBetween.hide();
    }
}

function FilterConditionChange(el) {
    var FilterCriteria = $(el).siblings('select[id^="FilterCriteria"]');
    var ValueTextBoxForBetween = $(el).siblings('input[id^="txtValueForBetween"]');
    var ValueTextBox = $(el).siblings('input[id^="txtValue"]');
    DateTimeFormat = $(el).siblings('label[id^="DateTimeFormat"]');
    ValueTextBox.val('');
    ValueTextBoxForBetween.val('');
    if ($(el).val() == 'Between') {
        ValueTextBox.show();
        ValueTextBoxForBetween.show();
        //DateTimeFormat.show();
        ValueTextBox.attr("placeholder", "mm/dd/yyyy");
        if (FilterCriteria.val() == 'datetime' || $(el).val() == 'date') {
            ValueTextBoxForBetween.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'mm/dd/yy',
                yearRange: '1995:2025'
            });
        }
    }
    else if ($(el).val() == 'Is today' || $(el).val() == 'Is greater than or equal to today' || $(el).val() == 'Is greater than today' ||
        $(el).val() == 'Is less than or equal to today' || $(el).val() == 'Is less than today' || $(el).val() == 'Is in last 7 days' ||
        $(el).val() == 'Is in next 7 days' || $(el).val() == 'Is in last 30 days' || $(el).val() == 'Is in next 30 days' ||
        $(el).val() == 'Is in the last year' || $(el).val() == 'Is in the next year' || $(el).val() == 'Is in the current calendar month' ||
        $(el).val() == 'Is in the next calendar month' || $(el).val() == 'Is in the previous calendar month') {
        //|| $(el).val() == 'Is true' || $(el).val() == 'Is false'
        //ValueTextBox.hide();
        //ValueTextBoxForBetween.hide();
        ////DateTimeFormat.hide();
        //ValueTextBox.attr("placeholder", "");

        ValueTextBox.show();
        ValueTextBoxForBetween.hide();
        ValueTextBoxForBetween.datepicker("destroy");
        //DateTimeFormat.show();
        ValueTextBox.attr("placeholder", "mm/dd/yyyy");

    }
    else if ($(el).val() == 'Is true' || $(el).val() == 'Is false') {
            ValueTextBox.hide();
            ValueTextBoxForBetween.hide();
           //DateTimeFormat.hide();
            ValueTextBox.attr("placeholder", "");
        }
     else{
        //ValueTextBox.show();
        //ValueTextBoxForBetween.hide();
        //ValueTextBoxForBetween.datepicker("destroy");
        ////DateTimeFormat.show();
        //ValueTextBox.attr("placeholder", "mm/dd/yyyy");

        ValueTextBox.show();
        ValueTextBoxForBetween.hide();
        //DateTimeFormat.hide();
        ValueTextBox.attr("placeholder", "");
    }
}

function SortCriteriaChange(el) {
    $('#SortErrorMessage').text('');
    var SortText = $(el).prev();
    SortText.val($(el).find('option:selected').text());
}

function saveCustomReportvalidations(e) {
    var BusinessIDs = [];
    var x = document.getElementById("BussinessUnitId");
    var SelectedBusinessIDCount = 0;
    for (var i = 1; i < x.options.length; i++) {
        if (x.options[i].selected) {
            BusinessIDs[SelectedBusinessIDCount] = x.options[i].value;
            SelectedBusinessIDCount += 1
        }
    }
    if (SelectedBusinessIDCount <= 0) {
        $('#SelectedBusinessIDErrorMessage').text('Please select business unit');
        $('#BussinessUnitId').focus();
    } else {
        $('#SelectedBusinessIDErrorMessage').text('');
    }
    $('#SelectedBusinessUnitIDs').val(BusinessIDs);

    if ($('#ReportName').val() == "") {
        $('#ReportNameErrorMessage').text('Report name required');
        if ($('#SelectedBusinessIDErrorMessage').text() == '') {
            $('#ReportName').focus();
        }
    }
    else {
        $('#ReportNameErrorMessage').text('');
    }
    if ($('#ReportDescription').val() == "") {
        $('#ReportDescErrorMessage').text('Report description required');
        if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '') {
            $('#ReportDescription').focus();
        }
    }
    else {
        $('#ReportDescErrorMessage').text('');
    }

    var SelectedColsError = "";
    var SelectedCols = $('#RequestedColumns li').length;
    if (SelectedCols == 0) {
        $('#SelectedColsErrorMessage').text('Select atleast a field');
        if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '') {
            $('#RequestedColumns').focus();
        }
    }
    else {
        $('#SelectedColsErrorMessage').text('');
    }
    var Fields = [];

    var x = document.getElementById("RequestedColumns");
    for (var i = 0; i < x.children.length; i++) {
        var attr = x.children[i].hasAttribute("name");
        if (attr != undefined && attr != false) {
            Fields[i] = x.children[i].innerHTML + ':' + x.children[i].getAttribute('name');
        }
        else {
            Fields[i] = x.children[i].innerHTML
        }
    }
    $('#FavoriteSelected').val(Fields);

    var FilterType = $('#rdAdvanced').is(':checked');

    //Validations For Filter
    var FilterErrorMsg = "";
    var rowCounterForFilter = 0;
    var AllowedFilter = "";
    $('#FilterErrorMessage').text('');
    $('#tblFilters tr:visible').each(function (i, row) {
        var $row = $(row),

        filtertext = $row.find($('select[id^="FilterCriteria"]')).val(),
       filterConditiontext = $row.find($('select[id^="FilterCondition"]')).val(),
       txtValue = $row.find('input[id^="txtValue"]').val(),
        txtValueForBetween = $row.find('input[id^="txtValueForBetween"]').val(),
        FiltertextHTML = $row.find($('select[id^="FilterCriteria"]')).find('option:selected').text(),
        FilterRowErrorMessage = $row.find($('Label[name^="FilterRowErrorMessage"]'));
        FilterErrorMsg = "";
        if ($row.find('input[id^="txtValueForBetween"]').is(":visible")) {
            if (filtertext == '' || filterConditiontext == '' || txtValue == '' || txtValueForBetween == '') {
                FilterErrorMsg = "FieldError";
            }
            if (filtertext == '' && filterConditiontext == '' && txtValue == '' && txtValueForBetween == '') {
                AllowedFilter = "Yes";
            }
            else {
                AllowedFilter = "No";
            }
            if (FilterErrorMsg == '') {
                if (filtertext == 'int' || filtertext == 'float' || filtertext == 'bigint') {
                    if (isNaN(txtValue) || isNaN(txtValueForBetween)) {
                        FilterErrorMsg = "Error";
                    }
                    if (!isNaN(txtValue) && !isNaN(txtValueForBetween)) {
                        if (parseFloat(txtValueForBetween) < parseFloat(txtValue))
                        { FilterErrorMsg = "In case of between condition second value should be greater than first"; }

                    }
                }
                else if (filtertext == 'datetime' || filtertext == 'date') {
                    var match1 = /^\d{1,2}\/\d{1,2}\/\d{4}$/.exec(txtValue);
                    var match2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/.exec(txtValueForBetween);
                    if (!match1 || !match2) {
                        FilterErrorMsg = "Error";
                    }
                    if (match1 && match2) {
                        if (new Date(txtValueForBetween) < new Date(txtValue))
                        { FilterErrorMsg = "In case of between condition second value should be greater than first"; }
                    }
                }
            }
        }
        else if ($row.find('input[id^="txtValue"]').is(":visible")) {
            if (filtertext == '' || filterConditiontext == '' || txtValue == '') {
                FilterErrorMsg = "FieldError";
            }
            if (filtertext == '' && filterConditiontext == '' && txtValue == '') {
                AllowedFilter = "Yes";
            } else {
                AllowedFilter = "No";
            }
            if (FilterErrorMsg == '') {
                if (filtertext == 'int' || filtertext == 'float' || filtertext == 'bigint') {
                    if (filterConditiontext == 'In' || filterConditiontext == 'Not in') {
                        var match = /^((\d?)|(([-+]?\d+\.?\d*)|([-+]?\d*\.?\d+))|(([-+]?\d+\.?\d*\,\ ?)*([-+]?\d+\.?\d*))|(([-+]?\d*\.?\d+\,\ ?)*([-+]?\d*\.?\d+))|(([-+]?\d+\.?\d*\,\ ?)*([-+]?\d*\.?\d+))|(([-+]?\d*\.?\d+\,\ ?)*([-+]?\d+\.?\d*)))$/.exec(txtValue);

                        if (!match) {
                            FilterErrorMsg = "Error";
                        }
                    }
                    else if (isNaN(txtValue)) {
                        FilterErrorMsg = "Error";
                    }
                }
                else if (filtertext == 'datetime' || filtertext == 'date') {
                    //var match = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.exec(txtValue);
                    var match = /^\d{1,2}\/\d{1,2}\/\d{4}$/.exec(txtValue);
                    if (!match) {
                        FilterErrorMsg = "Error";
                    }
                }
            }
        }
        else {
            if (filtertext == '' || filterConditiontext == '') {
                FilterErrorMsg = "FieldError";
            }
            if (filtertext == '' && filterConditiontext == '') {
                AllowedFilter = "Yes";
            } else {
                AllowedFilter = "No";
            }
            if (filtertext != 'datetime' && filtertext != 'date') {
                $('#tblFilters tr:visible').not($row).each(function (r, OtherRow) {
                    FiltertextOtherRow = $(OtherRow).find($('select[id^="FilterCriteria"]')).find('option:selected').text();
                    if (FiltertextHTML == FiltertextOtherRow) {
                        FilterErrorMsg = "Selected fields in filter criteria list must be unique";
                    }
                })
            }
        }
        rowCounterForFilter += 1;

        if (FilterErrorMsg == "Error") {
            FilterRowErrorMessage.text('Enter valid filter criteria');
            if ($('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#FilterErrorMessage').text('Error');
                $row.find($('input[id^="txtValue"]:not(input[id*="Between"])')).focus();
            }
        }
        else if (FilterErrorMsg == "Selected fields in filter criteria list must be unique") {
            FilterRowErrorMessage.text(FilterErrorMsg);
            if ($('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#FilterErrorMessage').text('Error');
                $row.find($('select[id^="FilterCriteria"]')).focus();
            }
        } else if (FilterErrorMsg == "FieldError" && AllowedFilter != "Yes") {
            FilterRowErrorMessage.text('All fields mandatory');
            if ($('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#FilterErrorMessage').text('Error');
                if (filtertext == '')
                { $row.find($('select[id^="FilterCriteria"]')).focus(); }
                else if (filterConditiontext == '')
                { $row.find($('select[id^="FilterCondition"]')).focus(); }
                else if (txtValue == '') { $row.find($('input[id^="txtValue"]:not(input[id*="Between"])')).focus(); }
                else {
                    $row.find($('input[id^="txtValue"]')).focus();
                }
            }
        } else if (FilterErrorMsg == "In case of between condition second value should be greater than first") {
            FilterRowErrorMessage.text(FilterErrorMsg);
            if ($('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#FilterErrorMessage').text('Error');
                $row.find($('input[id^="txtValue"]:not(input[id*="Between"])')).focus();
            }
        }
        else {
            FilterRowErrorMessage.text('');
        }
    })
    if (FilterType) {
        var Columns = [];
        var AdvancedColumnCount = 0;
        var x = document.getElementById("AdvancedColumns");
        for (var i = 0; i < x.children.length; i++) {
            Columns[i] = x.children[i].innerHTML;
            AdvancedColumnCount++;
        }

        if (AdvancedColumnCount <= 0 || AdvancedColumnCount > 10) {
            if (AdvancedColumnCount <= 0)
            { $('#AdvancedColumnsErrorMessage').text('Please select atleast a column'); }
            else { $('#AdvancedColumnsErrorMessage').text('Maximum 10 columns are allowed'); }
            if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#AdvancedColumns').focus();
            }
        } else {
            $('#AdvancedColumnsErrorMessage').text('');
        }
        $('#ColumnsSelected').val(Columns);

        var Rows = [];
        var AdvancedRowCount = 0;
        var y = document.getElementById("AdvancedRows");
        for (var i = 0; i < y.children.length; i++) {
            Rows[i] = y.children[i].innerHTML;
            AdvancedRowCount++;
        }
        if ((AdvancedRowCount <= 0 || AdvancedRowCount > 10) && $('#AdvancedColumnsErrorMessage').text() == '') {
            if (AdvancedRowCount <= 0)
            { $('#AdvancedRowsErrorMessage').text('Please select atleast a row'); }
            else { $('#AdvancedRowsErrorMessage').text('Maximum 10 rows are allowed'); }
            if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#AdvancedRows').focus();
            }
        } else {
            $('#AdvancedRowsErrorMessage').text('');
        }

        $('#RowsSelected').val(Rows);

        var Values = [];
        var ValuesField = [];
        var AdvancedValueCount = 0;
        var z = document.getElementById("AdvancedValues");
        for (var i = 0; i < z.children.length; i++) {
            Values[i] = z.children[i].innerHTML;
            ValuesField[i] = z.children[i].innerHTML.split(" ").splice(-1)[0];
            AdvancedValueCount++;
        }
        if ((AdvancedValueCount <= 0 || AdvancedValueCount > 3) && $('#AdvancedColumnsErrorMessage').text() == '' && $('#AdvancedRowsErrorMessage').text() == '') {
            if (AdvancedValueCount <= 0) {
                $('#AdvancedValuesErrorMessage').text('Please select atleast a value');
            }
            else { $('#AdvancedValuesErrorMessage').text('Maximum 3 values are allowed'); }
            if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                $('#AdvancedValues').focus();
            }
        } else {
            $('#AdvancedValuesErrorMessage').text('');
        }
        $('#ValuesSelected').val(Values);

        var common_Rows_Cols = $.grep(Rows, function (element) {
            return $.inArray(element, Columns) !== -1;
        });
        var common_Rows_Vals = $.grep(Rows, function (element) {
            return $.inArray(element, ValuesField) !== -1;
        });
        var common_Cols_Vals = $.grep(Columns, function (element) {
            return $.inArray(element, ValuesField) !== -1;
        });
        if ($('#AdvancedValuesErrorMessage').text() == '' && $('#AdvancedColumnsErrorMessage').text() == '' && $('#AdvancedRowsErrorMessage').text() == '') {
            if (common_Rows_Cols.length > 0 || common_Rows_Vals.length > 0 || common_Cols_Vals > 0) {
                $('#AdvancedColumnsErrorMessage').text('Columns, rows and values field should be unique');
                if ($('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#AdvancedColumns').focus();
                }
            }
            else { $('#AdvancedColumnsErrorMessage').text('') };
        }

        if ($('#FilterErrorMessage').text() == "" && $('#AdvancedColumnsErrorMessage').text() == "" && $('#AdvancedRowsErrorMessage').text() == '' && $('#AdvancedValuesErrorMessage').text() == "" && $('#SelectedColsErrorMessage').text() == "" && SelectedBusinessIDCount > 0 && $('#ReportNameErrorMessage').text() == "" && $('#ReportDescErrorMessage').text() == "") {
            if ($('#BussinessUnitId').attr('multiple') == 'multiple') {
                $('#BussinessUnitId option:first').removeAttr('selected');
            }
            return true;
        }
        else {
            return false;
        }
    }
    else {

        //Validations For Sort
        var SortErrorMsg = "";
        var rowCounter = 0;
        var AllowedSort = "";
        $('#SortErrorMessage').text('');
        $('#tblSort tr:visible').each(function (i, row) {

            var $row = $(row),

           Sorttext = $row.find($('select[id^="SortCriteria"]')).val(),
           SorttextHTML = $row.find($('select[id^="SortCriteria"]')).find('option:selected').text(),
           SortConditiontext = $row.find($('select[id^="SortCondition"]')).val(),
            SortRowErrorMessage = $row.find($('Label[name^="SortRowErrorMessage"]'));
            SortErrorMsg = "";
            if (Sorttext == '' || SortConditiontext == '') {
                SortErrorMsg = "FieldError";
            } if (Sorttext == '' && SortConditiontext == '') {
                AllowedSort = "Yes";
            } else {
                AllowedSort = "No";
            }
            $('#tblSort tr:visible').not($row).each(function (r, OtherRow) {
                SorttextOtherRow = $(OtherRow).find($('select[id^="SortCriteria"]')).find('option:selected').text();
                if (SorttextHTML == SorttextOtherRow && SorttextHTML != "--Select Criteria--") {
                    SortErrorMsg = "Selected fields in sort criteria list must be unique";
                }
            })
            rowCounter += 1;

            if (SortErrorMsg == "Selected fields in sort criteria list must be unique") {
                SortRowErrorMessage.text(SortErrorMsg);
                if ($('#SortErrorMessage').text() == '' && $('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#SortErrorMessage').text('Error');
                    $row.find($('select[id^="SortCriteria"]')).focus();
                }
            } else if (SortErrorMsg == "FieldError" && AllowedSort != "Yes") {
                SortRowErrorMessage.text('All fields mandatory');
                if ($('#SortErrorMessage').text() == '' && $('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#SortErrorMessage').text('Error');
                    if (Sorttext == '') {
                        $row.find($('select[id^="SortCriteria"]')).focus();
                    }
                    else { $row.find($('select[id^="SortCondition"]')).focus(); }
                }
            }
            else {
                SortRowErrorMessage.text('');
            }
        })

        //Validations For Aggregate
        var AggregateErrorMsg = "";
        var rowCounterForAggregate = 0;
        var AllowedAggregate = "";
        var strParent = [];
        var ComputedFields = "";
        if ($('#hdComputedFields').val() != '') {
            strParent = $('#hdComputedFields').val().split(';');
            for (var i = 0; i < strParent.length - 1; i++) {
                var strChild = strParent[i].split('{');
                for (var j = 1; j < strChild.length; j++) {
                    var str = strChild[j].substr(0, strChild[j].indexOf('}')),
                    CompSelected = str.substr(1, str.length - 3);
                    if (ComputedFields != '') {
                        ComputedFields += ',';
                    }
                    ComputedFields += CompSelected;
                }
            }
        }
        var CompF = [];
        if (ComputedFields != "") {
            CompF = ComputedFields.split(',');
        }

        $('#AggErrorMessage').text('');
        $('#tblAgg tr:visible').each(function (i, row) {
            var $row = $(row),
           Aggtext = $row.find($('select[id^="AggCriteria"]')).val(),
           AggtextHTML = $row.find($('select[id^="AggCriteria"]')).find('option:selected').text(),
           AggtxtValue = $row.find('input[id^="AggtxtValue"]').val(),
           AggConditiontext = $row.find($('select[id^="AggCondition"]')).val(),
            AggRowErrorMessage = $row.find($('Label[name^="AggRowErrorMessage"]'));
            AggregateErrorMsg = "";
            if (Aggtext == '' || AggConditiontext == '' || AggtxtValue == '') {
                AggregateErrorMsg = "FieldError";
            } if (Aggtext == '' && AggConditiontext == '' && AggtxtValue == '') {
                AllowedAggregate = "Yes";
            } else {
                AllowedAggregate = "No";
            }

            if (CompF.length > 0 && $.inArray(AggtextHTML, CompF) != -1 && AggtextHTML != '' && AggregateErrorMsg == '') {
                AggregateErrorMsg = 'Exist';
            }
            rowCounterForAggregate += 1;

            if (AggregateErrorMsg == "FieldError" && AllowedAggregate != "Yes") {
                AggRowErrorMessage.text('All fields mandatory');
                if ($('#AggErrorMessage').text() == '' && $('#SortErrorMessage').text() == '' && $('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#AggErrorMessage').text('Error');
                    if (Aggtext == '') {
                        $row.find($('select[id^="AggCriteria"]')).focus();
                    }
                    else if (AggConditiontext == '') {
                        $row.find($('select[id^="AggCondition"]')).focus();
                    }
                    else { $row.find($('input[id^="AggtxtValue"]')).focus(); }
                }
            }
            else if (AggregateErrorMsg == "Exist" && AllowedAggregate != "Yes") {
                AggRowErrorMessage.text('Anything used in computed fields cannot be selected in aggregate criteria');
                $('#AggErrorMessage').text('Error');
                $row.find($('select[id^="AggCriteria"]')).focus();
            }
            else {
                AggRowErrorMessage.text('');
            }
        })

        //Validations For GroupBy
        var GroupByErrorMessage = "";
        var rowCounterForGroupBy = 0;
        var AllowedGroupBy = "";
        $('#GroupByErrorMessage').text('');
        $('#tblGroupBy tr:visible').each(function (i, row) {
            var $row = $(row),
            GroupOntext = $row.find($('select[id^="GroupOnCriteria"]')).val(),
            GroupBytext = $row.find($('select[id^="GroupByCriteria"]')).val(),
            GroupByText = $row.find('input[id^="GroupByText"]'),
            GroupByTextHTML = $row.find($('select[id^="GroupByCriteria"]')).find('option:selected').text(),
            GroupByConditiontext = $row.find($('select[id^="GroupByCondition"]')).val(),
            GroupByRowErrorMessage = $row.find($('Label[name^="GroupByRowErrorMessage"]'));
            GroupByText.val($row.find('select[id^="GroupByCriteria"]').find('option:selected').html());

            GroupByErrorMessage = "";
            if (GroupOntext == '' || GroupBytext == '' || GroupByConditiontext == '') {
                GroupByErrorMessage = "FieldError";
            } if (GroupOntext == '' && GroupBytext == '' && GroupByConditiontext == '') {
                AllowedGroupBy = "Yes";
            } else {
                AllowedGroupBy = "No";
            }
            $('#tblGroupBy tr:visible').not($row).each(function (r, OtherRow) {
                GrouptextOtherRow = $(OtherRow).find($('select[id^="GroupByCriteria"]')).find('option:selected').text();
                if (GroupByTextHTML == GrouptextOtherRow && GroupByTextHTML != $("label[for='DefaultValueForGroupBy']").text()) {
                    GroupByErrorMessage = "Selected fields in Subtotal criteria list must be unique";
                }
            })
            rowCounterForGroupBy += 1;
            if (GroupByErrorMessage == "Selected fields in Subtotal criteria list must be unique") {
                GroupByRowErrorMessage.text(GroupByErrorMessage);
                if ($('#GroupByErrorMessage').text() == '' && $('#AggErrorMessage').text() == '' && $('#SortErrorMessage').text() == '' && $('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#GroupByErrorMessage').text('Error');
                    $row.find($('select[id^="GroupByCriteria"]')).focus();
                }
            }
            else if (GroupByErrorMessage == "FieldError" && AllowedGroupBy != "Yes") {
                GroupByRowErrorMessage.text('All fields mandatory');
                if ($('#GroupByErrorMessage').text() == '' && $('#AggErrorMessage').text() == '' && $('#SortErrorMessage').text() == '' && $('#FilterErrorMessage').text() == '' && $('#SelectedBusinessIDErrorMessage').text() == '' && $('#ReportNameErrorMessage').text() == '' && $('#ReportDescErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == '') {
                    $('#GroupByErrorMessage').text('Error');
                    if (GroupOntext == '') {
                        $row.find($('select[id^="GroupOnCriteria"]')).focus();
                    }
                    else if (GroupBytext == '') {
                        $row.find($('select[id^="GroupByCriteria"]')).focus();
                    } else if (GroupByConditiontext == '') {
                        $row.find($('select[id^="GroupByCondition"]')).focus();
                    }
                    else { $row.find($('input[id^="GroupBytxtValue"]')).focus(); }
                }
            }
            else {
                GroupByRowErrorMessage.text('');
            }
        })




        if ($('#FilterErrorMessage').text() == "" && $('#SortErrorMessage').text() == "" && $('#AggErrorMessage').text() == '' && $('#GroupByErrorMessage').text() == '' && $('#SelectedColsErrorMessage').text() == "" && SelectedBusinessIDCount > 0 && $('#ReportNameErrorMessage').text() == "" && $('#ReportDescErrorMessage').text() == "") {
            if ($('#BussinessUnitId').attr('multiple') == 'multiple') {
                $('#BussinessUnitId option:first').removeAttr('selected');
            }
            return true;
        }
        else {
            return false;
        }
    }

}

function IsAdvancedChange(el) {
    if ($(el).is(':checked')) {
        var FilterType = $(el).val();
        if (FilterType == 'True') {
            $('#tdAdvanced').show();
            $('#tdBasic').hide();
            $('rdAdvanced').attr('selected', 'selected');
            $('rdBasic').removeAttr('selected');
        }
        else {
            $('#tdAdvanced').hide();
            $('#tdBasic').show();
            $('rdBasic').attr('selected', 'selected');
            $('rdAdvanced').removeAttr('selected');
        }
        $('#IsAdvanced').val(FilterType);
    }
}

function SaveFiltersToLoad() {
    $('#tblFilters tr:visible').each(function () {
        filterCriteria = $(this).find($('select[id^="FilterCriteria"]')).find('option:selected').html();
        filterCondition = $(this).find($('select[id^="FilterCondition"]')).find('option:selected').html();
        filterText = $(this).find('input[id^="FilterText"]');
        filterConditionText = $(this).find('input[id^="FilterConditionText"]');

        txtValue = $(this).find('input[id^="txtValue"]').val();
        hdtxtValue = $(this).find('input[id^="hdtxtValue"]');
        txtValueForBetween = $(this).find('input[id^="txtValueForBetween"]').val();
        hdtxtValueForBetween = $(this).find('input[id^="hdtxtValueForBetween"]');

        filterText.text(filterCriteria);
        filterConditionText.text(filterCondition);
        hdtxtValue.val(txtValue);
        if (filterCondition == "Between") {
            hdtxtValueForBetween.val(txtValueForBetween);

        } else {
            hdtxtValueForBetween.val('');
        }
    });
    $('#tblSort tr:visible').each(function () {
        sortCriteria = $(this).find($('select[id^="SortCriteria"]')).find('option:selected').html();
        sortCondition = $(this).find($('select[id^="SortCondition"]')).find('option:selected').html();
        sortText = $(this).find('input[id^="SortText"]');
        sortConditionText = $(this).find('input[id^="SortConditionText"]');
        sortText.text(sortCriteria);
        sortConditionText.text(sortCondition);
    });
    $('#tblGroupBy tr:visible').each(function () {
        groupOnCriteria = $(this).find($('select[id^="GroupOnCriteria"]')).find('option:selected').html();
        groupByCriteria = $(this).find($('select[id^="GroupByCriteria"]')).find('option:selected').html();
        groupByCondition = $(this).find($('select[id^="GroupByCondition"]')).find('option:selected').html();
        groupBytxtValue = $(this).find('input[id^="GroupBytxtValue"]').val();

        groupOnText = $(this).find('input[id^="GroupOnText"]');
        groupByText = $(this).find('input[id^="GroupByText"]');
        groupByConditionText = $(this).find('input[id^="GroupByConditionText"]');
        hdnGroupBytxtValue = $(this).find('input[id^="hdnGroupBytxtValue"]');

        groupOnText.text(groupOnCriteria);
        groupByText.text(groupByCriteria);
        groupByConditionText.text(groupByCondition);
        hdnGroupBytxtValue.val(groupBytxtValue);
    });
    $('#tblAgg tr:visible').each(function () {
        aggCriteria = $(this).find($('select[id^="AggCriteria"]')).find('option:selected').html();
        aggCondition = $(this).find($('select[id^="AggCondition"]')).find('option:selected').html();
        aggtxtValue = $(this).find('input[id^="AggtxtValue"]').val();

        aggText = $(this).find('input[id^="AggText"]');
        aggConditionText = $(this).find('input[id^="AggConditionText"]');
        hdnAggtxtValue = $(this).find('input[id^="hdnAggtxtValue"]');

        aggText.text(aggCriteria);
        aggConditionText.text(aggCondition);
        hdnAggtxtValue.val(aggtxtValue);
    });

}

function RefreshFilters() {
    //var Fields = [];

    $('select[id^="FilterCriteria"]').find('option:gt(0)').remove();
    $('select[id^="SortCriteria"]').find('option:gt(0)').remove();
    $('select[id^="GroupOnCriteria"]').find('option:gt(0)').remove();
    $('select[id^="GroupByCriteria"]').find('option:gt(0)').remove();
    $('select[id^="AggCriteria"]').find('option:gt(0)').remove();

    var x = document.getElementById("RequestedColumns");
    for (var i = 0; i < x.children.length; i++) {
        //Fields[i] = x.children[i].innerHTML;
        var attr = x.children[i].hasAttribute("name");
        if (attr != undefined && attr != false) {
            $('select[id^="FilterCriteria"]')
                  .append($("<option></option>")
             .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
              .text(x.children[i].innerHTML));

            $('select[id^="SortCriteria"]')
                         .append($("<option></option>")
                         .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
              .text(x.children[i].innerHTML));

            $('select[id^="GroupOnCriteria"]')
                        .append($("<option></option>")
                     .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
              .text(x.children[i].innerHTML));

            //$('select[id^="GroupByCriteria"]')
            //             .append($("<option></option>")
            //            .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
            //  .text(x.children[i].innerHTML));

            $('select[id^="AggCriteria"]')
                            .append($("<option></option>")
                           .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
              .text(x.children[i].innerHTML));
        }
        else {
            $('select[id^="FilterCriteria"]')
                   .append($("<option></option>")
                .attr("value", x.children[i].getAttribute('value'))
               .text(x.children[i].innerHTML));

            $('select[id^="SortCriteria"]')
                         .append($("<option></option>")
                       .attr("value", x.children[i].getAttribute('value'))
                     .text(x.children[i].innerHTML));

            $('select[id^="GroupOnCriteria"]')
                        .append($("<option></option>")
                    .attr("value", x.children[i].getAttribute('value'))
                    .text(x.children[i].innerHTML));

            //$('select[id^="GroupByCriteria"]')
            //             .append($("<option></option>")
            //          .attr("value", x.children[i].getAttribute('value'))
            //         .text(x.children[i].innerHTML));

            $('select[id^="AggCriteria"]')
                            .append($("<option></option>")
                         .attr("value", x.children[i].getAttribute('value'))
                        .text(x.children[i].innerHTML));
        }

        //$('#FavoriteSelected').val(Fields);
        $('select[id^="FilterCondition"]').find('option:gt(0)').remove();
        $('select[id^="SortCondition"]').find("option:contains(--Select Condition--)").attr('selected', 'selected');
        $('select[id^="GroupByCondition"]').find("option:contains(--Select Condition--)").attr('selected', 'selected');
        $('select[id^="AggCondition"]').find('option:gt(0)').remove();
    }
}

function LoadFilters() {
    $('#tblFilters tr:visible').each(function () {
        filterCriteria = $(this).find($('select[id^="FilterCriteria"]'));
        filterCondition = $(this).find($('select[id^="FilterCondition"]'));
        Value = $(this).find('input[id^="txtValue"]');
        DateTimeFormat = $(this).find('label[id^="DateTimeFormat"]');
        filterText = $(this).find('input[id^="FilterText"]').text();
        filterConditionText = $(this).find('input[id^="FilterConditionText"]').text();

        hdtxtValue = $(this).find('input[id^="hdtxtValue"]').val();
        txtValueForBetween = $(this).find('input[id^="txtValueForBetween"]');
        hdtxtValueForBetween = $(this).find('input[id^="hdtxtValueForBetween"]').val();

        filterCriteria.find("option:contains(" + filterText + ")").attr('selected', 'selected');
        filterCriteria.change();
        filterCondition.find("option:contains(" + filterConditionText + ")").filter(function () {
            return $(this).text() === filterConditionText;
        }).attr('selected', 'selected');
        Value.val(hdtxtValue);
        if (filterCriteria.find("option:selected").text() == "--Select Criteria--") {
            Value.val("");
        }
        //Added on 30-Oct-2017 to fix the issue reported by mail on 19-Oct-2017
        if (filterCriteria[0].selectedOptions[0].value == 'datetime' || filterCriteria[0].selectedOptions[0].value == 'date') {
            //DateTimeFormat.show();
            Value.attr("placeholder", "mm/dd/yyyy");
        } else {
            //DateTimeFormat.hide();
            Value.attr("placeholder", "");
        }
        //End
        if (filterCondition.val() == "Between") {
            txtValueForBetween.show();
            txtValueForBetween.val(hdtxtValueForBetween);
        } else if (filterCondition.val() == 'Is today' || filterCondition.val() == 'Is greater than or equal to today' || filterCondition.val() == 'Is greater than today' ||
                    filterCondition.val() == 'Is less than or equal to today' || filterCondition.val() == 'Is less than today' || filterCondition.val() == 'Is in last 7 days' ||
                    filterCondition.val() == 'Is in next 7 days' || filterCondition.val() == 'Is in last 30 days' || filterCondition.val() == 'Is in next 30 days' ||
                    filterCondition.val() == 'Is in the last year' || filterCondition.val() == 'Is in the current calendar month' ||
                    filterCondition.val() == 'Is in the previous calendar month' || filterCondition.val() == 'Is in the next calendar month' || filterCondition.val() == 'Is in the next year') {
            Value.hide();
            DateTimeFormat.hide();
        }
        else {
            txtValueForBetween.val('');
        }
    });

    $('#tblSort tr:visible').each(function () {
        sortCriteria = $(this).find($('select[id^="SortCriteria"]'));
        sortCondition = $(this).find($('select[id^="SortCondition"]'));
        sortText = $(this).find('input[id^="SortText"]').text();
        sortConditionText = $(this).find('input[id^="SortConditionText"]').text();
        sortCriteria.find("option:contains(" + sortText + ")").attr('selected', 'selected');
        sortCriteria.change();
        sortCondition.find("option:contains(" + sortConditionText + ")").filter(function () {
            return $(this).text() === sortConditionText;
        }).attr('selected', 'selected');
        if (sortCriteria.find("option:selected").text() == "--Select Criteria--") {
            sortCondition.find("option:contains(--Select Condition--)").attr('selected', 'selected');
        }
    });

    $('#tblGroupBy tr:visible').each(function () {
        groupOnCriteria = $(this).find($('select[id^="GroupOnCriteria"]'));
        groupByCriteria = $(this).find($('select[id^="GroupByCriteria"]'));
        groupByCondition = $(this).find($('select[id^="GroupByCondition"]'));
        groupBytxtValue = $(this).find('input[id^="GroupBytxtValue"]');

        groupOnText = $(this).find('input[id^="GroupOnText"]').text();
        groupByText = $(this).find('input[id^="GroupByText"]').text();
        groupByConditionText = $(this).find('input[id^="GroupByConditionText"]').text();
        hdnGroupBytxtValue = $(this).find('input[id^="hdnGroupBytxtValue"]').val();

        groupOnCriteria.find("option:contains(" + groupOnText + ")").attr('selected', 'selected');
        groupOnCriteria.change();
        groupByCondition.find("option:contains(" + groupByConditionText + ")").attr('selected', 'selected');
        groupByCondition.change();
        groupByCriteria.find("option:contains(" + groupByText + ")").attr('selected', 'selected');
        groupBytxtValue.val(hdnGroupBytxtValue);

        if (groupOnCriteria.find("option:selected").text() == "--Select Criteria--") {
            groupBytxtValue.val("");
        }
    });

    $('#tblAgg tr:visible').each(function () {
        aggCriteria = $(this).find($('select[id^="AggCriteria"]'));
        aggCondition = $(this).find($('select[id^="AggCondition"]'));
        aggtxtValue = $(this).find('input[id^="AggtxtValue"]');

        aggText = $(this).find('input[id^="AggText"]').text();
        aggConditionText = $(this).find('input[id^="AggConditionText"]').text();
        hdnAggtxtValue = $(this).find('input[id^="hdnAggtxtValue"]').val();

        aggCriteria.find("option:contains(" + aggText + ")").attr('selected', 'selected');
        aggCriteria.change();
        aggCondition.find("option:contains(" + aggConditionText + ")").attr('selected', 'selected');
        aggtxtValue.val(hdnAggtxtValue);

        if (aggCriteria.find("option:selected").text() == "--Select Criteria--") {
            aggtxtValue.val("");
        }
    });

}

function MakeOptionsDraggable() {
    $('#RequestedColumns li').draggable({
        appendTo: 'body',
        connectWith: ".dropSelect",
        helper: "clone",
        drag: function (ev, ui) {
            return $('<div>' + $(this).text() + '</div>');
        },
        cancel: ''
    });

    //$('.dropSelect').droppable({
    //    drop: function (ev, ui) {
    //        if ($(this).find('li:contains(' + ui.draggable.clone().html() + ')').length <= 0) {
    //            ui.draggable.clone().appendTo(this);
    //        }
    //    }
    //});
    //$("#RequestedColumns li").mousedown(function () {
    //    $("#RequestedColumns li").removeClass("ui-state-disabled");
    //    $("#RequestedColumns li").draggable('enable');
    //}).mouseup(function () {
    //    $("#RequestedColumns li").draggable('disable');
    //    $("#RequestedColumns li").removeClass("ui-state-disabled")
    //});
}

function Add(e) {
    $('#AvailableFields > li.selected').appendTo('#RequestedColumns');
    $('#AvailableFields li.selected').remove();
    $('#RequestedColumns li.selected').removeClass('selected');
    MakeOptionsDraggable();
    SaveFiltersToLoad();
    RefreshFilters();
    LoadFilters();
    e.preventDefault();
}

function AddAll(e) {
    $('#AvailableFields > li').appendTo('#RequestedColumns');
    $('#RequestedColumns li.selected').removeClass('selected');
    MakeOptionsDraggable();
    SaveFiltersToLoad();
    RefreshFilters();
    LoadFilters();
    e.preventDefault();
}

function Remove(e) {
    $('#RequestedColumns > li.selected').appendTo('#AvailableFields');
    $('#RequestedColumns li.selected').remove();
    $('#AvailableFields li.selected').removeClass('selected');

    SaveFiltersToLoad();
    RefreshFilters();
    LoadFilters();
    e.preventDefault();
}

function RemoveAll(e) {
    $('#RequestedColumns > li').appendTo('#AvailableFields');
    $('#AvailableFields li.selected').removeClass('selected');
    SaveFiltersToLoad();
    RefreshFilters();
    LoadFilters();
    e.preventDefault();
}

function Up() {
    $('#RequestedColumns > li.selected').each(function (i, selected) {
        if (!$(this).prev().length) return false;
        $(this).insertBefore($(this).prev());
    });
}

function Down() {
    $($('#RequestedColumns > li.selected').get().reverse()).each(function (i, selected) {
        if (!$(this).next().length) return false;
        $(this).insertAfter($(this).next());
    });
}

function addFilter() {
    var itemIndex = $('#tblFilters tr').length;
    $("#tblFilters tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($('#tblFilters')).show();
};

function deleteFilter() {
    var itemIndex = $('#tblFilters tr').length;

    if (itemIndex != 1) {
        var par = $(this).parent().parent();
        par.remove();
    }
};

function addSort() {

    var itemIndex = $('#tblSort tr').length;
    $("#tblSort tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($('#tblSort')).show();
    adjustSortRow();
};

function deleteSort() {
    var itemIndex = $('#tblSort tr').length;
    if (itemIndex != 1) {
        var par = $(this).parent().parent();
        par.remove();
    }
    adjustSortRow();
};

function addGroupBy() {
    var itemIndex = $('#tblGroupBy tr').length;
    $("#tblGroupBy tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($('#tblGroupBy')).show();

    adjustGroupByRow();
};

function deleteGroupBy() {
    var itemIndex = $('#tblGroupBy tr').length;

    if (itemIndex != 1) {
        var par = $(this).parent().parent();
        par.remove();
    }

    adjustGroupByRow();
};

function addAgg() {
    var itemIndex = $('#tblAgg tr').length;
    $("#tblAgg tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($('#tblAgg')).show();

};

function deleteAgg() {
    var itemIndex = $('#tblAgg tr').length;

    if (itemIndex != 1) {
        var par = $(this).parent().parent();
        par.remove();
    }
};

function AddComputedFieldsBox() {
    var itemIndex = 0;
    if ($('#tblCompParent .box2').length == 1) {
        itemIndex = 1;
    }
    else {
        itemIndex = parseInt($('.trCompParent').last().find($("input[id^='ComputedField']")).parent().attr('id')) + 1;
    }

    //var itemIndex = $('#tblCompParent .box2').length;
    $("#tblCompParent tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($('#tblCompParent')).show();
    HandleCompFieldConditionDisplay();

    //No Computed Field msg show/hide
    if ($('#tblCompParent .trCompParent:visible').length == 0) {
        $('#lbNocompF').attr({ 'style': "display : Block ; color:red; padding-left:7px; " });
    }
    else {
        $('#lbNocompF').attr({ 'style': "display : none;" });
    }
};

function DeleteComputedFieldsBox() {
    var Alias = $(this).parent().parent().find($('input[id^="ComputedField"]')).val();
    var AliasTextBoxID = $(this).parent().parent().find($('input[id^="ComputedField"]')).attr('id');

    if (Alias != "") {
        if ($('select[id^="CompFieldCriteria"]').find("option:contains(" + Alias + ")").length > 0) {
            $('select[id^="CompFieldCriteria"]').find("option:contains(" + Alias + ")").remove();
        }
    }
    if ($('#AvailableFields').find('li[name="' + AliasTextBoxID + '"]').length > 0) {
        $('#AvailableFields').find('li[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('#RequestedColumns').find('li[name="' + AliasTextBoxID + '"]').length > 0) {
        $('#RequestedColumns').find('li[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('#AdvancedColumns').find('li[name="' + AliasTextBoxID + '"]').length > 0) {
        $('#AdvancedColumns').find('li[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('#AdvancedRows').find('li[name="' + AliasTextBoxID + '"]').length > 0) {
        $('#AdvancedRows').find('li[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('#AdvancedValues').find('li[name="' + AliasTextBoxID + '"]').length > 0) {
        $('#AdvancedValues').find('li[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('select[id^="FilterCriteria"]').find('option[name="' + AliasTextBoxID + '"]').length > 0) {
        $('select[id^="FilterCriteria"]').find('option[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('select[id^="SortCriteria"]').find('option[name="' + AliasTextBoxID + '"]').length > 0) {
        $('select[id^="SortCriteria"]').find('option[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('select[id^="AggCriteria"]').find('option[name="' + AliasTextBoxID + '"]').length > 0) {
        $('select[id^="AggCriteria"]').find('option[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('select[id^="GroupOnCriteria"]').find('option[name="' + AliasTextBoxID + '"]').length > 0) {
        $('select[id^="GroupOnCriteria"]').find('option[name="' + AliasTextBoxID + '"]').remove();
    }
    if ($('select[id^="GroupByCriteria"]').find('option[name="' + AliasTextBoxID + '"]').length > 0) {
        $('select[id^="GroupByCriteria"]').find('option[name="' + AliasTextBoxID + '"]').remove();
    }
    var par = $(this).parent().parent().parent().parent();
    par.remove();

    //No Computed Field msg show/hide
    if ($('#tblCompParent .trCompParent:visible').length == 0) {
        $('#lbNocompF').attr({ 'style': "display : Block ; color:red; padding-left:7px; " });
    }
    else {
        $('#lbNocompF').attr({ 'style': "display : none;" });
    }
};

function addCompField() {
    var itemIndex = $(this).parent().parent().parent().parent().parent().attr('id');
    $('#tblCompParent .trCompParent:first').find("tr:first").clone(true).find("*").each(function () {
        $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
    }).end().appendTo($(this).parent().parent().parent()).show();

    //if ($('input[id="ComputedField' + itemIndex + '"]').val() != '')
    //{
    //     var Alias = $('input[id="ComputedField' + itemIndex + '"]').val();
    //    if ($('select[id^="CompFieldCriteria' + itemIndex + '"]').find("option:contains(" + Alias + ")").length > 0)
    //    {
    //        $('select[id^="CompFieldCriteria' + itemIndex + '"]').find("option:contains(" + Alias + ")").remove();
    //    }
    //}

    //To remove other lower alias from upper box   

    var NumCompFields = 1;
    var Index = itemIndex;
    while (NumCompFields <= Index) {
        if ($('input[id="ComputedField' + Index + '"]').length > 0 && $('input[id="ComputedField' + Index + '"]').val() != '') {
            var Alias = $('input[id="ComputedField' + Index + '"]').attr('id');
            if ($('select[id^="CompFieldCriteria' + itemIndex + '"]').find("option[value='" + Alias + "']").length > 0) {
                $('select[id^="CompFieldCriteria' + itemIndex + '"]').find("option[value='" + Alias + "']").remove();
            }
        }
        Index--;
    }

    //To add all the upper box alias to lower criteria
    var BoxIndex = itemIndex;
    var BoxCount = 1;

    while (BoxCount < BoxIndex) {
        if ($('input[id="ComputedField' + BoxCount + '"]').length > 0 && $('input[id="ComputedField' + BoxCount + '"]').val() != '') {
            var Alias = $('input[id="ComputedField' + BoxCount + '"]').attr('id');
            if ($('select[id^="CompFieldCriteria' + BoxIndex + '"]').find("option[value='" + Alias + "']").length > 0) {
                if ($('select[id^="CompFieldCriteria' + BoxIndex + '"]').find("option[value='" + Alias + "']").text() != $('input[id="ComputedField' + BoxCount + '"]').val()) {
                    $('select[id^="CompFieldCriteria' + BoxIndex + '"]').find("option[value='" + Alias + "']").remove();
                    $('select[id^="CompFieldCriteria' + BoxIndex + '"]').append($("<option></option>").attr("value", Alias).text($('input[id="ComputedField' + BoxCount + '"]').val()));
                }
            } else {
                $('select[id^="CompFieldCriteria' + BoxIndex + '"]').append($("<option></option>").attr("value", Alias).text($('input[id="ComputedField' + BoxCount + '"]').val()));
            }
        }
        BoxCount++;
    }
    HandleCompFieldConditionDisplay();
};

function deleteCompField() {
    var parent = $(this).parent().parent().parent();
    var itemIndex = parent.find('tr').length;
    if (itemIndex != 1) {
        var par = $(this).parent().parent();
        par.remove();
    }
    HandleCompFieldConditionDisplay();
};

function HandleCompFieldConditionDisplay() {
    $('#tblCompParent .trCompParent:visible').each(function (r, row) {
        var $row = $(row),
        tblCompChild = $row.find($('[id^="tblCompChild"]'));
        tblCompChild.find('.trCompChild').each(function (j, rowChild) {
            var $rowChild = $(rowChild),
            CompFieldCondition = $rowChild.find($('select[id^="CompFieldCondition"]'));
            CompFieldCondition.show();
        });

        tblCompChild.find('.trCompChild:last').each(function (j, rowChild) {
            var $rowChild = $(rowChild),
            CompFieldCondition = $rowChild.find($('select[id^="CompFieldCondition"]'));
            CompFieldCondition.hide();
        });
    });
}

function addFilterCriteria() {
    $('div[id^="FiltersToPopulate_"]').each(function () {
        var FilterID = $(this).attr('id');
        var FilterSplit = FilterID.split("_");
        var FilterSelect = $.trim($(this).children().first().text());
        var FilterCondition = $(this).children().first().next().text();
        var valueText = $(this).children().last().text();

        $('#tblFilters tr:visible').each(function () {
            filtertext = $(this).find($('select[id^="FilterCriteria"]'));
            filterConditiontext = $(this).find($('select[id^="FilterCondition"]')),
            txtValue = $(this).find('input[id^="txtValue"]');
            txtValueForBetween = $(this).find('input[id^="txtValueForBetween"]');
            var TableRowID = txtValue.attr('id');
            var TableIDSplit = TableRowID.split("e");

            if (FilterSplit[1] == TableIDSplit[1]) {
                var x = document.getElementById("RequestedColumns");
                filtertext.find('option:gt(0)').remove();
                for (var i = 0; i < x.children.length; i++) {
                    var attr = x.children[i].hasAttribute("name");
                    if (attr != undefined && attr != false) {
                        filtertext.append($("<option></option>")
                                  .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                                 .text($.trim(x.children[i].innerHTML)));
                    }
                    else {

                        filtertext.append($("<option></option>")
                               .attr("value", x.children[i].getAttribute('value'))
                              .text($.trim(x.children[i].innerHTML)));
                    }
                }
                filtertext.find("option:contains(" + FilterSelect + ")").attr('selected', 'selected');
                filtertext.change();
                filterConditiontext.find("option:contains(" + FilterCondition + ")").filter(function () {
                    return $(this).text() === FilterCondition;
                }).attr('selected', 'selected');
                filterConditiontext.change();
                if (filterConditiontext.val() == 'Between') {
                    txtValueForBetween.show();
                    var textForBetween = valueText.split(",");
                    txtValue.val(textForBetween[0]);
                    txtValueForBetween.val(textForBetween[1]);
                }
                else {
                    txtValue.val(valueText);
                    txtValueForBetween.val('');
                }
                
            }
        });
    });
}

function addSortCriteria() {
    $('div[id^="SortsToPopulate_"]').each(function () {
        var SortID = $(this).attr('id');
        var SortSplit = SortID.split("_");
        var SortSelect = $.trim($(this).children().first().text());
        var SortCondition = $(this).children().last().text();

        $('#tblSort tr:visible').each(function () {
            Sorttext = $(this).find($('select[id^="SortCriteria"]'));
            SortConditiontext = $(this).find($('select[id^="SortCondition"]'));
            var TableRowID = Sorttext.attr('id');
            var TableIDSplit = TableRowID.split("a");

            if (SortSplit[1] == TableIDSplit[1]) {
                var x = document.getElementById("RequestedColumns");
                Sorttext.find('option:gt(0)').remove();
                for (var i = 0; i < x.children.length; i++) {
                    for (var i = 0; i < x.children.length; i++) {
                        var attr = x.children[i].hasAttribute("name");
                        if (attr != undefined && attr != false) {
                            Sorttext.append($("<option></option>")
                                .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                                 .text($.trim(x.children[i].innerHTML)));
                        }
                        else {
                            Sorttext.append($("<option></option>")
                               .attr("value", x.children[i].getAttribute('value'))
                              .text($.trim(x.children[i].innerHTML)));
                        }
                    }
                    Sorttext.find("option:contains(" + SortSelect + ")").attr('selected', 'selected');
                    SortConditiontext.find("option:contains(" + SortCondition + ")").attr('selected', 'selected');
                }
            }
        });
    });
}

function addGroupByCriteria() {
    $('div[id^="GroupByToPopulate_"]').each(function () {
        var GroupID = $(this).attr('id');
        var GroupSplit = GroupID.split("_");
        var GroupOnTxt = $.trim($(this).children().first().text());
        var GroupByTxt = $(this).children().first().next().text();
        var GroupConditionTxt = $(this).children().first().next().next().text();
        var GroupAlias = $(this).children().last().text();

        $('#tblGroupBy tr:visible').each(function () {
            groupOnCriteria = $(this).find($('select[id^="GroupOnCriteria"]'));
            groupByCriteria = $(this).find($('select[id^="GroupByCriteria"]'));
            groupByCondition = $(this).find($('select[id^="GroupByCondition"]')),
            groupBytxtValue = $(this).find('input[id^="GroupBytxtValue"]');

            var TableRowID = groupBytxtValue.attr('id');
            var TableIDSplit = TableRowID.split("e");

            if (GroupSplit[1] == TableIDSplit[1]) {
                var x = document.getElementById("RequestedColumns");
                groupOnCriteria.find('option:gt(0)').remove();
                //groupByCriteria.find('option:gt(0)').remove();
                for (var i = 0; i < x.children.length; i++) {
                    var attr = x.children[i].hasAttribute("name");
                    if (attr != undefined && attr != false) {
                        groupOnCriteria.append($("<option></option>")
                      .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                                 .text($.trim(x.children[i].innerHTML)));
                        //groupByCriteria.append($("<option></option>")
                        //   .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                        //         .text($.trim(x.children[i].innerHTML)));
                    }
                    else {
                        groupOnCriteria.append($("<option></option>")
                      .attr("value", x.children[i].getAttribute('value'))
                              .text($.trim(x.children[i].innerHTML)));
                        //groupByCriteria.append($("<option></option>")
                        //     .attr("value", x.children[i].getAttribute('value'))
                        //      .text($.trim(x.children[i].innerHTML)));
                    }
                }
                groupOnCriteria.find("option:contains(" + GroupOnTxt + ")").attr('selected', 'selected');
                groupOnCriteria.change();
                groupByCondition.find("option:contains(" + GroupConditionTxt + ")").attr('selected', 'selected');
                groupByCondition.change();
                groupByCriteria.find("option:contains(" + GroupByTxt + ")").attr('selected', 'selected');
                //groupByCriteria.change();
                groupBytxtValue.val(GroupAlias);
            }
        });
    });
}

function addAggCriteria() {
    $('div[id^="AggToPopulate_"]').each(function () {
        var AggID = $(this).attr('id');
        var AggSplit = AggID.split("_");
        var AggTxt = $.trim($(this).children().first().text());
        var AggConditionTxt = $(this).children().first().next().text();
        var AggAlias = $(this).children().last().text();

        $('#tblAgg tr:visible').each(function () {
            AggCriteria = $(this).find($('select[id^="AggCriteria"]'));
            AggCondition = $(this).find($('select[id^="AggCondition"]')),
            AggtxtValue = $(this).find('input[id^="AggtxtValue"]');

            var TableRowID = AggtxtValue.attr('id');
            var TableIDSplit = TableRowID.split("e");

            if (AggSplit[1] == TableIDSplit[1]) {
                var x = document.getElementById("RequestedColumns");
                AggCriteria.find('option:gt(0)').remove();
                for (var i = 0; i < x.children.length; i++) {
                    var attr = x.children[i].hasAttribute("name");
                    if (attr != undefined && attr != false) {
                        AggCriteria.append($("<option></option>")
                       .attr("value", x.children[i].getAttribute('value')).attr("name", x.children[i].getAttribute('name'))
                                 .text($.trim(x.children[i].innerHTML)));
                    }
                    else {
                        AggCriteria.append($("<option></option>")
                       .attr("value", x.children[i].getAttribute('value'))
                              .text($.trim(x.children[i].innerHTML)));
                    }
                }
                AggCriteria.find("option:contains(" + AggTxt + ")").attr('selected', 'selected');
                AggCriteria.change();
                AggCondition.find("option:contains(" + AggConditionTxt + ")").attr('selected', 'selected');
                AggtxtValue.val(AggAlias);
            }
        });
    });
}

function addFilterOnCopy_Edit(FilterCount) {
    for (var i = 1; i <= FilterCount; i++) {
        var itemIndex = $('#tblFilters tr').length;
        $("#tblFilters tr:first").clone(true).find("*").each(function () {
            $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
        }).end().appendTo($('#tblFilters')).show();
    }
}

function addSortOnCopy_Edit(SortCount) {
    for (var i = 1; i <= SortCount; i++) {
        var itemIndex = $('#tblSort tr').length;
        $("#tblSort tr:first").clone(true).find("*").each(function () {
            $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
        }).end().appendTo($('#tblSort')).show();
    }
    if ($('#tblSort tr').length == 2) {
        $('.up').hide();
        $('.down').hide();
    } else {
        $('.up').show();
        $('.down').show();
    }
}

function addGroupOnCopy_Edit(GroupByCount) {
    for (var i = 1; i <= GroupByCount; i++) {
        var itemIndex = $('#tblGroupBy tr').length;
        $("#tblGroupBy tr:first").clone(true).find("*").each(function () {
            $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
        }).end().appendTo($('#tblGroupBy')).show();
    }
}

function addAggOnCopy_Edit(AggCount) {
    for (var i = 1; i <= AggCount; i++) {
        var itemIndex = $('#tblAgg tr').length;
        $("#tblAgg tr:first").clone(true).find("*").each(function () {
            $(this).attr('name', this.id + itemIndex).attr('id', this.id + itemIndex);
        }).end().appendTo($('#tblAgg')).show();
    }
}

function GetTemplateFields() {
    $.getJSON("/admin/report/GetTemplateFields", { SelectedTemplateID: $('#SelectedTemplateID').val() },
    function (GetTemplateModel) {
        $("#AvailableFields").empty();
        $("#RequestedColumns").empty();
        $.each(GetTemplateModel, function (i, Field) {
            $("#AvailableFields").append('<li value="' + Field.Value + '">' +
               Field.Text + '</li>');
        });
    });
}

function ComputedFields() {
    $('#divComputedFields').css("text-align", "center");
    $('#divComputedFields').html("<img style='padding-top:200px;' src='/Administration/Images/ajax-loader.gif' />");
    $('#ComputedFieldsWindow').data('tWindow').restore();
    $('#ComputedFieldsWindow' + ' .t-content').css('height', '740px');
    $('#ComputedFieldsWindow' + ' .t-content').css('width', '920px');
    $('#ComputedFieldsWindow').data("tWindow").center().open();
    $.ajax({
        type: "Get",
        url: "/Report/CustomReportComputedFields",
        data: {},
        success: function (data) {
            $('#divComputedFields').attr("style", "");
            $('#divComputedFields').html(data);
            setTimeout(function () { popUpCenter('ComputedFieldsWindow') }, 300);  // Telerik Popup Align Center JS Start
        },
        error: function (data) {
            $('#ComputedFieldsWindow').data("tWindow").close();
        }
    });
}

function OpenCustomReportConfiguration() {
    $('#divConfigureValues').css("text-align", "center");
    $('#divConfigureValues').html("<img style='padding-top:200px;' src='/Administration/Images/ajax-loader.gif' />");
    $('#ConfigureValuesWindow').data('tWindow').restore();
    $('#ConfigureValuesWindow' + ' .t-content').css('height', '250px');
    $('#ConfigureValuesWindow' + ' .t-content').css('width', '300px');
    $('#ConfigureValuesWindow').data("tWindow").center().open();
    $.ajax({
        type: "Get",
        url: "/Report/CustomReportConfigureValues",
        data: {},
        success: function (data) {
            $('#divConfigureValues').attr("style", "");
            $('#divConfigureValues').html(data);
            setTimeout(function () { popUpCenter('ConfigureValuesWindow') }, 300);  // Telerik Popup Align Center JS Start
        },
        error: function (data) {
            $('#ConfigureValuesWindow').data("tWindow").close();
        }
    });
}

function AllowOnlyAlpabets_Numbers() {
    //if (event.shiftKey == true) {
    //    event.preventDefault();
    //}   
    if (!((event.keyCode >= 48 && event.keyCode <= 57 && event.shiftKey == false) ||
        event.keyCode == 8 || (event.keyCode >= 65 && event.keyCode <= 90))) {
        event.preventDefault();
    } else {

    }
    //(event.keyCode >= 97 && event.keyCode <= 122) 
}

function getToolTipTextForGroupOn(el) {
    el.title = $("label[for='ToolTipTextForGroupOn']").text();
}

function getToolTipTextForGroupBy(el) {
    el.title = $("label[for='ToolTipTextForGroupBy']").text();
}

function getGroupOnDefaultText() {
    $('select[id^="GroupOnCriteria"]').find('option:first').text($("label[for='DefaultValueForGroupOn']").text());
    $('select[id^="GroupByCriteria"]').find('option:first').text($("label[for='DefaultValueForGroupBy']").text());
    $("input[id='DefaultValueForGroupOn']").val($("label[for='DefaultValueForGroupOn']").text());
}

function adjustSortRow() {

    if ($('#tblSort tr').length == 2) {
        $('#UpSort')[0].style[0] = 'none';
        $('#DownSort')[0].style[0] = 'none';
    }
    else {
        $('#UpSort')[0].style[0] = 'display';
        $('#DownSort')[0].style[0] = 'display';
    }
    $("#tblSort tr:nth-child(2)").find(".up").hide();
    $("#tblSort tr:nth-child(2)").find(".down").hide();
    if ($('#tblSort tr').length >= 3) {
        $("#tblSort tr:nth-child(2)").find(".down").show();
        for (var i = 3; i < $('#tblSort tr').length ; i++) {
            $("#tblSort tr:nth-child(" + i + ")").find(".down").show();
            $("#tblSort tr:nth-child(" + i + ")").find(".up").show();
        }
        $("#tblSort tr:last").find(".down").hide();
    }
}

function adjustGroupByRow() {

    if ($('#tblGroupBy tr').length == 2) {
        $('#UpSortSubT')[0].style[0] = 'none';
        $('#DownSortSubT')[0].style[0] = 'none';
    }
    else {
        $('#UpSortSubT')[0].style[0] = 'display';
        $('#DownSortSubT')[0].style[0] = 'display';
    }
    $("#tblGroupBy tr:nth-child(2)").find(".up").hide();
    $("#tblGroupBy tr:nth-child(2)").find(".down").hide();
    if ($('#tblGroupBy tr').length >= 3) {
        $("#tblGroupBy tr:nth-child(2)").find(".down").show();
        for (var i = 3; i < $('#tblGroupBy tr').length ; i++) {
            $("#tblGroupBy tr:nth-child(" + i + ")").find(".down").show();
            $("#tblGroupBy tr:nth-child(" + i + ")").find(".up").show();
        }
        $("#tblGroupBy tr:last").find(".down").hide();
    }

}