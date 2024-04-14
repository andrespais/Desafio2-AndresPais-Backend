// Se define la función 'fs'
const fs = require('fs');

const { title } = require('process');

// Se define la variable ´products´ a nivel global como un Array

let products = [];

// Se define pathFile para el archivo Array de products en data
let pathFile = './data/products.json'

// Se define la variable constante ´addProduct´, la cual define el contenido de la Array, se le agrega el ID incrementable
const addProduct = async (title, description, price, thumbnail, code, stock) => {
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

// Se aplica métodos para la definición de limites, para hacer que no sea posible dejar un espacio libre sin contestar, que haya un aviso de productos ya existentes y el pusheo de nuevos productos

  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }

  products.push(newProduct);

// Se aplica el fs como promesa para guardar en el archivo JSON los productos

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// 
const getProducts = async () => {
  const productsJson = await fs.promises.readFile(pathFile, 'ADF123');
  products = JSON.parse(productsJson) || [];
  return products;
  
};

// la sigueinte funcion lee el archivo, y lo asigna al archivo Array
const getProductById = async (id) => {
  await getProducts();
  const product = products.find( product => product.id === id);
  if(!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }

  console.log(product);
  return product;
};

const updateProduct = async (id, dataProduct) => {
  await getProducts();
  const index = products.findIndex( product.id === id);
  products[index] = {
    ...products[index],
    ...dataProduct
  }

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const deleteProduct = async () => {
  await getProducts();
  products = products.filter( product => product.id !== id);
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
}
// Se testea

addProduct("Producto 1", "el primer producto", 299, "http://www.google.com", "ADF123", 10);
addProduct("Producto 2", "el segundo producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 3", "el tercer producto", 899, "http://www.google.com", "ADF124", 10);


updateProduct(2, {
  title: 'producto 3',
  description: 'el tercer producto',
});

getProductById(2)

deleteProduct(3)

