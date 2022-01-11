var table=[
    {id :1 , name: "Table-1" , noofitems: 0, totalbill: 0 ,selecteditems:new Map()},
    {id :2 , name: "Table-2" , noofitems: 0, totalbill: 0 ,selecteditems: new Map()}
]

var items=[
    {id :1, name:"Chicken biryani", category:"rice",price:220},
    {id :2, name:"Mutton biryani", category:"rice",price:250},
    {id :3, name:"Chicken noodles", category:"chinese",price:180},
    {id :4, name:"Prawns noodles", category:"chinese",price:320},
    {id :5, name:"Panner Butter Masala", category:"gravy",price:150},
    {id :6, name:"Chicken fry", category:"gravy",price:220},
    {id :7, name:"Ice cream", category:"dessert",price:50},
    {id :8, name:"Double ka meeta", category:"dessert",price:80},
]

 function addTables()
 {
     for(var i=0;i<table.length;i++)
     {
         var tablediv = document.createElement("div");
         var tablename = document.createElement("h2");
         var no = document.createElement("p");
         var cost = document.createElement("p");

         tablediv.className="Table";
         tablediv.id="Table-"+ table[i].id;

         tablename.className="Tables"
         tablename.id="Tableno:"+table[i].id;

         no.className="NoOfItems"
         no.id="NoOfItems:"+table[i].id;

         cost.className="TotalPrice";
         cost.id="TotalPrice:"+table[i].id;


         tablename.textContent= table[i].name;
         no.textContent= "No Of Items:"+table[i].noofitems;
         cost.textContent="Total Price: Rs."+ table[i].totalbill;

         tablediv.appendChild(tablename);
         tablediv.appendChild(no);
         tablediv.appendChild(cost);
         tablediv.addEventListener("dragover",dragoverEvent);
         tablediv.addEventListener("drop",dropEvent);
         tablediv.addEventListener("click",openOrderDetails);
         document.getElementById("TableConatiner").appendChild(tablediv);
         
     }
 }
 
 function addItems()
 {
     for(var i=0;i<items.length;i++)
     {
        var itemdiv = document.createElement("div");
        var itemname = document.createElement("h2");
        var cost = document.createElement("p");

        itemdiv.className="Item";
        itemdiv.id="Item-"+ items[i].id;
        itemdiv.draggable=true;

        itemname.className="ItemName";
        cost.className="Price";

        itemname.textContent=items[i].name;
        cost.textContent= items[i].price;


        itemdiv.appendChild(itemname);
        itemdiv.appendChild(cost);
        itemdiv.addEventListener("drag",dragEvent);
        document.getElementById("ItemsContainer").appendChild(itemdiv);
     }
 }
 addTables();
 addItems(); 

 function searchTables() {
    var input, filter, a, tablelist;
    input = document.getElementById("searchTables");
    filter = input.value.toUpperCase();
    tablelist = document.getElementsByClassName("Table");

    for (var i = 0; i < tablelist.length; i++) {
        a = table[i].name;
        if (a.toUpperCase().indexOf(filter) > -1 ) {
            tablelist[i].style.display = "";
        } 
        else {
            tablelist[i].style.display = "none";
        }
    }
}

function searchItems() {
    var input, filter, a, itemlist;
    input = document.getElementById("searchItems");
    filter = input.value.toUpperCase();
    itemlist = document.getElementsByClassName("Item");

    for (var i = 0; i < itemlist.length; i++) {
        a = items[i].name;
        if (a.toUpperCase().indexOf(filter) > -1 ) {
            itemlist[i].style.display = "";
        } 
        else {
            itemlist[i].style.display = "none";
        }
    }
}
document.addEventListener("input",searchItems);
document.addEventListener("input",searchTables);
var itemid,itemcost,tableid;
function dragEvent(event)
{
    itemid=this.id.charAt(5);
    itemcost=items[itemid-1].price;
}
function dropEvent(event)
 {
    tableid = this.id.charAt(6);
    table[tableid-1].noofitems++;
    if(table[tableid-1].selecteditems.get(itemid) != undefined)
        table[tableid-1].selecteditems.set(itemid, table[tableid-1].selecteditems.get(itemid)+1);
    else
        table[tableid-1].selecteditems.set(itemid, 1);
    table[tableid-1].totalbill+=itemcost;
    document.getElementById("NoOfItems:"+tableid).textContent="No Of Items:"+table[tableid-1].noofitems;
    document.getElementById("TotalPrice:"+tableid).textContent="Total Price: Rs."+table[tableid-1].totalbill;
 }
