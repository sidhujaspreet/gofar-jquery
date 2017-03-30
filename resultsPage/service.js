var service = service || {};
service = (function ($) {
    
    /*=========== Models Start ===========*/
    var price = function(){
        this.actual = '';
        this.discounted = '';
        this.adultActual = '';
        this.adultDiscounted = '';
        this.childActual = '';
        this.childDiscounted = ''
    };
    
    var basicInfo = function(){
        this.id = '';
        this.title = '';
        this.description = '';
        this.imageURL = ''
    };
    
    var review = function(){
        this.reviewerName = '';
        this.reviewerEmail = '';
        this.reviewText = '';
        this.rating = {
            number : '',
            category : ''
        };
        this.dateTime = {
            date : '',
            time : ''
        }
    };
    
    var room = function(){
        this.roomtype = '';
        this.hasAC = '';
        this.price = new price();
        this.maxGuests = '';
    };
    
    var duration = function(){
        this.days = '';
        this.nights = '';
        this.type = function(){
            var total = this.days + this.nights;
            if (total <= 5){
                return 'short';
            }
            else if (total <= 9){
                return 'medium';
            }
            else if (total > 9){
                return 'long';
            }
        };
    };
    
    var hotel = function(){
        this.basicInfo = new basicInfo();
        this.starRating = '';
        this.images = {};
        this.duration = new duration();
        this.mealPlan = ['breakfast', 'lunch', 'dinner'];
        this.price = new price();
        this.room = new room();
    };
    
    var activity =function(){
        this.AddOn = {
            isAddOn : '',
            isSelected : ''
        };
        this.type = '';
        this.basicInfo = new basicInfo();
        this.price = new price();
    };
    
    var transport = function(){
        this.basicInfo = new basicInfo();
        this.price = new price();
        this.opted = '';
        this.place = {
            pickup : '',
            drop : ''
        };
        this.schedule = {
            date : '',
            time : ''
        };
    };
    
    var city = function(){
        this.basicInfo = new basicInfo();
        this.hotelList = {
            hotel1 : new hotel()
        };
        this.activityList = {
            activity1 : new activity()
        };
        this.transportList = {
            transport1 : new transport()
        };
        this.addOns = {
            activity1 : new activity()
        };
    };
    
    var itinerary = function(){
        this.basicInfo = new basicInfo();
        this.theme = ['sports', 'history', 'beach', 'romance'];
        this.location = {
            country : '',
            city : ''
        };
        this.languageList = {};
        this.price = new price();
        this.cityList = {
            city1 : new city()
        };
        this.duration = new duration();
        this.validity = {
            from : '',
            to : ''
        };
        this.imagesList = {};
        this.termsNconditions = {};
        this.reviewList = {
            review1 : new review()
        };
    };
    /*=========== Models End ===========*/
        
    /*========== Functions Start ==========*/
    
    function initialize(defaults){
        
    };
    
    
    function ajaxCall(type, url, data, onSuccess, onError, callBackSuccess, callBackFailure) {
        $.ajax({
            type: type,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json;',
            dataType: 'json',
            success: function (res) {
                onSuccess(res, callBackSuccess, callBackFailure)
            },
            error: function (xhr, status, error) {
                onError(callBackFailure);
            }
        });
    };
    /*========== Functions End ==========*/
    function parseItineraryData(data, piSuccess, piFailure){
        piSuccess(data);
    };
    
    function generalOnSuccess(result, callBackSuccess, callBackFailure) {
        callBackSuccess(result);
    };

    /**
     *This method will call failure method of viewJS
     */
    function generalOnError(callBackFailure) {
        callBackFailure();
    };

    /*======= Helper Functions Start =======*/    
    /*======= Helper Functions End =======*/
    
    /*======= Return Functions Start =======*/
    return {
        initialize: initialize,
        ItineraryData : {
            GetItineraryData: function (searchCriteria, callBackSuccess, callBackFailure) {
                var url = 'https://api.myjson.com/bins/hwkyd';//'https://api.myjson.com/bins/bof4h';
                ajaxCall('GET', url, searchCriteria, parseItineraryData, generalOnError, callBackSuccess, callBackFailure);
            },
            PostItineraryData : function (searchCriteria, callBackSuccess, callBackFailure) {
                var url = '';
                ajaxCall('POST', url, searchCriteria, buildSearchRequestSuccess, generalOnError, callBackSuccess, callBackFailure);
            }
        },
        ResourceKeys : {
            GetResourceKeys: function (searchCriteria, callBackSuccess, callBackFailure) {
                var url = '/';
                ajaxCall('GET', url, searchCriteria, buildSearchRequestSuccess, generalOnError, callBackSuccess, callBackFailure);
            }
        }
    };
    /*======= Return Functions End =======*/
})(jQuery);