# Incorrect flush order

When `<await>` is wrapped in another `<server-await>` tag to share common
server-side logic, the flush order appears to be incorrect when there is a
promise rejection.

In this reproduction, when we have 2 promise, the first resolves, and the
second rejects.

When the rejection happens first, the browser crashes because Marko runtime
`<script>`s get flushed before the necessary HTML.

Conversely, when the resolution happens first, the browser does NOT crash
because the HTML gets flushed first.
