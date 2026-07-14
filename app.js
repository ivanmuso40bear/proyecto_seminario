console.log('app.js cargado');

// 1. VARIABLES GLOBALES 
let firmaCampus, firmaCarrera;

// 2. FUNCIÓN PARA QUE EL CANVAS NO SALGA NEGRO/0px
function resizeCanvas(canvas) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = 150 * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

$(document).ready(function(){
    console.log('DOM listo');
    
    const canvasCampus = document.getElementById('firma_campus');
    const canvasCarrera = document.getElementById('firma_carrera');
    
    // 3. AJUSTAR TAMAÑO ANTES DE INICIAR FIRMA
    resizeCanvas(canvasCampus);
    resizeCanvas(canvasCarrera);
    
    // 4. INICIAR FIRMA 
    firmaCampus = new SignaturePad(canvasCampus, {minWidth: 1.5, maxWidth: 3.5});
    firmaCarrera = new SignaturePad(canvasCarrera, {minWidth: 1.5, maxWidth: 3.5});
    
    // 5. REAJUSTAR SI CAMBIA LA PANTALLA
    window.addEventListener('resize', () => {
        resizeCanvas(canvasCampus);
        resizeCanvas(canvasCarrera);
        firmaCampus.clear();
        firmaCarrera.clear();
    });
    
    console.log('SignaturePad inicializado OK');
    
    // 6. SUBMIT
    $('#formBitacora').on('submit', async function(e){
        e.preventDefault();
        console.log('Submit interceptado');
        
        if(firmaCampus.isEmpty() || firmaCarrera.isEmpty()){
            alert('Faltan las firmas digitales');
            return false;
        }
        
        $('#firma_campus_data').val(firmaCampus.toDataURL());
        $('#firma_carrera_data').val(firmaCarrera.toDataURL());
        
    // 1. JUNTAR DATOS PARA LA API
    const datosBitacora = {
        nombre: $('#nombre').val(),
        fecha: $('#fecha').val(),
        horaLlegada: $('#horaLlegada').val(),
        objetivo: $('#objetivo').val(),
        resultados: $('#resultados').val(),
        campus: $('#campus').val(),
        horaSalida: $('#horaSalida').val(),
        actividades: $('#actividades').val(),
        notas: $('#notas').val(),
        firma_campus: firmaCampus.toDataURL(),
        firma_carrera: firmaCarrera.toDataURL(),
        usuario_id: JSON.parse(localStorage.getItem('usuario'))?.id || 1
    };

    // 2. MANDAR A LA API EN LUGAR DE localStorage
    try {
        const resultado = await API.guardarBitacora(datosBitacora);

        if (resultado.success || resultado.ok) {
            alert('Bitácora guardada en la base de datos');
            $('#formBitacora')[0].reset();
            firmaCampus.clear();
            firmaCarrera.clear();
            window.location.href = 'index.html';
        } else {
            alert('Error al guardar: ' + resultado.mensaje);
        }
    } catch (error) {
        alert('Error: ¿Está corriendo tu api.js?');
        console.error(error);
    }
});
        
window.limpiarFirma = function(id){
    if(id === 'firma_campus') {
        firmaCampus.clear();
        resizeCanvas(document.getElementById('firma_campus'));
    } else {
        firmaCarrera.clear();
        resizeCanvas(document.getElementById('firma_carrera'));
    }
}

// Función para cargar la tabla desde la BASE DE DATOS
async function cargarTabla(){
    let tbody = $('#tabla tbody');
    tbody.empty();

    try {
        const arr = await API.getAll(); // ← API en lugar de localStorage

        if(arr.length === 0){
            tbody.append('<tr><td colspan="12">No hay bitácoras guardadas</td></tr>');
            return;
        }

        arr.forEach(b => {
            tbody.append(`<tr>
                <td>${b.nombre || '-'}</td>
                <td>${b.fecha || '-'}</td>
                <td>${b.horaLlegada || '-'}</td>
                <td>${b.objetivo || '-'}</td>
                <td>${b.resultados || '-'}</td>
                <td>${b.campus || '-'}</td>
                <td>${b.horaSalida || '-'}</td>
                <td>${b.actividades || '-'}</td>
                <td>${b.notas || '-'}</td>
                <td><img src="${b.firma_campus}" width="80" height="40"></td>
                <td><img src="${b.firma_carrera}" width="80" height="40"></td>
                <td><button onclick='eliminar(${b.id})' class="btn btn-danger btn-sm">Eliminar</button></td>
            </tr>`);
        });
    } catch (error) {
        console.error('Error cargando tabla:', error);
        tbody.append('<tr><td colspan="12">Error al cargar datos</td></tr>');
    }
}

// Función para eliminar usando la API
async function eliminar(id){
    if (!confirm('¿Seguro que quieres eliminar esta bitácora?')) return;
    
    try {
        const resultado = await API.eliminar(id); // ← API en lugar de localStorage
        
        if (resultado.success || resultado.ok) {
            alert('Bitácora eliminada');
            cargarTabla(); // Recarga la tabla
        } else {
            alert('Error al eliminar: ' + resultado.mensaje);
        }
    } catch (error) {
        alert('Error: ¿Está corriendo tu api.js?');
        console.error(error);
    }
}
});