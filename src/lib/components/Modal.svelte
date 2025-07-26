<script lang="ts">
  import type { Crypto } from '$lib/types/Crypto';
  import { getCryptoDetails } from '$lib/services/cryptoApi';

  export let isOpen = false;
  export let crypto: Crypto | null = null;
  export let onClose: () => void;

  let details: Crypto | null = null;
  let loading = false;
  let error: string | null = null;

  async function fetchDetails() {
    if (!crypto) return;
    
    loading = true;
    error = null;
    
    try {
      details = await getCryptoDetails(crypto.id);
    } catch (e) {
      error = 'Error al cargar los detalles. Por favor, intente más tarde.';
    } finally {
      loading = false;
    }
  }

  $: if (isOpen) {
    fetchDetails();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-2xl w-full">
      <div class="flex justify-between items-center mb-6">
        {#if crypto}
          <img src={crypto.image} alt={crypto.name} class="w-12 h-12 mb-2" />
        {/if}        
        <h2 class="text-2xl font-bold">{details?.name || crypto?.name}</h2>
        <button
          on:click={onClose}
          class="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full"
        >
          ×
        </button>
      </div>

      {#if loading}
        <div class="text-center text-gray-500">Cargando detalles...</div>
      {:else if error}
        <div class="text-center text-red-500">{error}</div>
      {:else}
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-500">Precio actual:</span>
            <span class="font-bold">${details?.current_price || crypto?.current_price}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500">Cambio 24h:</span>
            <span class="{details?.price_change_percentage_24h ?? crypto?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}">
                {(details?.price_change_percentage_24h ?? crypto?.price_change_percentage_24h)?.toFixed(2)}%
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500">Market Cap:</span>
            <span class="font-bold">${details?.market_cap?.toLocaleString() || crypto?.market_cap.toLocaleString()}</span>
          </div>
          {#if details?.total_volume || crypto?.total_volume}
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Volumen 24h:</span>
              <span class="font-bold">${details?.total_volume?.toLocaleString() || crypto?.total_volume.toLocaleString()}</span>
            </div>
          {/if}
          {#if details?.market_cap_rank}
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Ranking:</span>
              <span class="font-bold">#{details.market_cap_rank}</span>
            </div>
          {/if}
          {#if details?.circulating_supply}
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Circulante:</span>
              <span class="font-bold">{details.circulating_supply.toLocaleString()}</span>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}