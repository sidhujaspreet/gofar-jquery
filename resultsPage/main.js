$(document).ready(function(){ 
    var dafaults = {};
    view.getItineraryData();
    view.initialize(dafaults); 
    service.initialize(dafaults);  
   
    
    $(".travelling-tabs__content").find(".item").find("a").click(function(){
        view.filters.applyFilters($(this).parent().attr("id"));
    });
    
    $(".page__pagination").find("a.pageId").click(function(){
        view.paginationData.pageChange($(this).text());
    });
    
    $('.pagination-prev').click(function(){
        view.paginationData.clickPrev();
    });
    
    $('.pagination-next').click(function(){
        view.paginationData.clickNext();
    });
});