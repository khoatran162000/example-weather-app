let cityBaseEndpoint = "https://api.teleport.org/api/cities/?search=";

var currentFocus;
let CITIES = [];

SEARCH.addEventListener("input", function (e) { // sự kiện khi nhập text vào input
    removeSuggestions();
    var a, b, i, val = this.value;
    if (!val) {
        return false;
    }
    currentFocus = -1;

    a = document.createElement("ul"); // TẠO RA THẺ ul VỚI ID LÀ suggestions
    a.setAttribute("id", "suggestions");

    this.parentNode.appendChild(a);
    
    // 19-40: lấy ra được giá trị nhập vào (ha noi)
    // 22 - 40: sử dụng api với cái giá trị lấy được
    // api để làm gì? => để lấy ra được những thành phố có tên gần giống với giá trị em nhập vào
    let endpoint = cityBaseEndpoint + SEARCH.value; // lấy dược giá trị em nhập vào
    fetch(endpoint) // GỌI API TELEPORT ĐẺ LẤY THÔNG TIN THÀNH PHỐ THEO CÁI NHẬP VÀO
    .then((response) => response.json())
    .then((result) => {
        let cities = result._embedded["city:search-results"];
        let length = cities.length > 5 ? 5 : cities.length;


        // SAU KHI MÀ LẤY ĐƯỢC THÔNG TIN CÁC THÀNH PHỐ  THÌ push vào mảng CITIES
        for (let i = 0; i < length; i++) {
            let isPush = true;
            for (j = 0; j < CITIES.length; j++) {
                if (CITIES[j].name == cities[i].matching_full_name) {
                    isPush = false;
                }
            }
            isPush ? CITIES.push({name: cities[i].matching_full_name}) : null
        }
    })

    //sau khi cái mảng cities có dữ liệu thì render HTML
    for (i = 0; i < CITIES.length; i++) {
        if (CITIES[i].name.toUpperCase().includes(val.toUpperCase())) {
            document.getElementById("suggestions").classList.add("nav");
            document.getElementById("suggestions").classList.add("flex-column");
            li = document.createElement("li"); // tạo ra thẻ LI 
            li.innerHTML = CITIES[i].name.substr(0, val.length);
            li.innerHTML += CITIES[i].name.substr(val.length);
            li.innerHTML +=  "<input type='hidden' value='" + CITIES[i].name + "'>";
            
            li.addEventListener("click", function (e) { // khii an vao li => xóa dưx liệu mảng cities, và chèn lại data vào ô tìm kiếm  theo dữ liệu thẻ li
                SEARCH.value = this.getElementsByTagName("input")[0].value;
                removeSuggestions();
                CITIES = [];
            });

            a.appendChild(li);
        }
    }
});


SEARCH.addEventListener("keydown", (e) => { // bắt sử kiện khi bấm nut enter
    if (e.key === "Enter") {
        e.preventDefault();
        removeSuggestions();
        let location = SEARCH.value;
        if (location) {
            currentCity = location;
            getWeatherData(location, currentUnit, hourlyOrWeek); // GỌI ĐẾN HÀM ĐỂ LẤY DỮ LIỆU THỜI TIẾT, TẤT CẢ CÁI BÀI ĐỀU GỌI ĐẾN HÀM NÀY
        }
    }
});

SEARCH_FORM.addEventListener("submit", (e) => { // BÁTƯ SỰ KIỆN KHI ẤN NÚT TÌM KIẾM
    e.preventDefault();
    let location = SEARCH.value;
    if (location) {
        currentCity = location;
        getWeatherData(location, currentUnit, hourlyOrWeek);
    }
});


// khi em nhập 1 kí tự gì đó thì sẽ sinh ra thẻ thành phố (gợi ý, ở bên dưới)
SEARCH.addEventListener("keydown", function (e) {
    var x = document.getElementById("suggestions");
    if (x) x = x.getElementsByTagName("li");
    if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
    }
    if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
});

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("active");
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
}

function removeSuggestions() {
    var x = document.getElementById("suggestions");
    if (x) x.parentNode.removeChild(x);
}


SEARCH.addEventListener("click", function (e) {
    CITIES = [];
})
