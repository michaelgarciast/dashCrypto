<script lang="ts">
  import type { Crypto } from '$lib/types/Crypto';
  export let crypto: Crypto;
  export let onDetailClick: (crypto: Crypto) => void;
</script>

<button class="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md flex flex-col items-center text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" on:click={() => onDetailClick(crypto)} on:keydown={(e) => e.key === 'Enter' && onDetailClick(crypto)} aria-label={`Ver detalles de ${crypto.name}`} role="button">
  <img src={crypto.image} alt={crypto.name} class="w-12 h-12 mb-2" />
  <h2 class="text-lg font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
  <p class="text-green-500 font-bold text-xl">${crypto.current_price}</p>
  <p class="text-sm mt-1 text-gray-400">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
  <p class="{crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}">
    {crypto.price_change_percentage_24h.toFixed(2)}%
  </p>
</button>

<style>
  button:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>
