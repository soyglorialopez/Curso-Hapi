# Curso de Hapi

Pagina Tipo Stack OveFlow, en la cual puedes hacer preguntas y responder preguntas.
Podras Crearte una cuenta para ser ususario y hacer login.
Ademas prorcionamos una API para que terceros puedan utlizar la plataforma.

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
 
 *Coneccion con firebase
 
El proyecto usa como BD firebase, para conectarte desde tu codio tienes que tener una credencial.
 sigue estos pasos para la coneccion 
  -> Crea un archivo llamado config en el directorio clonado 
  -> Ingresa a firebase con tu cuenta, vas a la consola
  -> Agregas un nuevo pryecto con "+ add Project" // ingresas al project y vas a 
  -> project setting > service Account
  ->creas un Firebase Admin SDK, con la opcion seleccionada de Node.js 
precionas "Generate new Private Key" //es la llave con la cual te podras conectar a FireBase
*Se descargara automaticamente en tu mauina un archivo json.
-> Ese archivo lo llevas a config y listo
 

