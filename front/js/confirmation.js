/**
 * Create a new instance of proxy containing the search parameter
 */
 let searchParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let orderId = searchParams.id;

document.getElementById("orderId").innerText = orderId;
