
function Today() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    const curMonth = months[today.getMonth()]
    today = dd + curMonth;
    return (
        <> {today}</>
    )
}

export default Today
