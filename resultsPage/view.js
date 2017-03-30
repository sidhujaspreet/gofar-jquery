view = window.view || {};
view = (function ($) {
    
    var totalItineraries = '';
    var currentPage = 1;
    var pageSize = 2;

    var searchCriteria = {
        Theme : {
            0 : 'default',
            1 : 'Sports & Nature',
            2 : 'History & Culture',
            3 : 'Beach',
            4 : 'Romance'
        },
        Region : {
            0 : 'Default',
            1 : 'Europe',
            2 : 'Australia',
            3 : 'Asia',
            4 : 'Africa',
            5 : 'North America',
            6 : 'South Amercia'			
        },
        Price : [],
        Time : []
    };
    
    function initialize(defaults){
        
    };
    
    var filters = (function(){
        var self = {};    
        var season = {
            1 : [1,2,3],
            2 : [4,5,6],
            3 : [7,8,9],
            4 : [10,11,12]
        };
        
        self.applyFilters = function(id) {
            var filters = self.resetFilters();
            var splitValue = id.split('|');
            if(splitValue[0] == 'season'){
                filters.time = season[splitValue[1]];
            }
            else if (splitValue[0] == 'month'){
                filters.time.push(parseInt(splitValue[1]));
            }
            else if (splitValue[0] == 'price'){
                priceRange = splitValue[1].split('-');
                filters['price'].push(parseInt(priceRange[0]));
                filters['price'].push(parseInt(priceRange[1]));
            }
            else {
                filters[splitValue[0]] = splitValue[1];
            }
            console.log(filters);
        };

        self.resetFilters = function(){
            return {
                theme : '',
                purpose : '',
                region : '',
                price : [],
                time : []
            };
        };
        return self;
    })();
    
    function buildSearchCriteria(){
        return searchCriteria;
    };
    
    function getItineraryData(){
        var searchCriteria = buildSearchCriteria();
        console.log("Your data is loading.....");
        service.ItineraryData.GetItineraryData(searchCriteria, getItinerarySuccess, getItineraryFailure);
    };
    
    function getItinerarySuccess(data){
        console.log("Thanks for the patience.. Here goes your data");
        console.log(data);   
        console.log("You got your data already!!!!");
        totalItineraries = data.length;
        paginationView.initialPagination(Math.ceil(totalItineraries/pageSize));
        paginationData.getPageData(currentPage, data);
    };
    
    function getItineraryFailure(){
        console.log("Shit happens!!!!");
    };
    
    
    var paginationView = (function(){
        var self = {};
        var pageList = "";
        var current = 1;
        var last = "";

        self.init = function(){
            a = [];
            b = [];
            pageList = "";
        }; 
        
        self.initialPagination = function(lastPage){
            self.init();
            last = lastPage;
            for(i=1; i<=last;i++){
                a.push(i);
            }

            if (last <= 3){
                b = a;
                console.log(b);
                $.each(b, function(index,value){
                    if(value == 'dots'){
                        pageList +="<span>...</span>";
                    }
                    else{
                        pageList +="<a class='pageId'>" + value + "</a>";
                    }
                });
                self.getPageListView(parseInt(current), pageList);
            }
            else{
                self.getUpdatedPageList(parseInt(current));
            }
        };

        self.getUpdatedPageList = function(current){
            self.init();
            if (current == 1 || current ==2 || current == last-1 || current == last){
                if(current == 1 || current == 2) {
                    b=[1,2,3,'dots'];
                }
                else {
                    b = ['dots',last-2,last-1,last];
                }
            }
            else{
                b=['dots',current-1,current,current+1, 'dots']
            }
            console.log(b);
            $.each(b, function(index,value){
                if(value == 'dots'){
                    pageList +="<span class='pageId'>...</span>";
                }
                else{
                    pageList +="<a class='pageId'>" + value + "</a>";
                }
            });
            self.getPageListView(parseInt(current), pageList);
        };

        self.getPageListView = function(current, pageList){
            $(".page__pagination").find('.pageId').remove();
            $(".page__pagination a:first-child").after(pageList);
            $(".page__pagination").find('a').removeClass('current');
            $('a:contains("' + current + '")').addClass('current');

            $(".page__pagination").find("a.pageId").click(function(){
                view.paginationData.pageChange($(this).text());
            });
        };
        return self;
    })();
    
    var paginationData = (function(){
        var self = {};
        
        var totalRecords = '';
        var localData = '';
        var currentPage = '';
        var lastPage = '';
        self.init = function(){
            totalRecords = totalItineraries;
            lastPage = Math.ceil(totalItineraries/pageSize);
        }; 
        
        self.clickNext = function(){
            self.init();
            if(currentPage < lastPage){
                currentPage++;
                self.getPageData(currentPage, localData);
                paginationView.getUpdatedPageList(parseInt(currentPage));
            }
        };
        
        self.clickPrev = function(){
            self.init();
            if(currentPage > 1){
                currentPage--;
                self.getPageData(currentPage, localData);
                paginationView.getUpdatedPageList(parseInt(currentPage));
            }
        };
        
        self.pageChange = function(pageNumber){
            self.getPageData(parseInt(pageNumber), localData);
            paginationView.getUpdatedPageList(parseInt(pageNumber));
        };
            
        self.getPageData = function(pageNumber, data){
            
            self.init();
            localData = data;
            currentPage = pageNumber;
            var newData = [];    
            for(var i = (((pageNumber-1)*pageSize) + 1); i <= (pageNumber)*pageSize && i <= totalRecords; i++){ 
                newData.push(data[i-1]);
            }
            parseItinerary(newData);
        };
        
        return self;
    })();
    
    function parseItinerary(data){
        $('.destinations-item').not(':first').remove();
        $.each(data, function(index,value){
            var itinerary = $("#itinerary").clone();
            var id = value.basicInfo.id;
            
            itinerary.attr('id', 'itinerary'+id);
            itinerary.find("#packageTitle").text(value.basicInfo.title);
            itinerary.find("#packageTitle").attr('id','packageTitle'+id);
            
            itinerary.find("#packageDescription").text(value.basicInfo.description);
            itinerary.find("#packageDescription").attr('id','packageDescription'+id);
            
            itinerary.find("#actualPrice").text(value.price.actual);
            itinerary.find("#actualPrice").attr('id','actualPrice'+id);
            
            itinerary.find("#discountedPrice").text(value.price.discounted);
            itinerary.find("#discountedPrice").attr('id','discountedPrice'+id);
            
            var destinationList = '';
            $.each(value.locationList, function(indexLocation,valueLocation){
                destinationList +="<li><a href='#'>"+valueLocation+"</a></li>";
            });
            itinerary.find(".destinationList").append(destinationList);
            
            $("#itineraryList").append(itinerary);
            itinerary.show();
            
        });
    };
    
    return {
        initialize: initialize,
        getItineraryData: getItineraryData,
        filters: filters,
        paginationData: paginationData
    };
})(jQuery);