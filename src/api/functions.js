const db = require('../config/database');
const { BOLSA, FOTO_BOLSA, IMAGEM, MIDIA, TOKEN_ACCESS, PESSOA } = require('./elementsSchema');
const { encryptCode, encryptPassword } = require('./encryptFunctions');
const { PORT, isDevelopment } = require('../config/server');

function urlShowImage(name){
    return (isDevelopment ? 'http://localhost:'+PORT+'/image/'+name : 'http://api.rbernardes.com.br/image/'+name);
}

const getSistema = () => {
    return {
        bolsas : () => {
            return getBolsas();
        },
        qtd_bolsas : () => {
            return qtdBolsas();
        },
        midias : () => {
            return getMidias();
        },
        qtd_midias : () => {
            return qtdMidias();
        }
    };
}

const getBolsa = async(id) => {
    if(id){
        try{
            let bolsa = await db(BOLSA.TABLE_NAME).where({ [BOLSA.ID] : id }).first();
            if(bolsa){
                return {
                    ...bolsa,
                    preco : () => {
                        let total = bolsa[BOLSA.PRECO_DESCONTO];
                        if(bolsa[BOLSA.PRECO_DESCONTO] < bolsa[BOLSA.PRECO_DESCONTO]){
                            if(total){
                                total = bolsa[BOLSA.PRECO_DESCONTO];
                            }
                        }
                        return total;
                    },
                    imagens : async() => {
                        let bolsa_id = bolsa[BOLSA.ID];
                        if(bolsa_id){
                            let imagens = await db(FOTO_BOLSA.TABLE_NAME).select(FOTO_BOLSA.ID_IMAGEM).where({ [FOTO_BOLSA.ID_BOLSA] : bolsa_id });
                            if(imagens && imagens.length > 0){
                                let response = [];
                                for(let i in imagens){
                                    let imagem = imagens[i];
                                    if(imagem){
                                        imagem = await getImagem(imagem[FOTO_BOLSA.ID_IMAGEM]);
                                        if(imagem){
                                            response.push(imagem);
                                        }
                                    }
                                }
                                if(response.length > 0){
                                    return response;
                                }
                            }
                        }
                        return null;
                    }
                };
            }
        }catch(e){}
    }
    return null;
}

const getMidia = async(id) => {
    if(id){
        try{
            let midia = await db(MIDIA.TABLE_NAME).where({ [MIDIA.ID] : id }).first();
            if(midia){
                return {
                    ...midia,
                    imagem : async() => {
                        let imagem_id = midia[MIDIA.ID_IMAGEM];
                        if(imagem_id){
                            let imagem = await getImagem(imagem_id);
                            if(imagem){
                                return imagem;
                            }
                        }
                        return null;
                    }
                };
            }
        }catch(e){}
    }
    return null;
}

const getBolsas = async() => {
    try{
        let bolsas = await db(BOLSA.TABLE_NAME).select(BOLSA.ID).where({ [BOLSA.ATIVO] : true }).orderBy(BOLSA.POSICAO, 'asc');
        var response = [];
        if(bolsas && bolsas.length > 0){
            for(let i in bolsas){
                let bolsa = bolsas[i];
                if(bolsa){
                    let b = await getBolsa(bolsa[BOLSA.ID]);
                    if(b){
                        response.push(b);
                    }
                }
            }
            if(response.length > 0){
                return response;
            }
        }
    }catch(e){
    }
    return null;
}

const getMidias = async() => {
    try{
        let midias = await db(MIDIA.TABLE_NAME).select(MIDIA.ID).where({ [MIDIA.ATIVO] : true }).orderBy(MIDIA.POSICAO, 'asc');
        var response = [];
        if(midias && midias.length > 0){
            for(let i in midias){
                let midia = midias[i];
                if(midia){
                    let m = await getMidia(midia[MIDIA.ID]);
                    if(m){
                        response.push(m);
                    }
                }
            }
            if(response.length > 0){
                return response;
            }
        }
    }catch(e){
    }
    return null;
}

const getImagem = async(id) => {
    try{
        if(id){
            let imagem = await db(IMAGEM.TABLE_NAME).where({ [IMAGEM.ID] : id }).first();
            if(imagem){
                return {
                    ...imagem,
                    [IMAGEM.CAMINHO] : urlShowImage(imagem[IMAGEM.CAMINHO]),
                };
            }
        }
    }catch(e){}
    return null;
}

const qtdBolsas = async() => {
    try{
        var response = await db(BOLSA.TABLE_NAME).where({ [BOLSA.ATIVO] : true }).count({ qtd : BOLSA.ID }).first();
        if(response){
            return response.qtd;
        }
    } catch (error) {}
    return 0;
}

