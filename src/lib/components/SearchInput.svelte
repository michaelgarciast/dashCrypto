<script lang="ts">
  export let value: string;
  export let onSearch: (query: string) => void;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function handleSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      onSearch(query);
    }, 300); // Delay de 300ms para evitar solicitudes innecesarias
  }
</script>


<input
type="text"
  bind:value
  on:input={handleSearch}
  placeholder="Buscar por nombre o símbolo..."
  class="
    w-full 
    md:w-1/2 
    px-4 
    py-2 
    border 
    border-gray-300 
    dark:border-zinc-700 
    rounded-lg 
    bg-white 
    dark:bg-zinc-900 
    text-gray-800 
    dark:text-white 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    transition-all 
    duration-200
    ease-in-out
  "
/>
