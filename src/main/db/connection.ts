import odbc from 'odbc'

import { Connection } from 'odbc'

const connectToDatabase = async (): Promise<Connection> => {
  try {
    const connection = await odbc.connect('DSN=Consultor2;PWD=Tobaty85')

    return connection
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
    throw error
  }
}

export default connectToDatabase
