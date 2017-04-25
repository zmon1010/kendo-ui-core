<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/listbox/api/read" var="readUrl" />
<demo:header />
<div id="example" role="application">
	<div class="demo-section k-content wide">
		<kendo:listBox name="listbox1" dataTextField="productName" dataValueField="productID" connectWith="listbox2">
		   <kendo:dataSource pageSize="10">
				<kendo:dataSource-transport>
				<kendo:dataSource-transport-parameterMap>
						<script>
							function parameterMap(options,type) { 	                		
								return JSON.stringify(options);	                		
							}
						</script>
					</kendo:dataSource-transport-parameterMap>
					<kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
				</kendo:dataSource-transport>
			</kendo:dataSource>    
		</kendo:listBox> 
		<kendo:listBox name="listbox2" dataTextField="productName" dataValueField="productID">
			<kendo:dataSource data="${selected}"></kendo:dataSource>
		</kendo:listBox>
		<div id="appendto"></div>
	</div>
	<span id="staticNotification"></span>
	<div class="demo-section box wide">
		<div class="box-col">
			<h4>Transfer items</h4>
			<ul class="options">
				<li>
					<button id="transfer" class="k-button">Transfer</button>
				</li>
			</ul>
		</div>
		<div class="box-col">
			<h4>Reorder items</h4>
			<ul class="options">
				<li>
					<button id="reorder" class="k-button">Reorder</button>
				</li>
			</ul>
		</div>
		<div class="box-col">
			<h4>Enable / Disable items</h4>
			<ul class="options">
				<li>
					<button id="enable" class="k-button">Enable</button>
					<button id="disable" class="k-button">Disable</button>
				</li>
			</ul>
		</div>
	</div>
</div>

<script>
    $(document).ready(function () {
        var notification = $("#staticNotification").kendoNotification({
            autoHideAfter: 4000, appendTo: "#appendto",
            animation: {
                open: {
                    effects: "fade:in"
                },
                close: {
                    effects: "none"
                }
            }
        }).data("kendoNotification");

        var listbox1 = $("#listbox1").data("kendoListBox");

        var listbox2 = $("#listbox2").data("kendoListBox");

        function showMessage(message) {
            notification.hide();
            notification.error(message);
        }

        $("#transfer-left").click(function () {
            if (listbox2.select().length > 0) {
                listbox1.add(listbox2.dataItem(listbox2.select()));
                listbox2.remove(listbox2.select());
            }
            else {
                showMessage("Right ListBox should have selected item!");
            }
        })

        $("#transfer-right").click(function () {
            if (listbox1.select().length > 0) {
                listbox2.add(listbox1.dataItem(listbox1.select()));
                listbox1.remove(listbox1.select());
            }
            else {
                showMessage("Left ListBox should have selected item!");
            }
        })

        $("#enable").click(function () {
            listbox1.enable(".k-item", true);
            listbox2.enable(".k-item", true);
        })

        $("#disable").click(function () {
            if (listbox1.select().length > 0 || listbox2.select().length > 0) {
                listbox1.enable(listbox1.select(), false);
                listbox2.enable(listbox2.select(), false);
            }
            else {
                showMessage("You need to select an item to be disabled!");
            }
        })

        $("#move-up").click(function () {
            if (listbox1.select().length > 0) {
                if (listbox1.select().first().index() > 0) {
                    var item = listbox1.select().first();
                    listbox1.reorder(item, item.index() - 1);
                }
                else {
                    showMessage("Selected item is already at first position!");
                }
            }
            else {
                showMessage("Left ListBox should have selected item!");
            }
        })

        $("#move-down").click(function () {
            if (listbox1.select().length > 0) {
                if (listbox1.select().first().index() < listbox1.items().length - 1) {
                    var item = listbox1.select().first();
                    listbox1.reorder(item, item.index() + 1);
                }
                else {
                    showMessage("Selected item is already at last position!");
                }
            }
            else {
                showMessage("Left ListBox should have selected item!");
            }
        })

        var Product = kendo.data.Model.define({
            id: "ProductID",
            fields: {
                "ProductName": {
                    type: "string"
                }
            }
        });

        $("#add-item").click(function () {
            var text = $("#add-textbox").val();
            var item = listbox1.add(new Product({
                ProductName: text
            }));
        })

        $("#remove-item").click(function () {
            var text = $("#remove-textbox").val().toLowerCase();
            var items = listbox1.items();
            for (var i = 0; i < items.length; i++) {
                var dataItem = listbox1.dataItem(items[i]);
                if (dataItem.ProductName.toLowerCase().indexOf(text) >= 0) {
                    listbox1.remove(items[i]);
                }
            }
        })
    });
</script>

<style>
    .k-notification-wrap {
        padding: 8px 30px!important;
    }

    #appendto {
        margin-top: 5px;
        height: 15px;
    }

        #appendto .k-i-error {
            padding-right: 8px;
        }

    .box-col .options .k-textbox {
        width: 115px;
    }

    .box h4 {
        margin-top: 25px;
    }

    #example .demo-section {  
        overflow: hidden;      
        max-width: none;
        width: 555px;
    }

    #example .k-listbox {
        width: 275px;
        height: 310px;
    }

        #example .k-listbox:first-of-type {
            margin-right: 1px;
        }
</style>
            
<demo:footer />