const qtdMidias = async() => {
    try {
        var response = await db(MIDIA.TABLE_NAME).where({ [MIDIA.ATIVO] : true }).count({ qtd : MIDIA.ID }).first();
        if(response){
            return response.qtd;
        }   
    } catch (error) {}
    return 0;
}

const maxPosicaoMidia = async() => {
    try {
        var response = await db(MIDIA.TABLE_NAME).where({ [MIDIA.ATIVO] : true }).max({ valor : MIDIA.POSICAO }).first();
        if(response){
            return response.valor;
        }   
    } catch (error) {}
    return 0;
}

const addMidia = async(token, link, caminho_imagem) => {
    if(token && link && caminho_imagem){
        try {
            var user = await getUserByToken(token);
            if(user){
                var imagem = await db(IMAGEM.TABLE_NAME).insert({ [IMAGEM.CAMINHO] : caminho_imagem });
            
                if(imagem && imagem[0]){
                    var code = await encryptCode(link);
                    var ultima_posicao = await maxPosicaoMidia();
                    ultima_posicao = ultima_posicao + 1;
                    var id_imagem = imagem[0];
                    
                    var midia = await db(MIDIA.TABLE_NAME).insert({
                        [MIDIA.ID_IMAGEM] : id_imagem,
                        [MIDIA.LINK] : link,
                        [MIDIA.POSICAO] : ultima_posicao,
                        [MIDIA.ID_IMAGEM] : id_imagem,
                        [MIDIA.CODE] : code,
                    });

                    if(midia && midia[0]){
                        return await getMidia(midia[0]);
                    }
                }
            }
        } catch (error) {}
    }
    return null;
}

const getUser = async(id) => {
    if(id){
        try {
            var user = await db(PESSOA.TABLE_NAME).where({ [PESSOA.ID] : id, [PESSOA.ATIVO] : true }).first();
            if(user){
                return {
                    ...user
                };
            }
        } catch (error) {}
    }
    return null;
}

const getTokenAccess = async(column, value) => {
    if(column && value){
        try {
            var token = await db(TOKEN_ACCESS.TABLE_NAME).where({ [column] : value, [TOKEN_ACCESS.ATIVO] : true }).first();
            if(token){
                return {
                    ...token
                };
            }
        } catch (error) {}
    }
    return null;
}

const getTokenAccessById = async(id) => {
    if(id){
        try {
            var token = await getTokenAccess(TOKEN_ACCESS.ID, id);
            if(token){
                return token;
            }
        } catch (error) {}
    }
    return null;
}

const getTokenAccessByToken = async(token) => {
    if(token){
        try {
            var response = await getTokenAccess(TOKEN_ACCESS.TOKEN, token);
            if(response){
                return response;
            }
        } catch (error) {}
    }
    return null;
}

const getUserByToken = async(token) => {
    if(token){
        try {
            var token = await getTokenAccessByToken(token);
            if(token){
                var user = await getUser(token[TOKEN_ACCESS.PESSOA]);
                if(user){
                    return user;
                }
            }
        } catch (error) {}
    }
    return null;
}


const createToken = async(id_pessoa) => {
    if(id_pessoa){
        try {
            var token = await db(TOKEN_ACCESS.TABLE_NAME).insert({ [TOKEN_ACCESS.TOKEN] : token, [TOKEN_ACCESS.PESSOA] : id_pessoa });
            if(token && token[0]){
                var response = await getTokenAccessById(token[0]);
                if(response){
                    return response;
                }
            }
        } catch (error) {}
    }
    return null;
}

const validateLogin = async(email, senha) => {
    if(email && senha){
        try {
            senha = await encryptPassword(senha);
            console.log(senha);
            
            var user = await db(PESSOA.TABLE_NAME).where({ [PESSOA.EMAIL] : email, [PESSOA.SENHA] : senha, [PESSOA.ATIVO] : true }).first();
            if(user){
                var response = await createToken(user[PESSOA.ID]);
                if(response){
                    var user = await getUser(user[PESSOA.ID]);
                    return {
                        token : response,
                        user : user,
                    };
                }
            }
        } catch (error) {}
    }
    return null;
}


module.exports = {
    getSistema,
    getBolsa,
    getBolsas,
    getImagem,
    urlShowImage,
    getMidia,
    getMidias,
    qtdBolsas,
    qtdMidias,
    addMidia,
    maxPosicaoMidia,
    getUser,
    getUserByToken,
    getTokenAccessById,
    createToken,
    getTokenAccessByToken,
    validateLogin
};