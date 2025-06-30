import { Pool, QueryArrayConfig } from 'pg'
 
console.log("creating pool!")
console.log(process.env.PGPASSWORD)
const pool = new Pool(
    {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST
        
    }
)
 
export const query = (text: QueryArrayConfig<any>, params: any) => {
  return pool.query(text, params)
}