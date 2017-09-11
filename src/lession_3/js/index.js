import { readonly, autobind } from 'core-decorators';
console.log(readonly)
class Animal {

	constructor (name) {
		this.name = name;
	}

	@dec(2)
	@autobind()
	belongTo () {
		console.log(this)
	}



}

function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', target, property, descriptor);
}
let a = new Animal('animal');
a.belongTo()

