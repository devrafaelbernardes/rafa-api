const { BOLSA, IMAGEM, MIDIA } = require('./elementsSchema');
module.exports = `
    type Bolsa {
        ${BOLSA.NOME}: String
        ${BOLSA.LINK}: String
        ${BOLSA.PRECO_DESCONTO}: Float
        ${BOLSA.PRECO_TOTAL}: Float
        ${BOLSA.PRECO_PARCELAS}: Float
        ${BOLSA.PARCELAS}: Int
        ${BOLSA.POSICAO}: Int
        ${BOLSA.ATIVO}: Boolean
        ${BOLSA.DATA_ADICIONADO}: Int
        preco : Float
        imagens : [Imagem]
    }
    type Midia {
        ${MIDIA.LINK}: String
        ${BOLSA.POSICAO}: Int
        ${BOLSA.ATIVO}: Boolean
        ${BOLSA.DATA_ADICIONADO}: Int
        imagem : Imagem
    }
    type Imagem {
        ${IMAGEM.CAMINHO}: String
    }
    type Query {
        bolsas: [Bolsa]
        midias: [Midia]
    }
    type Mutation {
        createBOLSA(name: String!): Bolsa
    }
`;