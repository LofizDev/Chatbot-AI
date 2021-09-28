// Current Date of the Weather
export function getCurrentDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, );
    const months = new Array('Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12')
    const curMonth = months[today.getMonth()]
    today =  dd +' ' + curMonth +', 2021'
    return today
}

// TimeSince of The News
export function timeSince(date) {
    let seconds = Math.floor((Number(Date.now()) - Number(date) * 1000) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval) + " năm";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút";
    }
    return Math.floor(seconds) + " giây";
}


  