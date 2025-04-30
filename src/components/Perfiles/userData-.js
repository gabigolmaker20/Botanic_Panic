

    export const usersData = [
        {
        id: 'user1',
        email: 'fatima@gmail.com',
        password: 'password123',
        userName: 'Fatima Ortíz',
        profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=80',
        coverImageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1170&q=80',
        cartItemCount: 3,
        bio: 'Comparte tu grandiosidad con el mundo.'
        },
        {
        id: 'user2',
        email: 'juanperez@gmail.com',
        password: 'password456', 
        userName: 'Juan Pérez',
        profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        coverImageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        cartItemCount: 1,
        bio: 'Explorando nuevos horizontes.'
        }
    ];
    
    export const getLoggedInUser = (userId) => {
        // Aquí normalmente verificarías una sesión o token
        // Para la demo, simplemente buscamos por ID
        console.log(`Buscando usuario con ID: ${userId}`);
        const user = usersData.find(u => u.id === userId);
        console.log("Usuario encontrado:", user);
        return user; // Retorna el usuario o undefined si no se encuentra
    };