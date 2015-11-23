

// Purpose of this file is to enable loading of images and labels
// 


// Don't think I'll need these helpers, but keeping them for now.
 
// function ab2str(buf) {
  // return String.fromCharCode.apply(null, new Uint32Array(buf));
// }

// function str2ab(str) {
  // var buf = new ArrayBuffer(str.length*4); // 4 bytes for each char
  // var bufView = new Uint32Array(buf);
  // for (var i=0, strLen=str.length; i<strLen; i++) {
    // bufView[i] = str.charCodeAt(i);
  // }
  // return buf;
// }

(function(ns) {

    // size of MNIST data
    ns.imgW = 28;
    ns.imgH = 28;
    ns.trainImages = [];
    ns.trainLabels = [];
    ns.imgCt = 0;

    ns.OnLoadMNISTFile = function(elem) {

        ns.ignoreByteCt = -1;
        if (elem.id === "btnLoadTrainingImages"){
            // magic number, number of labels
            ns.ignoreByteCt = 16;
            ns.selToUpdate = "trainImage";
            $("#" + ns.selToUpdate + "Status").text("Loading");       
        }
        if (elem.id === "btnLoadTrainingLabels"){
            // magic number, number of labels
            ns.ignoreByteCt = 8;
            ns.selToUpdate = "trainLabel";
            $("#" + ns.selToUpdate + "Status").text("Loading");
        }
        if (elem.id === "btnLoadTestData"){
            // magic number, number of labels
            ns.ignoreByteCt = 16;
        }
        if (elem.id === "btnLoadTestLabels"){
            // magic number, number of labels
            ns.ignoreByteCt = 8;
        }
       
        var fileElem = $("#openfile");
        fileElem.click();
    };
    
    ns.handleFileSelect = function(evt) {
        var files = evt.target.files; // FileList object
        var file = files[0];
        
        var fileReadAsDataUrl = new FileReader();
        
        fileReadAsDataUrl.onload = (function(progEvt) {

            console.log("in onload");
            var fileAsDataUrl = progEvt.target.result;
            var re = /^.*base64,/g;
            var temp = re.exec(fileAsDataUrl);
            var b64Str = fileAsDataUrl.substring(re.lastIndex);
                        
            var byteChars = atob(b64Str);  // decode 64 bit encoding
            
            // to go to 32 bit ints
            //var byteNumbers = new Array(byteChars.length/4);
            //for (var i = 0; i < byteChars.length; i +=4) {
            //    byteNumbers[i/4] = 
            //        (byteChars.charCodeAt(i)   << 32) + 
            //        (byteChars.charCodeAt(i+1) << 16) + 
            //        (byteChars.charCodeAt(i+2) << 8)  + 
            //        (byteChars.charCodeAt(i+3));
            //}
            
            var byteNumbers = new Array(byteChars.length-ns.ignoreByteCt);
            for (var i = 0; i < byteChars.length-ns.ignoreByteCt; ++i) {
                byteNumbers[i] = byteChars.charCodeAt(i+ns.ignoreByteCt);
            }
            
            ns[ns.selToUpdate + "s"] = byteNumbers;
            
            console.log (byteNumbers.length);
            $("#" + ns.selToUpdate + "Status").text("Loaded");
            
            if (ns.selToUpdate === "trainImage") {
                ns.imgCt = byteNumbers.length / (ns.imgW * ns.imgH);
            }
            
        });
        
        fileReadAsDataUrl.readAsDataURL(file); 
    };


})(NN);

$(document).ready(function() {
    
    document.getElementById('openfile').addEventListener('change', NN.handleFileSelect, false);

});
