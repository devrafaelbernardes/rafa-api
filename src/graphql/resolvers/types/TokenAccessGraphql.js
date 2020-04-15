import typeTokenAccess from '../../typeDefs/types/tokenAccess';
import { TOKEN_ACCESS } from '../../../database/tables';

export const TokenAccessGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeTokenAccess.COLUMNS.ID]: (tokenAccess) => tokenAccess[TOKEN_ACCESS.ID],
    [typeTokenAccess.COLUMNS.TOKEN]: (tokenAccess) => tokenAccess[TOKEN_ACCESS.TOKEN],
    [typeTokenAccess.COLUMNS.IS_ACTIVE]: (tokenAccess) => tokenAccess[TOKEN_ACCESS.IS_ACTIVE],
    [typeTokenAccess.COLUMNS.CREATED_AT]: (tokenAccess) => tokenAccess[TOKEN_ACCESS.CREATED_AT],
});

export default TokenAccessGraphql;