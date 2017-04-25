<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section k-content">
<h4>Enter a date</h4>
    <kendo:dateInput name="dateinput" style="width: 100%;"></kendo:dateInput>
</div>

<div class="box wide">
    <div class="box-col">
        <h4>Set / Get Value</h4>
        <ul class="options">
            <li>
                <input id="value" value="10/10/2000" style="float:none" />
                <button id="set" class="k-button">Set value</button>
            </li>
            <li style="text-align: right;">
                <button id="get" class="k-button">Get value</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Enable / Disable</h4>
        <ul class="options">
            <li>
                <button id="enable" class="k-button">Enable</button>
                <button id="disable" class="k-button">Disable</button>
                <button id="readonly" class="k-button">Readonly</button>
            </li>
        </ul>
    </div>
</div>

<script>
    $(document).ready(function() {
        $("#dateinput").closest(".k-widget")
                        .attr("id", "dateinput_wrapper");

        var dateinput = $("#dateinput").data("kendoDateInput");

        var setValue = function () {
            dateinput.value($("#value").val());
        };

        $("#enable").click(function() {
            dateinput.enable();
        });

        $("#disable").click(function() {
            dateinput.enable(false);
        });

        $("#readonly").click(function() {
            dateinput.readonly();
        });

        $("#value").kendoDatePicker();

        $("#set").click(setValue);

        $("#get").click(function() {
            alert(dateinput.value());
        });
    });
</script>
<style>
    .box .k-textbox {
        width: 80px;
    }

    .box .k-button {
        min-width: 80px;
    }
</style>

<demo:footer />
