const API_BASE_URL = 'https://api.coingecko.com';
const API_MARKETS_PATH = '/api/v3/coins/markets';
const API_DETAILS_PATH = '/api/v3/coins';

export async function getCryptos() {
  try {
    const res = await fetch(
      `${API_BASE_URL}${API_MARKETS_PATH}?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!res.ok) {
      throw new Error(`Error al cargar criptomonedas: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error en getCryptos:', error);
    throw new Error('No se pudo conectar al servidor de criptomonedas');
  }
}

export async function getCryptoDetails(id: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}${API_DETAILS_PATH}/${encodeURIComponent(id)}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!res.ok) {
      throw new Error(`Error al cargar detalles: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      ...data,
      // Puedes transformar los datos aquí si es necesario
      formattedData: {
        price: data.market_data.current_price.usd,
        change24h: data.market_data.price_change_percentage_24h
      }
    };
  } catch (error) {
    console.error('Error en getCryptoDetails:', error);
    throw new Error(`No se pudieron obtener los detalles para ${id}`);
  }
}