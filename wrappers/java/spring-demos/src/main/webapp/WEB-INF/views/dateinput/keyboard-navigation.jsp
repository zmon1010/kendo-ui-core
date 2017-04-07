<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
   <div class="demo-section k-content">
    <h4>Enter date</h4>
        <kendo:dateInput name="dateinput" style="width: 100%" accesskey="w"></kendo:dateInput>
   </div>

 <div class="box wide">
    <div class="box-col">
        <h4>Focus:</h4>
        <ul class="keyboard-legend">
            <li>
                <span class="button-preview">
                    <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
                    +
                    <span class="key-button">w</span>
                </span>
                <span class="button-descr">
                    focuses the widget
                </span>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>
            Opened popup (date view):
        </h4>
        <ul id="calendar-nav" class="keyboard-legend">
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">left arrow</span>
                </span>
                <span class="button-descr">
                    highlights previous day part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">right arrow</span>
                </span>
                <span class="button-descr">
                    highlights next day part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">up arrow</span>
                </span>
                <span class="button-descr">
                    increase current date part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">down arrow</span>
                </span>
                <span class="button-descr">
                    decrease current date part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">space key</span>
                </span>
                <span class="button-descr">
                    highlights next day part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">delete key, backspace key</span>
                </span>
                <span class="button-descr">
                    clears current date part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">mouse wheel rotated up</span>
                </span>
                <span class="button-descr">
                    increase current date part
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">mouse wheel rotated down</span>
                </span>
                <span class="button-descr">
                    decrease current date part
                </span>
            </li>
        </ul>
    </div>
</div>
    
<demo:footer />