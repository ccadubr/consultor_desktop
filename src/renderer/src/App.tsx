/* eslint-disable @typescript-eslint/no-explicit-any */
import electronLogo from './assets/electron.svg'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [data, setData] = useState<any[]>([])
  const [codProp, setCodProp] = useState<any | null>(null)
  const [propDetails, setPropDetails] = useState<any | null>(null)

  const fetchData = async (): Promise<void> => {
    try {
      // Use o IPC para chamar a função 'query-database' no main process
      const result = await window.electron.ipcRenderer.invoke('query-database')

      if (result.error) {
        console.error(result.error)
        alert('Erro ao buscar os dados do banco')
      } else {
        setData(result) // Atualiza o estado com os dados recebidos
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  const fetchPropDetails = async (codProp: any): Promise<void> => {
    try {
      console.log('Buscando detalhes da propriedade:', codProp)
      // Use o IPC para chamar a função 'getPropByCod' no main process
      const result = await window.electron.ipcRenderer.invoke('getPropByCod', codProp)

      if (result.error) {
        console.error(result.error)
        alert('Erro ao buscar os detalhes da propriedade')
      } else {
        console.log(result)
        setPropDetails(result[0]) // Atualiza o estado com os detalhes da propriedade
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da propriedade:', error)
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCodProp = event.target.value
    setCodProp(selectedCodProp)
    fetchPropDetails(selectedCodProp)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <img
        alt="logo"
        className="logo"
        src={electronLogo}
      />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <select
        id="nomeProp"
        name="nomeProp"
        value={codProp || ''}
        onChange={handleSelectChange}
        required
      >
        {data.map((item) => (
          <option
            key={item.Cod_Prop}
            value={item.Cod_Prop}
          >
            {item.Nome_Prop}
          </option>
        ))}
      </select>

      {/* Exibir os detalhes do proprietário selecionado */}
      {propDetails && (
        <div className="details">
          <h2>Detalhes do Proprietário</h2>
          <p>Nome: {propDetails.Nome_Prop}</p>
          <p>CPF: {propDetails.CPF_prop}</p>
          <p>Endereço: {propDetails.End_Prop}</p>
          {/* Adicione mais detalhes conforme necessário */}
        </div>
      )}
    </>
  )
}

export default App
