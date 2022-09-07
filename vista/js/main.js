$(document).ready(function() {

    var ws;
    var numeroJugadores = 0;
    localStorage.setItem('a', '0');

    conectar()
    reconectar();
    // funciones para reconectar partida
    function reconectar() {
        let reconectar = localStorage.getItem('restore');
        if (reconectar == "true") {
            $("#menu").html('<button type="button" class="btn btn-primary col-2 m-5" id="btnReconectar">Volver a la partida</button><button type="button" class="btn btn-danger col-1" id="btnDesconectar"><i class="fa fa-sign"> Salir</i></button> ');
        } else {

        }
    }

    function conectar() {
        var idJugador = 8;
        let conectar = localStorage.getItem('codigo');
        let idPartida = localStorage.getItem('idPartida');
        if (conectar != null && idPartida != null) {
            IniciarConexion(conectar);
            cargarJugadores(idPartida, idJugador);
        } else {

        }
    }

    $("#btnReconectar").click(function() {
        $("#contenedorCrear").hide();
        $("#contenedorUnirse").hide();
        $("#btnReconectar").hide();
        $("#btnDesconectar").hide();
        $("#services").show(10);
    })

    $("#btnDesconectar").click(function() {
        localStorage.removeItem('restore');
        localStorage.removeItem('codigo');
        localStorage.removeItem('idPartida');
        location = "menu";
    })

    function IniciarConexion(codigo, maximoJugadores, tiempoPartida) {
        ws = new WebSocket("ws://achex.ca:4010");

        ws.onopen = function() {
            ws.send('{"setID":"' + codigo + '","passwd":"12345"}');
            console.log('ws.readyState: ' + ws.readyState);
        }
        ws.onmessage = function(Mensajes) {
            var jugadores = 0;
            var MensajesObtenidos = Mensajes.data;
            var objeto = JSON.parse(MensajesObtenidos);

            if (objeto.nombre != null) {
                localStorage.setItem('restore', 'true');
                localStorage.setItem('codigo', codigo);
                localStorage.setItem('idPartida', objeto.idJugador);

                jugadores = 1 + jugadores;
                console.log("jugadores" + jugadores);
                console.log(objeto.jugador);
                $("#c").hide();
                $("#plantillaJugador").clone().appendTo(".contenedorJugadores");
                $(".contenedorJugadores #plantillaJugador").show(10);
                $(".contenedorJugadores #plantillaJugador #Nombre").html('<strong>' + objeto.nombre + '</strong> ');
                $(".contenedorJugadores #plantillaJugador").attr("id", "");
                if (objeto.jugador == 1) {
                    $("#navOculto").html('<div class="alert alert-secondary col-1" role="alert">00:00</div>' +
                        '<h2 class="col-10"><strong>Siigo Match Battle</strong></h2><button type="button" class="btn btn-outline-danger col-1" id="btnCerrarPartida">Cerrar</button>');

                    $("#staticBackdrop").modal('show');
                    localStorage.setItem('a', '1');
                }




            }

        }

        ws.close = function() {
            alert("conexion cerrada");
        }
        var a = "ok";
        return a;
    }
    //Iniciar Partida
    $("#btnInciarPartida").click(function() {
        $("#staticBackdrop").modal('hide');
        $("#modalEspera").modal('hide');
        iniciarPartida();
    })

    function iniciarPartida() {


        var objData = new FormData();
        objData.append("cartas", "ok");
        $.ajax({
            url: "control/partidaControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            alert("a");
        });
    }

    //Crear partida funcion
    function crearPartida(codigo, nombre, numeroJugador) {
        if (ws.readyState == 1) {
            setTimeout(function() {
                ws.send('{"to":"' + codigo + '","nombre":"' + nombre + '","jugador":"' + numeroJugador + '"}')
            }, 1000);
        } else {
            setTimeout(function() {
                crearPartida(codigo, nombre, numeroJugador);
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
        } else {

        }


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
                    localStorage.setItem('numeroJugador', res["numeroJugador"]);
                    IniciarConexion(codigo, maxJuagdores, tiempoPartida);
                    crearPartida(codigo, res["nombre"], res["numeroJugador"]);

                } else {
                    swal({
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
                        localStorage.setItem('numeroJugador', res["numeroJugador"]);
                        cargarJugadores(res["idPartida"], res["idJugador"]);
                        IniciarConexion(codigo)
                        jugadorUnion(codigo, res["nombre"], res["numeroJugador"]);
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

    function jugadorUnion(codigo, nombre, numeroJugador) {
        if (ws.readyState == 1) {
            setTimeout(function() {
                ws.send('{"to":"' + codigo + '","nombre":"' + nombre + '","jugador":"' + numeroJugador + '"}')
            }, 1000);
        } else {
            setTimeout(function() {
                crearPartida(codigo, nombre, numeroJugador);
            }, 1000);

        }
    }

    function cargarJugadores(idPartida, idJugador) {
        var objData = new FormData();
        objData.append("codigoPartidaUnirse", idPartida);
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
                console.log(respuesta);
                respuesta.forEach(cargarJugadores());

                function cargarJugadores(elemento, index) {
                    console.log(elemento, index);
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

})