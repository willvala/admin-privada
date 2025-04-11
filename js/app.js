// Control de pestañas
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos
        document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
            el.classList.remove('active');
        });
        
        // Activar la seleccionada
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Ejemplo de conexión con API
async function cargarPropiedades() {
    try {
        const response = await fetch(`${API_URL}?action=getPropiedades`);
        const data = await response.json();
        
        const contenedor = document.getElementById('propiedades');
        contenedor.innerHTML = data.propiedades.map(prop => `
            <div class="propiedad-card">
                <h3>${prop.direccion}</h3>
                <p>Propietario: ${prop.propietario}</p>
                <p>Status: <span class="status ${prop.status === 'Al corriente' ? 'success' : 'warning'}">
                    ${prop.status}
                </span></p>
            </div>
        `).join('');
        
    } catch (error) {
        console.error("Error al cargar propiedades:", error);
        alert("Ocurrió un error al cargar los datos");
    }
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', cargarPropiedades);
