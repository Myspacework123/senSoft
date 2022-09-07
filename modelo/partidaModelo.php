<?php
session_start();

include "conexion.php";

class PartidaModelo{
    public static function mdlCrearPartida($codigo, $usuario, $tiempoPartida, $tiempoTurno, $tipoPartida, $maxJugadores){
        $estado = true;
        $mensaje = '';
        $tpartida = intval($tiempoPartida);
        $tturno = intval($tiempoTurno);
        $mJugadores = intval($maxJugadores);
        $numeroJugador = 1;
        try {
            //Comprobar que el codigo de partida no este activa
            $condicion = conexion::conectar()->prepare("SELECT * FROM partida WHERE codigo=:codigo AND estado=:estado");
            $condicion->bindParam(":codigo",$codigo); 
            $condicion->bindParam(":estado",$estado); 
            $condicion->execute();
            $a = $condicion->fetch();
            $condicion = null;
            if($a == null){
                // insertar datos de partida
                $objRespuesta = Conexion::conectar()->prepare("INSERT INTO partida(codigo, estado, tipo, tiempoPartida, tiempoTurnos, maxJugadores)VALUES(:codigo, :estado, :tipo, :tiempoPartida, :tiempoTurnos, :maxJugadores)");
                $objRespuesta->bindParam(":codigo",$codigo);
                $objRespuesta->bindParam(":estado",$estado);
                $objRespuesta->bindParam(":tipo",$tipoPartida);
                $objRespuesta->bindParam(":tiempoPartida",$tpartida);
                $objRespuesta->bindParam(":tiempoTurnos",$tturno);
                $objRespuesta->bindParam(":maxJugadores",$mJugadores);
                if($objRespuesta->execute()){
                    // seleccionar la partida con el codigo que creamos
                    $objRespuesta = null;
                    $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM partida WHERE codigo = :codigo");
                    $objRespuesta->bindParam(":codigo",$codigo);
                    $objRespuesta->execute();
                    $datosPartida= $objRespuesta->fetch();
                    $objRespuesta= null;
                    if($datosPartida != null){
                        //insertamos jugador 1
                        $idPartida = $datosPartida["idPartida"];
                        $objRespuesta = Conexion::conectar()->prepare("INSERT INTO jugador(nombre, numerojugador,idPartida)VALUES(:nombre,:jugador,:partida)");
                        $objRespuesta->bindParam(":nombre",$usuario);
                        $objRespuesta->bindParam(":jugador",$numeroJugador);
                        $objRespuesta->bindParam(":partida",$idPartida);
                        if($objRespuesta->execute()){
                            $objRespuesta = null;
                            $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM jugador WHERE idPartida = :partida ORDER BY numeroJugador DESC LIMIT 1");
                            $objRespuesta->bindParam(":partida",$idPartida);
                            $objRespuesta->execute();
                            $datosUltimoUsuario = $objRespuesta->fetch();
                            $mensaje = $datosUltimoUsuario;
                            $objRespuesta = null;
                            
                        } else {
                            $mensaje = "No fue posible registrar el usuario en la partida";
                        }
                    }
                }
            }
            
        }catch(Exception $th){
            $mensaje = $th;
        }

        return $mensaje;
    }


    public static function mdlUnirsePartida($codigo, $usuario){
        $estado = true;
        $mensaje = "";
        try {
            // comprobar que la partida este activa
            $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM partida WHERE codigo= :codigo and estado= :estado");
            $objRespuesta->bindParam(":codigo",$codigo);
            $objRespuesta->bindParam(":estado",$estado);
            $objRespuesta->execute();
            $partidaActiva = $objRespuesta->fetch();
            $objRespuesta = null;
            if($partidaActiva != null){
                $idPartida = $partidaActiva["idPartida"];
                $maxJugadores = $partidaActiva["maxJugadores"];
        
                    //tomar datos del ultimo jugador registrado
                    $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM jugador WHERE idPartida = :partida ORDER BY numeroJugador DESC LIMIT 1");
                    $objRespuesta->bindParam(":partida",$idPartida);
                    $objRespuesta->execute();
                    $datosUltimoUsuario = $objRespuesta->fetch();
                    $numeroJugador = $datosUltimoUsuario["numeroJugador"] + 1;
                    $objRespuesta = null;
                    if($numeroJugador <= $maxJugadores){
                        //Ingresar nuevo jugador
                        $objRespuesta = Conexion::conectar()->prepare("INSERT INTO jugador (nombre, numeroJugador, idPartida)VALUES(:nombre,:jugador,:partida)");
                        $objRespuesta->bindParam(":nombre",$usuario);
                        $objRespuesta->bindParam(":jugador",$numeroJugador);
                        $objRespuesta->bindParam(":partida",$idPartida);
                        if($objRespuesta->execute()){
                            $objRespuesta = null;
                            $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM jugador WHERE idPartida = :partida ORDER BY numeroJugador DESC LIMIT 1");
                            $objRespuesta->bindParam(":partida",$idPartida);
                            $objRespuesta->execute();
                            $datosUltimoUsuario = $objRespuesta->fetch();
                            
                            $objRespuesta = null;
                            $mensaje = $datosUltimoUsuario;
                            return $mensaje;
                        }
                    }
                    
                
            } else{
                $mensaje = "er";
                return $mensaje;
            }
        } catch (Exception $e) {
            $mensaje = "er";
            return $mensaje;
        }

        

    }


    public static function mdlListar($idPartida){
        $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM jugador WHERE idPartida = :partida ");
        $objRespuesta->bindParam("partida",$idPartida);
        $objRespuesta->execute();
        $datosJugadores = $objRespuesta->fetchAll();
        $objRespuesta = null;
        return $datosJugadores;
    }
    public static function mdlListarCartas(){
        $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM carta ");
        $objRespuesta->execute();
        $datosCartas = $objRespuesta->fetchAll();
        $objRespuesta = null;
        return $datosCartas;
    }


}