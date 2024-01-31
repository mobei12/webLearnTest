const func = () => {
	return '123';
};
type FuncType = ReturnType<typeof func>; //type FuncType = string
const funcAsync = async () => {
	return '123';
};
type FuncAsyncType = Awaited<ReturnType<typeof funcAsync>>; //type FuncType = string
