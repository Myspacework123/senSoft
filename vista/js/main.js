$(document).ready(function() {

    var ws;
    var numeroJugadores = 0;

    localStorage.setItem('jugadores', numeroJugadores);


    reconectar();
    // funciones para reconectar partida
    function reconectar() {
        let reconectar = localStorage.getItem('restore');
        if (reconectar == "true") {
            $("#reconectar").show();
            $("#menu").hide();
            $("#contenedorCrear").hide();
            $("#contenedorUnirse").hide();

        } else {

        }
    }

    function conectar(c) {
        let idJugador = localStorage.getItem('idJugador');
        let conectar = localStorage.getItem('codigo');
        let idPartida = localStorage.getItem('idPartida');
        let nombre = localStorage.getItem('nombre');
        let numeroJugador = localStorage.getItem('numeroJugador');
        if (conectar != null && idPartida != null && c == true) {
            IniciarConexion(idPartida, conectar);
            cargarJugadores(idPartida, idJugador);
            Unirse(conectar, nombre, numeroJugador);


        } else {

        }
    }

    function salir() {
        localStorage.removeItem('restore');
        localStorage.removeItem('codigo');
        localStorage.removeItem('idPartida');
        localStorage.removeItem('iniciar');

        location = "menu";
    }

    $("#btnReconectar").click(function() {
        $("#menu").hide();
        $("#contenedorUnirse").hide();
        $("#contenedorCrear").hide();
        $("#reconectar").hide();
        var c = true;
        conectar(c);
        $("#services").show(10);
    })

    $("#btnDesconectar").click(function() {
        salir();
        location = "menu";
    })

    $("#btnSalir").click(function() {
        salir();
    })

    $("#btnCerrarPartida").click(function() {
        salir();
    })

    //web socket

    function IniciarConexion(partida, codigo, maximoJugadores, tiempoPartida) {
        ws = new WebSocket("ws://achex.ca:4010");

        ws.onopen = function() {
            ws.send('{"setID":"' + codigo + '","passwd":"12345"}');
            console.log('ws.readyState: ' + ws.readyState);
        }
        ws.onmessage = function(Mensajes) {
            var MensajesObtenidos = Mensajes.data;
            var objeto = JSON.parse(MensajesObtenidos);

            if (objeto.inicio == "si") {
                $("#staticBackdrop").modal('hide');
                $("#modalEspera").modal('hide');
                iniciar();
            }

            if (objeto.nombre != null) {
                localStorage.setItem('restore', 'true');
                localStorage.setItem('idPartida', partida);

                localStorage.setItem('codigo', codigo);
                numeroJugadores = numeroJugadores + 1;
                localStorage.setItem('numeroJugadores', numeroJugadores);


                $("#c").hide();
                $("#plantillaJugador").clone().appendTo(".contenedorJugadores");
                $(".contenedorJugadores #plantillaJugador").show(10);
                $(".contenedorJugadores #plantillaJugador #idCuerpoCarta").attr("numeroJugador", objeto.jugador);
                $(".contenedorJugadores #plantillaJugador #Nombre").html('<strong>' + objeto.nombre + '</strong> <div id="cartas"></div>');
                $(".contenedorJugadores #plantillaJugador").attr("id", "");
                if (numeroJugadores >= 2) {
                    document.getElementById("btnInciarPartida").disabled = false;
                } else {

                }
                if (objeto.jugador == 1) {

                    $("#navOculto").html('<h2 class="col-10"><strong>Siigo Match Battle</strong></h2><button type="button" class="btn btn-outline-danger col-1" id="btnCerrarPartida">Cerrar</button>');
                    $("#btnInciarPartida").attr("idPartida", partida);
                    $("#btnInciarPartida").attr("jugadores", numeroJugadores);
                    $("#staticBackdrop").modal('show');
                    $("#minute").val(tiempoPartida);
                    localStorage.setItem('a', '1');
                } else {

                }


            }
        }


        ws.close = function() {
            alert("conexion cerrada");
        }
    }

    //

    function iniciar() {
        var cantidadCartas = 32;
        var jugadores = localStorage.getItem('numeroJugadores');
        var cantJugadores = jugadores;
        var cartasPorJugador = Math.trunc(cantidadCartas / cantJugadores);

        var idPartida = localStorage.getItem('idPartida');
        var idJugador = localStorage.getItem('idJugador');
        var objData = new FormData();
        objData.append("idJugador", idJugador);
        objData.append("cartasJugador", cartasPorJugador);
        objData.append("idPartida", idPartida);

        $.ajax({
            url: "control/partidaControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            if (respuesta != null) {

                console.log(respuesta);
                var interface = '';
                respuesta.forEach(cargarCartas);

                function cargarCartas(item, index) {
                    interface += '    <div id="plantillaCarta" class="card" style="width: 10rem;">';
                    interface += '    <img src="" class="card-img-top" alt="">';
                    interface += '    <div class="card-body">';
                    interface += '    <h5 class="card-title">' + item.nombre + '</h5>';
                    interface += '    <p class="card-text mb-0"></p>';
                    interface += '    <p class="card-text mb-0"></p>';
                    interface += '    <p class="card-text mb-0"></p>';
                    interface += '    <p class="card-text mb-0"></p>';
                    interface += '    <p class="card-text mb-0"></p>';
                    interface += '    </div>';
                    interface += '     </div>';
                }
                $(".contenedorJugadores").html(interface);

            } else {
                swal.fire({
                    title: "Error!",
                    text: "error",
                    icon: "error",
                    button: "Aceptar",
                });
            }
        })
    }

    //Iniciar Partida
    $("#btnInciarPartida").click(function() {

        cod = localStorage.getItem('codigo');
        ws.send('{"to":"' + cod + '","inicio":"si"}');

    })

    //Crear partida funcion
    function Unirse(codigo, nombre, numeroJugador) {

        if (ws.readyState == 1) {
            ws.send('{"to":"' + codigo + '","nombre":"' + nombre + '","jugador":"' + numeroJugador + '"}')
        } else {
            setTimeout(function() {
                Unirse(codigo, nombre, numeroJugador);
            }, 1000);

        }

    }

    // validar form
    function validarForm() {
        var validacion = false;
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function(form) {
                if (!form.checkValidity()) {
                    form.classList.add('was-validated')
                } else {
                    validacion = true;
                }
            })
        return validacion;
    }


    // botones del menu
    $("#btnMenuCrear").click(function() {
        $("#menu").hide();
        $("#contenedorUnirse").hide();
        $("#contenedorCrear").show(10);


    })

    $("#btnMenuUnirse").click(function() {
        $("#menu").hide();
        $("#contenedorCrear").hide();

        $("#contenedorUnirse").show(10);
    })


    // generar codigo de partida 
    $("#crearCodigo").click(function() {
        var password = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (let index = 1; index <= 8; index++) {
            var char = Math.floor(Math.random() * str.length + 1);
            password += str.charAt(char);
        }
        $("#textCodigo").val(password);
    })

    //copiar codigo 
    $("#copiar").click(function() {
        valor = $("#textCodigo").val();
        if (valor != null) {
            var aux = document.createElement("input");

            aux.setAttribute("value", valor);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
        } else {}
    })

    // crear partida 
    $("#btnCrearPartida").click(function() {

        if (validarForm() == true) {
            var usuario = $("#txtCrearNombre").val();
            var codigo = $("#textCodigo").val();

            if ($("#txtMaxJugadores").val() != "") {
                maxJuagdores = $("#txtMaxJugadores").val();
            } else {
                maxJuagdores = 7;
            }
            var selectPartida = document.getElementById("slTPartida");
            var tiempoPartida = selectPartida.value;
            if (tiempoPartida == 1) {
                tiempoPartida = 5;
            } else if (tiempoPartida == 2) {
                tiempoPartida = 10;
            } else if (tiempoPartida == 3) {
                tiempoPartida = 15;
            } else {
                tiempoPartida = 30;
            }

            var selectTurno = document.getElementById("slTTurno");
            var tiempoTurno = selectTurno.value;

            if (tiempoTurno == 1) {
                tiempoTurno = 1;
            } else if (tiempoTurno == 2) {
                tiempoTurno = 2;
            } else if (tiempoTurno == 3) {
                tiempoTurno = 5;
            }

            var selecTipo = document.getElementById("slTipoPartida");
            var tipoPartida = selecTipo.value;

            if (tipoPartida == 1) {
                tipoPartida = "privada";
            } else if (tipoPartida == 2) {
                tipoPartida = "publica";
            }
            var objData = new FormData();
            objData.append("usuario", usuario);
            objData.append("codigoPartida", codigo);
            objData.append("maximoJugadores", maxJuagdores);
            objData.append("tiempoPartida", tiempoPartida);
            objData.append("tiempoTurno", tiempoTurno);
            objData.append("tipoPartida", tipoPartida);
            // $("#loginUnirse").hide();
            $.ajax({
                url: "control/partidaControl.php",
                type: "post",
                dataType: "json",
                data: objData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res) {
                if (res != null) {

                    $("#contenedorCrear").hide();
                    $("#contenedorUnirse").hide();
                    $("#services").show(10);
                    var idPartida = res["idPartida"];

                    localStorage.setItem('idJugador', res["idJugador"]);
                    localStorage.setItem('numeroJugador', res["numeroJugador"]);
                    localStorage.setItem('nombre', res["nombre"]);
                    IniciarConexion(res["idPartida"], codigo, maxJuagdores, tiempoPartida);
                    Unirse(codigo, res["nombre"], res["numeroJugador"]);
                } else {

                    swal.fire({
                        title: "Error!",
                        text: res,
                        icon: "error",
                        button: "Aceptar",
                    });
                }
            });
        } else {}
    })



    //Unirse Partida
    $("#btnUnirsePartida").click(function() {
        if (validarForm() == true) {

            var usuario = $("#txtUnirseNombre").val();
            var codigo = $("#txtUnirseCodigo").val();

            var objData = new FormData();
            objData.append("nombreUnirse", usuario);
            objData.append("codigoUnirse", codigo);

            $.ajax({
                url: "control/partidaControl.php",
                type: "post",
                dataType: "json",
                data: objData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res) {
                if (res != null) {
                    if (res == "er") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error...',
                            text: 'Partida no encontrada!',
                        })
                    } else {
                        $("#contenedorCrear").hide();
                        $("#contenedorUnirse").hide();
                        $("#services").show(10);
                        var idPartida = res["idPartida"];
                        localStorage.setItem('idPartida', idPartida);

                        localStorage.setItem('idJugador', res["idJugador"]);
                        localStorage.setItem('nombre', res["nombre"]);
                        IniciarConexion(res["idPartida"], codigo, 0, 0);
                        Unirse(codigo, res["nombre"], res["numeroJugador"]);
                        cargarJugadores(res["idPartida"], res["idJugador"]);
                        if (res["numeroJugador"] >= 2) {
                            $("#modalEspera").modal('show');
                            localStorage.setItem('a', '1');
                        }


                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sala llena!',
                    })
                }
            });
        } else {}
    })


    function cargarJugadores(idPartida, idJugador) {
        var objData = new FormData();
        objData.append("idPartida", idPartida);
        $.ajax({
            url: "control/partidaControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            if (respuesta != null) {

                var interface = '';
                respuesta.forEach(datosJugadores);
                var jugadores = localStorage.getItem(numeroJugadores);
                alert(jugadores);

                function datosJugadores(item, index) {
                    if (item.numeroJugador != jugadores) {
                        interface += '    <div id="plantillaJugador" class="card mb-3" style="max-width: 12rem;">';
                        interface += '    <div class="row g-0">';
                        interface += '    <div class="col-md-2 mt-2">';
                        interface += '    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="img-fluid rounded-start" alt="">';
                        interface += '    </div>';
                        interface += '    <div class="col-md-10">';
                        interface += '    <div class="card-body">';
                        interface += '    <h5 class="card-title ">' + item.nombre + '</h5>';
                        interface += '    </div>';
                        interface += '    </div>';
                        interface += '    </div>';
                        interface += '    </div>';
                    }




                }
                $(".contenedorJugadores").html(interface);
            } else {
                swal({
                    title: "Error!",
                    text: res,
                    icon: "error",
                    button: "Aceptar",
                });
            }
        });
    }


    //Temporizador

    window.onload = function() {
        var h = 5;

        function format(Hour, Minute, Second) {
            if (Second < 10) {
                secondString = "0" + Second;
            } else {
                secondString = Second;
            }

            if (Minute < 10) {
                minuteString = "0" + Minute;
            } else {
                minuteString = Minute;
            }

            if (Hour < 10) {
                hourString = "0" + Hour;
            } else {
                hourString = Hour;
            }
            return hourString + ":" + minuteString + ":" + secondString;
        }

        function changeStatus(aimStatus) {
            if (aimStatus == 1) {
                for (var i = 0; i < initial.length; i++) {
                    initial[i].style.display = "inline";
                }
                hint.style.display = "none";
            }
        }



        function CountDown() {
            MilliSecond -= 50;
            Hour = parseInt(MilliSecond / 3600000);
            Minute = parseInt((MilliSecond % 3600000) / 60000);
            Second = parseInt((MilliSecond % 60000) / 1000);
            if (MilliSecond <= 0) {
                clearInterval(timer);
                changeStatus(6);
            }
            time.innerText = format(Hour, Minute, Second);
        }

        var hour = document.getElementById("hour"),
            minute = document.getElementById("minute"),
            second = document.getElementById("second"),
            initial = document.getElementsByClassName("initial"),

            countdown = document.getElementById("btnInciarPartida"),
            time = document.getElementById("time"),
            timer = null,
            Hour = 0,
            Minute = 0,
            Second = 0,
            MilliSecond = 0,
            recordMilliSecond = 0;
        hourString = "",
            minuteString = "",
            secondString = "",
            // Status---1: before start; 2: up timing; 3: down timing; 4: up pausing;
            // 5: down pausing; 6: down finished;
            status = 1;


        changeStatus(status);



        countdown.onclick = function() {
            status = 3;
            Hour = hour.value;
            if (minute.value > 59) {
                Minute = 59;
            } else {
                Minute = minute.value;
            }
            if (second.value > 59) {
                Second = 59;
            } else {
                Second = second.value;
            }

            hour.value = null;
            minute.value = null;
            second.value = null;

            MilliSecond = Hour * 3600000 + Minute * 60000 + Second * 1000;
            recordMilliSecond = MilliSecond;
            changeStatus(status);

            timer = setInterval(CountDown, 50);
        }
    }


})