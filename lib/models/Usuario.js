'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Usuario extends Schwifty.Model {

    static get tableName() {

        return 'usuario';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
