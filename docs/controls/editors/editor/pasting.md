---
title: Pasting
page_title: Pasting | Kendo UI Editor
description: "Learn how pasting works in Kendo UI Editor widget."
slug: pasting_editor_widget
position: 6
---

# Pasting

Pasting in Editor widget from other HTML and MS Word documents is essential for the end-user experience. This article shows the basic concepts of pasting in editable elements and the built-in utilities Editor widget provides to help fine-tune the final results.

## Basic Concepts

Basically, Editor widget facilitates the DOM clipboard events. Therefore, any content pasted, is first processed by the browser.

After the browser processes the content, the [pasteCleanup](/api/web/editor#configuration-pasteCleanup) options come in place to help you control what is going to be actually pasted.

## Cleaning HTML on Paste

The built-in [pasteCleanup](/api/web/editor#configuration-pasteCleanup) options are:

* [`none`](/api/web/editor#configuration-pasteCleanup.none) - disables all options (i.e., none of the pasteCleanup options will be executed). Disabled by default;
* [`all`](/api/web/editor#configuration-pasteCleanup.all) - strips all HTML tags and leaves only plain text. Disabled by default;
* [`keepNewLines`](/api/web/editor#configuration-pasteCleanup.keepNewLines) - removes all HTML elements (like `all` option), but preserves new lines. Disabled by default;
* [`span`](/api/web/editor#configuration-pasteCleanup.span) - removes the span elements from the copied content. Disabled by default;
* [`css`](/api/web/editor#configuration-pasteCleanup.css) - removes `style` and `class` attributes from all HTML elements from the copied content. Disabled by default;
* [`msTags`](/api/web/editor#configuration-pasteCleanup.msTags) - strips MS Word specific tags when pasting content and cleans up extra metadata. Enabled by default;
* [`msAllFormatting`](/api/web/editor#configuration-pasteCleanup.msAllFormatting) - strips MS Word specific tags plus removes font-name and font-size decoration derived from MS Word. Disabled by default;
* [`msConvertLists`](/api/web/editor#configuration-pasteCleanup.msConvertLists) - converts MS Word lists to HTML lists. Enabled by default;
* [`custom`](/api/web/editor#configuration-pasteCleanup.custom) - uses a callback functions to create [your own pasteCleanup option](#create-your-own-pastecleanup-fucntion).

In the following example you can copy the HTML content above editor and paste it in the content area. Due to the enabled `span` option, span tags will be removed.

###### Example

```html
<p>Copy this is a paragraph that has some <span style="font-family:Impact, Charcoal, sans-serif;">inline </span><span style="font-family:Impact, Charcoal, sans-serif;color:#ffffff;background-color:#3366ff;">styles</span>. And paste it in editor.</p>
<hr />
<textarea id="editor"></textarea>
<script>
$("#editor").kendoEditor({
    pasteCleanup: {
        span: true
    }
});
</script>
````

## Pasting from MS Word

As you may have noticed, there are specific pasteCleanup options targeting MS Word—the ones with `ms` prefix. 

They are especially made to offer more control on pasting content from MS Word. Typically, browsers translate MS Word content to HTML, but there are no strict rules or specification that lead to proper results. Thus, these options deliver a better cross-browser result in this case. 

`msTags` and `msAllFormatting` strip MS Word specific tags. MS Word specific tags are some valid XML nodes that MS Word uses to render text formatting and decoration. Some browsers do not translate these tags, they are just inserted into the content area on pasting. Thus, causing the HTML to be invalid. Additionally. `msAllFormatting` option removes font-name and font-size stylization. 

`msConvertLists` is an option that enables end-user to successfully paste MS Word lists and convert them to proper HTML lists on pasting. Typically, most of the browsers do not support that and lists are pasted as plain `<p>` tags.

In the following example you can see how you can adjust the MS Word specific options. Additionally, you can click on preview and see the result by pasting content from MS Word. 

```html
<textarea id="editor"></textarea>
<script>
$("#editor").kendoEditor({
    pasteCleanup: {
        msAllFormatting: false,
        msConvertLists: true,
        msTags: true
    }
});
</script>
````

## Create your own pasteCleanup function

The `custom` field is a powerful way to define your own logic to clean the pasted HTML. Basically, assign a callback function. The exposed argument of that callback is the HTML that is passed through all other `pasteCleanup` options. Implement your own logic that modifies the exposed HTML and return it as a `string`.

This example shows a simple logic to strip `<strong>` tags from the pasted HTML content.

###### Example

```html
<p>some text with <strong>bold text</strong> inside.</p>
<hr />
<textarea id="editor"></textarea>
<script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            custom: function(html) {
                return html.replace(/<\/?strong[^>]*>/, "");
            }
        }
    });
</script>
```` 

## See Also

Other articles on Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

