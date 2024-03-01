{
	class  Person{
		name:string
		constructor(name:string){
			this.name = name
		}
		@bound
		@logMethod
		 greet(){
			console.log('hello ' + this.name)
		}
	}
	function logMethod(originalMethod:any,_context:ClassMethodDecoratorContext){
		const methodName = String(_context.name)
		function replacementMethod(this:any,...args:any[]) {
			console.log(`LOG: Entering method '${methodName}'.`)
			const result = originalMethod.call(this, ...args);
			console.log(`LOG: Exiting method '${methodName}'.`)
			return result;
		}
		return replacementMethod
	}
	function bound(originalMethod:any,context:ClassMethodDecoratorContext) {
		console.log(context)
		const methodName = context.name
		if(context.private){
			throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
		}
		context.addInitializer(function () {
			(this as any)[methodName] = (this as any)[methodName].bind(this);
		});
	}
	const person = new Person('amy')
	person.greet()
}