function dragoverEvent(event)
{
    event.preventDefault();
}
function openOrderDetails(ev){
    let tableId = this.id;
    selectedTableId = tableId;
    document.getElementById("OrderDetails").style.visibility = "visible";
    document.getElementById("container").style.opacity = "0.7";
    document.getElementById("OrderDetailsHeader").textContent =  tableId+ "  | Order Details";
    document.getElementById("generatebill").addEventListener("click", closeSession);
    tableRows();

}
function tableRows()
{
    let rows = document.getElementsByClassName("MenuRow");
    for(let i=rows.length-1; i>=0;i--){
        rows[i].remove();
    }
    let orderlist = table[tableid-1].selecteditems;
    let i=1;
    for(let [itemId, noOfItems] of orderlist){
        let row = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");
        let col3 = document.createElement("td");
        let col4 = document.createElement("td");
        let col5 = document.createElement("td");

        row.className = "MenuRow";
        row.id = "MenuRow"+i;
        col1.textContent = i;
        col2.textContent = items[itemId-1].name;
        col3.textContent = items[itemId-1].price;
        
        let quantity = document.createElement("input");
        quantity.type = "number";
        quantity.setAttribute("min",1);
        quantity.id = items[itemid-1].id;
        quantity.className = "ItemQuantity"+i;
        quantity.setAttribute("value", noOfItems);
        quantity.addEventListener("change", changeItemQuantity);
        col4.appendChild(quantity);
        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteItem";
        deleteButton.id = items[itemid-1].id;
        deleteButton.title = "Delete";
        deleteButton.textContent="Delete Item";
        deleteButton.addEventListener("click", deleteOrderItem)
        col5.appendChild(deleteButton);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        document.getElementById("OrderItemBody").appendChild(row);
        i++;
    }
    document.getElementById("OrderItemBill").textContent = "Total : Rs."+ table[tableid-1].totalbill;
}

function changeItemQuantity(ev)
{
    let updatedvalue = parseInt(this.value);
    let itemId = this.id;
    let oldvalue = table[tableid-1].selecteditems.get(itemId);
    let diffcost = (updatedvalue-oldvalue)*items[itemId-1].price;
    table[tableid-1].noofitems=updatedvalue;
    table[tableid-1].totalbill+=diffcost;
    table[tableid-1].selecteditems.set(itemId,updatedvalue);
    document.getElementById("OrderItemBill").textContent = "Total : Rs."+ table[tableid-1].totalbill;
    document.getElementById("TotalPrice:"+ tableid).textContent = "Total : Rs."  + table[tableid-1].totalbill;
    document.getElementById("NoOfItems:" + tableid).textContent = "No Of Items: "  + table[tableid-1].noofitems;
}

function deleteOrderItem()
{
    let itemId =this.id;
    table[tableid-1].noofitems-=table[tableid-1].selecteditems.get(itemId);
    table[tableid-1].totalbill-=table[tableid-1].selecteditems.get(itemId)*items[itemId-1].price;
    table[tableid-1].selecteditems.delete(itemId);
    tableRows();
    document.getElementById("TotalPrice:"+ tableid).textContent = "Total : Rs."  + table[tableid-1].totalbill;
    document.getElementById("NoOfItems:" + tableid).textContent = "No Of Items: "  + table[tableid-1].noofitems;
}

function closeSession()
{
    table[tableid-1].noofitems=0;
    table[tableid-1].totalbill=0;
    table[tableid-1].selecteditems=new Map();
    document.getElementById("TotalPrice:"+ tableid).textContent = "Total : Rs."  + table[tableid-1].totalbill;
    document.getElementById("NoOfItems:" + tableid).textContent = "No Of Items: "  + table[tableid-1].noofitems;   
    closeOrderDetails();
}

function closeOrderDetails(){
    document.getElementById("OrderDetails").style.visibility = "hidden";
    let rows = document.getElementsByClassName("MenuRow");
    for(let i=rows.length-1; i>=0;i--){
        rows[i].remove();
    }
    document.getElementById("container").style.opacity = "1";
}