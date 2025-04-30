import mysql from 'mysql2/promise';

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost', // Cambia esto si tu servidor MySQL está en otro host
            user: 'root', // Cambia esto por tu usuario de MySQL
            password: '', // Cambia esto por tu contraseña de MySQL
            database: 'signos-vitales' // Cambia esto por el nombre de tu base de datos
        });
        console.log('Conexión a MySQL establecida correctamente');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos MySQL:', error.message);
        throw error;
    }
};

export { getConnection };