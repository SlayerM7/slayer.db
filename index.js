const fs = require("fs");
var cooldown = false;
try {
  const file = require("./db.json");

  const { Collection } = require("discord.js");

  let obj = {};
  let dels = {};

  const deletes = new Collection();
  const db = new Collection();

  Object.keys(file).map((key) => {
    db.set(key, require("./db.json")[key]);
    obj[key] = require("./db.json")[key];
  });
  Object.keys(require("./deletes.json")).map((key) => {
    deletes.set(key, require("./deletes.json")[key]);
    dels[key] = require("./deletes.json")[key];
  });

  class slayersDB {
    constructor() {}
    save() {
      if (cooldown === true) throw new RangeError("You're saving data to fast");
      fs.writeFileSync(
        "./node_modules/slayer.db/deletes.json",
        JSON.stringify(dels),
        (err) => {
          if (err) {
          }
        }
      );
      fs.writeFileSync(
        "./node_modules/slayer.db/db.json",
        JSON.stringify(obj),
        (err) => {
          if (err) {
          }
        }
      );
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 700);
    }

    set(key, value) {
      if (!key && !value)
        throw new SyntaxError(
          "[Slayers-DB] => No key or value was given to save"
        );
      if (!key) throw new Error("[Slayers-DB] => No key was given to save");
      if (key && !value)
        throw new SyntaxError("[Slayers-DB] => No value was given to save");
      if (key.includes(".") && typeof key === "string") {
        key = key.split(/[.]/g);
        if (key.length === 2) {
          if (!obj[key[0]]) obj[key[0]] = {};
          if (typeof obj[key[0]] !== "object") obj[key[0]] = {};
          obj[key[0]][key[1]] = value;
        } else {
          db.set(key, value);
          obj[key] = value;
        }
      } else {
        db.set(key, value);
        obj[key] = value;
      }
    }

    clone() {
      return this;
    }

    add(key, data) {
      if (!key) throw new Error(`[Slayers-DB] => Add was used with no key`);
      if (!data)
        throw new Error(
          "[Slayers-DB] => No number was given when add was called"
        );

      if (typeof data !== "number")
        throw new Error(
          "[Slayers-DB] => Data given in add method is not a numbr"
        );

      let d = obj[key];

      if (!d) throw new Error("No data on the key entered");

      if (typeof d !== "number" && !Number(d))
        throw new Error("[Slayers-DB] => Type stored in key is not a Number");

      let oldAmount = Number(d);

      let newAmount = oldAmount + data;

      this.set(key, newAmount);
    }

    subtract(key, data) {
      if (!key)
        throw new Error(`[Slayers-DB] => Subtract was used with no key`);
      if (!data)
        throw new Error(
          "[Slayers-DB] => No number was given when Subtract was called"
        );

      if (typeof data !== "number")
        throw new Error(
          "[Slayers-DB] => Data given in Subtract method is not a numbr"
        );

      let d = obj[key];

      if (!d) throw new Error("[Slayers-DB] => No data on the key entered");

      if (typeof d !== "number" && !Number(d))
        throw new Error("[Slayers-DB] => Type stored in key is not a Number");

      let oldAmount = Number(d);

      let newAmount = oldAmount - data;

      this.set(key, newAmount);
    }
    splice(key, query) {
      if (!query && query !== 0)
        throw new SyntaxError("[Slayers-DB] => No query was given");

      if (!key) throw new SyntaxError("[Slayers-DB] => No key was given");

      let x = obj[key];

      if (!x) throw new SyntaxError("[Slayers-DB] => Failed to find key given");

      if (!Array.isArray(x))
        throw new SyntaxError(
          "[Slayers-DB] => Found key in splice but is not an Array"
        );

      let index = x.indexOf(query);

      obj[key].splice(index, 1);
    }
    fetchDeleted() {
      let arr = [];

      Object.keys(dels).map((y) => {
        arr.push(y);
      });

      return arr;
    }

    delete(key, options) {
      if (!key)
        throw new SyntaxError("[Slayers-DB] => No key was given to delete");
      function normalDelete() {
        db.delete(key);
        delete file[key];
        delete obj[key];
      }
      if (typeof options !== "undefined") {
        if (!options.saveDeleted) normalDelete();
        if (options.saveDeleted) {
          deletes.set(key, obj[key]);
          dels[key] = dels[key];
          normalDelete();
        }
      } else {
        normalDelete();
      }
    }

    push(key, data) {
      let x = obj[key];

      if (!data)
        throw new Error(
          "[Slayers-DB] => Push was used but no values were given"
        );

      if (!Array.isArray(x))
        throw new Error(
          "[Slayers-DB] => Push was used but the value was not a Array"
        );

      if (Array.isArray(data)) {
        obj[key].push(...data);
      } else {
        obj[key].push(data);
      }
    }

    random() {
      let vales = this.values();
      let x = vales[Math.floor(Math.random() * vales.length)];

      return x;
    }

    randomKey() {
      let vales = this.keys();
      let x = vales[Math.floor(Math.random() * vales.length)];

      return x;
    }

    get(key) {
      if (!key)
        throw new SyntaxError("[Slayers-DB] => No key was given to get");
      let getted = null;
      if (typeof key === "string" && key.includes(".")) {
        key = key.split(/[.]/g);
        if (key.length === 2) {
          if (!obj[key[0]]) {
            getted = null;
          } else {
            if (!obj[key[0]][key[1]]) {
              getted = null;
            } else {
              getted = obj[key[0]][key[1]];
            }
          }
        }
      } else {
        getted = obj[key] || null;
      }
      return getted;
    }

    clear() {
      Object.keys(file).map((key) => {
        db.delete(key);
        delete file[key];
        delete obj[key];
      });
      return;
    }

    has(key) {
      if (!key)
        throw new SyntaxError("[Slayers-DB] => No key was given in has method");
      let output = false;
      if (obj[key]) output = true;
      return output;
    }

    static getSize() {
      let output = [];

      Object.keys(file).map((key) => {
        output.push(key);
      });

      let x = 0;
      if (output.length > 0) {
        x = output.length;
      }
      return x;
    }

    size = slayersDB.getSize();

    values() {
      let output = [];

      Object.values(obj).map((value) => {
        output.push(value);
      });
      return output;
    }

    keys() {
      let output = [];

      Object.keys(obj).map((key) => {
        output.push(key);
      });
      return output;
    }
  }

  let ob = {};
  let cool = false;
  Object.keys(require("./economy.json")).map((k) => {
    ob[k] = require("./economy.json")[k];
  });
  class slayersEconomy {
    addCoins(userID, amount) {
      if (!userID)
        throw new SyntaxError("[SlayersEconomy] => No userID was given");
      if (!amount)
        throw new SyntaxError("[SlayersEconomy] => No amount was given");

      if (!Number(amount))
        throw new SyntaxError("[SlayersEconomy] => Amount was not a Number");

      ob[userID] = (ob[userID] || 0) + amount;
    }
    save() {
      if (cool === true) throw new RangeError("You're saving data to fast");
      fs.writeFile(
        "./node_modules/slayer.db/economy.json",
        JSON.stringify(ob),
        (err) => {
          if (err) {
          }
        }
      );
      cool = true;
      setTimeout(() => {
        cool = false;
      }, 700);
    }
    removeCoins(userID, amount) {
      if (!userID)
        throw new SyntaxError("[SlayersEconomy] => No userID was given");
      if (!amount)
        throw new SyntaxError("[SlayersEconomy] => No amount was given");

      if (!Number(amount))
        throw new SyntaxError("[SlayersEconomy] => Amount was not a Number");

      ob[userID] = (ob[userID] || 0) - amount;
    }
    getCoins(userID) {
      if (!userID)
        throw new SyntaxError("[SlayersEconomy] => No userID was given");
      return ob[userID] || null;
    }
    clear() {
      Object.keys(ob).map((k) => {
        delete ob[k];
      });
    }
    leaderBoard(amount) {
      if (!amount) amount = 10;

      let sorted = Object.keys(ob).sort((a, b) => ob[b] - ob[a]);

      sorted.length = amount;

      return sorted;
    }
    deleteUser(userID) {
      if (!userID)
        throw new SyntaxError("[SlayersEconomy] => No userID was given");

      delete ob[userID];
    }
  }

  module.exports = {
    slayersDB,
    slayersEconomy,
  };
} catch (e) {
  throw e;
}
