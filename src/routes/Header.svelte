<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import AddPopup from './addPopup.svelte';

	let isModalOpen = false;

	function modalControl(value: boolean) {
		isModalOpen = value;
		console.log(isModalOpen);
	}

</script>

<header>
	
<h2>TodoTitle</h2>
	<button on:click={()=>modalControl(true)}>추가</button>
</header>

{#if isModalOpen}
	<AddPopup modalControl={modalControl} />

{/if}

<style>
	body {
		position: relative;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #333;
		color: white;
	}
	
	
</style>
