<script lang="ts">
  export let value: string;
  export let onFilterChange: (value: string) => void;

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    onFilterChange(value);
  }
</script>

<select
  value={value}
  on:change={handleChange}
  class="w-full md:w-1/4 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="all">Todos</option>
  <option value="positive">Subiendo (↑)</option>
  <option value="negative">Bajando (↓)</option>
</select>
