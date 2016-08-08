var FILE = (function() {

    //read xml file from client
    var readFile = function(file) {
        var reader = new FileReader();
        reader.onload = function() {
            var contentFile = reader.result;

            if (XML.checkXML(contentFile)) {
                global_xmlDOC = XML.convertStringToXML(contentFile);
                var listName = XML.getElementName(global_xmlDOC, 4);
                // show to select Story
                UI.showElementToOp(listName, 'field-story-select');
                UI.hideLoading();
                $('#div-custom-story').show();
            } else {
                alert('Please insert the xml standard');
            }
        };
        reader.readAsText(file);
    };

    var checkFile = function(nameFile) {
        var extensions = nameFile.split('.');
        var extenion = extensions[extensions.length - 1];
        //check file has exstension is xml
        if (extenion == 'xml')
            return true;
        return false;
    };

    var getFileContent = function(object) {
        if (object.target.files.length > 0) {
            var file = object.target.files[0];
            var isFile = FILE.checkFile(file.name);
            if (!isFile) {
                file = null;
                alert("Please, choose file xml");
            }
            if (file != null) {
                //remove all value of select tags when choose file
                UI.removeAllValueSelects();
                FILE.readFile(file);
            } else {
                console.log('null');
            }
        } else {
            UI.hideLoading();
        }
    };

    return {
        readFile: readFile,
        checkFile: checkFile,
        getFileContent: getFileContent
    };

})();
