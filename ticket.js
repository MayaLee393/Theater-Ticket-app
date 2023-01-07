let cart = []
let seatLocation = ""
let seatSection = ""
let seatRow = ""
let seatNum = ""
let seatPrice = 0
let totalPrice = 0
let added = false
let legendOpen = true
var x;
var y;
let zoomvar = 0.92;
let totalseats_selected = 0;
let cartPriceTotal = 0;
let ViewSeatsDivHeight = 70; //110
let subtotaltextandpricetop = 48; //88


/*executes each time a seat button is clicked
s is the id of the seat*/
function clicker(s){
    let selected = false
    for(let i=0; i<cart.length; i++)
    {
        if(cart[i].location==s)
        {
            //alert("hi")
            selected = true
        }
            
    }

        seatLocation = s
        added = false
        
        let id = "#"+s
        let section = $(id).attr("class").split(" ")[1];
        seatPrice = determinePrice(section)
        
        openPopup(s)

        if(selected)
        {
            //alert("hi2")
            popupType("remove")
        }
            
        else
        {
            //alert("hi1")
            popupType("clicked")
        }
            

        $(id).addClass("selected")
}

/*opens the popup containing seat details (number and price) 
blurs the other seats and prevents them from being clicked
s is the seat number*/
function openPopup(s){

        let id = "#"+s
        let section = $(id).attr("class").split(" ")[1];
        let sectioner = sectionfinder(section);
        let price = determinePrice(section)
        let rown = rowfinder(s);
        let sname = seatfinder(s);
        $("#SectionName").text(sectioner); 
        $("#TicketPrice").text("$"+price+".00")
        $("#RowName").text(rown);
        $("#SeatName").text(sname);
        $("#ButtonTicketPrice").text("$"+price+".00");


    $("#popup").css("visibility", "visible")
        let visibility = $("#popup").css("visibility")
        if(visibility=="visible")
        {
            $(".seatscontainer").addClass("blur")
            let allSeats = document.getElementsByClassName("seatscontainer")[0]
            for(let i=0; i<92; i++){
                let seat = allSeats.getElementsByTagName("button")[i].id
                document.getElementById(seat).disabled = true;
            }
        }
        
        $("#close-popup").css("visibility", "visible")
        $(".cart").css("visibility", "visible")

        if(added)
            popupType("remove")
}

/*gets theformal wording of what section the seat is in based on class */
function sectionfinder(sect){
if(sect == "section1")
{
seatSection = "Main Premium Forward";
return "Main Premium Forward";    
}


if(sect == "section2")
{
seatSection = "Main Deluxe Inner";
return "Main Deluxe Inner"    
}


if(sect == "section3")
{
seatSection = "Main Exclusive Back";
return "Main Exclusive Back"    
}


if(sect == "section4")
{
seatSection = "Main Superior Sides";
return "Main Superior Sides"    
}

}

/*gets only the row of a seat from the id */
function rowfinder(name){
seatRow = name.charAt(0);
return name.charAt(0);
}   

/*gets only the number of a seat from the id */
function seatfinder(name){
seatNum = name.substring(1); 
return name.substring(1);
}

/*changes the type of popup that shows up 
tyoe is the type of popup you want*/
function popupType(type){
    if(type=="clicked")
    {
        $("#AFP").text(" "); 
        $("#AvailableText").text("CHOOSE A TICKET TYPE: ");
        $("#TicketPrice").text(" "); 
        $(".bottompopup").css("height", "120px")
        $("#popup").css("width", "360px")
        $("#ButtonTicketPrice").css("left", "255px")
        $("#ButtonTicketPrice").text("$"+seatPrice.toFixed(2))
        $("#ButtonAFP").text("ADULT/FULL PRICE")
        document.getElementById("cartButton").onclick = function(){
            addToCart()
        }
    }
    if(type=="mouseOver")
    {
        $("#popup").css("height", "185px")
    }
    if(type=="unavailable")
    {
        $("#AFP").text("Unavailable"); 
        $("#TicketPrice").text(" "); 
    }
    if(type=="remove")
    {
        $("#ButtonTicketPrice").css("left", "145px")
        $("#ButtonTicketPrice").text("REMOVE")
        $("#ButtonAFP").text(" ")
        document.getElementById("cartButton").onclick = function(){
            removeSeat()
        }
    }
}

