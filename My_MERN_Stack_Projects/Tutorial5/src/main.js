// // Variables
// const hello = 'wolrd';
// let strHello = 'world';
// //Specify type
// let intNumber: number = 3;
// // Functions
// const getFullName = (name: string, surname: string): string => {
//     return name + ' ' + surname;
// }
// getFullName("Pierre", "Jonker");
// // Objects
// const userObj: { name: string, age: number } = {
//     name: "Moster",
//     age: 30
// }
// const userObj2: { name: string, age: number } = {
//     name: "Moster",
//     age: 30
// }
// // Interfaces
// interface User {
//     name: string
//     age?: number
//     //Use '?' to indicate that it is not required
//     getMessage(): string
// }
// const userObj3: User = {
//     name: "Fez",
//     age: 23,
//     getMessage() {
//         return "Hello " + name
//     },
// }
// console.log(userObj3.age, userObj3.name,userObj3.getMessage());
// // Union operator
// interface UserInterace {
//     name: string
//     surname: string
//     age: number
// }
// let username: string = 'fez';
// let pageName: string | number = '1';
// let errMsg: string | null = null;
// let user: UserInterace | null = null;
// // Type alises
// type ID = string;
// type PopularTag = string;
// type MaybePopularTag = PopularTag | null;
// let id: ID = 'Fax';
// const popularTag: PopularTag[] = ["Dragon", "Coffe"];
// const dragonsTag: MaybePopularTag = null;
// Types 
// Void
// const doSomething = (): void => {
//     console.log("Do something")
// }
// //Any
// let anyVar: any = undefined;
// // Never
// const doSomething2 = (): never => {
//     throw 'never';
// }
// // Unknown
// // Works like any but we cannot assign it to another type, unless we assert
// let varUnknown: unknown = 10;
// let strT: string = varUnknown as string;
// const someElement = document.querySelector('.foo') as HTMLInputElement;
// console.log("someElement", someElement.value);
// const someElement2 = document.querySelector('.foo');
// someElement2.addEventListener('click',(event)=>{
//     const target=event.target as HTMLInputElement;
//     console.log('event',target.value);
// });
// Classes
// interface UserInterface {
//     getFullName(): string
// }
// class User implements UserInterface {
//     private fistName: string
//     protected lastName: string
//     readonly dfunknown: string
//     static readonly maxAge = 50;
//     constructor(firstName: string, lastName: string) {
//         this.fistName = firstName;
//         this.lastName = lastName;
//         this.dfunknown = firstName;
//     }
//     getFullName(): string {
//         return this.fistName + ' ' + this.lastName
//     }
// }
// class Admin extends User {
//     private editor: string
//     setEditor(editor: string): void {
//         this.editor = editor
//     }
//     getEditor(): string {
//         return this.editor
//     }
// }
// const user = new User("fez", "187");
// const admin = new Admin('fooo', 'bar')
// Generics interfaces and functions in typescript
// const addId = <T extends object>(obj: T) => {
//     const id = Math.random().toString(16);
//     return {
//         ...obj,
//         id
//     }
// }
// interface UserInterace<T,V> {
//     name: string
//     data:T;
//     meta:V;
// }
// const user: UserInterace<{meta:string},string> = {
//     name: "Jack",
//     data:{
//         meta:"Fez"
//     },
//     meta:'Keistine'
// }
// const user2:UserInterace<string[]>={
//     name:'fez',
//     data:['wildheart','something']
// }
// const result = addId<UserInterace>(user);
// console.log('result', result);
// Enums
// const statuses={
//     notStarted:0,
//     inProgress:1,
//     done:2
// }
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NotStarted"] = "not started";
    StatusEnum["InProgress"] = "In progress";
    StatusEnum["Done"] = "Done";
})(StatusEnum || (StatusEnum = {}));
var notStartedStat = StatusEnum.NotStarted;
console.log(StatusEnum.InProgress);
