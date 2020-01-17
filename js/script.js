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
        success: function (data) {

            var listProducts = data.products;

            var listBrands = [];

            var uniqueBrands = [];

            for (i = 0; i < listProducts.length; i++) {

                document.getElementById("listProducts").innerHTML += `
                <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href="` + listProducts[i].image + `">
                        <img src="` + listProducts[i].image + `" alt="Northern Lights" width="600" height="400">
                    </a>
                    <div class="desc">` + listProducts[i].title + `</div>
                    <div class="desc">` + listProducts[i].price + `</div>
                    <div class="desc">` + listProducts[i].brand + `</div>
                </div>
                </div>`;

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

            document.getElementById("content").style.display = "block";

            document.getElementById("loading").style.display = "none";
        }
    });
}

function sortByString(n) {

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById("myTable");

    switching = true;

    dir = "asc";

    while (switching) {

        switching = false;

        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[n];

            y = rows[i + 1].getElementsByTagName("td")[n];

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

function searchForName() {

    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput");

    filter = input.value.toUpperCase();

    table = document.getElementById("myTable");

    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {

        td = tr[i].getElementsByTagName("td")[0];

        if (td) {

            txtValue = td.textContent || td.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";

            } else {

                tr[i].style.display = "none";

            }

        }

    }

}
