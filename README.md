# Curso de Hapi

Pagina Tipo Stack OveFlow, en la cual puedes hacer preguntas y responder preguntas.  <br>
Podras Crearte una cuenta para ser ususario y hacer login. <br>
Ademas proporcionamos una API para que terceros puedan utlizar la plataforma.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

 * Clona el Proyecto 
 ```
 git clone https://github.com/soyglorialopez/Curso-Hapi.git

 ```
 * Instala las dependencias, una vez ya pocisionado  en el directorio clonado
 (En mi caso para instalar el paquete firebase tuve que entrar a mi editor de codigo como administrador )
 ```
 npm install
 ```
 
 # Conección con firebase
 
El proyecto usa como BD firebase, para conectarte desde tu codigo tienes que tener una credencial. <br>
 Sigue estos pasos para la coneccion  <br>
  -> Crea un directorio llamado config en el directorio clonado  <br>
  -> Ingresa a firebase con tu cuenta, vas a la consola  <br>
  -> Agregas un nuevo prpyecto con "+ add Project" // ingresas al project y vas a  <br>
  -> project setting > service Account <br>
  ->creas un Firebase Admin SDK, con la opcion seleccionada de Node.js  <br>
precionas "Generate new Private Key" //es la llave con la cual te podras conectar a FireBase <br>
*Se descargara automaticamente en tu maquina un archivo json. <br>
-> Ese archivo lo llevas a config y listo
 

