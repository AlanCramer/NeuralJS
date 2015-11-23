
(function() {

    var Network = function(sizes) {
        
        var num_layers = sizes.length;
        var biases = sizes.slice(1).map(function(y) { 
            return y*Math.random();
        });
        var biases = sizes.map(function(y) { 
            return y*Math.random();
        });
        
        console.log(biases);
    };        
    
    Network([100, 10, 1]);
    
})();