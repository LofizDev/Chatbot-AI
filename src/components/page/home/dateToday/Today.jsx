
function Today(d) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, );
    const months = new Array('Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12')
    const curMonth = months[today.getMonth()]
    today =  dd +' ' + curMonth +', 2021'
    return (
        <div style={{letterSpacing:'.6px'}}> {today}</div>
    )
}

export default Today
