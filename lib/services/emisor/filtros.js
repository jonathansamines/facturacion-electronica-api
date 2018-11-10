'use strict';

const Boom = require('boom');

const buscarUnidadGravableProductoEnCatalogo = (impuestoProducto, unidadesGravablesCatalogo) => {

    const unidadGravable = unidadesGravablesCatalogo.find((unidadGravableCatalogo) => (

        impuestoProducto.id_impuesto === unidadGravableCatalogo.id_impuesto &&
        impuestoProducto.id_unidad_gravable === unidadGravableCatalogo.id_unidad_gravable
    ));

    if (unidadGravable === undefined) {
        throw Boom.badData('Impuesto asociado al producto no existe en el catálogo de impuestos');
    }

    return Object.assign({}, impuestoProducto, unidadGravable);
};

const buscarProductoEnCatalogo = (productoFactura, productosCatalogo, unidadesGravablesCatalogo) => {

    const producto = productosCatalogo.find((productoCatalogo) => productoCatalogo.id_producto === productoFactura.id_producto);

    if (producto === undefined) {
        throw Boom.badData('Producto no existente en el catálogo de productos', { producto });
    }

    const unidadesGravables = productoFactura.impuestos.map((impuestoProducto) =>  buscarUnidadGravableProductoEnCatalogo(impuestoProducto, unidadesGravablesCatalogo));

    return {
        ...productoFactura,
        ...producto,
        unidadesGravables
    };
};

module.exports = {
    buscarProductoEnCatalogo,
    buscarUnidadGravableProductoEnCatalogo
};
