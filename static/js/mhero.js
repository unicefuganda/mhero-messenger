$(document).ready(function () {
    var rapidProResponse = $.cookie('RapidProResponse');
    console.log(rapidProResponse);

    if (!rapidProResponse) {
        return;
    }

    var resultsContainer = $('table#results tbody');
    JSON.parse(rapidProResponse).forEach(function (result) {
        resultsContainer.append('' +
            '<tr class="' + result.status + '">' +
            '<td>' + result.phone + '</td>' +
            '<td>' + result.case_id + '</td>' +
            '</tr>');
    });
});