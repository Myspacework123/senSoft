<?php

class Conexion{
    public static function conectar(){
        $nombreServidor = "localhost";
        $usuarioServidor = "root";
        $baseDatos = "senaSoft";
        $password = "";

        try {
            $objConexion = new PDO('mysql:host='.$nombreServidor.';dbname='.$baseDatos.';',$usuarioServidor,$password);
            $objConexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
            return $objConexion;
        } catch (Exception $e) {
            $objConexion = $e->getMessage();
            return $objConexion;
        }
        
    }
}
