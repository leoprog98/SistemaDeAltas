# SistemaDeAltas
Sistema de altas de usuarios para el examen de Nezter

<div>
  <H1>Examen para Nezter</H1>
  <H3>Para el encargado de revisión, saludos. Explicaré un poco de lo que se necesita para probar el resultado del examen</H3>
</div>

<div>
  <H5>Instrucciones</H5>
  <ul>
    <li>Primero se debe agregar la base de datos con el archivo SISTEMADALTAS.bak ubicado en la carpeta bd</li>
    <li>Una vez este agregada la base de datos, entrar a la carpeta ALTASAPICORE y ejecutar el archivo ALTASAPICORE.sln</li>
    <li>Una vez abierto el proyecto, en las opciones para iniciar, indicar que se ejecutará con iiexpress y dar al botón de iniciar</li>
    <li>Una vez ejecutado el proyecto ALTASAPICORE y abierto el navegador, se abre un cmd o símbolo del sistema para ejecutar el proyecto de angular</li>
    <li>Debe de acceder a la carpeta sistemadealtas que se encuentra en este repositorio</li>
    <li>Una vez dentro ejecutar el comando: <b>npm i</b></li>
    <li>Se descargará la carpeta node_modules con las dependencias necesarias para correr el proyecto de angular</li>
    <li>Una vez descargada la carpeta, entrar en node_modules/ngx-toastr/toast/</li>
    <li>dentro de esa carpeta remplazar los archivos <b>toastr-config.d.ts</b> y <b>toastr.service.d.ts</b> por los archivos con el mismo nombre que se encuentran en la carpeta raiz del repositorio llamada: <b>archivos para remplazar</b></li>
    <li>Una vez hecho los pasos anteriores, ejecutar el comando: <b>ng serve</b></li>
    <li>Después de eso entrar al navegador con el servidor local proporcionado por angular, localhost:4200</li>
    <li>Una vez dentro se abrirá el resultado del examen, recuerde que existe el usuario: <b>UserExamen</b> con la contraseña: <b>*Examen2021</b></li>
  </ul>
</div>
<div>
<H5>Observaciones y notas</H5>
  <ul>
    <li>Supongo ya cuentan con el software solicitado para el examen </li>
    <li>Para la base de datos dejo un link por si se ocupa de importar la bd <a href="https://parzibyte.me/blog/2019/05/25/importar-archivo-bak-base-de-datos-sql-server/#:~:text=Importar%20base%20de%20datos%20desde,datos%20%3E%20Restaurar%20base%20de%20datos%E2%80%A6&text=Aparecer%C3%A1%20una%20ventana.">click aquí</a> </li>
    <li>Puede que exista un usuario extra aparte del solicitado probando las acciones CRUD </li>
    <li>No soy muy experto en Angular Material pero lo use para la paginación, pero me ocasionó varios problemas</li>
    <li>Por si cualquier problema al ejecutar cualquier cosa de este repositorio comuniquese conmigo por el whatsapp</li>
    <li>Agregue el proyecto de Asp. Net Core en modo producción pero para probarlo es más largo el proceso y creo que para un examen no es necesario pero si se considera necesario me lo hace saber
    </li>
    <li>Solo los primeros 5 estados tienen sus ciudades, pensaba agregarlas todas pero lo estaba haciendo al inicio y pensé que era innesesario para demostrar la   funcionalidad de los dropdowns en cascada</li>
    <li>En caso de que sql server no permita la autenticación de windows, abrir el archivo en la carpeta ALTASAPICORE/ALTASAPICORE/appsettings.json y cambiar la cadena de conexion</li>
    <li>Para ser más específico cambiar la parte que dice: <b>Integrated Securitiy=True</b> por: <b>user id=user; password=passwrd</b> donde <b>user</b> es el usuario con el que se conecta a sql server y <b>passwrd</b> es la contraseña</li>
  </ul>
<div>

<div>Sin más que decir gracias por la oportunidad y espero que me de feedback de mi puntuación o de la evaluación</div>
