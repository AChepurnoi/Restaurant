export function seqCall(functionStore) {
	return (() => Object.values(functionStore).forEach(a => a()));
}