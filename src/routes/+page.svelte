<script>
	import { onMount } from 'svelte';

	let tooltip = { visible: false, x: 0, y: 0, text: '' };

	onMount(() => {
		const canvas = document.getElementById('TodoChart');
		const ctx = canvas.getContext('2d');

		const data = [
			{ name: 'Todo', importance: 10, urgency: 5 },
			{ name: '밥먹기', importance: 3, urgency: 8 },
			{ name: '숨쉬기', importance: 1, urgency: 10 },
			{ name: '물마시기', importance: 2, urgency: 9 },
			{ name: '잠자기', importance: 4, urgency: 7 },
		];

		const width = canvas.width;
		const height = canvas.height;
		const padding = 20;
		const halfWidth = (width - 2 * padding) / 2;
		const halfHeight = (height - 2 * padding) / 2;

		const drawChart = () => {
			ctx.clearRect(0, 0, width, height);

			// 네 개의 영역에 배경색 입히기
			ctx.fillStyle = 'rgba(255, 99, 132, 0.2)'; // 왼쪽 위
			ctx.fillRect(padding, padding, halfWidth, halfHeight);
			ctx.fillStyle = 'rgba(54, 162, 235, 0.2)'; // 오른쪽 위
			ctx.fillRect(padding + halfWidth, padding, halfWidth, halfHeight);

			ctx.fillStyle = 'rgba(255, 206, 86, 0.2)'; // 왼쪽 아래
			ctx.fillRect(padding, padding + halfHeight, halfWidth, halfHeight);

			ctx.fillStyle = 'rgba(75, 192, 192, 0.2)'; // 오른쪽 아래
			ctx.fillRect(padding + halfWidth, padding + halfHeight, halfWidth, halfHeight);

			// 데이터 포인트 그리기
			data.forEach(point => {
				const x = padding + ((point.importance - 5) / 10) * (width - 2 * padding) + halfWidth;
				const y = height - padding - ((point.urgency - 5) / 10) * (height - 2 * padding) - halfHeight;

				

				ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
				ctx.beginPath();
				ctx.arc(x, y, 5, 0, Math.PI * 2, true);
				ctx.fill();
				const textOffset = x > width - 50 ? -50 : 10;
				ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
				ctx.fillText(point.name, x + textOffset, y + 10);
			});
		};

		drawChart();

		canvas.addEventListener('mousemove', (event) => {
			const rect = canvas.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			let found = false;
			data.forEach(point => {
				const x = padding + ((point.importance / 10) * (width - 2 * padding));
				const y = height - padding - ((point.urgency / 10) * (height - 2 * padding));

				if (Math.abs(mouseX - x) < 8 && Math.abs(mouseY - y) < 8) {
					let tooltipX = event.clientX;
					let tooltipY = event.clientY;
					if (tooltipX + 200 > window.innerWidth) {
						tooltipX -= 200;
					}

					tooltip = {
						visible: true,
						x: tooltipX,
						y: tooltipY,
						text: `할 일: ${point.name}, 중요도: ${point.importance}, 긴급도: ${point.urgency}`
					};
					found = true;
				}
			});

			if (!found) {
				tooltip.visible = false;
			}
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<canvas id="TodoChart" width="600" height="400"></canvas>
	{#if tooltip.visible}
		<div style="position: absolute; top: {tooltip.y}px; left: {tooltip.x}px;" class="tooltip">
			{tooltip.text}
		</div>
	{/if}
</section>

<style>
	canvas {
		width: 100%;
		height: auto;
		border: 1px solid #ccc; /* 캔버스 테두리 추가 */
	}
	.tooltip {
		padding: 5px 10px;
		border-radius: 3px;
		cursor: pointer;
		transform: translate(-50%, -100%);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
		font-size: 14px;
		background-color: #333;
		color: #fff;
		border-radius: 14px;
	}
</style>