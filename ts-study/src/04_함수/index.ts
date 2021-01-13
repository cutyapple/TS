// type GreetType = (name: string) => string;

// const Greet: GreetType = (name) => {
//     return `Hello, ${name}!`;
// }

// console.log(Greet("CutyApple"))



// type LogType = (message: string, userId?: string) => void;
// const Log: LogType = (message, userId = "unsigned in") => {
//     console.log(`${userId} : ${message}`)
// }



// const times = (f: (index: number) => void, n: number) => {
//     for (let i = 0; i < n; i++) {
//         f(i);
//     }
// }

// times(n => console.log(n), 4);



// type LogType = (message: string, userId?: string) => void; //  단축형 호출 시그니처
// type LogType = { (message: string, userId?: string): void } // 전체 호출 시그니처 (오버로딩할 때 쓰임)

// type Reservation = string;
// type ReserveType = {
//     (from: Date, to: Date, destination: string): Reservation
//     (from: Date, destination: string): Reservation
// };

// let Reserve: ReserveType = (from: Date, toOrDestination: Date | string, destination?: string) => {
//     return "";
// }



// type FilterType = {
//     <T>(array: T[], f: (item: T) => boolean): T[]
// }

// const filter: FilterType = (array, f) => {
//     let result = [];
//     for (let i = 0; i < array.length; i++) {
//         let item = array[i];
//         if (f(item)) {
//             result.push(item);
//         }
//     }

//     return result;
// }

// const Maps = <T, U>(array: T[], f: (item: T) => U): U[] => {
//     let result = [];
//     for (let i = 0; i < array.length; i++) {
//         result.push(f(array[i]));
//     }
//     return result;
// }

// Maps<string, boolean>(['a', 'b', 'c'], _ => _ === 'b');



// type TreeNode = {
//     value: string
// }
// type LeafNode = TreeNode & {
//     isLeaf: true
// }
// type InnerNode = TreeNode & {
//     children: [TreeNode] | [TreeNode, TreeNode]
// }

// const mapNode = <T extends TreeNode>(node: T, f: (value: string) => string): T => {
//     return { ...node, value: f(node.value) }
// }

// let a: TreeNode = { value: "a" };
// let b: LeafNode = { value: "b", isLeaf: true };
// let c: InnerNode = { value: "c", children: [b] };

// let a1 = mapNode(a, _ => _.toUpperCase());
// let b1 = mapNode(b, _ => _.toUpperCase());
// let c1 = mapNode(c, _ => _.toUpperCase());

// console.log(a1, b1, c1)



// const call = (f: (...args: unknown[]) => unknown, ...args: unknown[])


/*
    구체 타입 : 기대하는 타입을 알고 있고, 이 타입이 전달되어있는지 확인할 때 유용함.
    때로는 타입을 알 수 없다. 이때 특정 타입으로 제한하기 어렵다.
*/

// type FilterType = {
//     <T>(array: T[], f: (item: T) => boolean): T[]
// }

// type FilterType = {
//     <T>(array: T[], f: (item: T) => boolean): T[]
// };

// const filter: FilterType = (array, f) {
//     let result = [];
//     for (let i = 0; i < array.length; i++) {
//         let item = array[i]
//         if (f(item)) {
//             result.push(item)
//         }
//     }
//     return result;
// }

// Filter 함수 구현
// type Filter = {
//     (array: unknown, f: unknown): unknown[]
// }

// type NumberFilter = {
//     (array: number[], f: (item: number) => boolean): number[]
// }

// type GenericFilter = {
//     <T>(array: T[], f: (item: T) => boolean): T[]
// }

// type GenericFilter2<T> = { // 타입 이름 옆에 제네릭을 선언하면 제네릭을 타입 별칭으로 한정된다.
//     (array: T[], f: (item: T) => boolean): T[]
// }

// let filter: GenericFilter2<number> = (array, f) => { return array; } // 제네릭 타입 "Filter"는 타입을 요구하기 때문에 <number> 필요


// [map 함수 구현]
// 타입 unknown을 이용한 구현
function mapUnknown(array: unknown[], f: (item: unknown) => unknown): unknown[] {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}

// 제네릭을 이용한 구현
// 인수 배열 제네릭 T, 반환 배열 제네릭 U
function map<T, U>(array: T[], f: (item: T) => U): U[] {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}

map<string, boolean>(["a", "b", "c"], _ => _ === "a"); // 제네릭은 모두 명시적으로 쓰거나
map(["a", "b", "c"], _ => _ === "a"); // 아무것도 쓰지 않아야 한다.
// map<string>(["a", "b", "c"], _ => _ === "a"); // 일부만 하면 안된다.

map<string | number | boolean, boolean>(["a", 1, true], _ => _ === "a"); // 명시적으로 한정한 제네릭에 할당할 수 있는지 확인함


// 가변 인수 함수로 다형성 구현하기 (call 구현)
function call(
    f: (...args: unknown[]) => unknown,
    ...args: unknown[]
): unknown {
    return f(...args)
}

function fill(length: number, value: string): string[] {
    return Array.from({ length: length }, () => value);
}

call(fill, 10, 'a')

function callGeneric<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}