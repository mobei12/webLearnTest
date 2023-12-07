function fnc(params:number,a?:string):number
function fnc(params:number):string

function fnc(params:number,a?:string):string|number
{
	return params
}
const a:string = fnc(1)