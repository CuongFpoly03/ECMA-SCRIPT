const thongke = async()=>{
    const res = await fetch('http://localhost:3000/order_details');
    const orders = await res.json();
    console.log(orders);
    let tongsp = 0;
    let tongdoanhthu = 0;
    for (let order of orders) {
        tongsp+=Number(order.quantity);
        tongdoanhthu +=Number(order.unit_price);
    }
    return {tongsp, tongdoanhthu}
}
const logThongke = async()=>{
    const order = await thongke();
    console.log(order)
    const tongsp = document.querySelector('#tongsp strong');
    const doanhthu = document.querySelector('#doanhthu strong');
    tongsp.innerHTML=order.tongsp;
    doanhthu.innerHTML=order.tongdoanhthu;
}
logThongke()