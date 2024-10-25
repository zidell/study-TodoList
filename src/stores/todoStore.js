import { writable } from 'svelte/store';

export const todoData = writable([
	{
		name: 'Todo',
		importance: 10,
		urgency: 5,
		deadline: '2021-12-31',
		memo: '',
		category: '',
		completed: false
	},
	{
		name: '밥먹기',
		importance: 3,
		urgency: 8,
		deadline: '2021-12-31',
		memo: '',
		category: '',
		completed: false
	},
	{
		name: '숨쉬기',
		importance: 1,
		urgency: 10,
		deadline: '2021-12-31',
		memo: '',
		category: '',
		completed: false
	},
	{
		name: '물마시기',
		importance: 2,
		urgency: 9,
		deadline: '2021-12-31',
		memo: '',
		category: '',
		completed: false
	},
	{
		name: '잠자기',
		importance: 4,
		urgency: 7,
		deadline: '2021-12-31',
		memo: '',
		category: '',
		completed: false
	}
]);

export const categories = writable(['추가', '기타']);
