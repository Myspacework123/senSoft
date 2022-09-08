<?php
include_once "../modelo/partidaModelo.php";

class PartidaControl{
    public $codigoPartida;
    public $usuario;
    public $tiempoPartida;
    public $tiempoTurno;
    public $tipoPartida;
    public $maxJugadores;
    public $idPartida;
    public $cartasJugador;
    public $idJugador;

    public function ctrCrearPartida(){
        $objRespuesta = PartidaModelo::mdlCrearPartida($this->codigoPartida,$this->usuario,$this->tiempoPartida,$this->tiempoTurno,$this->tipoPartida,$this->maxJugadores);
        echo json_encode($objRespuesta);
    }

    
    public function ctrUnirsePartida(){
        $objRespuesta = PartidaModelo::mdlUnirsePartida($this->codigoPartida,$this->usuario);
        echo json_encode($objRespuesta);
    }

    public function ctrListar(){
        $objRespuesta = PartidaModelo::mdlListar($this->idPartida);
        echo json_encode($objRespuesta);
    }

    public function ctrListarCartas(){
        $objRespuesta = PartidaModelo::mdlListarCartas($this->idJugador,$this->cartasJugador,$this->idPartida);
        echo json_encode($objRespuesta);
    }
}

if (isset($_POST["codigoPartida"],$_POST["usuario"],$_POST["tiempoPartida"],$_POST["tiempoTurno"],$_POST["tipoPartida"],$_POST["maximoJugadores"])){
    $objPartida = new PartidaControl();
    $objPartida->codigoPartida = $_POST["codigoPartida"];
    $objPartida->usuario = $_POST["usuario"];
    $objPartida->tiempoPartida = $_POST["tiempoPartida"];
    $objPartida->tiempoTurno = $_POST["tiempoTurno"];
    $objPartida->tipoPartida = $_POST["tipoPartida"];
    $objPartida->maxJugadores = $_POST["maximoJugadores"];
    $objPartida->ctrCrearPartida();
}

if (isset($_POST["codigoUnirse"],$_POST["nombreUnirse"])){
    $objPartida = new PartidaControl();
    $objPartida->codigoPartida = $_POST["codigoUnirse"];
    $objPartida->usuario = $_POST["nombreUnirse"];
    $objPartida->ctrUnirsePartida();
}

if (isset($_POST["idPartida"])){
    $objPartida = new PartidaControl();
    $objPartida->idPartida = $_POST["idPartida"];
    $objPartida->ctrListar();
}



if (isset($_POST["idJugador"],$_POST["cartasJugador"],$_POST["idPartida"])){
    $objPartida = new PartidaControl();
    $objPartida->idJugador = $_POST["idJugador"];
    $objPartida->cartasJugador = $_POST["cartasJugador"];
    $objPartida->idPartida = $_POST["idPartida"];
    $objPartida->ctrListarCartas();
}