import express from "express";

const app = express();

//se aplican los middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pets = [];

app.get("/api/pets", (req, res) => {
    res.status(200).json(pets);
})

app.post("/api/pets", (req, res) => {
    const pet = req.body;
    pet.push(pet);

    res.status(201).json({message: "Mascota agregada"})
})

app.listen(8080, () => {
    console.log('Escuchando servidor en el puerto 8080');
})