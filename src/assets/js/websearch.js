(function() {
    $(function() {

        /* 
         * Search button click performs a Google search
         */
        $('#navbar').on('click', "#srchButton", function(e) {
            window.open("http://www.google.com/search?q=" + ($("#srchText").val()).split(' ').join('+'), "Search");
            console.log("performing a web search");
        });

        /* 
         * If the user pressed the enter key this will throw the search button click
         */
        $('#navbar').keypress(function(e){
            if(e.which == 13){
                console.log("caught enter key - executing click for web search");
                $('#srchButton').click();
            }
        });

    });
})();
