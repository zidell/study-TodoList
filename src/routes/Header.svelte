<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	let isModalOpen = false;

	function modalControl(value: boolean) {
		isModalOpen = value;
	}

</script>

<header>
	
<h2>TodoTitle</h2>
	<button on:click={()=>modalControl(true)}>추가</button>
</header>

{#if isModalOpen}
	<div class="modal-background" role="presentation">
    <div class="modal-box" role="dialog" aria-modal="true" tabindex="-1">
        <div class="title">
            <h2>할 일 추가</h2>
            <button on:click={() => modalControl(false)}>닫기</button>
        </div>

        <form>
            <label>
                <span>할 일</span>
                <input type="text" />
            </label>
            <label>
                <span>중요도</span>
                <input type="range" min="0" max="10" />
            </label>
            <label>
                <span>긴급도</span>
                <input type="range" min="0" max="10" />
            </label>
            <label>
                <span>마감일</span>
                <input type="date" />
            </label>
            <label>
                <span>메모</span>
                <textarea></textarea>
            </label>
            <label>
                <span>분류</span>
                <select>
                    <option>추가</option>
                </select>
            </label>
        </form>
        <div class="button-box">
            <button>추가</button>
            <button on:click={() => modalControl(false)}>취소</button>
        </div>
    </div>
</div>

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
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
	}
	.modal-box {
		position: absolute;
		top: 50%;
		left: 50%;
		max-width: 500px;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 1rem;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	}
	.button-box {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
