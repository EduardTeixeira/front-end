//var products = [10, 5, 5, 7, 8, 222, 3, 45];
//var products = ['Banana', 'Orange', 'Apple', 'Mango', 'Coco', 'Morango', 'Caco'];

a = [
    price = 1149,
    image = "http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg",
    brand = "bébé confort",
    id = "958ec015-cfcf-258d-c6df-1721de0ab6ea",
    title = "Moisés Dorel Windoo 1529"
]

b = [
    price = 1149,
    image = "http://challenge-api.luizalabs.com/images/6a512e6c-6627-d286-5d18-583558359ab6.jpg",
    brand = "bébé confort",
    id = "6a512e6c-6627-d286-5d18-583558359ab6",
    title = "Moisés Dorel Windoo 1529"
]

c = [
    price = 1999,
    image = "http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg",
    brand = "bébé confort",
    id = "4bd442b1-4a7d-2475-be97-a7b22a08a024",
    title = "Cadeira para Auto Axiss Bébé Confort Robin Re"
]

var products = [a, b, c];

var listProducts = [];

var listBrands = [];

var uniqueBrands = [];

$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#listProducts div.responsive").filter(function() {
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
                <div class="desc">` + element.brand + `</div>
            </div>
        </div>`;
}

function onInit() {

    document.getElementById("content").style.display = "none";

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
        success: function(data) {

            listProducts = data.products;

            for (i = 0; i < listProducts.length; i++) {

                innerHtmlListProducts(listProducts[i]);

                listBrands.push(listProducts[i].brand);
            }

            $.each(listBrands, function(i, el) {
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
        error: function(error) {

            console.log("ERROR");

            console.log(error);

            document.getElementById("listProducts").innerHTML += `
                <div>
                    <h4>Erro ao buscar produtos, recarregue a página e tente novamente.</h4>
                </div>`;
        },
        complete: function() {

            document.getElementById("content").style.display = "block";

            document.getElementById("loading").style.display = "none";
        }
    });
}


function sortTest(list) {

    var switching, i, x, y, shouldSwitch, switchcount = 0;

    switching = true;

    while (switching) {

        switching = false;

        for (i = 0; i < list.length; i++) {

            console.log(list[i])

            shouldSwitch = false;

            x = list[i];

            y = list[i + 1];

            if (Number(x) > Number(y)) {

                console.log("MAIOR....")

                positionFirst = listProducts[i];
                positionSecond = listProducts[i + 1];

                listProducts[i] = positionSecond;
                listProducts[i + 1] = positionFirst;

                shouldSwitch = true;

            } else if (Number(x) < Number(y)) {

                console.log("MENOR...")

                shouldSwitch = true;

            }
        }
        console.log(listProducts)

        /*
        if (shouldSwitch) {

            //list[i].parentNode.insertBefore(list[i + 1], list[i]);
            //list[i].insertBefore(list[i + 1], list[i]);

            switching = true;

            switchcount++;

        } else {

            if (switchcount == 0 && dir == "asc") {

                dir = "desc";

                switching = true;
            }

        }
        */

    }

}

function changeSort() {

    var select = document.getElementById("mySort").value;

    console.log("changeSort()...")
    console.log(select)

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
    points.sort(function(a, b) { return a - b });
    document.getElementById("demo").innerHTML = points;
}

function bigPrice() {
    points.sort(function(a, b) { return b - a });
    document.getElementById("demo").innerHTML = points;
}

function orderAZ() {

    console.log(listProducts)

    listProducts.title.sort();

}

function orderZA() {

    console.log(listProducts)

    listProducts.title.sort();

    listProducts.title.reverse();
}

function sortByString() {

    var div, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    div = document.getElementById("listProducts");
    console.log("ELEMENTO...")
    console.log(div)
    console.log(div.size)

    switching = true;

    dir = "asc";

    while (switching) {

        switching = false;

        rows = div.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td");

            y = rows[i + 1].getElementsByTagName("td");

            if (dir == "asc") {

                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                    shouldSwitch = true;

                    break;

                }

            } else if (dir == "desc") {

                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

                    shouldSwitch = true;

                    break;

                }

            }

        }

        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);

            switching = true;

            switchcount++;

        } else {

            if (switchcount == 0 && dir == "asc") {

                dir = "desc";

                switching = true;

            }

        }

    }

}

function sortByPrice(n) {

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById("myTable");

    switching = true;

    dir = "asc";

    while (switching) {

        switching = false;

        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];

            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;

                    break;

                }

            } else if (dir == "desc") {

                if (Number(x.innerHTML) < Number(y.innerHTML)) {

                    shouldSwitch = true;

                    break;

                }

            }

        }

        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);

            switching = true;

            switchcount++;

        } else {

            if (switchcount == 0 && dir == "asc") {

                dir = "desc";

                switching = true;

            }

        }

    }

}