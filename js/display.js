

// assumes ns.trainImgs
// ns.imgW and ns.imgH

(function(ns) {

    ns.curImgIdx = -1;

    // svg is a d3 selection of the svg to add to
    // idx is the image idx to display
    ns.displayPrevImg = function() {
        
        if (ns.curImgIdx >0)
            ns.curImgIdx--;
        
        ns.displayImg(ns.curImgIdx);
    };
    
    ns.displayNextImg = function() {
    
        if (ns.curImgIdx < ns.imgCt)
            ns.curImgIdx++;
        
        ns.displayImg(ns.curImgIdx);
    };
    
    ns.displayImg = function(idx) {
        
        var imgSz = ns.imgW * ns.imgH;
        
        var imgdata = ns.trainImages.slice(imgSz*idx, imgSz*(idx+1));
        var imgsAsRows = [];
        for (var irow = 0; irow < imgdata.length; irow+=ns.imgW) {
            imgsAsRows.push(imgdata.slice(irow, irow + ns.imgW));
        }
        
        d3.select("#imgDisplay table").remove();
        
        d3.select("#imgDisplay")
            .append("table")
            .style("border-collapse", "collapse")
            .style("border", "2px black solid")
            
            .selectAll("tr")
            .data(imgsAsRows)
            .enter().append("tr")
            
            .selectAll("td")
            .data(function(d){return d;})
            .enter().append("td")
            .style("border", "1px black solid")
            .style("padding", "5px")
            .style("background-color", function(d) {
                return "rgb("+d+","+d+","+d+")";
            })
        ;
    };            
           
    
})(NN);