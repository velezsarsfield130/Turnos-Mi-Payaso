fetch("turnos.json")
.then(res => res.json())
.then(datos => {

    document.getElementById("fecha").textContent = datos.fecha;

    const contenedor = document.getElementById("horarios");

    const inicio = convertirMinutos(datos.inicioDia);
    const fin = convertirMinutos(datos.finDia);
    const total = fin - inicio;


    datos.empleados.forEach(persona => {

        const fila = document.createElement("div");
        fila.className = "fila";


        const nombre = document.createElement("div");
        nombre.className = "nombre";
        nombre.style.color = persona.color;
        nombre.textContent = persona.nombre;


        const linea = document.createElement("div");
        linea.className = "linea";


        persona.turnos.forEach(t => {

            const ini = convertirMinutos(t[0]);
            const fin = convertirMinutos(t[1]);

            const bloque = document.createElement("div");
            bloque.className = "turno";

            bloque.style.background = persona.color;

            bloque.style.left =
                ((ini - inicio) / total * 100) + "%";

            bloque.style.width =
                ((fin - ini) / total * 100) + "%";


            bloque.textContent =
                t[0] + " - " + t[1];


            linea.appendChild(bloque);

        });


        fila.appendChild(nombre);
        fila.appendChild(linea);

        contenedor.appendChild(fila);

    });

});


function convertirMinutos(hora) {

    let partes = hora.split(":");

    return parseInt(partes[0]) * 60 +
           parseInt(partes[1]);

}