import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida no .env')
}

const sql = postgres(connectionString)

export default sql