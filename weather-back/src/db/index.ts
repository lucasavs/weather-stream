import { Pool, QueryConfigValues } from 'pg'
 
console.log("creating pool!")
const pool = new Pool(
  {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST
        
  }
)
 
export const query = (text: string, params: QueryConfigValues<unknown[]>) => {
  try{
    return pool.query(text, params)
  } catch (error) {
    console.log('Error connecting with database')
    console.log(error)
  }
}