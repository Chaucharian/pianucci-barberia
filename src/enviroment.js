export const enviroment = {
    baseUrl: process.env.NODE_ENV === 'production' ? `https://localhost:8080/api` : `http://localhost:8080/api`
}

