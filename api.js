const API = {
    url: 'http://localhost:3000/api',
    mock: true,

    guardarBitacora: async function(data){
        if(this.mock){
            var bitacoras = JSON.parse(localStorage.getItem('bitacoras') || '[]');
            data.id = Date.now();
            data.fecha = new Date().toISOString().split('T')[0];
            bitacoras.push(data);
            localStorage.setItem('bitacoras', JSON.stringify(bitacoras));
            return {ok: true, id: data.id};
        }
        // agrega aquí el fetch real 
        const response = await fetch(this.url + '/bitacoras', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    getAll: function(){
        if(this.mock){
            return JSON.parse(localStorage.getItem('bitacoras') || '[]');
        }
        // Tu compañero mete aquí el fetch real después
        return fetch(this.url + '/bitacoras').then(r => r.json());
    },

    eliminar: function(id){
        if(this.mock){
            var bitacoras = JSON.parse(localStorage.getItem('bitacoras') || '[]');
            bitacoras = bitacoras.filter(b => b.id!= id);
            localStorage.setItem('bitacoras', JSON.stringify(bitacoras));
            return {ok: true};
        }
        // agrega aquí el fetch real después
        return fetch(this.url + '/bitacoras/' + id, { method: 'DELETE' });
    },

    // FUNCIÓN LOGIN
    login: async function(usuario, password) {
        if (this.mock) {
            console.log('MOCK: Login con', usuario);
            await new Promise(r => setTimeout(r, 500));
            return {
                success: true,
                mensaje: 'Login MOCK correcto',
                user: { id: 1, usuario: usuario, nombre: 'Usuario Prueba' },
                token: 'fake-jwt-token-123'
            };
        }

        // programa esto cuando tenga la BD
        const response = await fetch(this.url + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });
        return await response.json();
    }
};