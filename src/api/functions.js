const db = require('../config/database');
const { BOLSA, FOTO_BOLSA, IMAGEM, MIDIA } = require('./elementsSchema');
const { PORT, isDevelopment } = require('../config/server');

function urlShowImage(name){
    return (isDevelopment ? 'http://localhost:'+PORT+'/image/'+name : 'http://api.rbernardes.com.br/image/'+name);
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

module.exports = {
    getBolsa,
    getBolsas,
    getImagem,
    urlShowImage,
    getMidia,
    getMidias
};