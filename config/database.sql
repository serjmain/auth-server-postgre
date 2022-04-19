create TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT,
    role TEXT,
    userId TEXT 
);

create TABLE tokens(
    id SERIAL PRIMARY KEY,
    userId TEXT,
    accessToken TEXT,
    refreshToken TEXT,
    role TEXT
);
