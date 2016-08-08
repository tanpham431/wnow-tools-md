var XML = (function() {

    //check this string data xml is has XML format
    function checkXML(txt) {
        //code for IE browser
        if (window.ActiveXObject) {
            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
            if (xmlDoc.parseError.errorCode != 0) {
                txt = "Error Code: " + xmlDoc.parseError.errorCode + "\n";
                txt = txt + "Error Reason: " + xmlDoc.parseError.reason;
                txt = txt + "Error Line: " + xmlDoc.parseError.line;
                alert(txt);
                return false;
            } else {
                console.log('This XML file is standard.');
                return true;
            }
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation.createDocument) {
            try {
                var text = txt;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(text, "application/xml");
                // console.log(xmlDoc);
            } catch (err) {
                alert(err.message);
                return false;
            }

            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {

                var par = $(xmlDoc.getElementsByTagName("parsererror")[0]);
                var error = par.find('div').text();
                console.log(error);
                return false;
            } else {
                console.log('This XML file is standard.');
                return true;
            }
        } else {
            alert('Your browser cannot handle XML validation');
            return false;
        }
    };


    //convert RAW string into XML type data
    var convertStringToXML = function(str) {
        var parseXml;
        if (window.DOMParser) {
            parseXml = function(xmlStr) {
                return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
            };
        } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
            parseXml = function(xmlStr) {
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(xmlStr);
                return xmlDoc;
            };
        } else {
            parseXml = function() {
                return null;
            }
        }
        var xmlDoc = parseXml(str);
        return xmlDoc;
    };

    //get element in XML by name tag
    var getElementName = function(xml, level) {
        var nodes = [];
        var listName = [];
        var currentLevel = 0;
        var childXML = '';
        var rootName = xml.nodeName;
        var isChild = false;
        if (xml.childNodes.length > 0) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                if ((xml.childNodes[i].nodeName != "#document") && (xml.childNodes[i].nodeName != "#text") && (xml.childNodes[i].nodeName != "#cdata-section")) {
                    nodes.push(xml.childNodes[i]);
                    isChild = true;
                }
            }
        }
        if (isChild) {
            //  listName.push('#endlevel#');
            nodes.push('end');
        }

        // clone xml
        while (currentLevel < level && nodes.length > 0) {
            var len = nodes.length;
            var isChildNodes = false;
            for (var i = 0; i < len; i++) {
                var node = nodes.shift();
                if (typeof node == "string") break; // end level
                var name = node.nodeName;
                if (name == "field") {
                    var attrName = node.attributes['name'].nodeValue;
                    if (typeof attrName !== 'undefined') {
                        name = ('Field [name=' + attrName + ']');
                    }
                }
                if (name != "#text" && listName.indexOf(name) == -1) {
                    listName.push(name);
                }

                var children = node.childNodes;
                if (children.length > 0) {
                    isChildNodes = true;
                    for (var j = 0; j < children.length; j++) {
                        if ((children[j].nodeName != "#text") && (children[j].nodeName != "#cdata-section")) {
                            nodes.push(children[j]);
                        }
                    }
                }
            }
            if (isChildNodes) {
                listName.push('#endlevel#');
                nodes.push('end');
            }
            currentLevel++;
        }
        // console.log(listName);
        return listName;
    }


    return {
        checkXML: checkXML,
        convertStringToXML: convertStringToXML,
        getElementName: getElementName
    };
})();
