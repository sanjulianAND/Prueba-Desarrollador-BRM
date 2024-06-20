CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    lotNumber VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    entryDate DATE NOT NULL
);

CREATE TABLE Purchases (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(id),
    totalPrice DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE PurchaseDetails (
    id SERIAL PRIMARY KEY,
    purchaseId INT REFERENCES Purchases(id),
    productId INT REFERENCES Products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE SequelizeMeta (
    name VARCHAR(255) PRIMARY KEY
);
