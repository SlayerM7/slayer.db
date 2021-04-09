# What is this?

Easy to use database

# Installation

`npm i slayer.db`

# Slayers DB

**Basic setup**

```js
import { slayersDB } from "slayer.db";

// or

const { slayersDB } = require("slayer.db");

// Create a new instance of the database

const data = new slayersDB({ options });
```

**Save**

```js
// No data will be saved for a restart until data.save() is used
// We recommend not saving too fast as it could corrupt the data, There is already a save cooldown

data.save() -> // Saves the data

// All data is saved in one , Creating multiple classes wont make new Collections of a database
```

**Set**

```js
// Save the data with the set method

data.set(key, value);

// Advanced set

data.set("items.123", 10);

// Will save as: items: { 123: 10 }
```

**Get**

```js
// Fetch set data with the get method

data.get(value) -> // If there is no data on the value undefined will be returned

// Advanced get

data.get('items.123')

// Gets In Object
// Gets format as: items: {123: value}
// Will return "value"

```

**Has**

```js
//Check if the database has the key

data.has(key) -> // Returns a boolean
```

**Delete**

```js
// Delete a key from the database

data.delete(key);
```

**Clear**

```js
// Delete all saved data
// You cannot reverse this

data.clear();
```

**Size**

```js
// Return how much data is saved

data.size -> // Returns a interger
```

**Push**

```js
// Push more info into a value that is an Array

data.push(key, [WhatToPush]); ->
```

**Splice**

```js
// Remove a certain element from an array

data.splice(key, query);
```

**Clone**

```js
// Greate a clone of the entire Collection

data.clone() -> // Returns all methods
```

**Add**

```js
// Add more to a number saved

data.add(key, Number);
```

**Subtract**

```js
// Subtract a amount from a saved number

data.subtract(key, Number);
```

**Keys**

```js
// Returns an array of all saved keys

data.keys();
```

**Values**

```js
// Returns an array of all saved values

data.values();
```

**Random**

```js
// Returns randomly from all values
// Required the data.values() method

data.random() -> // Returns an Interger , String, Array
```

**Random Key**

```js
// Returns randomly from all keys
// Required the data.keys() method

data.randomKey() -> // Returns an Interger , String, Array
```

**to JSON**

```js
// Returns all data in JSON format

data.toJSON({options}) -> // Returns a Object
```

**Options**

_DB create_

```js
new slayersDB({
  saveOnSet: true, // This will auto save when ever ".set" is used
  // BE CAREFUL of this option, It is not recommended
});
```

_to JSON_

```js
data.toJson({
  straight: true, // This will format the way it is returned
});
```

# Slayers Economy

**Basic setup**

```js
import { slayersEconomy } from "slayer.db";

// or

const { slayersEconomy } = require("slayer.db");

// Create a new instance of the database

const data = new slayersEconomy();
```

**Save**

```js
// Make sure to use or the data wont be saved for a restart

data.save();
```

**Add coins**

```js
// Add coins to a specific user

data.addCoins(userID, amount);
```

**Remove coins**

```js
// Remove coins from a user

data.removeCoins(userID, amount);
```

**Get Coins**

```js
// Get the amount of coins from a user

data.getCoins(userID);
```

**Delete user**

```js
// Delete all users coins

data.deleteUser(userID);
```

**Leader board**

```js
// Get a leaderboard on users

data.leaderBoard(amount);
// The amount is from how much must be returned
// If You put 10 the amount will be top 10
// Defualt is: 10
```

**Clear**

```js
// Delete all data

data.clear();
```
