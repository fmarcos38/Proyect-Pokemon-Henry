const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerPokes = require('./Pokemons');
const routerTypes = require('./Types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', routerPokes);
router.use('/types', routerTypes);

module.exports = router;
