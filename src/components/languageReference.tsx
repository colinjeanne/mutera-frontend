import * as React from 'react';

const languageReference: React.SFC = () => (
    <section className='how-to'>
        <h1>
            What is Mutera?
        </h1>
        <p>
            Mutera is a virtual environment in which simple creatures live and
            explore, forage, hunt, and reproduce. Each creature runs a special
            program, its DNA, that defines how it behaves as it encounters
            various features of its environment and that behavior in turn can
            affect other nearby creatures leading to a dynamic world. Random
            mutations in this program may occur in the creature’s offspring
            allowing its family to evolve and adapt to the ever-changing world.
        </p>
        <p>
            There are two types of creatures in Mutera: carnivores and
            herbivores. Carnivores will eat other creatures they come in contact
            with if they are aggressive or will eat any egg. Herbivores will eat
            any of the food that naturally grows in the environment. Although
            herbivores will not eat them, when aggressive they will attack other
            creatures they come in contact with.
        </p>
        <h2>
            Genes: Defining the DNA
        </h2>
        <p>
            DNA is composed of one or more genes where each gene may change one
            attribute of a creature, for example whether the creature is moving
            or how fast it is turning. Genes are evaluated one at a time, top to
            bottom; once each gene has been evaluated the process repeats. Each
            gene has two parts: an optional condition and the modification of an
            attribute. Multiple genes can change the same attribute.
        </p>
        <p>
            The optional condition specifies whether a gene will change the
            attribute. If the expression evaluates to false then the attribute
            is not modified. If the condition is omitted then it is implicitly
            true and the attribute is always modified.
        </p>
        <p>
            Each gene is written in a simplified programming language in which
            creature attributes and environment features are represented as
            variables. The language is not case sensitive and so the variable
            <code>I am fast</code> is the same as the variable <code>I AM
            FAST</code> or <code>i am fast</code>. Whitespace is collapsed so
            that all consecutive whitespace characters are treated as if they
            were a single space.
        </p>
        <p>A few genes:</p>
        <pre>
            <code>If the distance to the nearest food in front of me &lt; (2 * 2 * 2 + 3) then
        I am fast := not the nearest creature in front of my is a carnivore
        </code></pre>
        <p>
            A gene which makes a creature move quickly towards nearby food if
            there isn’t a dangerous creature in that same direction.
        </p>
        <pre><code>I am aggresive
        </code></pre>
        <p>
            A gene which ensures a creature is always aggressive.
        </p>
        <pre><code>My angular velocity := 2
        </code></pre>
        <p>
            A gene which ensures a creature will always rotate
            counter-clockwise.
        </p>
        <h3>Anatomy of a Gene</h3>
        <p>
            The language of a gene is very simple. The basic outline is
        </p>
        <pre><code>[If &lt;boolean expression&gt; then]
        &lt;output variable&gt; [:= &lt;expression&gt;]
        </code></pre>
        <p>
            The condition, <code>If &lt;boolean expression&gt; then</code>, a
            boolean expression and may use any input variable. If omitted it is
            as if the condition is <code>If true then</code>.
        </p>
        <p>
            The output variable is the variable representing the property the
            gene modifies.
        </p>
        <p>
            The assignment expression, <code>:= &lt;expression&gt;</code>, is
            the value that the property will take. It may be omitted for boolean
            output variables but must be present for numeric output variables.
            If omitted it is as if the assignment expression were <code>:=
            true</code>.
        </p>
        <h3>Variables</h3>
        <p>
            Variables have two different data types: boolean and numeric.
            Boolean variables represent properties that are either true or false
            while numeric variables represent properties that can take any
            numeric value. Whether a creature is moving is a boolean variable
            while the creature’s current health is numeric.
        </p>
        <p>
            Variables may be used as either input into expressions or as outputs
            which set properties of a creature. Not all variables may be output
            variables because they represent values that come from the
            environment. For example, the creature’s current health is not an
            output variable because creatures cannot decide that they should be
            immediately healthier. Similarly, the distance to the nearest food
            is not an output variable because that distance is a measurement
            between two objects in the environment. A creature would instead
            need to modify the <code>I am moving</code> variable in order to
            change that distance.
        </p>
        <p>
            It is possible to define your own variables. Use these variables to
            other bits of data your creature will need in order to thrive. Since
            the value of a variable persists until it is changed these new
            variables can represent a kind of memory for your creature.
        </p>
        <p>
            In total, however, there may only be a maximum of 64 boolean
            variables and a maximum of 64 numeric variables defined, including
            predefined variables.
        </p>
        <h3>Predefined Variables</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Data type</th>
                    <th>Can be used for output</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>My age</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>My angle</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>My angular velocity</code></td>
                    <td>Numeric</td>
                    <td>Yes, positive values rotate counter-clockwise</td>
                </tr>
                <tr>
                    <td><code>My health</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>My speed</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest food to my left</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest food to my right</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest food in front of me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest creature to my left</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest creature to my right</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The distance to the nearest creature in front of me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The noise level in front of me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The noise level to the left of me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The noise level to the right of me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The noise level behind me</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>My longitude</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>My latitude</code></td>
                    <td>Numeric</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>I am aggressive</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether a creature will attack others</td>
                </tr>
                <tr>
                    <td><code>I am moving</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether a creature will move forward</td>
                </tr>
                <tr>
                    <td><code>I am fast</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether a creature will move quickly (at the cost of health)</td>
                </tr>
                <tr>
                    <td><code>I am red</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether the creature’s color contains red</td>
                </tr>
                <tr>
                    <td><code>I am green</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether the creature’s color contains green</td>
                </tr>
                <tr>
                    <td><code>I am blue</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether the creature’s color contains blue</td>
                </tr>
                <tr>
                    <td><code>I am dividing</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether the creature should reproduce asexually</td>
                </tr>
                <tr>
                    <td><code>I am trying to mate</code></td>
                    <td>Boolean</td>
                    <td>Yes, whether the creature will reproduce sexually with another</td>
                </tr>
                <tr>
                    <td><code>The nearest creature in front of me is a carnivore</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature in front of me is red</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature in front of me is green</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature in front of me is blue</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the left of me is a carnivore</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the left of me is red</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the left of me is green</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the left of me is blue</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the right of me is a carnivore</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the right of me is red</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the right of me is green</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature to the right of me is blue</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature behind of me is a carnivore</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature behind me is red</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature behind me is green</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><code>The nearest creature behind me is blue</code></td>
                    <td>Boolean</td>
                    <td>No</td>
                </tr>
            </tbody>
        </table>
        <h3>Constants</h3>
        <p>
            There are two boolean constants <code>true</code> and
            <code>false</code>. There are 64 numeric constants, all multiples of
            1/8, the smallest being <code>-4</code> and the largest being
            <code>3.875</code>.
        </p>
        <h3>Operators</h3>
        <p>
            Numeric expressions may use the common arithemetic operations,
            <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>
            as part of their calculation.
        </p>
        <p>
            Boolean expressions may use the logical operations <code>and</code>,
            <code>or</code>, and <code>not</code>, as well as the numeric
            comparisons <code>&gt;</code> and <code>&lt;</code>.
        </p>
    </section>
);

export default languageReference;