/*removes the seat when the seat is selected through clicking the actual seat  */
function removeSeat(){
    //alert(seatLocation)
    for(let i=0; i<cart.length; i++)
    {
        if(cart[i].location==seatLocation)
            cart.splice(i,1)
    }
    totalPrice-=seatPrice;
    document.getElementById("totalprice").innerHTML = "$"+totalPrice.toFixed(2)
    if(cart.length==1)
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seat"
    else
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seats"
    if(cart.length==0)
    {
        document.getElementById("shoppingimage").src = "shoppingbettergraypng.png";
        $(".ViewSeatsButton").css("background-color", "rgb(235, 235, 235)");
        $(".ViewSeatText").css("color", "rgb(143, 143, 143)");
        $(".ViewSeatsTable").css("visibility", "hidden");
    }
    //document.getElementById(seatLocation).onclick = false;
    noneSelected()
    viewSeats()
    exit("close-popup")
    editTable(1)
}

/*changes the status of the view seats button 
depending if there are items in the cart or not */
function viewSeats(){
    document.getElementById("ViewSeats").onclick = function(){
        if(cart.length>0)
        $(".ViewSeatsTable").css("visibility", "visible");
    }
    document.getElementById("ViewSeats").onmouseover = function(){
        if(cart.length==0)
        {
            $(".ViewSeatsButton").css("cursor", "default")
        }
        else{
            $(".ViewSeatsButton").css("cursor", "pointer")
        }
    }
}
viewSeats();

/*controls what happens when the mouse hovers over the seat */
function seatHover(){
    let allSeats = document.getElementsByClassName("seatscontainer")[0]
    for(let i=0; i<92; i++){
        let seat = allSeats.getElementsByTagName("button")[i].id
        document.getElementById(seat).onmouseover = 
        function(){
            x = document.getElementById(seat).getBoundingClientRect().left;
            y = document.getElementById(seat).getBoundingClientRect().top;
            setTimeout(function(){mouseOver(seat)},00)
        };
        /*document.getElementById(seat).onmouseover = function getPos(event) {
            var x = event.screenX;
            var y = event.screenY;
            var coords = "X coords: " + x + ", Y coords: " + y
            alert(y)
        }*/
        document.getElementById(seat).onmouseout = function() {setTimeout(function(){mouseOut(seat)},00)};
    }
} 
seatHover()

/*opens the popup when the mouse hovers over a seat 
s is the seat Number*/
function mouseOver(s){    
    //alert(y)  
    //let ff = x +"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+ y
    //document.getElementById("position").innerHTML = ff;
    //alert("hi")
    if(checkAvailability(s))
    {
        //alert("yes")
        popupType("mouseOver")
        $("#AvailableText").text("AVAILABLE TICKET TYPES:");
         $("#AFP").text("Adult/Full price");
        let id = "#"+s
        let section = $(id).attr("class").split(" ")[1];
        let sectioner = sectionfinder(section);
        let price = determinePrice(section)
        let rown = rowfinder(s);
        let sname = seatfinder(s);
        $("#SectionName").text(sectioner);  //
        $("#TicketPrice").text("$"+price+".00")
        $("#RowName").text(rown);
        $("#SeatName").text(sname);
    }
    else
    {
        //alert("no")
        popupType("unavailable")
    }
    
        if(y<100)
        {
            let popposy = y+50;
            let popposx = x-165;
            $("#popup").css("top", popposy+"px") 
            $("#popup").css("left", popposx+"px")     
        }
        else if(y<210)
        {
            let popposy = y-90;
            let popposx = x+50;
            $("#popup").css("top", popposy+"px") 
            $("#popup").css("left", popposx+"px") 
        }
        else
        {
            let popposy = y-200;
            let popposx = x-150;
            $("#popup").css("top", popposy+"px") 
            $("#popup").css("left", popposx+"px") 
        }
        if((x>1150) || (y<210 && x>945))
        {
            let popposy = y-90;
            let popposx = x-375;
            $("#popup").css("top", popposy+"px") 
            $("#popup").css("left", popposx+"px")      
        }
        $("#popup").css("visibility", "visible")
        let visibility = $("#popup").css("visibility")
        if(visibility=="visible")
        {
            $(".seatscontainer").addClass("blur")
        }
            
    $("#close-popup").css("visibility", "hidden")
    $(".cart").css("visibility", "hidden")
}

