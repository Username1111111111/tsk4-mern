/** @type {import('next').NextConfig} */

const dev = 1;
let nextConfig;

if (dev === 0) {
    nextConfig = {
        env: {
            baseUrl: "https://tsk4-mern.onrender.com",
        },
    };
} else {
    nextConfig = {
        env: {
            baseUrl: "http://localhost:3000",
        },
    };

}

export default nextConfig;

