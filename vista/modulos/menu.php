<div id="menu" class="m-0 vh-100 row justify-content-center align-items-center " >
    <div class="col-6  text-center shadow bg-body p-0">
            <form class="p-0 needs-validation container-fluid  " >
                <div class="bg-primary p-4 text-white">
                  <h3 class="form-title"><strong>MENÚ</strong></h3>
                </div>
                <div class="row p-5 ">
                  <div class="col-6 ">
                    <button id="btnMenuCrear"type="button" class="btn btn-outline-danger btn-lg" href="crear"><i class="fas fa-edit"> Crear</i></button>
                  </div>
                  <div class="col-6 ">
                    <button id="btnMenuUnirse" type="button" class="btn btn-primary btn-lg" href="unirse"><i class="fa fa-sign-out-alt"> Unirse</i></button>
                  </div>                  
                </div>            
            </form>          
    </div> 
</div>

<div id="contenedorCrear" class="m-0 vh-100 row justify-content-center align-items-center " style="display:none">

    <div class="col-6  shadow bg-body p-0 text-center">
        
            <form class="p-0 needs-validation  " >
            <div class="mb-4 bg-primary p-3">
                  <h3 class="form-title text-white"><strong>Crear Juego</strong></h3>
                </div>
                <div class="mb-3 m-4">
                    <label for="" class="form-label"><strong>Nombre</strong></label>
                    <input type="text" class="form-control" id="txtCrearNombre" aria-describedby="emailHelp" placeholder="Jesús" required>
                </div>
                <div class="input-group p-4">
                    <span class="input-group-text" id="basic-addon1"><button id="copiar" type="button" class="btn btn-outline-secondary btn-sm border-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover" ><i class="far fa-clipboard"> Copiar codigo</i></button></span>
                    <input id="textCodigo" type="text" class="form-control" placeholder="Codigo" aria-label="Username" aria-describedby="basic-addon1" required>
                </div>

                <div class="row mb-5 ">
                  <div class="col-4 ">
                    <button id="aspd" type="button" class="btn btn-outline-warning " data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit">Opciones</i></button>
                  </div>
                  <div class="col-4 ">
                    <button id="crearCodigo" type="button" class="btn btn-outline-danger "><i class="fas fa-edit">Crear codigo</i></button>
                  </div>
                  <div class="col-4 ">
                    <button id="btnCrearPartida" type="button" class="btn btn-outline-primary " ><i class="fa fa-sign-out-alt">Crear</i></button>
                  </div>                  
                </div>         
            </form>
            
    </div>      
</div>

<div id="contenedorUnirse" class="m-0 vh-100 row justify-content-center align-items-center" style="display:none" >

    <div class="col-6  shadow bg-body p-0 text-center">
        
            <form class="p-0 needs-validation  " >
            <div class="mb-4 bg-primary p-3">
                  <h3 class="form-title text-white"><strong>Unirse</strong></h3>
                </div>
                <div class="mb-3 m-4">
                    <label for="" class="form-label"><strong>Nombre</strong></label>
                    <input type="text" class="form-control" id="txtUnirseNombre" aria-describedby="emailHelp" placeholder="Jesús" required>
                </div>
                <div class="input-group p-4">
                  
                    <span class="input-group-text" id="basic-addon1">Codigo</span>
                    <input id="txtUnirseCodigo" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" required>
                    </div>

                <div class="row mb-5">
                  <div class="col-6 ">
                    <button id="" type="button" class="btn btn-outline-danger " href="crear"><i class="fas fa-eye"> Partidas publicas</i></button>
                  </div>
                  <div class="col-6 ">
                    <button id="btnUnirsePartida" type="button" class="btn btn-outline-primary " ><i class="fa fa-sign-out-alt"> Entrar</i></button>
                  </div>                  
                </div>         
            </form>
            
    </div>      
</div>



<div id="services" style="display:none" class="m-0 vh-100 justify-content-center align-items-center p-0" >
   <div class="row p-1  text-center" id="navOculto">
        <h2 class="col-10"><strong>Siigo Match Battle</strong></h2>
        
    </div>
</br>   
    <div class="row contenedorJugadores">

    </div>
</div>

<div id="plantillaJugador" class="card mb-3" style="max-width: 12rem; display:none">
  <div class="row g-0">
    <div class="col-md-2 mt-2">
      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <h5 class="card-title " id="Nombre"></h5>
      </div>
    </div>
  </div>
</div>

<div id="plantillaCarta" class="card" style="width: 10rem; display:none" >
      <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/980px/public/media/image/2019/01/Mortal%20Kombat%2011%20Shaggy.jpg?itok=v58FHT3H" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title NombreJugador">Nombre</h5>
    
        <p class="card-text mb-0">...</p>
        <p class="card-text mb-0">...</p>
        <p class="card-text mb-0">...</p>
        <p class="card-text mb-0">...</p>
        <p class="card-text mb-0">...</p>


    </div>
  </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Reglas De juego</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="form-control">
          <div class="input-group mb-3">
            <label class="form-label m-1 col-6"><strong>Maximo jugadores</strong></label>
            <input type="number" min="2" max="7" class="form-control col-6" id="txtMaxJugadores" aria-describedby="emailHelp" placeholder="7 (predeterminado)" required>
          </div>
          <div class="input-group mb-3">
            <label class="form-label m-1 col-6">Tiempo Partida</label>
            <select class="form-select w-50 col-6" aria-label="Default select example" id="slTPartida">
              <option value="1">5 min</option>
              <option value="2">10 min</option>
              <option value="3">15 min</option>
              <option value="4" selected>30 min</option>
            </select>
            
          </div>
          <div class="input-group mb-3">
            <label class="form-label m-1 col-6">Tiempo turno</label>
            <select class="form-select w-50 col-6" aria-label="Default select example" id="slTTurno">
              <option value="1">1 min</option>
              <option value="2" selected>2 min</option>
              <option value="3">5 min</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <label class="form-label m-1 col-6">Tipo de Partida</label>
            <select class="form-select w-50 col-6" aria-label="Default select example" id="slTipoPartida">
              <option value="1" selected>Privada</option>
              <option value="2" >Publica</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>