/*closes the popup when mouse exits seat */
function mouseOut(seat){
    $("#popup").css("visibility", "hidden")
    $(".seatscontainer").removeClass("blur") 
}

/*adds a seat to the cart 
cart is also locally stored, but overidden with each purchase*/
function addToCart(){
    let seat = {
        location: seatLocation,
        price: seatPrice,
        sect: seatSection,
        srow: seatRow,
        snum: seatNum
    }
    document.getElementById("shoppingimage").src = "shoppingbetterbluepng.png";
    $(".ViewSeatsButton").css("background-color", "rgba(24, 132, 165, 0.979)");
    $(".ViewSeatText").css("color", "white");
    cart.push(seat)   
    added=true;
    totalPrice+=seatPrice;
    document.getElementById("totalprice").innerHTML = "$"+totalPrice.toFixed(2)
    if(cart.length==1)
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seat"
    else
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seats"
    //document.getElementById(seatLocation).onclick = false;
    noneSelected()
    viewSeats()
    exit("close-popup")
    editTable(0)
    /*while(0>-1)
    {
        const myWin = window.open("", "", "left=700,top=350,width=200,height=100");
    }*/
}

/*edits the cart table when seats are added or removed */
function editTable(addorremove)
{
    let p = "<table id = 'actualt'>"
    let sub = "$"+totalPrice+".00"

    for(let k = 0; k<cart.length; k++)
    {
        p += "<tr id = 'SectionNameTable' class = 'RowMaker'>"
        p += "<td class = 'sectable'>" +cart[k].sect+"</td>"
        p += "<td class = 'seattable'>"+cart[k].srow+" - "+cart[k].snum+"</td>"
        p += "<td class = 'typetable'>Adult/Full price</td>"
        p += "<td class = 'pricetable'>$"+cart[k].price+".00</td>"
        p += "<td class = 'removetable'><button id = 'removebutton' class = 'rbutton' onclick = 'removecart("+k+")'>Remove</button></td>"
        p += "</tr>"
    }
    p += "</table>"
    document.getElementById("ss").innerHTML = sub;
    if(addorremove == 0)
    {
        ViewSeatsDivHeight += 52;
        subtotaltextandpricetop += 52;
        $(".ViewSeatsTable").css("height", ViewSeatsDivHeight+"px")
        $(".subtotaltext").css("top", subtotaltextandpricetop+"px")
        $(".subtotalprice").css("top", subtotaltextandpricetop+"px")
        
    }
    
    if(addorremove == 1)
    {
        ViewSeatsDivHeight -= 52;
        subtotaltextandpricetop -= 52;
        $(".ViewSeatsTable").css("height", ViewSeatsDivHeight+"px")
        $(".subtotaltext").css("top", subtotaltextandpricetop+"px")
        $(".subtotalprice").css("top", subtotaltextandpricetop+"px")
    }
    
    document.getElementById("handleTable").innerHTML = p;
    noneSelected()
}

/*removes a seat when removing from the cart table (not by clicking the seat) */
function removecart(k)
{
    $("#"+cart[k].location).removeClass("selected")
    totalPrice-=seatPrice;
    cart.splice(k,1)
    document.getElementById("totalprice").innerHTML = "$"+totalPrice.toFixed(2)
    if(cart.length==1)
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seat"
    else
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seats"
    if(cart.length==0)
    {
        document.getElementById("shoppingimage").src = "shoppingbettergraypng.png";
        $(".ViewSeatsButton").css("background-color", "rgb(235, 235, 235)");
        $(".ViewSeatText").css("color", "rgb(143, 143, 143)");
        $(".ViewSeatsTable").css("visibility", "hidden");
    }
    editTable(1)
}

