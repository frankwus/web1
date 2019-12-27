
$(document).ready(function () {
    if (self != top) {
    }
})
function GetVal(src) {
    if (src == null || !src.length)
        return null
    var tagName = src[0].tagName
    if (src.attr('type') && (src.attr('type').toLowerCase() == 'checkbox' || src.attr('type').toLowerCase() == 'radio'))
        value = src.is(':checked') ? '1' : '0'
    else if (['SELECT', 'INPUT'].indexOf(tagName) != -1)
        value = src.val()
    else
        value = src.text()
    var en = src.attr('en')
    if (en != null)
        value = en
    value = MyReplace(value, "'", "''")
    value = Trim(value)
    return value
}
function Trim(s) {
    return $.trim(s)
}
function MyReplace(str, s1, s2) {
    if (str == null) return ''
    var re = new RegExp(s1, 'g');
    return str.replace(re, s2)//.replace(s2, s1);
}
function RefreshGrid(id, type) {
    var grid = $("#" + id).data("kendo" + type);
    grid.dataSource.read();
}
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/ " //+ expires;
}
function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}
function getId(id, src) {
    account
    return $('#' + id, src)
}
function MyReplace(str, s1, s2) {
    if (str == null) return ''
    var re = new RegExp(s1, 'g');
    return str.replace(re, s2)//.replace(s2, s1);
}
function Refresh() {
    window.location = window.location
}
function ConfigSave() {
    $(document).keydown(function (e) {
        var k = e.keyCode
        if (k == 27)
            window.close()
        if (!e.ctrlKey)
            return
        if (k == 83 && e.ctrlKey)
            on_Save()
        return false
    });
}
function Highlight(src, color) {
    if (src.length == 1) {
        if (src.prop('tagName') == 'SELECT')
            src = src.closest('td')
        src.css('background-color', color)
    } else {
        src.each(function () {
            Highlight($(this), color)
        })
    }
}
function GetSiteUrl() {
    var url = window.location.toString().toLowerCase()
    var index = 3
    if (url.indexOf('enscoplc.com') != -1)
        index = 3
    return url.split('/').slice(0, index).join('/') + '/'
}
function TransformXmlTable(xml, i) {
    var tableTag = 'Table' + i
    var xml = MyReplace(xml, '<' + tableTag + '>', '<tr>')
    xml = MyReplace(xml, '</' + tableTag + '>', '</tr>')
    var s = '<tr>'
    $($.parseXML(xml)).find('tr').eq(0).children().each(function () {
        var src = $(this)
        var tag = src.prop('tagName')
        xml = MyReplace(xml, '<' + tag + '>', '<td>')
        xml = MyReplace(xml, '</' + tag + '>', '</td>')
        xml = MyReplace(xml, '<' + tag + ' />', '<td/>')
        s += '<th class=header >' + tag + '</th>'
        s = MyReplace(s, '_x0020_', ' ')
    })
    s += '</tr>'
    var arr = ['NewDataSet', 'DocumentElement']
    for (var i in arr) {
        var root = arr[i]
        xml = MyReplace(xml, '</' + root + '>', '</Table>')
        xml = MyReplace(xml, '<' + root + '>', '<Table role=grid class="k-grid" width=100% border=1 >' + s)
    }
    return xml
}
function GetAjax(url, obj, raw) {
    var r
    url = GetSiteUrl() + url
    $.ajaxSetup({ cache: false });
    $.ajax({
        type: "get",
        async: false,
        url: url,
        //cache: false, 
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, xhr) {
            r = data
        },
        error: function (data, status, xhr) {
            //alert(url + data + status + xhr)
        }
    });
    return r
}
function IsEmpty(src) {
    var id = src.attr('id')
    if (!src.length)
        return
    var value
    var tagName = src[0].tagName
    if (tagName == 'INPUT') {
        var type = src.attr('type')
        if (type == 'radio') {
            var name = src.attr('name')
            var radios = $('[name=' + name + ']:checked')
            if (radios.length)
                return false
            else {
                Highlight(src.parent(), 'yellow')
                return true
            }
        }
        value = src.val()
    }
    else if (tagName == 'SELECT')
        value = src.prop('selectedIndex') < 1 ? '' : 'dummy'
    else
        value = src.text()
    value = Trim(value)

    if (value == '') {
        if (['SPAN', 'TABLE'].indexOf(tagName) != -1)
            src = src.parent()
        Highlight(src, 'yellow')
        return true
    }
    Highlight(src, 'white')
    return false
}
function TdByName(trs, name, includeHeader) {
    name = MyReplace(name, ' ', '')
    var t = trs.closest('table')
    if (trs.prop('tagName') == 'TABLE')
        t = trs
    var th = t.find('th').filter(function (index) {
        var th0 = $(this)
        if (th0.attr('id') == name)
            return true

        return GetVal($(this)).replace(' ID', 'Id').replace(' ', '').replace('áâ', '').replace(' / ', '/') == name
    })
    var index = th.index()
    var src = GetTd(trs, index).filter(function () {
        return true // $(this).attr('colspan') == 1
    })
    if (includeHeader)
        src = src.add(th)
    return src
}
function GetTd(t, i) {
    var trs = t
    if (trs.length == 1 && trs.prop('tagName') == 'TABLE')
        trs = trs.children().children()
    if (trs.children('td.td').length)
        return trs.children('td.td').filter(function () {
            return $(this).index() == i
        })
    else
        return trs.children('td').filter(function () {
            return $(this).index() == i
        })
}
function JsonToHtml(json) {
    var html = ''
    var header = ''
    var table = json
    for (var j in table) {
        var row = table[j]
        header = '<tr>'
        for (var name in row)
            header += '<th class=header style="font-weight:bold">' + SplitPascalCase(name)
        html += '<tr class=tr>'
        for (var name in row)
            html += '<td class=td>' + (row[name] == undefined || row[name] == null || row[name] == "null" ? "" : row[name])
        html += '</tr>'
    }
    return header + html
}
function GetFilter(obj) {
    if (obj.field != null)
        return obj.field + '~' + obj.operator + "~'" + obj.value + "'"
    var filters = obj.filters
    var logic = obj.logic
    var arr = []
    for (var i in filters) {
        arr.push(GetFilter(filters[i]))
    }
    return '(' + arr.join('~' + logic + '~') + ')'
}
function ChangeAjaxSetting(settings) {
    var json = JSON.parse(settings.data)
    if (json.filter != null) {
        json.filter = GetFilter(json.filter)
    }
    if (json.sort != null && json.sort[0] != null) {
        var dir = json.sort[0].dir
        var field = json.sort[0].field
        json.sort = field + '-' + dir
    }
    settings.data = JSON.stringify(json)
}
function InitGrid(id, url, arr) {
    var Fields = {}
    var Columns = []
    for (var i in arr) {
        var name = arr[i]
        if ($.isPlainObject(arr[i])) {
            for (var key in arr[i])
                name = key
            Fields[name] = { type: 'date' }
            Columns.push({
                field: name, format: "{0:MM-dd-yyyy}"
            })
        } else {
            Fields[name] = { type: 'string' }
            Columns.push(name)
        }
    }
    var json = GetAjax(url)
    //alert(json) 
    var dataSource = new kendo.data.DataSource({
        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        transport: {
            read: {
                type: "POST"
                , url: url
                , contentType: 'application/json; charset=utf-8',
                datatype: "json"
            },
            parameterMap: function (options) {
                return JSON.stringify(options);
            }
        },
        pageSize: 10
        , change: function onChange() {
            console.log('change')
        }
        , schema: {
            data: function (result) {
                return json.Data// result.Data
            },
            total: function (result) {
                return 11 //result.Total
            },
            model: {
                fields: Fields
            }
        }
    });
    dataSource.options.schema.data = json.Data
    dataSource.options.schema.total = 100 //json.Total
    console.log('junk')
    var t = GetId(id)
    t.kendoGrid({
        dataSource: dataSource,
        columns: Columns,
        dataBound: function (arg) {
            var t = $(arg.sender.table[0])
            t.find('th').each(function () {
                var a = $(this).find('a').last()
                console.log(GetVal(a))
                a.text(SplitPascalCase(GetVal(a)))
            })
        },
        scrollable: false,
        sortable: true,
        filterable: true,
        pageable: true,
        height: 600,
        selectable: true
    });
}
function SplitPascalCase(s) {
    s = s.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1');
    return s.replace('ID', ' ID')
    return s.replace(/([a-z])([A-Z])/g, '$1 $2');
}
function GetParameterByName(name) {
    name = name.toLowerCase()
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search.toLowerCase());
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function HtmlEncode(s) {
    s = MyReplace(s, '</', '!!')
    s = MyReplace(s, '<', '^^')
    s = MyReplace(s, '>', '((')
    return s
}
var PagingCallback
function InitTable(t, url, pageSize, showEmptyHeader, fn, where0, sort0, showCommand) {
    //if (fn != null)
    // PagingCallback = fn
    t.data('callback', fn)
    t.attr('showCommand', showCommand)
    t.attr('width', '100%').attr('url', url).attr('pageSize', pageSize).attr('where0', where0)
    if (sort0 == null)
        sort0 = ''
    LoadTable(t, sort0, '', showEmptyHeader)
}
function GetWingDing(id) {
    return ' <span hidden id=' + id + ' class=wingding style="font-family: Wingdings;" >&#' + id + '</span>'
}
function LoadTable(t, sort, where, showEmptyHeader) {
    var url = t.attr('url')
    t.attr('sort', sort).attr('where', where)
    var showCommand = t.attr('showCommand') == 'true' ? true : false
    var pageNo = parseInt(t.attr('pageNo'))
    var pageSize = parseInt(t.attr('pageSize'))
    if (isNaN(pageNo))
        pageNo = 1
    UpdatePageNo(t, pageNo)

    var where0 = t.attr('where0')
    if (where0 != null && where0.trim() != '') {
        if (where == '')
            where = where0
        else
            where += ' and (' + where0 + ')'
    }
    var obj = {
        sort: sort
        , where: where
        , pageNo: pageNo
        , pageSize: pageSize
    }
    var json = GetAjax(url, obj, true)
    var total = 0, html = ''
    if (json != null && json.length) {
        total = json[0][0].Column1
        t.attr('entity', json[0][0].Column2)
        html = JsonToHtml(json[1])
    }
    t.attr('total', total)

    if (t.find('th').length) {
        t.children().children().slice(1).remove()
        $(html).appendTo(t)
        t.find('tr').eq(1).remove()

    } else {
        t.width('100%').attr('border', 1).addClass('k-grid')
        t.html(html)
        if (html == '' && showEmptyHeader)
            ShowEmptyHeader(t, json[2])
        $('<table id=tExcel class="kgrid-custom-toolbar" width=100%><tr><td><img style="float:right;margin-left:5px;cursor: pointer;" src=/images/excel.png /></td></tr></table>').insertBefore(t).find('img').on('click', function () {
            window.location = GetSiteUrl() + url + '?sort=' + t.attr('sort') + '&where=' + t.attr('where') + '&pageNo=1&pageSize=1000000'
        })
        if (showCommand)
            $('<td>' + GetButton('Add', true) + '</td>').insertBefore(GetId('tExcel').find('td'))
        t.find('th').each(function () {
            var th = $(this)
            th.addClass("k-header k-filterable k-with-icon")
            var column = GetVal(th)
            column = MyReplace(column, ' ', '')
            th.attr('id', column)
            if (column == 'Id')
                column = 'ID'
            if (column.match(/Id/))
                column = column.replace('Id', 'ID')
            th.html('<span class=lh >' + SplitPascalCase(column) + '</span>' + GetWingDing(225) + GetWingDing(226) + ' <img style="float:right" src=/images/filter.png onclick="return on_OpenFilter(this)"  /> ')
        })
        t.find('th').each(function () {
            var th = $(this)
            var column = th.attr('id')
            var dataType = GetDataType(column, json[2])
            th.attr('dataType', dataType)
            AddColumnFilter(th, column, dataType)
            th.children().eq(0).on('click', function () {
                UpdatePageNo(t, 1)
                var span = $(this)
                var wingding = span.nextAll('span:visible').attr('id')
                if (wingding == 225)
                    wingding = 226
                else //if (wingding == 226)
                    wingding = 225
                th.parent().find('.wingding').hide()
                span.nextAll('#' + wingding).show()
                ReloadTable(t)
            })
        })
    }
    FormatGridDate(t)
    if (showCommand)
        AddCommandButton(t)
    AddPagingFooter(pageNo, pageSize, total, t)

    var select = t.find('select').last()
    BindSelect(select, [5, 10, 20])
    select.val(t.attr('pageSize'))
    AddLeftBorder(t)
    if (t.data('callback') != null)
        t.data('callback')(t)
}
function AddCommandButton(t, fn) {
    TdByName(t, 'Id').each(function () {
        console.log('test')
        var td = $(this)
        var id = GetVal(td)
        td.attr('id', id)
        $('<span>' + '' + '</span>' + GetButton('Save', true) + GetButton('Cancel', true) + GetButton('Edit', true) + GetButton('Delete', true)).appendTo(td)
        td.find(':button').slice(0, 2).hide()
        if (fn != null)
            fn()
    })
}
function on_ActionCommon(action, td) {
    if (td == null)
        td = $(event.srcElement).closest('td')
    var tr = td.parent()
    var t = tr.closest('table')
    console.log(action + td[0].outerHTML)

    switch (action) {
        case 'Add':
            t = t.next()
            var html = '<td/>'.repeat(t.find('th').length)
            tr = $('<tr>' + html + '</tr>').insertBefore(t.find('tr').eq(1))
            AddCommandButton(tr, function () {
                console.log('junk')
                GetId('CommonEdit', tr).trigger('click')
                on_ActionCommon('Edit', tr.children().eq(0))
            })
            break;
        case 'Edit':
            tr.attr('html', tr.html())
            // tr.closest('table').find(':text').closest('tr').find(':button[onclick*=Cancel]').trigger('click')
            td.find(':button').slice(0, 2).show()
            td.find(':button').slice(2).hide()
            $('<input name=Id type=hidden value=' + td.attr('id') + ' />').appendTo(td)
            tr.children().each(function (index) {
                if (index == 0)
                    return
                var td = $(this)
                var value = GetVal(td)
                td.attr('value', value)
                td.html('')
                var th = t.find('th').eq(index)
                var id = th.attr('id')
                switch (th.attr('dataType')) {
                    case 'bit':
                        $('<input type=checkbox name=' + id + ' />').appendTo(td).prop('checked', (value == 'true'))
                        return
                        break;
                }

                var tb = $('<input type=text name=' + id + ' />').appendTo(td).val(value)
                var json = GetAjax('Admin/GetList/' + id + '?all=0')
                if (json != null) {
                    AddKendoDropDownList(tb, null, null, json)
                    var kendo = tb.data("kendoDropDownList")
                    $(kendo.dataItems()).each(function () {
                        if (this.Name == value) {
                            kendo.value(this.Id)
                        }
                    });
                }
            })
            break;
        case 'Delete':
        case 'Save':
            var id = td.attr('id')
            if (action == 'Delete') {
                $('<input type=hidden name =Id value=' + id + ' />').appendTo(tr)
            } else
                action = (id == '' ? 'Add' : 'Update')
            tr.find(':text').each(function () {
                var tb = $(this)
                var kendo = tb.data('kendoDropDownList')
                if (kendo != null) {
                    tb.attr('name', tb.attr('name') + 'Id').val(kendo.value())
                }
            })
            var f = tr.wrap('<form/>').parent()
            var url = t.attr('url').replace('Get', 'Update')
            var type = t.attr('entity')
            f.attr('method', 'post').attr('action', url.split('/').slice(-1) + '?type=' + type + '&action1=' + action)
            f.submit()
            GetId('Refresh', t).trigger('click')
            return
            tr.unwrap()
            CancelRowEdit(tr)
            break;
        case 'Cancel':
            tr.html(tr.attr('html'))
            //td.find(':button').slice(0, 2).hide()
            //td.find(':button').slice(2).show()
            //tr.children().each(function (index) {
            //    if (index == 0)
            //        return
            //    var td = $(this)
            //    var value = td.attr('value')
            //    td.text(value)
            //})
            break;
        default:
    }
}
function CancelRowEdit(tr) {
    tr.closest('table').find(':text').closest('tr').find(':button[onclick*=Cancel]').trigger('click')
}
function AddColumnFilter(th, column, dataType) {
    var t = th.closest('table')
    var filter = $(GetFilterTemplate())
    filter.find('td').css('border', 'none')
    var html = filter.attr('table', t.attr('id')).attr('column', column)
    filter.appendTo($('body'))
    //on_OpenFilter(th.find('img').last())
    filter.hide()
    var arr = ['Contains', 'Does not contain', 'Starts with', 'Ends with', 'Is equal to', 'Is not equal to']
    if (dataType == 'int')
        arr = ['Is equal to', 'Is not equal to', 'Is greater than', 'Is less than']
    if (dataType == 'date')
        arr = ['Is equal to', 'Is not equal to', 'Is after', 'Is before']
    //BindSelect(filter.find('select').eq(0), arr)
    //BindSelect(filter.find('select').eq(1), ['And', 'Or'])
    filter.find('tr').slice(1, 3).clone().insertBefore(filter.find('tr').last())
    AddKendoDropDownList(filter.find(':text.select').eq(0), arr)
    AddKendoDropDownList(filter.find(':text.select').eq(1), ['And', 'Or'])
    AddKendoDropDownList(filter.find(':text.select').eq(2), arr)

    if (dataType == 'date') {
        filter.find(':text').each(function () {
            var input = $(this)
            input.kendoDatePicker({
                format: "d-MMM-yyyy"
            });
        })
    }
    //remove row hover 
    filter.find('*').on('mouseover', function (e) {
        $(this).css('background-color', 'white')
    })
}
function GetFilterTemplate() {
    var s = '<table id="Template" border="1" class="k-grid" hidden>\
                              <tr > <td style="font-weight:bold" >Show items with value that:</td></tr>\
                <tr><td><input type="text" class="select"  title="Operator"  /></td></tr>\
                <tr><td><input type="text" class="text"  title="Value" onkeypress="on_FilterKeypress(this) " /></td></tr>\
                <tr><td><input type="text" class="select"  title="Filters logic"  /></td></tr>\
                <tr><td>'+ GetFilterButton('Clear') + GetFilterButton('Filter') + ' </td></tr>\
               </table >';
    return s
    //                <tr><td><input class="k-button" type="button" value="Clear" onclick="on_Clear(this)" /><input type="button" value="Filter" onclick="on_Filter(this)" /></td></tr>\
}
function GetFilterButton(name) {
    return '<button  style="background-color:white;" class="k-button" type="button"  onclick="on_' + name + '(this)">' + name + ' </button>'
}
function AddKendoDropDownList(src, arr, fn, json1) {
    var json = []
    for (var i in arr)
        json.push({ Id: arr[i], Name: arr[i] })
    if (json1 != null)
        json = json1
    src.kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "Id",
        change: fn,
        dataSource: json
    });
}
function AddPagingFooter(pageNo, pageSize, total, t) {
    var html = '<div class="k-pager-wrap k-grid-pager k-widget k-floatwrap kgrid-custom-footer" data-role="pager">'
    var limit = 10

    html += GetArrow(0) + GetArrow(1)
    if (pageNo > limit)
        html += GetPagingHtml('...', 0)
    var style = ' style="padding-left:7px" '
    var start = Math.floor((pageNo - 1) / limit)
    start *= limit
    html += ' <ul class="k-pager-numbers k-reset"> <li class="k-current-page"><span class="k-link k-pager-nav">' + pageNo + '</span></li>'
    for (var i = start; i < total / pageSize && i < start + limit; i++)
        html += GetPagingHtml(i + 1, pageNo)
    html += ' </ul>'

    if (total / pageSize > limit && (Math.floor((pageNo - 1) / limit) + 1) * pageSize * limit < total)
        html += GetPagingHtml('...', 1)
    html += GetArrow(2) + GetArrow(3) //+ '<select onchange=on_PageSizeChange(this) />'

    html += '<input type=text id=SelectPageSize />' // '<span title = "" class="k-widget k-dropdown k-header" unselectable = "on" role = "listbox" aria - haspopup="true" aria - expanded="false" tabindex = "0" aria - owns="" aria - live="polite" aria - disabled="false" aria - busy="false" aria - activedescendant="741b2862-10da-4548-8c87-7efa1f4115e9" style = "" > <span unselectable="on" class="k-dropdown-wrap k-state-default k-state-hover"><span unselectable="on" class="k-input">10</span><span unselectable="on" class="k-select" aria-label="select"><span class="k-icon k-i-arrow-60-down"></span></span></span> <select onchange=on_PageSizeChange(this) data-role="dropdownlist" style="display: none;" aria-label="10"><option value="5">5</option><option value="10" selected="selected">10</option><option value="20">20</option></select></span >'
    var text = ((pageNo - 1) * pageSize + 1) + ' - ' + (pageNo * pageSize) + ' of ' + total + ' items'
    html += '<a aria-label="Refresh" id=Refresh class="k-pager-refresh k-link"  title="Refresh"><span class="k-icon k-i-refresh"></span></a><span class="k-pager-info k-label">' + text + '</span></div>'

    html += '</div>'
    if (true && total <= pageSize)
        return
    var tr = $('<tr><td colspan=22 style="padding:1px">' + html + '</tr>').appendTo(t)
    var SelectPageSize = GetId('SelectPageSize', tr)
    AddKendoDropDownList(SelectPageSize, [5, 10, 20], function () {
        var t = $(this.wrapper).closest('table')
        t.attr('pageSize', this.value())
        UpdatePageNo(t, 1)
        ReloadTable(t)
    })
    SelectPageSize.data('kendoDropDownList').value(pageSize)
    if (pageNo == 1)
        tr.find('a.k-link[id=0], a.k-link[id=1]').addClass('k-state-disabled')
    if (pageNo * PageSize >= total)
        tr.find('a.k-link[id=2], a.k-link[id=3]').addClass('k-state-disabled')


    tr.find('a').on('click', function () {
        src = $(this)
        var pageNo = GetVal(src)
        if (pageNo == '...') {
            if (src.attr('id') == 1)
                pageNo = Math.floor(GetVal(src.prev().children().last())) + 1
            else
                pageNo = Math.floor(GetVal(src.next().children().eq(0))) - 10
        }
        if (pageNo < 1)
            pageNo = 1

        var t = src.closest('table')
        UpdatePageNo(t, pageNo)
        ReloadTable(t)
        return false
    })
}
function GetPagingFooter090518(pageNo, pageSize) {
    var html = ''
    var style = ' style="padding-left:7px" '
    var start = Math.floor((pageNo - 1) / pageSize)
    start *= pageSize
    html += ' <ul class="k-pager-numbers k-reset"> '
    for (var i = start; i < total / pageSize && i < start + pageSize; i++)
        html += GetPagingHtml(i + 1, pageNo, style)
    html += ' </ul>'
    var limit = 10
    if (pageNo > limit)
        html = GetPagingHtml('...', pageNo, style) + html
    if (total / pageSize > limit && (Math.floor((pageNo - 1) / pageSize) + 1) * pageSize * limit < total)
        html += GetPagingHtml('...', pageNo, style)
    html = GetArrow(0) + GetArrow(1) + html + GetArrow(2) + GetArrow(3) + '<select onchange=on_PageSizeChange(this) />'
    if (total <= pageSize)
        html = ''
    return html
}
function ShowEmptyHeader(t, arr) {
    var html = '<tr>'
    for (var i in arr) {
        var name = arr[i].Id
        html += '<th class="header k-header k-filterable k-with-icon" >' + name + '</th>'
    }
    html += '</tr>'
    $(html).appendTo(t)
}
function UpdatePageNo(t, pageNo) {
    t.attr('pageNo', pageNo)
}
function on_PageSizeChange(src) {
    src = $(src)
    var t = src.closest('table')
    t.attr('pageSize', src.val())
    UpdatePageNo(t, 1)
    ReloadTable(t)
}
function FormatGridDate(t) {
    t.find('th').each(function (index) {
        var th = $(this)
        index++
        if (th.attr('dataType') != 'date')
            return
        t.find('td:nth-child(' + index + ')').each(function () {
            var td = $(this)
            td.text(FormatDate(GetVal(td)))
        })
    })
}
function FormatDate(date) {
    if (typeof (date) == 'object')
        return date
    if (date == '' || date == 'null') {
        return ''
    }
    if (date.toString().indexOf('/Date(') != -1)
        date = date.replace('/Date(', '').replace(')/', '')
    date = parseInt(date)
    var d = (new Date(date)).toUTCString().substring(5, 16)
    return d
}
function GetDataType(column, arr) {
    var arr1 = ['int', 'varchar', 'date', 'bit']
    for (var i in arr) {
        if (arr[i].Id == column) {
            for (var j in arr1) {
                var dataType = arr1[j]
                if (arr[i].Type.indexOf(dataType) != -1)
                    return dataType
            }
        }
    }
    return ''
}
function GetArrow(i) {
    var a
    switch (i) {
        case 0:
            a = '<a  aria-label="Go to the first page" class="k-link k-pager-nav k-pager-first" data-page="1" href="#" title="Go to the first page" tabindex="-1"><span class="k-icon k-i-arrow-end-left"></span></a>'
            break
        case 1:
            a = '<a aria-label="Go to the previous page" class="k-link k-pager-nav" data-page="1" href="#" title="Go to the previous page" tabindex="-1"><span class="k-icon k-i-arrow-60-left"></span></a>'
            break
        case 2:
            a = '<a aria-label="Go to the next page" class="k-link k-pager-nav" data-page="2" href="#" title="Go to the next page" tabindex="-1"><span class="k-icon k-i-arrow-60-right"></span></a>'
            break
        case 3:
            a = '<a aria-label="Go to the last page" class="k-link k-pager-nav k-pager-last" data-page="2" href="#" title="Go to the last page" tabindex="-1"><span class="k-icon k-i-arrow-end-right"></span></a>'
    }
    a = a.replace('<a', '<a  onclick="on_Arrow(this);return false" id=' + i)
    return a
    return '<img style="opacity:0.5;margin-left:5px;width:7px;height:7px" id=' + i + ' src=/images/arrow' + i + '.png onclick=on_Arrow(this) />'
}
function GetPagingHtml(name, pageNo) {
    if (name == pageNo)
        return '<li><span class="k-state-selected">' + name + '</span></li>'
    if (name == '...')
        return '<a id=' + pageNo + ' tabindex="-1" href="#" class="k-link" data-page="570" onclick1="on_Paging(this);return false" title="More pages">...</a>'
    //return '<a ' + style.replace('padding', style1 + 'padding') + ' href=1 onclick="return false" >' + name + '</a>'
    return '<li><a tabindex="-1" href="#" class="k-link nolang" onclick1="on_Paging(this);return false" data-page="2">' + name + '</a></li>'
    //return '<a ' + style + ' href=1 onclick="on_Paging(this);return false" >' + name + '</a>'
}
function BindSelect(select, arr) {
    for (var i in arr) {
        var name = arr[i]
        $('<option />').text(name).val(name).appendTo(select)
    }
    if (select.length == 0)
        return ''
    return '<br/>' + select[0].outerHTML
}
function on_OpenFilter(src) {
    var img = $(src)
    var column = img.parent().attr('id')
    var table = img.closest('table').attr('id')
    HideAllFilter(table)
    var filter = $('table[column="' + column + '"][table=' + table + ']')
    filter.show().find(':text').eq(0).focus()
    var position = img.offset()
    position.top += img.height()
    position.left -= filter.width() - img.width()
    if (position.left < 0)
        position.left = 0
    filter.css(position).css('position', 'absolute')
    filter.find('tr').eq(2).find('input').focus()

    event.stopPropagation()
    $(document).on('click', function (e) {
        if (!$(e.target).parents("#Template , div.k-list-container.k-popup.k-group.k-reset").length
            && !$(e.target).parents('table.k-month').length) {
            filter.hide()
        }
    })
    return false
}
function HideAllFilter(table) {
    $('table[table=' + table + ']').hide()
}
function on_Filter(src) {
    src = $(src)
    var filter = src.closest('table')
    var table = filter.attr('table')
    var t = GetId(table)
    UpdatePageNo(t, 1)
    ReloadTable(t)
}
function on_Clear(src) {
    src = $(src)
    src.closest('table').find(':text').val('')
    var filter = src.closest('table')
    var table = filter.attr('table')
    var t = GetId(table)
    UpdatePageNo(t, 1)
    ReloadTable(t)
}
function ReloadTable(t) {
    var table = t.attr('id')
    HideAllFilter(table)
    var arr = []
    $('[table=' + table + ']').each(function () {
        var filter = $(this)
        filter.hide()
        var where = ''
        var column = filter.attr('column')
        var arr1 = []
        filter.find(':text.text').each(function () {
            var tb = $(this)
            var value = GetVal(tb)
            var value = GetVal(tb)

            if (value != '') {
                var key = tb.closest('tr').prev().find(':text.select').data('kendoDropDownList').value()
                var op = ' like '
                switch (key) {
                    case 'Contains':
                        value = "%" + value + "%"
                        break
                    case 'Does not contain':
                        op = ' not like '
                        value = "%" + value + "%"
                        break
                    case 'Starts with':
                        value = value + '%'
                        break
                    case 'Ends with':
                        value = '%' + value
                        break
                    case 'Is equal to':
                        op = ' = '
                        break
                    case 'Is not equal to':
                        op = ' != '
                        break
                    case 'Is greater than': case 'Is after':
                        op = ' > '
                        break
                    case 'Is less than': case 'Is before':
                        op = ' < '
                        break
                }
                arr1.push(column + op + " '" + value + "'")
            }
        })
        var sql = arr1.join(' ' + filter.find('tr').eq(3).find(':text').val() + ' ')
        var img = GetId(column, t).find('img')
        if (sql != '') {
            arr.push('(' + sql + ')')
            img.attr('src', '/images/filter1.png')
        } else
            img.attr('src', '/images/filter.png')

    })
    var sort = ''
    t.find('.wingding:visible').each(function () {
        var span = $(this)
        sort = span.parent().attr('id') + span.attr('id')
    })
    var searchText = GetVal(t.parent().find('.search'))
    if (searchText != null && searchText != '') {
        var keys = t.find('th[dataType=varchar]').map(function () {
            return $(this).attr('id') + " like '%" + searchText + "%' "
        }).get().join('  or ')
        keys = '(' + keys + ')'
        arr.push(keys)
    }
    LoadTable(t, sort.replace('&#', ''), arr.join(' and '))
    t.css('width', '100%')
}
function on_Paging_back(src) {
    src = $(src)
    var pageNo = GetVal(src)
    if (pageNo == '...') {
        if (src.nextAll('a').length)
            pageNo = Math.floor(GetVal(src.next())) - 1
        else
            pageNo = Math.floor(GetVal(src.prev())) + 1
    }
    var t = src.closest('table')
    UpdatePageNo(t, pageNo)
    ReloadTable(t)
}
function on_FilterKeypress(src) {
    src = $(src)
    var button = src.closest('table').find(':button').last()
    if (event.key == 'Enter')
        on_Filter(button)
}
function on_Arrow(src) {
    src = $(src)
    var t = src.closest('table')
    var total = parseInt(t.attr('total'))
    var pageSize = parseInt(t.attr('pageSize'))
    var pageNo = parseInt(t.attr('pageNo'))

    var id = src.attr('id')
    var last = Math.floor((total - 1) / pageSize) + 1
    if (id == 0)
        pageNo = 1
    if (id == 1)
        pageNo--
    if (id == 2)
        pageNo++
    if (id == 3)
        pageNo = last
    if (pageNo < 1)
        pageNo = 1
    if (pageNo > last)
        pageNo = last
    UpdatePageNo(t, pageNo)
    ReloadTable(t)
    return false
}
function GetRadio(name, label1, label2) {
    if (label1 == null)
        label1 = 'Yes'
    if (label2 == null)
        label2 = 'No'
    return '<span>' + label1 + '</span> <input type = radio name = ' + name + ' value = 1 /> <span> ' + label2 + '</span> <input type = radio name=' + name + ' value = 0 /> '
}
function Guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function GetButton(name, isCommon) {
    return '<input id=Common' + name + ' style="margin-left:5px" type=button class="btn btn-common" value=' + name + ' onclick=on_Action' + (isCommon ? 'Common' : '') + '("' + name + '") />'

}
function GetImg(name, img) {
    return '<img value=' + name + ' style="margin-left:10px;cursor: pointer;" src="/Images/' + img + '"  onclick=on_Action("' + name + '") />'
}
function GetCleanXml(root) {
    var xml = root[0].outerHTML
    return xml.replace('<?XML:NAMESPACE PREFIX = "PUBLIC" NS = "URN:COMPONENT" />', '')//.replace("'", "''")
}
$.createElement = function (name, value) {
    return $('<' + name + ' name=' + value + ' />');
};
$.createElement = function (name) {
    return $($.parseXML('<' + name + '/>').documentElement)
    return $('<' + name + '/>');
};
$.fn.addAttr = function (name, value) {
    $(this).attr(name, value)
};
//$.fn.removeAttr = function (name) {
//            $(this).removeAttr(name)
//};
function GetFormattedDate(dateInp) {
    var month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];

    var day = dateInp.getDate();
    var month_index = dateInp.getMonth();
    var year = dateInp.getFullYear();

    var retDate = day + "-" + month_names[month_index] + "-" + year;

    return retDate;
}
function InitLang() {
    Lang = getCookie('Lang')
    if (Lang == null || (Lang == 'EN' && !LangClicked))
        return
    var arr = ['label1, td.header', 'a:not(".nolang")', 'td.tlc-header-column', 'input.btn-common']
    var coll = $('span:first', $('th.k-header ')).add('.lang')
    for (var i in arr)
        coll = coll.add($(arr[i]))

    coll.each(function () {
        var src = $(this)
        if (src.parent().is('.td'))
            return
        if (src.length) {
            if (Lang == 'EN') {
                SetLangValue(src, src.attr('en'))
                return
            }
            var en = GetVal(src)
            var translation = GetTranslation(en)
            if (translation != '')
                SetLangValue(src.attr('en', en), translation)
        }
    })
}
function SetLangValue(src, s) {
    if (src.prop('tagName') == 'INPUT')
        src.val(s)
    else
        src.text(s)
}
function GetTranslation(en) {
    if (en == '')
        return ''
    return 'Z' + en
}
function GetA(name) {
    return '<a style="padding-left:10px" href=# onclick="on_Action(\'' + name + '\'); return false " >' + name + '</a>'
}
function GetParameterByName(name) {
    name = name.toLowerCase()
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search.toLowerCase());
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function RemovePaging(t) {
    t.find('th').each(function (index) {
        var th = $(this)
        if (th.children().length == 0)
            return
        th.children().off('click')
        th.find('img').hide()
    })
    t.prev().find('img').hide()
}
function InitTableNoPaging(t, url, obj, showHeader, json0) {
    var json, jsonHeader
    if (json0 == null) {
        json = GetAjax(url, obj, true)
        if (json.length > 1)
            jsonHeader = json[1]
        json = json[0]
    } else
        json = json0
    var html = JsonToHtml(json)
    t.width('100%').attr('border', 1).addClass('k-grid')
    t.html(html)
    AddLeftBorder()
    if (html == '' && showHeader)
        ShowEmptyHeader(t, jsonHeader)
    t.find('th').each(function () {
        var th = $(this)
        th.addClass("k-header k-filterable k-with-icon")
        var column = GetVal(th)
        column = MyReplace(column, ' ', '')
        th.attr('id', column)
        if (column == 'Id')
            column = 'ID'
        if (column.match(/Id/))
            column = column.replace('Id', 'ID')
        th.html('<span class=lh >' + SplitPascalCase(column) + '</span>')
    })

}
function AddLeftBorder(t) {
    if (t == null)
        t = $('table')
    t.find('td').css('border-left-width', '1px')
}
function Pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
function GetJsDate(dt) {
    return dt.getFullYear()
        + '-' + Pad(dt.getMonth() + 1)
        + '-' + Pad(dt.getDate())
        + ' ' + Pad(dt.getHours())
        + ':' + Pad(dt.getMinutes())
        + ':' + Pad(dt.getSeconds());
}
if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
            str += str;
            count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
    }
}
function CssTable(t) {
    var th = t.find('th')
    th.addClass('k-grid header k-header k-filterable k-with-icon').css('font-weight', 'bold')
    th.html('<span class=lh> ' + GetVal(th) + ' </span>')
    t.find('tr:odd').find('td').each(function (index) {
        var td = $(this)
        if (td != null && td != undefined) {
            var className = td[0].firstElementChild != null && td[0].firstElementChild != undefined ? td[0].firstElementChild.className : "";
            if (className != "required") {
                td.html('<label>' + GetVal(td) + '</label>')
            }
        }
        td.css('padding-bottom', 0)
        var tr = td.parent().next()
        tr.children().eq(index).css('padding-top', 0)//.removeClass('k-grid')
        tr.find('td').css('padding-bottom', 15)
    })
    t.removeClass('k-grid')
    //t.find(' input').addClass('k-grid')
    t.find('tr').attr('valign', 'top')
    t.find(':text').each(function () {
        var input = $(this)
        //input.addClass('form-control form-input-style').css('border', 'solid 1px whitesmoke') //.css('border-bottom-width', '10px')//.css('border-color', '#e6e6e6')
    })
    t.find('td').css('border', 'none')
    //t.attr('border', 1).css('border-color', 'whitesmoke')
    var div = t.wrap('<div />').parent()
    div.css('border', 'solid 1px lightgray')

}
function FindButton(t, name) {
    return t.find(':button').filter(function () {
        var b = $(this)
        return b.attr('en') == name || GetVal(b) == name
    }).length
}
function GetFormId() {
    var arr = window.location.toString().split('/')
    var id = arr[arr.length - 1]
    id = id.split('?')[0]
    if (id == '')
        id = 0
    return id
}
