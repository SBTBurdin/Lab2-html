$(document).ready(function () {
    let host = "http://localhost:8080";

    // Тестим перебор таблиц
    $("#testButton").click(function (event) {
        // $("#tableInfo tr").each(function (tr) {this.find('td').each(function (td) {});});
    });

    $("#testRest").click(function (event) {
        let regLogin = RegExp('^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$');
        // Строчные и прописные латинские буквы, цифры, спецсимволы.
        let regPassword = RegExp('(?=^.{4,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
        let login = $("#newUserLogin").val();
        let password = $("#newUserPass").val();

        if (!regLogin.test(login) && !regPassword.test(password)) {
            alert('Проверь логин/пароль');
            return;
        }
        $.ajax({
            url: host + "/users/",
            type: 'POST',
            dataTypes: "json",
            data: {login: login, password: password},
            success: function (data) {
                console.log("success");
            },
            error: function (er) {
                console.log(er);
            },
            complete: function () {
                console.log("complete");
            }
        });
    });

    // Обновляем список юзверей
    // https://snipp.ru/view/8 - примеры работы с <select>
    $("#reloadUsers").click(function (event) {
        $("#allUsers").empty();
        $.ajax({
            url: host + "/rest/getUser",
            dataTypes: "json",
            data: null,
            type: 'GET',
            success: function (data) {
                data.data.forEach(function (userInfo) {
                    $("#allUsers").append(
                        '<option value="' + userInfo.id + '">' + userInfo.login + '</option>'
                        // $("<option></option>", {value: userInfo.id, text: userInfo.login})
                    );
                });
            },
            error: function () {
                alert("Ошибка при получении юзверей =(");
            },
            complete: function () {
            }
        });
    });

    function addOptinsUsers(data) {
        data.data.forEach(function (userInfo) {
            $("#allUsers").append(
                $("<option></option>", {value: userInfo.id, text: userInfo.login})
            );
        });
    }

    function buildTable(data) {
        $("#tableInfo tbody").append(
            `<tr>
                <td>file</td>
                <td>10.10.2010</td>
                <td>11.10.2010</td>
                <td>user1</td>
                <td>
                    <input type="button" class="btn btn-primary col-md-12" id="updateInfo" value="Изменить">
                </td>
            </tr>`
        );
    }

});