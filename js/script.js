var listProducts = [];

var listBrands = [];

var uniqueBrands = [];

var brandsSelected = [];

function hideContent() {
    document.getElementById("content").style.display = "none";
    document.getElementById("loading").style.display = "block";
}

function showContent() {
    document.getElementById("content").style.display = "block";
    document.getElementById("loading").style.display = "none";
}

$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listProducts div.responsive").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function innerHtmlListProducts(element) {
    document.getElementById("listProducts").innerHTML += `
        <div class="responsive">
            <div class="gallery">
                <a target="_blank" href="` + element.image + `">
                    <img src="` + element.image + `" alt="` + element.title + `" width="600" height="400">
                </a>
                <div class="desc" name="` + element.title + `">` + element.title + `</div>
                <div class="desc">
                    <span>R$ </span>
                ` + element.price + `
                </div>
            </div>
        </div>`;
}

function onInit() {

    hideContent();

    $.ajax({
        //url: "http://localhost:8080/v1/product/list",
        url: "https://cors-anywhere.herokuapp.com/http://challenge-api.luizalabs.com/api/product/?page=1",
        method: "GET",
        dataType: "JSON",
        useDefaultXhrHeader: false,
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        success: function (data) {

            listProducts = data.products;

            for (i = 0; i < listProducts.length; i++) {

                listProducts[i].visible = false;

                innerHtmlListProducts(listProducts[i]);

                listBrands.push(listProducts[i].brand);
            }

            $.each(listBrands, function (i, el) {
                if ($.inArray(el, uniqueBrands) === -1) uniqueBrands.push(el);
            });

            uniqueBrands.sort();

            for (i = 0; i < uniqueBrands.length; i++) {
                document.getElementById("brands").innerHTML += `
                    <li>
                        <input type="checkbox" value="` + uniqueBrands[i] + `"> 
                        ` + uniqueBrands[i] + `
                    </li>`;
            }

        },
        error: function (error) {

            console.log("ERROR");

            console.log(error);

            document.getElementById("listProducts").innerHTML += `
                <div>
                    <h4>Erro ao buscar produtos, recarregue a página e tente novamente.</h4>
                </div>`;
        },
        complete: function () {

            showContent();
        }
    });
}

function changeSort() {

    var select = document.getElementById("mySort").value;

    if (select != "null") {

        document.getElementById("listProducts").innerHTML = ``;

        if (select == 'lowPrice') {
            lowPrice();
        }

        if (select == 'bigPrice') {
            bigPrice();
        }

        if (select == 'orderAZ') {
            orderAZ();
        }

        if (select == 'orderZA') {
            orderZA();
        }

    }

}

function lowPrice() {

    hideContent();

    listProducts.sort(function (a, b) {
        return a.price - b.price
    });

    if (brandsSelected.length > 0) {

        for (i = 0; i < listProducts.length; i++) {

            if (listProducts[i].visible == true) {

                innerHtmlListProducts(listProducts[i]);

            }

        }

    } else {

        for (i = 0; i < listProducts.length; i++) {

            innerHtmlListProducts(listProducts[i]);

        }

    }

    showContent();
}

function bigPrice() {

    hideContent();

    listProducts.sort(function (a, b) {
        return b.price - a.price
    });

    if (brandsSelected.length > 0) {

        for (i = 0; i < listProducts.length; i++) {

            if (listProducts[i].visible == true) {

                innerHtmlListProducts(listProducts[i]);

            }

        }

    } else {

        for (i = 0; i < listProducts.length; i++) {

            innerHtmlListProducts(listProducts[i]);

        }

    }

    showContent();
}

function orderAZ() {

    hideContent();

    listProducts.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });

    if (brandsSelected.length > 0) {

        for (i = 0; i < listProducts.length; i++) {

            if (listProducts[i].visible == true) {

                innerHtmlListProducts(listProducts[i]);

            }

        }

    } else {

        for (i = 0; i < listProducts.length; i++) {

            innerHtmlListProducts(listProducts[i]);

        }

    }

    showContent();
}

function orderZA() {

    hideContent();

    listProducts.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });

    listProducts.reverse(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });

    if (brandsSelected.length > 0) {

        for (i = 0; i < listProducts.length; i++) {

            if (listProducts[i].visible == true) {

                innerHtmlListProducts(listProducts[i]);

            }

        }

    } else {

        for (i = 0; i < listProducts.length; i++) {

            innerHtmlListProducts(listProducts[i]);

        }

    }

    showContent();
}

function brandFilter(element) {

    hideContent();

    if (element.checked == true) {

        brandsSelected.push(element.value);

    } else if (element.checked == false) {

        for (i = 0; i < brandsSelected.length; i++) {

            if (brandsSelected[i] == element.value) {

                brandsSelected.splice(i, 1);

            }

        }

    }

    document.getElementById("listProducts").innerHTML = ``;

    brandVisible(element.value, element.checked);

    if (brandsSelected.length > 0) {

        for (i = 0; i < listProducts.length; i++) {

            if (listProducts[i].visible == true) {

                innerHtmlListProducts(listProducts[i]);

            }

        }

    } else {

        for (i = 0; i < listProducts.length; i++) {

            listProducts[i].visible == false;

            innerHtmlListProducts(listProducts[i]);

        }

    }

    showContent();
}

function brandVisible(brand, checked) {

    for (i = 0; i < listProducts.length; i++) {

        if (listProducts[i].brand == brand) {

            listProducts[i].visible = checked;

        }

    }

}
