import Connection from "./Connection";
import Cryptography from "./Cryptography";
import System from "./System";
import Token from "./Token";

export const Model = () => {
  const connection = Connection().getConnection();
  const getCryptography = Cryptography();
  const getSystem = System();
  const getToken = Token();

  const dataObject = () => ({
    add(initialData = {}, newData = {}) {
      try {
        for (let key in newData) {
          let value = newData[key];
          if (value || value === "" || value === false || value === 0) {
            initialData[key] = newData[key];
          }
        }
      } catch (error) {}
    },
    isEmpty(data = {}) {
      try {
        return Object.entries(data).length === 0;
      } catch (error) {}
      return true;
    },
  });

  const pageToOffset = (limit = 1, page = 1) => {
    if (limit && limit > 0 && page > 0) {
      return (page - 1) * limit;
    }
    return 0;
  };

  const setPagination = (request, page = {}) => {
    if (page) {
      if (page.size) {
        request.limit(page.size);
      }
      if (page.size) {
        request.offset(pageToOffset(page.size, page.number));
      }
    }
  };

  return {
    getDb: () => connection,
    getCryptography: () => getCryptography,
    getSystem: () => getSystem,
    getToken: () => getToken,

    dbCrud: ({ tableName = null, columnID = null, columnIsActive = null }) => ({
      add: async ({ data = [] } = {}) => {
        if (tableName && data.length > 0) {
          try {
            let response = await connection.from(tableName).insert(data);
            if (response) {
              return response;
            }
          } catch (error) {}
        }
        return null;
      },
      addOne: async ({ data = {} } = {}) => {
        if (tableName) {
          try {
            let response = await connection.from(tableName).insert(data);
            if (response && response[0]) {
              return response[0];
            }
          } catch (error) {}
        }
        return null;
      },
      findOne: async ({
        isActive = true,
        where = {},
        andWhere = [],
        orderBy = null,
      } = {}) => {
        if (tableName && columnIsActive) {
          try {
            const data = {};
            await dataObject().add(data, where);

            if (!dataObject().isEmpty(data)) {
              const request = connection
                .from(tableName)
                .where(data)
                .andWhere({
                  [`${tableName}.${columnIsActive}`]: isActive,
                });

              if (andWhere && andWhere.length > 0) {
                await andWhere.forEach((item) => {
                  request.andWhere(item[0], item[1], item[2]);
                });
              }
              if (orderBy) {
                request.orderBy(orderBy);
              }

              return await request.first();
            }
          } catch (error) {}
        }
        return null;
      },
      findIn: async ({
        ids = [],
        column = null,
        isActive = true,
        filter = null,
        orderBy = [],
        page = null,
      } = {}) => {
        if (tableName && column && columnIsActive) {
          try {
            const request = connection
              .from(tableName)
              .whereIn(column, ids)
              .andWhere({
                [`${tableName}.${columnIsActive}`]: isActive,
              });

            if (filter) {
              request.andWhere(filter);
            }
            if (orderBy && orderBy.length > 0) {
              request.orderBy(orderBy);
            }

            setPagination(request, page);

            return await request.orderBy(
              connection.raw(`FIELD(${column}, ${ids.join(", ")})`)
            );
          } catch (error) {}
        }
        return [];
      },
      findNotIn: async ({
        ids = [],
        column = null,
        isActive = true,
        filter = null,
        orderBy = [],
        page = null,
      } = {}) => {
        if (tableName && column && columnIsActive) {
          try {
            const request = connection
              .from(tableName)
              .whereNotIn(column, ids)
              .andWhere({
                [`${tableName}.${columnIsActive}`]: isActive,
              });

            if (filter) {
              request.andWhere(filter);
            }
            if (orderBy && orderBy.length > 0) {
              request.orderBy(orderBy);
            }

            setPagination(request, page);

            if (ids && ids.length > 0) {
              return await request.orderBy(
                connection.raw(`FIELD(${column}, ${ids.join(", ")})`)
              );
            }
            return await request;
          } catch (error) {}
        }
        return [];
      },
      findAll: async ({
        where = {},
        whereNot = {},
        columns = [],
        andWhere = [],
        leftJoin = {},
        innerJoin = {},
        isActive = true,
        orderBy = [],
        groupBy = null,
        page = null,
      } = {}) => {
        if (tableName && columnIsActive) {
          try {
            const data = {};
            await dataObject().add(data, where);

            const request = connection
              .from(tableName)
              .select(columns)
              .where(data)
              .andWhere({
                [`${tableName}.${columnIsActive}`]: isActive,
              });

            if (whereNot) {
              request.whereNot(whereNot);
            }

            if (andWhere && andWhere.length > 0) {
              await andWhere.forEach((item) => {
                request.andWhere(item[0], item[1], item[2]);
              });
            }

            if (
              columns.length > 0 &&
              leftJoin &&
              leftJoin.table &&
              leftJoin.param1 &&
              leftJoin.param2
            ) {
              request.leftJoin(
                leftJoin.table,
                leftJoin.param1,
                leftJoin.param2
              );
            }

            if (
              columns.length > 0 &&
              innerJoin &&
              innerJoin.table &&
              innerJoin.param1 &&
              innerJoin.param2
            ) {
              request.join(innerJoin.table, innerJoin.param1, innerJoin.param2);
            }

            if (orderBy && orderBy.length > 0) {
              request.orderBy(orderBy);
            }

            if (groupBy) {
              request.groupBy(groupBy);
            }

            setPagination(request, page);

            return await request;
          } catch (error) {}
        }
        return null;
      },
      count: async ({
        where = {},
        isActive = true,
        ids = [],
        column = null,
        whereNotIn = null,
        page = null,
        groupBy = null,
      } = {}) => {
        if (tableName && columnID && columnIsActive) {
          try {
            const data = {};
            await dataObject().add(data, where);

            const request = connection.from(tableName).where({
              [`${tableName}.${columnIsActive}`]: isActive,
            });

            if (!dataObject().isEmpty(data)) {
              request.andWhere(data);
            }
            if (column && ids && ids.length > 0) {
              if (whereNotIn) {
                request.whereNotIn(column, ids);
              } else {
                request.whereIn(column, ids);
              }
            }

            setPagination(request, page);
            let response = null;
            if (groupBy) {
              response = await request.groupBy(groupBy).count({
                total: columnID,
              });
              if (response && response.length > 0) {
                return response.length;
              }
            } else {
              response = await request
                .count({
                  total: columnID,
                })
                .first();
              if (response && response.total) {
                return response.total;
              }
            }
          } catch (error) {}
        }
        return 0;
      },
      remove: async ({
        id = null,
        column = columnIsActive,
        value = false,
      } = {}) => {
        if (tableName && columnID && id && column) {
          try {
            let response = await connection
              .from(tableName)
              .update({
                [column]: value,
              })
              .where({
                [columnID]: id,
              });
            if (response) {
              return true;
            }
          } catch (error) {}
        }
        return false;
      },
      update: async ({ id = null, data = {} } = {}) => {
        if (tableName && columnID && id && !dataObject().isEmpty(data)) {
          try {
            const updateData = {};
            await dataObject().add(updateData, data);

            if (!dataObject().isEmpty(updateData)) {
              let response = await connection
                .from(tableName)
                .update(updateData)
                .where({
                  [columnID]: id,
                });
              if (response) {
                return true;
              }
            }
          } catch (error) {}
        }
        return false;
      },
    }),

    dataObject,
  };
};

export default Model;
