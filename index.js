import { menuArray } from "./data.js"

let orderArray = []

const paymentModalForm = document.getElementById("payment-modal-form")
const paymentModal = document.getElementById('payment-modal')
const modalCloseBtn = document.getElementById("modal-close-btn")


// ==== Event Listener ====
document.addEventListener('click', function(e) {
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)  
    }
    else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.id === "complete-order-btn") {
        handleCompleteOrderClick()
    }
})
modalCloseBtn.addEventListener('click', function(){
    paymentModal.style.display = 'none'
})



// ==== functions for event listener ====
function handleAddClick(itemId) {
    const targetMenuItemObj = menuArray.filter(function(menuItem) {
        return menuItem.id == itemId
    })[0]
    
    orderArray.push(
        {
            name:`${targetMenuItemObj.name}`,
            price:`${targetMenuItemObj.price}`,
            id:`${orderArray.length}`
        }
    )
    if (orderArray.length > 0){
        document.getElementById("order-summary")
    }

    render()
}

function handleRemoveClick(itemId) {
    orderArray.splice(itemId, 1)
    render()
}

function handleCompleteOrderClick() {
    // have the payment modal come up
    paymentModal.classList.remove("hidden")
}



// ==== Rendering HTML ====
function getMenuHTML() {
    let menuHTML = ''

    menuArray.forEach(function(menuItem) {
    menuHTML += `
                <div class="menu-item">
                    <div class="item-container">
                        <div class="food-emoji">${menuItem.emoji}</div>
                        <div class="food-details">
                            <h2>${menuItem.name}</h2>
                            <h4>${menuItem.ingredients}</h4>
                            <h3 class="price" data-price=${menuItem.id}>$${menuItem.price}</h3>
                        </div>
                    </div>
                <button class="add-btn" data-add="${menuItem.id}">+</button>
                </div>  
                `
    })
    return menuHTML
}


function getCheckoutSummaryHTML() {
    // ==== Display hidden summary if summary array is not empty ====
    if (orderArray.length > 0) {
        document.getElementById("order-summary").classList.remove("hidden")
    }
    else {
        document.getElementById("order-summary").classList.add("hidden")
    }

    let orderHTML = ''
    let totalPrice = 0

    orderArray.forEach(function(orderedItem) {
        orderHTML += 
        `
        <div id="checkout-container" class="checkout-container">
            
            <div class="item-container">
                <h2>${orderedItem.name}</h2>
                <button class="remove-btn" data-remove="${orderedItem.id}">remove</button> 
            </div>

            <div class="price">$${orderedItem.price}</div>
        </div>
        `
        totalPrice += parseInt(orderedItem.price,10)   
        document.getElementById("total-price").innerText=`\$${totalPrice}`
    })
    return orderHTML
}


// ==== Pay button event listener with corresponding function====


paymentModalForm.addEventListener('submit', function(e) {
    e.preventDefault()

    paymentModal.classList.add('hidden')

    const modalFormData = new FormData(paymentModalForm)
    const customerName = modalFormData.get('name')

        document.getElementById("order-summary").innerHTML =
        `<div class="order-notification-container">
            <h2>Thanks, ${customerName}! Your order is on its way!</h2>
        </div>`
    })



// ==== render ====
function render() {
    document.getElementById('menu-items').innerHTML = getMenuHTML()
    document.getElementById("ordered-items").innerHTML = getCheckoutSummaryHTML()
}

render()