# What is Mutera?

Mutera is a virtual environment in which simple creatures live and explore, forage, hunt, and reproduce. Each creature runs a special program, its DNA, that defines how it behaves as it encounters various features of its environment and that behavior in turn can affect other nearby creatures leading to a dynamic world. Random mutations in this program may occur in the creature's offspring allowing its family to evolve and adapt to the ever-changing world.

There are two types of creatures in Mutera: carnivores and herbivores. Carnivores will eat other creatures they come in contact with if they are aggressive or will eat any egg. Herbivores will eat any of the food that naturally grows in the environment. Although herbivores will not eat them, when aggressive they will attack other creatures they come in contact with.

## Genes: Defining the DNA

DNA is composed of one or more genes where each gene may change one attribute of a creature, for example whether the creature is moving or how fast it is turning. Genes are evaluated one at a time, top to bottom; once each gene has been evaluated the process repeats. Each gene has two parts: an optional condition and the modification of an attribute. Multiple genes can change the same attribute.

The optional condition specifies whether a gene will change the attribute. If the expression evaluates to false then the attribute is not modified. If the condition is omitted then it is implicitly true and the attribute is always modified.

Each gene is written in a simplified programming language in which creature attributes and environment features are represented as variables. The language is not case sensitive and so the variable `I am fast` is the same as the variable `I AM FAST` or `i am fast`. Whitespace is collapsed so that all consecutive whitespace characters are treated as if they were a single space.

A few genes:

```
If the distance to the nearest food in front of me < (2 * 2 * 2 + 3) then
I am fast := not the nearest creature in front of my is a carnivore
```

A gene which makes a creature move quickly towards nearby food if there isn't a dangerous creature in that same direction.

```
I am aggresive
```

A gene which ensures a creature is always aggressive.

```
My angular velocity := 2
```

A gene which ensures a creature will always rotate counter-clockwise.

### Anatomy of a Gene

The language of a gene is very simple. The basic outline is

```
[If <boolean expression> then]
<output variable> [:= <expression>]
```

The condition, `If <boolean expression> then`, a boolean expression and may use any input variable. If omitted it is as if the condition is `If true then`.

The output variable is the variable representing the property the gene modifies.

The assignment expression, `:= <expression>`, is the value that the property will take. It may be omitted for boolean output variables but must be present for numeric output variables. If omitted it is as if the assignment expression were `:= true`.

### Variables

Variables have two different data types: boolean and numeric. Boolean variables represent properties that are either true or false while numeric variables represent properties that can take any numeric value. Whether a creature is moving is a boolean variable while the creature's current health is numeric.

Variables may be used as either input into expressions or as outputs which set properties of a creature. Not all variables may be output variables because they represent values that come from the environment. For example, the creature's current health is not an output variable because creatures cannot decide that they should be immediately healthier. Similarly, the distance to the nearest food is not an output variable because that distance is a measurement between two objects in the environment. A creature would instead need to modify the `I am moving` variable in order to change that distance.

It is possible to define your own variables. Use these variables to other bits of data your creature will need in order to thrive. Since the value of a variable persists until it is changed these new variables can represent a kind of memory for your creature.

In total, however, there may only be a maximum of 64 boolean variables and a maximum of 64 numeric variables defined, including predefined variables.

### Predefined Variables

| Name | Data type | Can be used for output |
| - | - | - |
| `My age` | Numeric | No |
| `My angle` | Numeric | No |
| `My angular velocity` | Numeric | Yes, positive values rotate counter-clockwise |
| `My health` | Numeric | No |
| `My speed` | Numeric | No |
| `The distance to the nearest food to my left` | Numeric | No |
| `The distance to the nearest food to my right` | Numeric | No |
| `The distance to the nearest food in front of me` | Numeric | No |
| `The distance to the nearest creature to my left` | Numeric | No |
| `The distance to the nearest creature to my right` | Numeric | No
| `The distance to the nearest creature in front of me` | Numeric | No |
| `The noise level in front of me` | Numeric | No |
| `The noise level to the left of me` | Numeric | No |
| `The noise level to the right of me` | Numeric | No |
| `The noise level behind me` | Numeric | No |
| `My longitude` | Numeric | No |
| `My latitude` | Numeric | No |
| `I am aggressive` | Boolean | Yes, whether a creature will attack others |
| `I am moving` | Boolean | Yes, whether a creature will move forward |
| `I am fast` | Boolean | Yes, whether a creature will move quickly (at the cost of health) |
| `I am red` | Boolean | Yes, whether the creature's color contains red |
| `I am green` | Boolean | Yes, whether the creature's color contains green |
| `I am blue` | Boolean | Yes, whether the creature's color contains blue |
| `I am dividing` | Boolean | Yes, whether the creature should reproduce asexually |
| `I am trying to mate` | Boolean | Yes, whether the creature will reproduce sexually with another |
| `The nearest creature in front of me is a carnivore` | Boolean | No |
| `The nearest creature in front of me is red` | Boolean | No |
| `The nearest creature in front of me is green` | Boolean | No |
| `The nearest creature in front of me is blue` | Boolean | No |
| `The nearest creature to the left of me is a carnivore` | Boolean | No |
| `The nearest creature to the left of me is red` | Boolean | No |
| `The nearest creature to the left of me is green` | Boolean | No |
| `The nearest creature to the left of me is blue` | Boolean | No |
| `The nearest creature to the right of me is a carnivore` | Boolean | No |
| `The nearest creature to the right of me is red` | Boolean | No |
| `The nearest creature to the right of me is green` | Boolean | No |
| `The nearest creature to the right of me is blue` | Boolean | No |
| `The nearest creature behind of me is a carnivore` | Boolean | No |
| `The nearest creature behind me is red` | Boolean | No |
| `The nearest creature behind me is green` | Boolean | No |
| `The nearest creature behind me is blue` | Boolean | No |

### Constants

There are two boolean constants `true` and `false`. There are 64 numeric constants, all multiples of 1/8, the smallest being `-4` and the largest being `3.875`.

### Operators

Numeric expressions may use the common arithemetic operations, `+`, `-`, `*`, and `/` as part of their calculation.

Boolean expressions may use the logical operations `and`, `or`, and `not`, as well as the numeric comparisons `>` and `<`.
