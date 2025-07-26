<script lang="ts">
  import { onMount } from 'svelte';
  import { getCryptos } from '$lib/services/cryptoApi';
  import type { Crypto } from '$lib/types/Crypto';
  import Card from '$lib/components/Card.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import FilterSelect from '$lib/components/FilterSelect.svelte';
  import Modal from '$lib/components/Modal.svelte';

  let cryptos: Crypto[] = [];
  let filteredCryptos: Crypto[] = [];
  let loading = true;
  let error: string | null = null;

  let search = '';
  let filter = 'all';
  let selectedCrypto: Crypto | null = null;
  let isModalOpen = false;

  function handleFilterChange(newFilter: string) {
    filter = newFilter;
    applyFilters();
  }

  onMount(async () => {
    try {
      cryptos = await getCryptos();
      applyFilters();
    } catch (e) {
      error = 'Error al cargar las criptomonedas. Por favor, intente más tarde.';
    } finally {
      loading = false;
    }
  });

  function handleSearch(query: string) {
    search = query;
    applyFilters();
  }

  function applyFilters() {
    filteredCryptos = cryptos.filter((crypto) => {
      const matchesSearch = crypto.name.toLowerCase().includes(search.toLowerCase()) || 
                          crypto.symbol.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'positive' && crypto.price_change_percentage_24h >= 0) ||
        (filter === 'negative' && crypto.price_change_percentage_24h < 0);

      return matchesSearch && matchesFilter;
    });
  }

  function openDetail(crypto: Crypto) {
    selectedCrypto = crypto;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedCrypto = null;
  }
</script>

<section class="p-6 max-w-7xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-center text-zinc-800 dark:text-white">Top Criptomonedas</h1>

  <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
    <SearchInput value={search} onSearch={handleSearch} />
    <FilterSelect value={filter} onFilterChange={handleFilterChange} />
  </div>

  {#if loading}
    <p class="text-center text-gray-500">Cargando...</p>
  {:else if error}
    <p class="text-center text-red-500">{error}</p>
  {:else if filteredCryptos.length === 0}
    <p class="text-center text-gray-400">No se encontraron criptomonedas.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredCryptos as crypto}
        <Card {crypto} onDetailClick={openDetail} />
      {/each}
    </div>
  {/if}
</section>

<Modal isOpen={isModalOpen} crypto={selectedCrypto} onClose={closeModal} />