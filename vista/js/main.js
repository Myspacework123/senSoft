$(document).ready(function() {

    var ws;

    function IniciarConexion(codigo, maximoJugadores) {
        ws = new WebSocket("ws://achex.ca:4010");

        ws.onopen = function() {
            ws.send('{"setID":"' + codigo + '","passwd":"12345"}');
            console.log('ws.readyState: ' + ws.readyState);
        }
        ws.onmessage = function(Mensajes) {
            var MensajesObtenidos = Mensajes.data;
            var objeto = JSON.parse(MensajesObtenidos);
            console.log(codigo);
            console.log(objeto.nombre);

            if (objeto.nombre != null) {
                $("#plantillaJugador").clone().appendTo(".contenedorJugadores");
                $(".contenedorJugadores #plantillaJugador").show(10);
                $(".contenedorJugadores #plantillaJugador #Nombre").html('<strong>' + objeto.nombre + '</strong> ');
                $(".contenedorJugadores #plantillaJugador").attr("id", "");

                if (objeto.jugador == 1) {
                    $("#navOculto").html('<h2 class="col-11"><strong>Siigo Match Battle</strong></h2><button type="button" class="btn btn-otuline-primary col-1" id="btnCerrarPartida">Cerrar</button>');
                }
            }

        }

        ws.close = function() {
            alert("conexion cerrada");
        }
        var a = "ok";
        return a;
    }

    function crearPartida(codigo, nombre, numeroJugador) {

        setTimeout(function() {
            ws.send('{"to":"' + codigo + '","nombre":"' + nombre + '","jugador":"' + numeroJugador + '"}')
        }, 500);
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

                    IniciarConexion(codigo, maxJuagdores);
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
                        cargarJugadores(res["idPartida"], res["idJugador"]);
                        IniciarConexion(codigo)
                        jugadorUnion(codigo, res["nombre"], res["numeroJugador"]);



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
        setTimeout(function() {
            ws.send('{"to":"' + codigo + '","nombre":"' + nombre + '","jugador":"' + numeroJugador + '"}')
        }, 300);
    }

    function cargarJugadores(idPartida, id) {
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
                respuesta.forEach(cargarDatos());


                function cargarDatos(item, index) {
                    if (item.idJugador != id) {
                        interface += '    <div id="plantillaJugador" class="card mb-3" style="max-width: 12rem; display:none">';
                        interface += '    <div class="row g-0">';
                        interface += '    <div class="col-md-2 mt-2">';
                        interface += '    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="img-fluid rounded-start" alt="...">';
                        interface += '    </div>';
                        interface += '    <div class="col-md-10">';
                        interface += '    <div class="card-body">';
                        interface += '    <h5 class="card-title " id="Nombre">' + item.nombre + '</h5>';
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

})