import { getProducts, getEmployees, getOrders } from "./database.js"
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("product")) {
            const [, productId] = itemClicked.id.split("--")

            for (const product of products) {
                if (product.id === parseInt(productId)) {
                    window.alert(` ${product.name} costs $${product.price} `)
                }
            }
        }
    }
)

    

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findproduct = (order) => {
    let orderProduct = null

    for (const product of products) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findemployee = (order, allEmployees) => {
    let orderEmployee = ""

    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    for (const order of orders) {
        const employee = findemployee(order, employees)
        const product = findproduct(order)
    
        html += `<li>${product.name} was sold by ${employee.name} 
        on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }
    html += "</ul>"
    return html
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("employee")) {
            const [, employeeId] = itemClicked.id.split("--")

            for (const employee of employees) {
                if ( employee.id === parseInt(employeeId)) {

                    const filteredOrders = orders.filter(order => order.employeeId == employeeId)  // <--- Go to YouTube and search "javascript array filter"
                        
                    

                    window.alert(` ${employee.name} sold ${filteredOrders.length} products `)
                }
            }
        }
                
}

)