/*determines the price of the seat*/
function determinePrice(section)
{
    if(section=="section1")
        return 99.00
    if(section=="section2")
        return 79.00
    if(section=="section3")
        return 59.00
    if(section=="section4")
        return 39.00
}

/*connected to the close button of a div*/
function exit(s){
    
    if(s=="close-popup")
    {
        if(!added)
            $("#"+seatLocation).removeClass("selected")

        $("#popup").css("visibility", "hidden")
        $("#close-popup").css("visibility", "hidden")
        $(".seatscontainer").removeClass("blur")
        $(".cart").css("visibility", "hidden")
        let allSeats = document.getElementsByClassName("seatscontainer")[0]
            for(let i=0; i<92; i++){
                let seat = allSeats.getElementsByTagName("button")[i].id
                document.getElementById(seat).disabled = false;
            }
    }

    if(s=="close-legend")
    {
        $(".legend").addClass("slideOut")
        $(".legend").removeClass("slideIn")
        legendOpen = false
    }
        
}

/*Disables the add to cart button when there is nothing in the cart */
function noneSelected(){
    if(cart.length==0)
    {
        document.getElementById("toCheckout").disabled = true
        $("#toCheckout").css("background-color", "lightgray")
        $("#toCheckout").css("cursor", "default")

    }
    else
    {
        document.getElementById("toCheckout").disabled = false
        $("#toCheckout").css("background-color", "rgba(24, 132, 165, 0.979)")
        $("#toCheckout").css("cursor", "pointer")
    }     
}
noneSelected()

/*purchases the seat and adds it to the local storage */
function purchase(){
    if(localStorage.getItem("purchased") != null)
    {
        let cartArray = JSON.parse(localStorage.getItem("purchased")) 
        let inCart = JSON.parse(localStorage.getItem("cart"))
        let newCart = cartArray.concat(inCart)
        localStorage.setItem("purchased", JSON.stringify(newCart))
    }
    else
    {
        let inCart = JSON.parse(localStorage.getItem("cart"))
        localStorage.setItem("purchased", JSON.stringify(inCart))

            let newCart =[]
            localStorage.setItem("cart", JSON.stringify(newCart))
    }
    
}

/*adds the seat to cart for checkout and adds it to the local storage */
function inCart(){

    localStorage.setItem("cart", JSON.stringify(cart))
    
}



/*gets all the unavailiable seats (including whats in the cart) */
function test(){
    let s = "unavailable : "
    let cartArray = JSON.parse(localStorage.getItem("purchased"))
    for(let i=0; i<cartArray.length; i++)
    {
        let object = cartArray[i]
        s+=object.location+"; "
    }
    
    document.getElementById("purchased").innerHTML = s
}

/*gets all the seats in the cart */
function test2(){
    let s = "in cart : "
    let cartArray = JSON.parse(localStorage.getItem("cart"))
    for(let i=0; i<cartArray.length; i++)
    {
        let object = cartArray[i]
        s+=object.location+"; "
    }
    
    document.getElementById("cartItems").innerHTML = s
}

/*makes all seats available */
function clearHistory(){
    let newCart =[]
    localStorage.setItem("purchased", JSON.stringify(newCart))
}

/*returns false if a seat is unavailable
returns true if a seat is available */
function checkAvailability(s){
    if(localStorage.getItem("purchased")!=null)
    {
        let cartArray = JSON.parse(localStorage.getItem("purchased"))
        //alert("i")
        for(let i=0; i<cartArray.length; i++)
        {
            let seatNumber = cartArray[i].location
            if(s==seatNumber)
                return false
            
        }
    }
    
    return true
    
}



