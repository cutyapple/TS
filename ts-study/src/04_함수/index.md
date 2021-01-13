### 한정된 다형성으로 인수의 개수 정의하기

가변 인수 함수도 한정된 다형성을 사용할 수 있다.

다음은 call을 구현한 코드이다. (함수와 임의 개수의 인수를 받아 함수에 건네 호출하는 함수)

```javascript
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


    function callGeneric<T extends unknown[], R>( // T와 R 두 개의 타입 매개변수를 받는다. T는 어떤 타입의 배열 또는 튜플
        f: (...args: T) => R, // call의 첫 인수는 함수 f다. f또한 가변 인수 함수로, args와 같은 타입의 인수다.
        ...args: T // ...args를 받는다. 
    ): R { // f의 반환인 R 타입을 반환한다. 
        return f(...args)
    }
```