function escape_html_code(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function nl2br(str) {
    str = str.replace(/\r\n/g, "<br />");
    str = str.replace(/(\n|\r)/g, "<br />");
    return str;
}

function codes(){
  $("code,.code").each(function(i,elem){
    var code_html = $(elem).html();
    var escape_html = escape_html_code(code_html);
    escape_html = nl2br(escape_html);
    $(elem).html(escape_html);
  });
}
