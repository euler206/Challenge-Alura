import llave from "./key.js";

const texto = document.getElementById("text-area");
const btnEncriptar = document.getElementById("btn-encriptar"); 
const btnDesencriptar = document.getElementById("btn-desencriptar"); 
const mensaje = document.getElementById("mensaje");
const btnCopiarPegar = document.getElementById("btn-copiar-pegar");

function validarTexto(text) {
    const validador = text.match(/^[a-z]*$/);
    if (!validador) {
        alert("Solo se permiten letras minúsculas sin acentos");
        location.reload();
        return false;
    }
}

function encriptar(text,op) {
    text = text.toLowerCase();
    llave.forEach(([enc, des]) => text = op ? text.replaceAll(enc, des): text.replaceAll(des, enc));
    return text;
};
const copiar = () => navigator.clipboard.writeText(mensaje.value);
const pegar = () => navigator.clipboard.readText().then(tex => texto.value = tex);
const setTextBoton = (textBoton) => btnCopiarPegar.innerText = textBoton;

btnEncriptar.onclick = function (){
    if (texto.value === "") return;
    mensaje.value = encriptar(validarTexto(texto.value),1);// 1 = true para encriptar
    //texto.value = "";
    //btnCopiarPegar.style.visibility = "visible";
    //mensaje.focus()
    btnCopiarPegar.classList.toggle("mostrar");
} 
btnDesencriptar.onclick = function () {
    if (texto.value === "") return;
    mensaje.value = encriptar(texto.value,0); // 0 = false para desencriptar
    //texto.value = "";
    //mensaje.focus()
}
btnCopiarPegar.onclick = function () {
        if (btnCopiarPegar.innerText === "Copiar"){
            copiar();
            setTextBoton("Pegar");
        } else{
            pegar();
            setTextBoton("Copiar");
            //btnCopiarPegar.style.visibility = "hidden";
        }
        mensaje.value = "";
    };