/* keeps selection when moving on to checkout page */
function selection(){
    
    if(localStorage.getItem("cart")!=null)
    {
        let cartArray = JSON.parse(localStorage.getItem("cart"))
            for(let i=0; i<cartArray.length; i++)
            {
                let seatNumber = cartArray[i].location
                 $("#"+seatNumber).addClass("selected");
                 totalPrice+=cartArray[i].price
                 cart.push(cartArray[i])
            
            }

        //reset seat subtotals
        document.getElementById("totalprice").innerHTML = "$"+totalPrice.toFixed(2)
            if(cart.length==1)
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seat"
            else
        document.getElementById("totalseatspicked").innerHTML = cart.length+" seats"

        //resets cart button
        document.getElementById("shoppingimage").src = "shoppingbetterbluepng.png";
        $(".ViewSeatsButton").css("background-color", "rgba(24, 132, 165, 0.979)");
        $(".ViewSeatText").css("color", "white");

        if(cart.length==0)
        {
            document.getElementById("shoppingimage").src = "shoppingbettergraypng.png";
            $(".ViewSeatsButton").css("background-color", "rgb(235, 235, 235)");
            $(".ViewSeatText").css("color", "rgb(143, 143, 143)");
            $(".ViewSeatsTable").css("visibility", "hidden");
        }
        //alert(cart.length)
        noneSelected()
        viewSeats()
        editTable(0)
    }
    
}
selection()

/*disables all the unavailable seats */
function unavailable(){
    let cartArray = JSON.parse(localStorage.getItem("purchased"))
    for(let i=0; i<cartArray.length; i++)
    {
        let seatNumber = cartArray[i].location
        $("#"+seatNumber).css("background-color", "gray")
        document.getElementById(seatNumber).onclick = false;
        $("#"+seatNumber).removeClass("selected");
        
    }

}
unavailable()

/*if the page is reloaded, the local storage data of the cart is cleared */
function reloadedPage(){
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            let newCart =[]
            localStorage.setItem("cart", JSON.stringify(newCart))
        }
}
reloadedPage()

/*opens the legend*/
function openLegend(){
    $(".legend").removeClass("slideOut")
    $(".legend").addClass("slideIn")
    legendOpen = true
}

/*opens cart html page */
function openCheckout(){
    inCart()
    window.location.href = "checkout.html";
}

/*opens seats html page (main page) */
function openSeats(){

    window.location.href = "index.html";

}

/*opens purchased html page after order is submitted*/
function submitOrder(){
    purchase()
    window.location.href = "purchased.html";
}



/*controls the scrolling feature of the stage*/
dragElement(document.getElementById("smover"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  $(".seatmover").css("transition", "0.0s");
  document.getElementById("scontainer").onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:   

    let rightBoundary = 213 //
    if(!legendOpen)
        rightBoundary = 467
    if( elmnt.offsetLeft - pos1<rightBoundary && elmnt.offsetLeft - pos1>-188 && elmnt.offsetTop - pos2>-61 && elmnt.offsetTop - pos2<253)  
    {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";    
    }
 
  }


  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  
    

}

/*controls the zooming and centering mechanism of the seats */
function zooming(io){
    $(".seatmover").css("transition", 0.5+"s");
        if(io == 1)
        {   
            if(zoomvar<=1.41)
            zoomvar += 0.1;
            $(".seatmover").css("transform", "scale("+zoomvar+")");
            setInterval(function(){$(".seatmover").css("transition", 0.0+"s");},10);
        }
        if(io == 0)
        {
            if(zoomvar>=0.51)
            zoomvar -= 0.1;
            $(".seatmover").css("transform", "scale("+zoomvar+")");
            setInterval(function(){$(".seatmover").css("transition", 0.0+"s");},10);
        }

        if(io == 2)
        {
            if(legendOpen == true)
            {
            zoomvar = 0.92;
            $(".seatmover").css("transform", "scale("+zoomvar+")");
            $(".seatmover").css("left", -10+"px");
            $(".seatmover").css("top", 75+"px");    
            setInterval(function(){$(".seatmover").css("transition", 0.0+"s");},10);
            }

            else
            {
            zoomvar = 1.12;
            $(".seatmover").css("transform", "scale("+zoomvar+")");
            $(".seatmover").css("left", 10+"px");
            $(".seatmover").css("top", 55+"px"); 
            setInterval(function(){$(".seatmover").css("transition", 0.0+"s");},10);//what if i make a like millisecond delayed function to take off transition    
            }
            
        }
    }

    /*function mail(){
        window.open('mailto:mlee8580@kleinisd.students.net');
    }*/