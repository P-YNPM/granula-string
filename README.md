# Granula String
- A lovely mini-package to check if string is empty or blank or has sufficient number of characters as you see fit.
- Functionalities may increase in the future.

## **_Question_**

`Why do I build this?`

I found myself need to verify if a string is empty, or blank, or has reached a minimum number of characters very often, thus I build this granula-string and I do not have to write duplicated codes

`What are the functionalities?`

1. Check if a string is empty
2. Check if a string is blank
3. Check if a string has reach a certain number of characters

Of course the functionalities may increase in the future

`How do I use it?`

There are 2 ways of using this package:

`Object Oriented Programming (OOP) approach`

and

`Functional Programming (FP) approach`,

### OOP
There's a class named as GranulaString that extends String
I chose not to use Monkey Patch approach in fear of breaking others code,
Refer: https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/
```ts
import { GranulaString } from 'granula-string'

const string = GranulaString.createFromString('123')
const empty = string.isEmpty()
const blank = string.isBlank()
const inRangeOf = string.isInRangeOf({
  min: 10,
  max: 100,
  excludeBlankSpace: true
})
const anotherString: String = string.toParentString() // convert back to String object
```

### FP
Since there's 3 functionalities available, there's 3 functions that you can import
```ts
import { isEmpty, isBlank, inRangeOf } from 'granula-string'

const string = '123'
const empty = isEmpty(string)
const blank = isBlank(string)
const inRangeOf = isInRangeOf(string, {
  min: 10,
  max: 100,
  excludeBlankSpace: true
})
```

`Can I raise an issue?`

Why not? Feel free to raise an issue if you have a question, an enhancement, or a bug report.

`How can I contribute?`

Here you are. If you have read this far, what more can I say?
I am glad that someone actually took their time to read this mini-package of mine
Here are a few things I would like to know about contribution

    Use TypeScript
    Write Test Code

## **_How to use_**

`yarn add granula-string`

OR

`npm i granula-string`
