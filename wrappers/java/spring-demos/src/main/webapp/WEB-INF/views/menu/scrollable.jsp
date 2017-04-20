<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section k-content">
    <h4>Horizontal</h4>
    <kendo:menu
        name="horizontalMenu"
        scrollable="true">
        <kendo:menu-items>
            <kendo:menu-item text="Mens">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Ladies">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Kids">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Sports"></kendo:menu-item>
            <kendo:menu-item text="Brands"></kendo:menu-item>
            <kendo:menu-item text="Accessories"></kendo:menu-item>
            <kendo:menu-item text="Promotions"></kendo:menu-item>
        </kendo:menu-items>
    </kendo:menu>

    <h4 style="padding-top: 2em;margin-top:30px">Vertical</h4>

    <kendo:menu
        name="verticalMenu"
        scrollable="true"
        orientation="vertical"
        style="width: 100px; height: 150px;">
        <kendo:menu-items>
            <kendo:menu-item text="Mens">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Ladies">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Kids">
                <kendo:menu-items>
                    <kendo:menu-item text="Jackets and Coats"></kendo:menu-item>
                    <kendo:menu-item text="Jeans"></kendo:menu-item>
                    <kendo:menu-item text="Knitwear"></kendo:menu-item>
                    <kendo:menu-item text="Shirts"></kendo:menu-item>
                    <kendo:menu-item text="Belts"></kendo:menu-item>
                    <kendo:menu-item text="Socks"></kendo:menu-item>
                    <kendo:menu-item text="Fan Zone"></kendo:menu-item>
                </kendo:menu-items>
            </kendo:menu-item>
            <kendo:menu-item text="Sports"></kendo:menu-item>
            <kendo:menu-item text="Brands"></kendo:menu-item>
            <kendo:menu-item text="News"></kendo:menu-item>
            <kendo:menu-item text="About us"></kendo:menu-item>
        </kendo:menu-items>
    </kendo:menu>
</div>

<style>
    .k-menu-scroll-wrapper.horizontal li.k-item.k-last {
        border-right-width: 0;
    }
</style>

<demo:footer />