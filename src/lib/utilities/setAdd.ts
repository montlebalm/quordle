export default function setAdd<TValue>(set: Set<TValue>, values: TValue[]) {
	for (const value of values) {
		set.add(value);
	}
}
