const { BOLSA, IMAGEM, MIDIA, PESSOA, TOKEN_ACCESS } = require('./elementsSchema');
module.exports = `
    type Sistema {
        bolsas: [Bolsa]
        midias: [Midia]
        qtd_bolsas : Int
        qtd_midias : Int
    }
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
    type Pessoa {
        ${PESSOA.NOME}: String
        ${PESSOA.SOBRENOME}: String
        ${PESSOA.EMAIL}: String
        ${PESSOA.ATIVO}: Boolean
        ${PESSOA.DATA_ADICIONADO}: Int
    }
    type Token {
        ${TOKEN_ACCESS.TOKEN}: String
        ${TOKEN_ACCESS.ATIVO}: Boolean
        ${TOKEN_ACCESS.DATA_ADICIONADO}: Int
    }
    type RespostaLogin {
        token : Token
        user : Pessoa
    }
    input Login {
        email : String
        senha : String
    }
    type Query {
        bolsas : [Bolsa]
        midias : [Midia]
        sistema : Sistema
    }
    type Mutation {
        validaLogin(input : Login): RespostaLogin
    }
`;