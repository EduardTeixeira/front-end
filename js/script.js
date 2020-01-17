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

            console.log("LISTA DE PRODUTOS....");
            console.log(listProducts);

            for (i = 0; i < listProducts.length; i++) {

                document.getElementById("myTable").innerHTML += `
                <tr>
                    <td>` + listProducts[i].title + `</td>
                    <td>` + listProducts[i].price + `</td>
                    <td>` + listProducts[i].brand + `</td>
                    <td>
                        <img src="` + listProducts[i].image + `" class="imgSize">
                    </td>
                </tr>`;

                listBrands.push(listProducts[i].brand);
            }

            for (i = 0; i < listBrands.length; i++) {

                for (j = 0; j < listBrands.length; j++) {

                    if (listBrands[i] == listBrands[j]) {
                        console.log(i + " ..... " + j);
                        //console.log("ITEM i... " + i + "... j..." + j + " listBrands[i] + listBrands[j]");
                        //listBrands = listBrands.splice(j, 0);
                        listBrands.splice(j, 1);
                    }

                }
            }

            console.log("MARCAS....");
            console.log(listBrands)
        },
        error: function (error) {
            console.log("ERROR");
            console.log(error);
            document.getElementById("myTable").innerHTML += `
            <tr>
                <td>Erro ao buscar produtos, recarregue a página e tente novamente.</td>
                <td></td>
                <td></td>
            </tr>`;
        },
        complete: function () {
            document.getElementById("content").style.display = "block";
            document.getElementById("loading").style.display = "none";
        }
    });
}

function sortTable(n) {
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

function sortTablePrice(n) {
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

function myFunction() {
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