// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ColumnMap,
  DatabaseConfig,
  RowDataPacket,
  RowMap,
} from "@/gen/typings/types";
import AsyncAliRds from "ali-rds-async";
import type { NextApiRequest, NextApiResponse } from "next";
// import { transformStructure } from "../../../lib/utils/parser";
import { message } from "antd";

async function dbinfo(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res?.status(200).json({
      code: -1,
      msg: "参数不能为空",
      data: null,
    });
  }

  const requestBody: DatabaseConfig = {
    host: req.body.host,
    port: req.body.port,
    user: req.body.user,
    password: req.body.password,
    database: req.body.database,
  };
  console.log("requestBody====", requestBody);
  const db = new AsyncAliRds(requestBody);
  let code: number = 0;
  let msg = "获取数据库信息成功";
  let data = null;
  let returnList = [];
  if (!db) {
    code = -1;
    msg = "获取数据库信息失败";
  }

  try {
    // 获取表结构(源)
    const structure = await getDbTables([requestBody.database], db);
    console.log("structure======", structure[requestBody.database]);

    returnList = JSON.parse(JSON.stringify(structure[requestBody.database]));
    console.log("returnList======", returnList);
  } catch (error) {
    code = -1;
    msg = "获取数据库信息失败" + error;
  }

  res?.status(200).json({
    code: code,
    msg: msg,
    data: returnList,
  });
}

// 获取数据库中所有表名称
const getDbTables = async (
  dbNames: string[],
  db: AsyncAliRds
): Promise<RowMap> => {
  // @ts-ignore
  const dbStructure: Promise<RowMap> = dbNames.reduce(
    async (map: Promise<RowMap>, dbname: string) => {
      const newMap = await map;
      try {
        newMap[dbname] = await db.query(
          `SELECT FLOOR(RAND() * 10000) as id,TABLE_NAME,TABLE_COMMENT AS tableComment  FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA= '${dbname}'`
        );
      } catch (error) {
        throw error;
      }
      return map;
    },
    {}
  );
  return dbStructure;
};

export default dbinfo;
