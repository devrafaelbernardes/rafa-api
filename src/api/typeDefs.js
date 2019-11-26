const { BAG, IMAGE, MEDIA, USER, TOKEN_ACCESS } = require('./elementsSchema');
module.exports = `
    type System {
        bags : [Bag]
        medias: [Media]
        count_bags : Int
        count_medias : Int
    }
    type Bag {
        ${BAG.NAME}: String
        ${BAG.LINK}: String
        ${BAG.DISCOUNT_PRICE}: Float
        ${BAG.TOTAL_PRICE}: Float
        ${BAG.INSTALLMENTS_PRICE}: Float
        ${BAG.INSTALLMENTS}: Int
        ${BAG.POSITION}: Int
        ${BAG.ACTIVE}: Boolean
        ${BAG.CREATED_AT}: Int
        price : Float
        images : [Image]
        first_image : Image
        second_image : Image
    }
    type Media {
        ${MEDIA.LINK}: String
        ${MEDIA.POSITION}: Int
        ${MEDIA.ACTIVE}: Boolean
        ${MEDIA.CREATED_AT}: Int
        image : Image
    }
    type Image {
        ${IMAGE.LOCATION}: String
    }
    type User {
        ${USER.NAME}: String
        ${USER.LASTNAME}: String
        ${USER.EMAIL}: String
        ${USER.ACTIVE}: Boolean
        ${USER.CREATED_AT}: Int
        fullName : String
    }
    type Token {
        ${TOKEN_ACCESS.TOKEN}: String
        ${TOKEN_ACCESS.ACTIVE}: Boolean
        ${TOKEN_ACCESS.CREATED_AT}: Int
    }
    type ResponseLogin {
        token : Token
        user : User
    }
    input Login {
        login : String
        password : String
    }
    type Query {
        bags : [Bag]
        medias : [Media]
        system : System
        user(token : String!) : User
    }
    type Mutation {
        loginValidate(input : Login): ResponseLogin
    }
`;