<script lang="ts">
  import { todoData, categories } from '../stores/todoStore';
  import { get } from 'svelte/store';

  export let modalControl: (value: boolean) => void;

  let name = '';
  let importance = 5;
  let urgency = 5;
  let deadline = '';
  let memo = '';
  let category = '';
  let newCategory = '';
  let completed = false;

  function addCategory() {
    categories.update((data) => [...data, newCategory]);
    category = newCategory;
    newCategory = ''; // 추가 후 입력 필드 초기화
  }

  function removeCategory(index: number) {
    categories.update((data) => data.filter((_, i) => i !== index));
    if (category === $categories[index]) {
      category = '';
    }
  }

  function addTodo() {
    console.log('addTodo'); // 함수 호출 확인용 로그
    console.log(name, importance, urgency, deadline, memo, category); // 입력값 확인용 로그
    const todo = {
      name,
      importance,
      urgency,
      deadline,
      memo,
      category,
      completed,
    };
    todoData.update((data) => {
    const updatedData = [...data, todo];
    console.log('업데이트된 todoData:', updatedData); // 업데이트된 데이터 로그
    return updatedData;
  });
    modalControl(false);
    name = '';
    importance = 5;
    urgency = 5;
    deadline = '';
    memo = '';
    category = '';
    completed = false;
  }

  // 스토어 값 변경 시 로그 출력
  $: console.log('Updated todoData:', get(todoData));
</script>

<div class="modal-background" role="presentation">
  <div class="modal-box" role="dialog" aria-modal="true" tabindex="-1">
    <div class="title">
      <h2>할 일 추가</h2>
      <button on:click={() => modalControl(false)}>닫기</button>
    </div>
    <form>
      <label>
        <span>할 일</span>
        <input type="text" bind:value={name} />
      </label>
      <label>
        <span>중요도</span>
        <input type="range" min="0" max="10" bind:value={importance} />
      </label>
      <label>
        <span>긴급도</span>
        <input type="range" min="0" max="10" bind:value={urgency} />
      </label>
      <label>
        <span>마감일</span>
        <input type="date" bind:value={deadline} />
      </label>
      <label>
        <span>메모</span>
        <textarea bind:value={memo}></textarea>
      </label>
      <label>
        <span>분류</span>
        <select bind:value={category}>
          <option>선택</option>
          {#each $categories as c, index}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </label>
      <div>
        <input type="text" bind:value={newCategory} placeholder="새 분류 추가" />
        <button type="button" on:click={addCategory}>추가</button>
      </div>
      <ul>
        {#each $categories as c, index}
          <li>{c} <button type="button" on:click={() => removeCategory(index)}>삭제</button></li>
        {/each}
      </ul>
    </form>
    <div class="button-box">
      <button type="button" on:click={addTodo}>추가</button>
      <button on:click={() => modalControl(false)}>취소</button>
    </div>
  </div>
</div>

<style>
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