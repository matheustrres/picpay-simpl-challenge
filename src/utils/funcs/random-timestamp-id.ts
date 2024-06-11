const MAX_COUNTER = 10_000;

export function genTimestampNumericId(): number {
	let counter = 0;

	const timestamp = Date.now();
	counter = (counter + 1) % MAX_COUNTER;

	return Number(`${timestamp}${counter.toString().padStart(4, '0')}`);
}
