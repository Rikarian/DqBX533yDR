function muatdata(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        data = JSON.parse(xhttp.response);
        for (let x = 0; x < data.length; x++) {
            let row = `<tr>
                <td>${data[x]["propinsi"]}</td>
                <td>${data[x]["kota"]}</td>
                <td>${data[x]["kecamatan"]}</td>
                <td>${data[x]["lat"]}</td>
                <td>${data[x]["lon"]}</td></tr>`;
            $("#hasil").append(row);
        }
    };
    xhttp.open("GET", "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json");
    xhttp.send();
}

function cari() {
    $("#cari").keyup(function (){
        let pencarian = $(this).val();

        if(pencarian === "") {
            muatdata();
        } else {
            $("#hasil").html("");
            let regex = new RegExp(pencarian, "i");
            $.each(data, function (key, value) {
                if (value.kota.search(regex) != -1) {
                    let row = `<tr>
                    <td>${value.propinsi}</td>
                    <td>${value.kota}</td>
                    <td>${value.kecamatan}</td>
                    <td>${value.lat}</td>
                    <td>${value.lon}</td></tr>`;
                $("#hasil").append(row);
                }
            })
        }
    })
}

$(document).ready(function () {
    muatdata();
    cari();
});