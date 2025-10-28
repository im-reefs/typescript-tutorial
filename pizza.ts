//url for tutorial: https://www.youtube.com/watch?v=SpwzRDUQ1GI
type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed"
}

const menu: Pizza[] = [
    {id: 1, name: "Margherita", price: 8},
    {id: 2, name: "pepporoni", price: 10},
    {id: 3, name: "Hawaiian", price: 10},
    {id: 4, name: "Veggie", price: 9}
]

let cashInRegister = 100; //change to *const* for the original
const orderQueue: Order[] = [];

let nextOrderId: number;

// Challenge: Add a utility function "addNewPizza" that takes a pizza object
// and adds it to the menu

function addNewPizza(pizzaMenu: Omit<Pizza, "id">): Pizza{
    let id = menu.length + 1;
    let {name, price} = pizzaMenu;
    let fullPizzaMenu = {id, name, price};

    menu.push(fullPizzaMenu);
    return fullPizzaMenu;
}

// - Write another utility function, placeOrder, that takes a pizza name parameter and:
//   1. Finds that pizza object in the menu
//   2. adds the income to the cashRegister
//   3. pushes a new "order object" to the orderQueue
//      (e.g. {pizza: selectedPizzaObjectFromStep1, status: "ordered"})
//   4. returns the new order object (just in case we need it later)

function placeOrder(pizzaName: string): Order | undefined{
    let index;

    for(let i = 0; i < menu.length; i++){
        if(pizzaName == menu[i].name){
            index = i;   
        }
        else{
            console.log("Please reorder | No menu is found");
        }
    }
    if(!index){
        return
    }
    cashInRegister += menu[index].price;
    if(nextOrderId < 0){

        nextOrderId = 0;
    }
    else{

        nextOrderId = orderQueue.length + 1;
    }

    let newOrderObject: Order = {id: nextOrderId, pizza: menu[index], status: "ordered"}
    orderQueue.push(newOrderObject);

    completeOrder(newOrderObject.id);

    return newOrderObject;
}

// Challenge: Write another utility function, completeOrder, that takes an orderId as a parameter
// finds the correct order in the orderQueue, and marks its status as  "completed", For good measure,
// return the found order from the function.
// --------------------------------------------------------------------------------------------------
// Note: you'll need to ensure that we're adding IDs to our orders when we create new orders. You 
// can use a global "nextOrderId" variable and increment it every time a new order is created to 
// simulate real IDs being managed for us by a database


function completeOrder(orderId: number): Order | undefined{

    let completeTaskId = orderQueue.find(order => order.id === orderId);

    //This eliminate the risk of completeTaskId === undefined
    if(!completeTaskId){
        console.log("Order Not Found");
        return;
    }

    completeTaskId.status = "completed";

    return completeTaskId;
}

// Challenge: create a new utility function called getPizzaDetail. It will take
// a parameter called a 'identifier' , but there's a twist: we want this identifier
// to be allowed to either be the string name of the pizza (e.g "Pepperoni"),
// OR to be the number ID of the pizza (e.g. 2).

// Don't worry about the code inside the function yet, just create the function 
// signature, making sure to teach TS that the 'identifier' parameter is allowed
// to either be a string or a number

function getPizzaDetail(identifier: number | string): Pizza | undefined{
    if(typeof identifier == "number"){
        return menu.find(pizza => pizza.id === identifier);
    }
    else if(typeof identifier == "string"){
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
    }
    else{
        throw new TypeError("Parameter 'identifier' must be either a string or a number");
    }
}

// // QUick generic function
// function addToArray<T>(array: T[], item: T): T[]{
//     array.push(item);
//     return array;
// }

// //example use of generics function challenge
// addToArray<Pizza>(menu, {id: 5, name: "Boobies", price: 20});
// addToArray<Order>(orderQueue, {id: orderQueue.length + 1, pizza: menu[2], status: "completed"});

//Code starts here --------------------------------------------------------------------------------------

addNewPizza({name: "New York", price: 7});
addNewPizza({name: "Neopolitan", price: 8});
placeOrder("pepporoni");
placeOrder("New York");
placeOrder("Neopolitan");
placeOrder("Veggie");

for(let i = 0; i < menu.length; i++){

    console.log(menu[i]);
}

console.log(orderQueue);

//how to console.log function returns
console.log("Fetching pizza detail on menu with id 5...", getPizzaDetail("New York"));

//another way to console.log function returns
console.log(getPizzaDetail("New York"));